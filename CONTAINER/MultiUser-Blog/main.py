import webapp2
import os
import jinja2
import hashlib
import hmac
import random
from string import letters
import re

from google.appengine.ext import db


template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_env = jinja2.Environment(loader= jinja2.FileSystemLoader(template_dir), autoescape=True)

secret = 'cheesecake'


def render_str(template, **params):
    t = jinja_env.get_template(template)
    return t.render(params)


def make_secure_val(val):
    return '%s|%s' % (val, hmac.new(secret, val).hexdigest())


def check_secure_val(secure_val):
    val = secure_val.split('|')[0]
    if secure_val == make_secure_val(val):
        return val


class BlogHandler(webapp2.RequestHandler):
    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    def render_str(self, template, **params):
        params['user'] = self.user
        return render_str(template, **params)

    def render(self, template, **kw):
        self.write(self.render_str(template, **kw))

    def set_secure_cookie(self, name, val):
        cookie_val = make_secure_val(val)
        self.response.headers.add_header(
            'Set-Cookie',
            '%s=%s; Path=/' % (name, cookie_val))

    def read_secure_cookie(self, name):
        cookie_val = self.request.cookies.get(name)
        return cookie_val and check_secure_val(cookie_val)

    def login(self, user):
        self.set_secure_cookie('user_id', str(user.key().id()))

    def logout(self):
        self.response.headers.add_header('Set-Cookie', 'user_id=; Path=/')

    def initialize(self, *a, **kw):
        webapp2.RequestHandler.initialize(self, *a, **kw)
        uid = self.read_secure_cookie('user_id')
        self.user = uid and User.by_id(int(uid))


def make_salt(length=5):
    return ''.join(random.choice(letters) for x in xrange(length))

def make_pw_hash(name, pw, salt=None):
    if not salt:
        salt = make_salt()
    h = hashlib.sha256(name + pw + salt).hexdigest()
    return '%s|%s' % (salt, h)


def valid_pw(name, password, h):
    salt = h.split('|')[0]
    return h == make_pw_hash(name, password, salt)


def users_key(group='default'):
    return db.Key.from_path('users', group)


class User(db.Model):
    name = db.StringProperty(required=True)
    pw_hash = db.StringProperty(required=True)
    email = db.StringProperty()
    like_post_id = db.ListProperty(int)
    user_comments = db.ListProperty(str)

    @classmethod
    def by_id(cls, uid):
        return User.get_by_id(uid, parent=users_key())

    @classmethod
    def by_name(cls, name):
        u = User.all().filter('name =', name).get()
        return u

    @classmethod
    def register(cls, name, pw, email=None):
        pw_hash = make_pw_hash(name, pw)
        return User(parent=users_key(),
                    name=name,
                    pw_hash=pw_hash,
                    email=email)

    @classmethod
    def login(cls, name, pw):
        u = cls.by_name(name)
        if u and valid_pw(name, pw, u.pw_hash):
            return u

class SignUp(BlogHandler):
    def render_front(self, name="", email="", error=""):
        self.render('signup.html', name=name, email=email, error=error)
        
    def get(self):
        self.render_front()
       
    def post(self):
        error = None
        self.username = self.request.get('username')
        self.password = self.request.get('password')
        self.email = self.request.get('email')
        self.verify = self.request.get('verify')
        haserror = False
        
        if self.password != self.verify :
            error = "Passwords didn't match, retry!"
            haserror = True
        elif not re.match(r'^[a-zA-Z0-9_-]{3,20}$', self.username) : 
            error = "The username is invalid!"
            haserror = True
        elif len(self.password) < 5:
            error = "The password must be more than 5 characters!"
            haserror = True
        elif self.email :
            if not re.match(r'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)', self.email) :
                error = "Invalid email address"
                haserror = True
        
        if haserror :
            self.render_front(self.username, self.email, error)
        else:
            self.done()
        
    def done(self, *a, **kw):
        raise NotImplementedError

class Register(SignUp):
    def done(self):
        user = User.by_name(self.username)
        if user :
            error = "User already exists!"
            self.render_front(name="", email="", error=error)
        else :
            user = User.register(self.username, self.password, self.email)
            user.put()
            self.login(user)
            return self.redirect('/blog')

class Login(BlogHandler):
    def get(self):
        self.render("login.html")
    
    def post(self):
        username = self.request.get('username')
        password = self.request.get('password')
        
        user = User.login(username, password)
        if user:
            self.login(user)
            return self.redirect('/blog')
        else :
            error = "Invalid username or password!"
            self.render("login.html", error=error)

class Logout(BlogHandler):
    def get(self):
        self.logout()
        return self.redirect('/blog')

        
#Blog Classes 

class Post(db.Model):
    subject = db.StringProperty(required=True)
    name = db.StringProperty(required=True)
    content = db.TextProperty(required=True)
    like_count = db.IntegerProperty(default=0)
    comments = db.ListProperty(str)
    created = db.DateTimeProperty(auto_now_add=True)
    last_modified = db.DateTimeProperty(auto_now=True)
    
    def render(self, user):
        self._render_text = self.content.replace('\n', '<br>')
        return render_str("home.html", p=self, user=user)

def blog_key(name='default'):
    return db.Key.from_path('blogs', name)

class HomeHandler(BlogHandler):
    def get(self):
        posts = Post.all().order('-created')
        self.render("home.html", posts=posts)
    
    def post(self):
        if not self.user:
            return self.redirect('/login')
        subject = self.request.get('post_id')
        
        u = User.by_name(self.user.name)
        u.like_post_id += [int(subject)]
        u.put() 
        
        key = db.Key.from_path('Post', int(subject), parent=blog_key())
        post = db.get(key)
        if not post:
                return self.redirect('/login')
        post.like_count += 1
        post.put()
        
        return self.redirect('/blog')
        
class NewPost(BlogHandler):
    def get(self):
        if self.user:
            self.render("newpost.html")
        else:
            return self.redirect('/login')
        
    def post(self):
        if not self.user:
            return self.redirect('/login')
        
        subject = self.request.get('subject')
        content = self.request.get('content')
        
        if subject and content :
            p = Post(parent=blog_key(), subject=subject, content=content, name=self.user.name)
            p.put()
            return self.redirect('/blog/%s' % str(p.key().id()))
        else :
            error = "Enter the subject and content, please!"
            self.render("newpost.html", subject=subject, content=content, rror=error)

class PostPage(BlogHandler):
    def get(self, post_id):
        key = db.Key.from_path('Post', int(post_id), parent=blog_key())
        post = db.get(key)
        
        if not post:
            self.error(404)
            self.render("404.html")
        else:
            self.render("link.html", post=post, user=self.user)
        
    def post(self, post_id):
        if not self.user:
            return self.redirect('/login')
        
        content = self.request.get('content')
        
        if content:
            key = db.Key.from_path('Post', int(post_id), parent=blog_key())
            post = db.get(key)
            if not post or not self.user:
                return self.redirect('/login')
            post.comments = post.comments + [content]
            post.put()
            
            u = User.by_name(self.user.name)
            u.user_comments = u.user_comments + [content]
            u.put()
            return self.redirect('/blog/%s' % post_id)
        else :
            error = "Enter content, please!"
            key = db.Key.from_path('Post', int(post_id), parent=blog_key())
            post = db.get(key)
            if not post:
                return self.redirect('/login')
            self.render("link.html", post=post, error=error)

class DeletePost(BlogHandler):
    def get(self, post_id):
        key = db.Key.from_path('Post', int(post_id), parent=blog_key())
        post = db.get(key)
        if not post:
            self.error(404)
            self.render('404.html')
        else:
            self.render("deletepost.html")
    
    def post(self, post_id):
        if not self.user:
            return self.redirect('/blog')
        key = db.Key.from_path('Post', int(post_id), parent=blog_key())
        post = db.get(key)
        if not post or post.name != self.user.name :
                return self.redirect('/login')
        post.delete()
        return self.redirect('/blog')
        
class EditPost(BlogHandler):
    def get(self, post_id):
        key = db.Key.from_path('Post', int(post_id), parent=blog_key()) 
        post = db.get(key)
        
        if not post:
            self.render('404.html')
        else :
            self.render('newpost.html', post=post)
            
    def post(self, post_id):
        if not self.user:
            return self.redirect('/blog')

        subject = self.request.get('subject')
        content = self.request.get('content')
        
        if subject and content:
            key = db.Key.from_path('Post', int(post_id), parent=blog_key())
            post = db.get(key)
            if not post or post.name != self.user.name :
                return self.redirect('/login')
            post.subject = subject
            post.content = content
            post.put()
            return self.redirect('/blog/%s' % post_id)
        else:
            error = "Enter the subject and content, please!"
            self.render("newpost.html", subject=subject, content=content, error=error)

class EditComment(BlogHandler):
    def get(self, post_id):
        key = db.Key.from_path('Post', int(post_id), parent=blog_key())
        post = db.get(key)
        comment = self.request.get('comment')
        if not post or not comment:
            return self.render('404.html')
        else :
            self.render('editcomment.html', post=post, comment=comment)
    
    def post(self, post_id):
        if not self.user:
            return self.redirect('/blog/%s' % post_id)
        
        old_comment = self.request.get('old_comment')
        comment = self.request.get('new_comment')
        if comment and old_comment:
            key = db.Key.from_path('Post', int(post_id), parent=blog_key())
            post = db.get(key)
            if not post :
                return self.redirect('/login')
            post.comments = [words.replace(old_comment, comment) for words in post.comments]
            post.put()
            
            if not self.user:
                    return self.redirect('/login')
            user = User.by_name(self.user.name)
            user.user_comments = [words.replace(old_comment, comment) for words in user.user_comments]
            user.put()
            
            return self.redirect('/blog/%s' % post_id)
        else :
            return self.redirect('/blog/%s' % post_id)
            
        
class DeleteComment(BlogHandler):
    def get(self, post_id):
        key = db.Key.from_path('Post', int(post_id), parent=blog_key())
        post = db.get(key)
        comment = self.request.get('comment')
        if not post or not comment:
            self.render('404.html')
        else :
            self.render('deletecomment.html', post=post, comment=comment)
    
    def post(self, post_id):
        if not self.user:
            return self.redirect('/blog/%s' % post_id)
        
        old_comment = self.request.get('old_comment')
        if old_comment :
            key = db.Key.from_path('Post', int(post_id), parent=blog_key())
            post = db.get(key)
            if not post :
                return self.redirect('/login')
            try :
                post.comments.remove(old_comment)
                post.put()
                
                if not self.user:
                    return self.redirect('/login')
                user = User.by_name(self.user.name)
                user.user_comments.remove(old_comment)
                user.put()
            except :
                return self.redirect('/blog/%s' % post_id)
        return self.redirect('/blog/%s' % post_id)
        
app = webapp2.WSGIApplication([
    ('/', HomeHandler),
    ('/blog/?', HomeHandler),
    ('/blog/newpost', NewPost),
    ('/blog/(\d+)', PostPage),
    ('/blog/edit/(\d+)', EditPost),
    ('/blog/delete/(\d+)', DeletePost),
    ('/comment/edit/(\d+)', EditComment),
    ('/comment/delete/(\w+)', DeleteComment),
    ('/signup', Register),
    ('/login', Login),
    ('/logout', Logout)
], debug=True)