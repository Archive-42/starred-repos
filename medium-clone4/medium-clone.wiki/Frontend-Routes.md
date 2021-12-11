# `GET /users/new`
* render `signup.pug`
* form method and action: `POST /users/new`

# `POST /users/new`
* create new user
* log user in
* redirect to `/`


# `GET /login`
* render `login.pug`
* form method and action `POST /login`

# `POST /login`
* log user in
* redirect to `/`

# `GET /`
* render `index.pug`
* template variables needed: user, articles (array of articles from followed users)

# `POST /articles`
* create new article
* redirect to `articles/articleId` (where articleId = newly created post)

# `GET /articles/:id`
* render `article.pug`
* template variables needed: article (including comments)

# `GET /articles/:id/edit`
* render `edit-article.pug`
* template variables needed: article
* form method and action `POST /articles/:id/edit`

# `POST /articles/:id/edit`
* update specific post
* redirect to `/articles/articleId`

# `POST api/articles/:id/likes`
* create new like with articleId === req.params.id && userId === currentUser.id
* route on like button click, triggering fetch request

# `POST api/articles/:id/comments`
* create new comment with articleId === req.params.id
* route on submit button click in comment form

# `POST api/articles/:id/follows`
* create new follow
* route on follow button click (next to username)