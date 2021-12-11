# Login
As an unauthorized user, I want to be able to login to the website via a form, so that I can access my private information.
##  Questions
1 	Will the user enter a username or an email address to login?
  * 	User will login via email and password
2	What routes should we use for login?
  * 	User will login via /login route
3 	Where should the user be redirected after login?
  * 	User will be redirected to the / homepage
4 	Will we allow OAuth authentication via a third party?
  * 	Not yet -- maybe in a future story
5 	What happens if the user doesn't exist yet?
  * 	Display the message Invalid Login :( please try again.
6 	What happens if the user enters the wrong password?
  *  	Display the message Invalid Login :( please try again.
7 	Should this story include allowing a user to reset their password?
  *  	Not yet -- maybe in a future story
8 	Should logging in use session-based or use token-based authentication?
  *  	We will use token-based auth for now
## Acceptance Criteria
   1.	Given that I'm a logged-out user and
  *  	When I'm on the /login route
  * 	Then there will be a login form with an email and password field and a "Login" button to submit the form.
   2.	When I try to fill out the form with an invalid email and password combination and press Enter or press the "Login" button
  *	Then at the top of the form, I will see a red message Invalid Login :( please try again.
 3.	When I try to fill out the form with an email that doesn't exist in the system and press Enter or press the "Login" button
  *  	Then at the top of the form, I will see a red message Invalid Login :( please try again.
 4.	When I try to fill out the form with a valid email and password and press press Enter or press the "Login" button
  * 	Then I will be redirected to the homepage at the / route.
 5.	Given that I am a logged-in user
  * 	When I refresh the homepage at the / route
  * 	Then I will still be logged in
 6.	Given that I am a logged-out user
  * 	When I try to navigate to the homepage at the / route
    **	Then I will be redirected to the /login route
## Signup
As an unauthorized user, I want to be able to sign up for the website via a signup form, so that I can access Podium.
## Questions
*  	Will the user enter a username and an email address to signup?
*	Will we confirm their password during signup?
* 	What routes should we use for signup?
* 	Where should the user be redirected after signup?
* 	Will we allow OAuth authentication via a third party?
* 	What happens if the user with the username or email already exists?
* 	What happens if the user enters the wrong password confirmation?
## Acceptance Criteria
1.	Given that I'm a user who has not signed up yet and when I'm on the /signup route
  *	Then there will be a signup form with an email, username, and password field and a "Sign Up" button to submit the form.
2.	When I try to fill out the form with an email or username that already exists with a valid password and press Enter or press the "Sign Up" button
  * 	Then at the top of the form, I will see a red message User with that email or username already exists.
3.	When I try to fill out the form with a password shorter than 6 characters and press Enter or press the "Sign Up" button
  *	Then at the top of the form, I will see a red message Password must be at least 6 characters long.
4.	When I try to fill out the form with a valid email, username, and password and press Enter or press the "Sign Up" button 
  * Given that I am a user that just signed up
    *	When I refresh the homepage at the / route
      * 	Then I will still be logged in
## Demo User
*  As a first-time user who just wants to demo Podium, I want to be able to try out the site with a demo user login via a single button click on the login and signup form, so that I can access Podium without having to go through the trouble of creating a new account.
## Login


* As a logged-in user, I want to logout via a button on the navigation bar, so that I can hide my account information to the rest of the users on this device.
* See all the Liked Articles of who you follow
* As a logged-in user, I want to see all the articles that users that I follow have liked on Podium as a list, so I can see what content other users are enjoying.
## Articles
### Create an Article
*  As a logged-in user, I want to create an article.
###  Edit an Article
*  As a logged-in user, I want to edit an article.
###  Delete an Article
*  As a logged-in user, I want to delete an article.
###  Like an Article
*  As a logged-in user, I want to be able to like an article, so that I can convey my appreciation for it
###  Unlike an Article
* As a logged-in user, I want to be able to unlike an article, so that I can retract my appreciation for it. 
###  See number of likes for an Article
*  As a logged-in user, I want to be able to see the number of likes for a single article, so that I can see how many other users liked this article.

## Likes
### Create a Like
* As a logged-in user, I want to create a like for a user’s article, so that I can tell others I enjoyed the article.
###  Delete a Like
*  As a logged-in user, I want to be able to delete my own like, so that I can retract my thoughts from the rest of the users so none of the users in Medium can see it anymore, including myself.
.
## Users
###  User Profile Page
*  As a logged-in user, I want to be able to see the latest articles for the users that I’m following.
###  Follow a User
* As a logged-in user, I want to be able to follow another user.

### Unfollow a User
* As a logged-in user, I want to be able to unfollow users, so that I can stop seeing their content.
## Comments
###  Create a Comment
* As a logged-in user, I want to create a comment for a user’s article.
###  Edit a Comment
* As a logged-in user, I want to create a comment for a user’s article.
### Delete a Comment
* As a logged-in user, I want to be able to delete my own comment, so that I can retract my thoughts from the rest of the users so none of the users in Podium can see it anymore, including myself.
