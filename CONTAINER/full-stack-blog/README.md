<!-- @format -->

## Different revisions:

1. [Original Requirements](#original-lab-requirements---commit-hash:-3f254a82e1ddbe8fcf69834fcc3869486b4f73ba)
2. [Backend Auth](#backend-auth---da81138463e4568dbc69e351e1494754b0a2672f)
3. [Frontend Auth](#frontend-auth---4f8bea66bd087f081d4dc563e1451f1ab1798494)
4. [Stripe Integration](#stripe-integration---7e9dab8a0e8dd144a5b8d4b12f302cd99b64706d)
5. [Mailgun Integration](#mailgun-integration---6035742b943d6115c1f3422499fbcbb94d49c656)

# Original lab Requirements - commit hash: 3f254a82e1ddbe8fcf69834fcc3869486b4f73ba

# Your Personal Blog

The purpose of this lab is to make a your own personal blog .. full stack! You'll use everything you've learned from the Database lectures to make a schema, connect it to your Express server, write REST API Endpoints to get your data, and display it all using React. Let's crush it!

## Steps

### Database

1. Create a new database named blogs.
2. Create the following tables:

```
Blogs (
   id
   title
   content
   authorid
   _created
)

Authors (
   id
   name
   email
   _created
)

Tags (
   id
   name
   _created
)

BlogTags (
   blogid
   tagid
)
```

3. Create a stored procedure named `spBlogTags` to pull back the tag of a blog.
    - Must have one parameter: `blogid`
    - Hint: You only need to join `BlogTags` and `Tags`
4. Create a new user with privileges for your `Blogs` database

### Express API

1. Install mysql and its typings into your project
2. Make sure your project runs via npm run dev and going to localhost:3000/
3. Set up your database config, and don't forget to include it in your .gitignore!
4. Use your config object to connect to your mysql database.
5. Write your DB queries and REST API Endpoints to:
    - GET all Blogs
    - GET one Blog
    - POST a new Blog, with at least one tag
    - Hint: Your blog insert will result in an id response from mysql, use that to insert your blog id and tag id into your blogtags table!
    - PUT to edit a Blog
    - DELETE to delete a blog
    - GET all Blogtags for a blogid

### React Frontend

1. Create a component to display all Blogs
2. Create a component to show one Blog
    - Add a button that links to another component to edit this Blog
    - The Edit Blog component should allow you to save any edits to your Blog, or delete that Blog
3. Create a component to add a new Blog post
    - Hint: Use a select element with options to handle adding a tag to your new Blog post

The all Blogs component should display previews of the blog posts that a user can click on, which would navigate to the single Blog component that would display all the information of the Blog post. Don't forget to use your blog tags at least on the single Blog component!

### Demo

https://www.youtube.com/watch?v=Be8UZxPGyAY

# Backend auth - da81138463e4568dbc69e351e1494754b0a2672f

# Protect ~~This House~~ Your API

The purpose of this lab is to protect your Blog API routes by adding back end authentication! You should be able to "login" by sending a `POST` request to a route in Postman. This login should create and send tokens on a successful response. After, you need to be able to protect certain routes on your API by requiring a valid auth token.

## Steps

### MySQL

1. Make sure your users (or authors) table contains an email column, a password column of type `VARCHAR(60)`, and a role column that can be any text data type. It'd be good practice to make the default value of role to `"guest"`
2. If you don't have one, create a accesstokens table with at least the following:

```
accesstokens (
    id,
    userid (FK to users id),
    token TEXT NOT NULL,
    _created
);
```

3. Create a new user with privileges to connect to this schema

### Express Config

1. Create a config directory in your server `src` code
2. Have an `index.ts` that will swap between production/development based on the environment variable `NODE_ENV`
3. Export your MySQL config object from your `development.ts` and a mirror object format from `production.ts` using environment variables
4. Update your `.gitignore` to include just the `development.ts` file

### Express DB Queries

1. Connect to your MySQL DB if you aren't already
2. Should already have CRUD (get all, get one, insert, update, and delete) operations for blogs table, write them if you don't
3. For your users table, make sure you can `findOneByEmail` and `findOneById` at minimum
4. For your accesstokens table, make sure you can `findOneByIdAndToken`, insert, and update a token at a minimum

Note: If you wish to write a more generic / reusable `find`, `findOne`, or any other query, go for it! You don't have to have these very specific queries that the walkthroughs demo. You can write similar functions that can take an entire object and use its keys/values to make a dynamic query every time!

### Installs

Make sure you have the following modules and their types installed:

-   `bcrypt @types/bcrypt`
-   `jsonwebtoken @types/jsonwebtoken`
-   `passport @types/passport`
-   `passport-http-bearer @types/passport-http-bearer`
-   `passport-local @types/passport-local`

### Utilities

-   Create a Password Utility using `bcrypt` to:
    1. Generate a hashed and salted password
    2. Compare a plain text password to a hash
-   Create a Token Utility using `crypto` and `jwt` to:
    -   CreateToken
        1. Create a new row in your accesstokens table with that users' id
        2. Update your payload with that new row's id
        3. Generate a unique property using `crypto`
        4. Sign the token using `jwt` and a secret auth key
        5. Update the row with the token value
        6. Return the token
    -   ValidateToken
        1. Using `jwt` to decode the token and get a payload
        2. Find the payload in your accesstokens table to verify it
        3. Return the payload

### Middleware

Write a middleware for `passport` to use a new `LocalStrategy` to:

1. serialize/deserialize a `user`
2. Use the `LocalStrategy` using an email/password
3. Find that user by their email
4. Compare that user's hashed password with what they provided
5. Return the `user` if it's valid

Write a middleware for `passport` to use a new `BearerStrategy` to:

1. Validate a provided token
2. Using the token's payload, find that user's id in your users table
3. Return the `user` if it's valid

Make sure in your root server `server.ts` to:

1. Initialize `passport`
2. Import both your middlewares

### Auth Routes

1. Create an auth router with `/login` and `/register` routes
2. Have the `/login` route authenticate a `POST` request with an email/password. If valid, respond with an object containing the `token`, `userid`, and `role` of that user
3. Have the `/register` route insert a new user with their hashed/salted password, generate a token, and respond with the same object as the above step (`token`, `userid`, and `role`)

### API Routes

1. Have your `passport` 'bearer' intercept _every_ incoming API route request
2. It should add a `user` property to the `req` object if provided a valid Bearer token
3. In any case, it should forward the `req` object to the next step in your route logic
4. Write a new function middleware using `RequestHandler` to check your `req` object for a `user` property or a specific `role` on that property

### Completion

If all is coded, your completed back end authentication lab should be able to use Postman to:

1. Register a new user, and have their hash stored in your users table
2. Use the token from a new user's registration to make a request to a protected route
3. Make sure you receive "unauthorized" on those protected routes when using no/an incorrect token

### Demo

https://www.youtube.com/watch?v=xqLg-nUn9Fg

# Frontend auth - 4f8bea66bd087f081d4dc563e1451f1ab1798494

# Frontend Under Lock and Key Token

The purpose of this lab is to protect your frontend components using the auth workflow we coded on the backend. We write a utility file to handle localStorage and extending the use of fetch to more reusable in our applications.

## Steps

### Frontend Setup

At this point, you should have your basic Blog already running components for displaying all blogs, a single blog, and something to post/edit/delete blogs.

1. Create an "admin" page that will allow you to create new blog posts and edit and delete existing ones
    - You may be able to link to your existing pages for editing and deleting posts
2. Make sure you protect your admin page, and the edit/delete pages (require login)
3. Any "admin-type" functionality should not be visible from the "public" pages. Those functions should only appear on the admin page(s):
    - Create a new post
    - Edit a post
    - Delete a post

### Installs

Make sure you have the following modules and their types installed:

-   isomorphic-fetch @types/isomorphic-fetch
-   moment @types/moment
    -   for fun added utility :)

### API Routes

-   Make sure all of your blog API endpoints use res.json() to send some kind of response, to make sure our frontend utility won't fail in certain circumstances

### Utilities

1. Make sure to import isomorphic-fetch
2. Export a new variable AccessToken who's value is gotten from localStorage, otherwise defaulting to null
3. Export a new object User who's userid and role properties are gotten from localStorage, otherwise defaulting to null
4. Export a utility function json (or any name of your choosing) which will make the fetch call, generate the appropriate headers, and convert the json response automatically for you
    - arguments should be uri, method, body as the videos demo
5. Export a utility function SetAccessToken that given a token, and user object, can set those key/value pairs on localStorage

### Implement the Utilities

1. Change all your fetch methods across your React components to use your custom json function
2. Make sure your "admin" component will not show unless you are logged in, i.e. have it reroute to the login form
3. Make your Login component successfully POST request a login, and take the response and set it using SetAccessToken
4. Confirm you can navigate back to the "admin" page without getting rerouted, and confirm you can successfully post blogs again

### Spice it up!

1. Add some private class variables that prevent users from spamming a login/submit button and causing multiple requests to fulfill
2. Add some error/success handling for good user experience on your webapp
3. Add something sweet n' spicy the demos don't and share it in Discord

### Demo

https://www.youtube.com/watch?v=2xJZQs_ugWQ

# Stripe Integration - 7e9dab8a0e8dd144a5b8d4b12f302cd99b64706d

After reviewing the material, you should be able to use this knowledge and the boilerplate code to implement a donation form on your blog.

You can choose which Stripe Elements to implement and how you want to style them. It is recommended to look at the several Stripe demos available on their GitHub projects and website.

# Mailgun Integration - 6035742b943d6115c1f3422499fbcbb94d49c656

# Spam Some Emails to Yourself

The goal of this lab is to integrate a 3rd Party API into your code! It's fairly straightforward, and most problems can be solved by following the API's documentation, the walkthroughs, or the reference! Let's start spamming!

## Steps

### Backend

-   Sign up for a Mailgun Account.
-   Get a sandbox domain and api key.
-   Install the necessary module and typings.
-   Establish your connection with Mailgun.
-   Code a sendEmail function.
-   Code a route to send an email using that function.
-   Test the route in POSTMAN to confirm it works.

### Frontend

-   Adjust your route to accept an email, subject, and message from the request body.
-   Create a form in a React component with 3 inputs that match up with the above 3 parameters.
-   Make sure they're controlled inputs that properly set state and are safely typed.
-   Make your form perform an onSubmit event that makes a POST request to your endpoint.
-   Make sure you received an email from your contact form.
