# Web4.3 Authentication

[Aux Info ](Web4%203%20Authentication%2032c2841d6bbf4360899f170f1d3263cf/Aux%20Info%200f33ac4e81eb49a79a8ce062cbd920af.csv)

[bgoonz/Authentication-Notes](https://github.com/bgoonz/Authentication-Notes)

[https://replit.com/@bgoonz/Authentication-Notes](https://replit.com/@bgoonz/Authentication-Notes)

# **Authentication**

<aside>
📌 is the process by which our Web API verifies the identity of a client that is trying to access a resource.

</aside>

This is different from **authorization**, which comes after authentication and determines what type of access, if any, that a user should have.

Adding authentication to a Web API requires that an API can:

- register user accounts.
- login to prove identity.
- logout of the system to invalidate the user's access until they login again.
- add a way for users to reset their passwords.

### Some of the things we need to take into account when implementing authentication are:

- Password storage.
- Password strength.
- Brute-force safeguards.

## **Follow Along**

Let's tackle the first one, **password storage**. The rule of thumb is: **NEVER, EVER, under no circumstances, store user passwords in plain text**. Then what are the two main options:

- encryption.
- hashing.

# Password Hashing vs. Encryption for password storage

<aside>
📌 - Encryption goes two ways.

</aside>

<aside>
📌 First, it utilizes plain text and private keys to generate encrypted passwords and then reverses the process to match to an original password.

</aside>

<aside>
📌 - Cryptographic hashes only go one way: parameters + input = hash. It is pure; given the same parameters and input it generates the same hash.

</aside>

<aside>
📌 If the database of users and keys are compromised, it is possible to decrypt the passwords to their original values, and this is bad because users often share passwords across different sites. This is one reason why **cryptographic hashing is the preferred method for storing user passwords**.

</aside>

### **Password Strength**

Password length alone is not enough to slow password guessing, but in general, long passwords are better than short, complicated passwords. It is a trade-off between convenience and security.

Visit [this site (Links to an external site.)](https://www.grc.com/haystack.htm)

[GRC's | Password Haystacks: How Well Hidden is Your Needle?](https://www.grc.com/haystack.htm)

to see how a combination of password length and complexity affects an attacker's ability to pre-generate password hashes.

### **Brute-Force Attack Mitigation**

A common way that attackers circumvent hashing algorithms is by pre-calculating hashes for all possible character combinations up to a particular length using common hashing techniques.

The results of said calculations are stored into a database table known as a **rainbow table**.

Whenever there is a breach, the attacker checks every breached password against their table.

Which Cryptographic Hashing Algorithm should we use? MD5, SHA-1, SHA-2, SHA-3?

None of these, because they are flawed, these algorithms are optimized for speed, not security.

We aim to slow down hackers' ability to get at a user's password. To do so, we are going to add **time** to our security algorithm to produce what is known as a **key derivation function**.

[Hash] + [Time] = [Key Derivation Function].

---

---

# Objective 2 - hash passwords before saving them to the database

## **Overview**

Instead of writing our own *key derivation function* (fancy name for hashing function), we'll use a well known and popular module called [bcryptjs (Links to an external site.)](https://www.npmjs.com/package/bcryptjs). This module is well supported and stable, but there are other options you can explore.

Bcryptjs features include:

- password hashing function.
- implements salting both manually and automatically.
- accumulative hashing rounds.

Having an algorithm that hashes the information multiple times (rounds) means an attacker needs to have the hash, know the algorithm used, and how many rounds were used to generate the hash in the first place.

## **Follow Along**

[https://gist.github.com/bgoonz/d43564ab336dc777f17ced87953d17d5](https://gist.github.com/bgoonz/d43564ab336dc777f17ced87953d17d5)

Follow these steps to use bcrypt in your project.

Install `bcryptjs` using npm.

Import it into your server.

```
const bcrypt = require('bcryptjs');
```

To hash a password:

```jsx
const credentials = req.body;

const hash = bcrypt.hashSync(credentials.password, 14);

credentials.password = hash;

// move on to save the user.
```

To verify a password:

```jsx
const credentials = req.body;

// find the user in the database by it's username then
if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
  return res.status(401).json({ error: "Incorrect credentials" });
}

// the user is valid, continue on
```

![Web4%203%20Authentication%2032c2841d6bbf4360899f170f1d3263cf/bcrypt.jpg](Web4%203%20Authentication%2032c2841d6bbf4360899f170f1d3263cf/bcrypt.jpg)

# Objective 3 - verify passwords using bcrypt

**Understand BCrypt Hashes**

For the following challenges, you will be working with a new starter project that is different from the previous one. You can find the new starter project on [Replit](https://replit.com/github/freeCodeCamp/boilerplate-bcrypt), or clone it from [GitHub](https://github.com/freeCodeCamp/boilerplate-bcrypt/).

[https://replit.com/@bgoonz/boilerplate-bcrypt](https://replit.com/@bgoonz/boilerplate-bcrypt)

**BCrypt hashes are very secure. A hash is basically a fingerprint of the original data- always unique.**

This is accomplished by feeding the original data into an algorithm and returning a **fixed length result.**

To further complicate this process and make it more secure, you can also ***salt* your hash**.

- [ ] _Salting your hash involves adding random data to the original data before the hashing process which makes it even harder to crack the hash._

BCrypt hashes will always looks like `$2a$13$ZyprE5MRw2Q3WpNOGZWGbeG7ADUre1Q8QO.uUUtcbqloU0yvzavOm` which does have a structure.

The first small bit of data `$2a` is defining what kind of hash algorithm was used.

The next portion `$13` defines the *cost*.

Cost is about how much power it takes to compute the hash.

It is on a logarithmic scale of 2^cost and determines how many times the data is put through the hashing algorithm.

For example, at a cost of 10 you are able to hash 10 passwords a second on an average computer, however at a cost of 15 it takes 3 seconds per hash... and to take it further, at a cost of 31 it would takes multiple days to complete a hash.

**A cost of 12 is considered very secure at this time.**

The last portion of your hash `$ZyprE5MRw2Q3WpNOGZWGbeG7ADUre1Q8QO.uUUtcbqloU0yvzavOm`,

looks like one large string of numbers, periods, and letters but it is actually two separate pieces of information.

The first 22 characters is the salt in plain text, and the rest is the hashed password!

## **Overview**

Use `bcrypt.compareSync()`, passing the password guess in plain text and the password hash from the database to validate credentials.

If the password guess is valid, the method returns true. Otherwise, it returns false. The library hashes the password guess first and then compare the hashes.

## **Follow Along**

Let's see an example.

```jsx
server.post("/api/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      // check that passwords match
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        // we will return 401 if the password or username are invalid
        // we don't want to let attackers know when they have a good username
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
```

---

---

---

---

# Objective 4 - use in-memory sessions to persist authentication information across requests

Sessions provide a way to persist data across requests.

We'll use them to save authentication information, so there is no need to re-enter credentials on every new request the client makes to the server.

When using sessions, **each client will have a unique session** stored on the server.

Now that we have a solution for keeping authentication information, we need a way to transmit that information between the client and server.

[https://hackernoon.com/your-node-js-authentication-tutorial-is-wrong-f1a3bf831a46](https://hackernoon.com/your-node-js-authentication-tutorial-is-wrong-f1a3bf831a46)

## 🍪For that, we'll use [\*\*\*cookies](https://www.notion.so/f530c7d2b706f882536c426773dfa86a). 🍪\*\*\*

[ASDC12-Access_Control_Designs_and_Pitfalls.pdf](Web4%203%20Authentication%2032c2841d6bbf4360899f170f1d3263cf/ASDC12-Access_Control_Designs_and_Pitfalls.pdf)

## **Authentication Workflow for sessions**

The basic workflow when using a combination of *cookies* and *sessions* for authentication is:

- Client sends credentials.
- Server verify credentials.
- Server creates a session for the client.
- Server produces and sends back cookie.
- Client stores the cookie.
- Client sends cookie on every request.
- Server verifies that cookie is valid.
- Server provides access to resource.

To understand how cookies are transmitted and stored in the browser, we need to look at the basic structure of an HTTP message. Every HTTP message, be it a request or a response, has two main parts: the *headers* and the *body*.

The *headers* are a set of key/value stores that include information about the request. There are several standard headers, but we can add our own if needed.

To send *cookies*, the server adds the `Set-Cookie` header to the response like so: `"Set-Cookie": "session=12345"`. Notice how the value of a header is just a string. The browser will read the header and save a cookie called `session` with the value `12345` in this example. We will use a library that takes care of creating and sending the cookie.

The *body* contains the data portion of the message.

The browser will add the `"Cookie": "session=12345"` header on every subsequent request and the server.

Cookies are not accessible from JavaScript or anywhere because they are cryptographically signed and very secure.

There are sever libraries for handling sessions in Node.js, below are two examples:

- [client-sessions (Links to an external site.)](https://www.npmjs.com/package/client-sessions)
- [express-session (Links to an external site.)](https://www.npmjs.com/package/express-session)

We will use the latter.

### **Common ways to store session data on the server:**

- Memory.
- Memory cache (like Redis and Memcached).
- Database.

### **Cookies**

- Automatically included on every request.
- Unique to each domain + device pair.
- Cannot be sent to a different domain.
- Sent in the cookie header.
- Has a body that can have extra identifying information.
- Max size around 4KB.

### **Storing session data in memory**

- Data stored in memory is wiped when the server restarts.
- Causes memory leaks as more and more memory is used as the application continues to store data in session for different clients.
- Good for development due to its simplicity.

### **Using cookies to transfer session data.**

Advantages when using cookies:

- a cookie is a small key/value pair data structure that is passed back and forth between client and server and stored in the browser.
- the server uses it to store information about a particular client/user.
- workflow for using cookies as session storage:
  - the server issues a cookie with an expiration time and sends it with the response.
  - browsers automatically store the cookie and send it on every request to the same domain.
  - the server can read the information contained in the cookie (like the username).
  - the server can make changes to the cookie before sending it back on the response.
  - rinse and repeat.

**Express-session uses cookies for session management**.

Drawbacks when using cookies:

- small size, around 4KB.
- sent in every request, increasing the size of the request if too much information is stored in them.
- if an attacker gets a hold of the private key used to encrypt the cookie, they could read the cookie data.

### **Storing session data in Memory Cache (preferred way of storing sessions in production applications)**

- stored as key-value pair data in a separate server.
- the server still uses a cookie, but it only contains the session id.
- the memory cache server uses that session id to find the session data.

Advantages:

- Quick lookups.
- Decoupled from the API server.
- A single memory cache server can serve many applications.
- Automatically remove old session data.

Drawbacks:

- another server to set up and manage.
- extra complexity for small applications.
- hard to reset the cache without losing all session data.

### **Storing session data in a database**

- Similar to storing data in a memory store.
- The session cookie still holds the session id.
- The server uses the session id to find the session data in the database.
- Retrieving data from a database is slower than reading from a memory cache.
- Causes chatter between the server and the database.
- **Need to manage/remove old sessions manually** or the database will be filled with unused session data. Most libraries now manage this for you.

Here is a list of [express-session compatible stores. (Links to an external site.)](https://github.com/expressjs/session#compatible-session-stores)

## **Follow Along**

Let's add session support to our Web API:

```jsx
const session = require("express-session");

// configure express-session middleware
server.use(
  session({
    name: "notsession", // default is connect.sid
    secret: "nobody tosses a dwarf!",
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true, // only set cookies over https. Server will not send back a cookie over http.
    }, // 1 day in milliseconds
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: false,
  })
);
```

The `resave` option forces the session to be saved back to the session store, even if the session wasn't modified during the request.

The `saveUninitialized` flag, forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing `false` is useful for implementing login sessions, reducing server storage usage, or **complying with laws that require permission before setting a cookie**.

Now we can store session data in one route handler and read it in another.

```
app.get('/', (req, res) => {
  req.session.name = 'Frodo';
  res.send('got it');
});

app.get('/greet', (req, res) => {
  const name = req.session.name;
  res.send(`hello ${req.session.name}`);
});
```

The server sends back a session id with every response, and the client then sends back that session id on every request.

`[express-session` (Links to an external site.)](https://www.npmjs.com/package/express-session) uses in-memory storage by default.

Note how we generalize the session cookie's name, to make it harder for attackers to know which library we're using to manage our sessions. This is akin to using a helmet to hide the `X-Powered-By=Express` header.

# Objective 5 - implement logout using a sessions based API

---

---

---

---

## **Overview**

Sessions remain active until they reach the expiration time configured when they were created, but when a user logs out, we need to invalidate the session immediately.

We can do this by removing the session from our session store. Each library does it differently.

## **Follow Along**

Add the following code for the logout endpoint:

```jsx
server.get("/api/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.send("error logging out");
      } else {
        res.send("good bye");
      }
    });
  }
});
```

---

---

---

---

# Objective 6 - restrict access to resources, allowing access only for authenticated users

## **Overview**

Restricting access to endpoints is a two-step process:

- We write middleware to check that there is a *session* for the client.
- We place that middleware in front of the endpoints we want to restrict.

## **Follow Along**

We'll start by writing a piece of middleware we can use locally to restrict access to protected routes.

```jsx
function protected(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "you shall not pass!!" });
  }
}
```

This middleware verifies that we have a session and that the `userId` is set. We could use `username` or any other value to verify access to a resource.

Then, we add that middleware to the endpoints we'd like to protect.

```jsx
server.get("/api/users", protected, (req, res) => {
  db("users")
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
```

The `/api/users` endpoint is only accessible when the client is logged in.

---

---

---

---

# JSON web token

[jwt-handbook-v0_14_1.pdf](Web4%203%20Authentication%2032c2841d6bbf4360899f170f1d3263cf/jwt-handbook-v0_14_1.pdf)

[https://jwt.io/](https://jwt.io/)

[https://gist.github.com/bgoonz/5340903fd3d6f25452b636a7d8b400a1](https://gist.github.com/bgoonz/5340903fd3d6f25452b636a7d8b400a1)

## **Overview**

JSON Web Tokens (JWT) are a way to transmit information between parties in the form of a JSON object. The JSON information is most commonly used for authentication and information exchange. In the former example, with authentication every JWT contains information. In the latter, JWTs contain the classic JSON data you've seen before.

Ultimately, a JWT is a string that has three parts separated by a period (`.`). Those are:

- The header.
- The payload.
- The signature.

### **Header**

The header contains the algorithm with the token type. Typically the header for a JWT looks like this.

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

the `alg` key specifies which algorithm was used to create the token, in this case, the algorithm is HMACSHA-256, and the `typ` property classifies this token as being of the type JWT.

### **Payload**

The payload includes *claims* (fancy name for things like permissions for the user) information or any other data we'd like to store in the token, which is most likely a user id. There are specific claims defined in the JWT standard, and you can also add custom properties to this object.

An example:

```elm
{
  "sub": "1234567890", // standard - subject, normally the user id
  "name": "John Doe", // custom property
  "iat": 1516239022 // standard - The Date the token was issued, expressed in seconds since epoch.
}
```

### **Signature**

To create a signature, we must create a string by base64 encoding the header and payload together, and then signing it with a secret.

Combining all three parts, you will get a JWT that looks like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## **Follow Along**

Visit [this site (Links to an external site.)](https://jwt.io/) and click on the `Debugger` navigation link at the top to see an excellent representation of a JWT.

On the left-hand side, there is a sample JWT, and on the right, we can see the different parts highlighted in a different color to match the parts of the JWT string that represent those.

---

---

---

---

# Objective 2 - produce and send a JSON Web Token (JWT)

## **Overview**

In this section, we'll use JSON Web Tokens to handle authentication.

To produce and verify the token, we'll use the `jsonwebtoken` npm module.

## **Follow Along**

Let's produce and send a token on a successful login.

- add `jsonwebtoken` to the project and require it into `auth-router.js`.
- change the `/login` endpoint inside the `auth-router.js` to produce and send the token.

```jsx
// ./auth/auth-router.js

const jwt = require("jsonwebtoken"); // installed this library

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // new line

        // the server needs to return the token to the client
        // this doesn't happen automatically like it happens with cookies
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token, // attach the token as part of the response
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    // ...otherData
  };

  const options = {
    expiresIn: "1d", // show other available options in the library's documentation
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}
```

- add the `./config/secrets.js` file to hold the `jwtSecret`

```jsx
// the secrets will be safely stored in an environment variable, these are placeholders for development.
module.exports = {
  jwtSecret: process.env.JWT_SECRET || "add a third table for many to many",
};
```

require *secrets.js* into *auth-router.js*: `const secrets = require('../config/secrets.js');`

- Login with the student/hired user and show the token.
- Review the steps taken one more time.

We have a server that can produce and send JWTs on a successful login.

# Objective 1 - configure tools for adding automated tests to a JS project

• [Home](https://lambdaschool.instructure.com/courses/1340)
• [Grades](https://lambdaschool.instructure.com/courses/1340/grades)
• [Modules](https://lambdaschool.instructure.com/courses/1340/modules)

Immersive Reader

# Objective 1 - configure tools for adding automated tests to a JS project

## **Overview**

### **Why Do We Test?**

Testing is an important skill for a web developer to have. Its hard to anticipate *every* way that a user might interact with your site, not to mention it is incredibly time-consuming to manually test all of those options. That's where automated testing comes in. Any major company will use automated testing on its websites as a safety net, to prevent regressions, and to get a better overall understanding of how an application works. As such, testing is a great thing to have on your resume!

We'll quickly review what testing is before jumping into tooling we can use for automated testing. Generally speaking, testing is code that checks if the application code is correct.

If we don't have tests, it's safe to assume the following:

- application code has to be tested manually
- there is no way to know if a change broke another piece of code
- you cannot be sure if the code is correct
- manually testing takes a lot of unnecessary time
- adding new features becomes slow

### **Advantages of Testing**

- verifies edge cases
- developer can concentrate on current changes (safety net)

### **Drawbacks of Testing**

- more code to write and maintain
- more tooling
- additional dependencies
- may provide a false sense of security
- trivial test failures may break the build
- regressions (when a new feature breaks existing code)

### **What tools do we use for testing?**

Hopefully by now you're convinced that testing is important and want to start using it in your projects. In this course you've already used react testing library to write tests for React components, but there are other tools available. Examples of those tools are: Jest, Mocha/chai, jasmine, qunit, enzyme, supertest, istambul, karma, and cypress.

With so many testing tools available, how do you even begin to set up custom testing for a project? It helps to know why you want to test, so that you can pick the tool most suited to your needs.

### **Jest**

We'll use the testing library Jest to start setting up our own tests. Jest runs under the hood in react testing library, so a lot of what we do moving forward should look somewhat familiar. With create-react-app and react testing library there was no need to install and set up Jest, but as you grow as a web developer you will likely run into a need to install and use Jest on its own.

Jest is a test runner and command line interface npm package. It was originally made by Facebook and is included out-of-the-box with create-react-app. Jest is a very general purpose testing tool, and it works best with React applications, though it works with other frameworks as well. In addition to the types of tests we've seen, Jest can run asynchronous tests, snapshot testing, and produce coverage reports.

### **Watch Mode**

You'll learn how to install and configure Jest in the tutorial below, but first, lets talk briefly about `watch mode`. Instead of running tests manually, Jest has a built-in feature called watch mode that will run tests automatically as files change. Jest detects these changes automatically and only runs the tests pertaining to the changes. This is one of the reasons developers love Jest so much, and hopefully one that you'll find equally compelling.

## **Follow Along**

1. **Install `jest` with npm.** We first need to install Jest as a developent dependency. As soon as we do, Jest dependencies will show up in our `package.json` file.

```
npm install -D jest
```

1. **Add test script**. In `package.json` we'll need to indicate that we're using jest for testing. This can be done by simply adding `"test": "jest --watch",` to your "scripts" object.
2. **Run Tests**. We can start Jest by typing `npm test` in a terminal window at the root of the project. However, since there are no tests written, it will return an error "No tests found" because we haven't actually written any tests yet, so let's move on.
3. **Create test files.** By convention, Jest will find your tests in two ways: 1) by placing `.js` files inside a folder called `__tests__` or 2) by ending the name of a file in `.test.js` or `.spec.js`. Technically, you could give the `__tests__` folder a different name, but then you'd need to manually change where Jest looks for test files.

Here we aren't going to write tests, but at this point you are all set up to do so.

# Objective 2 - use Jest to write unit tests

### **Unit Tests**

You'll recall from unit 3 that unit tests are where we isolate smaller units of software (often functions or methods). There are usually many unit tests in a codebase, and because these tests are meant to be run often, they need to run fast. Unit tests are fast, they're simple to write and execute, and they're the preferred tool for test driven development (TDD) and behavior driven development (BDD). They are regularly used by developers to test correctness in `units` of code (usually functions).

### **What makes a good test?**

A good unit test is independent, focused, and, as you might assume, tests only one unit of code. This type of test focuses on one behavior or functionality (even if you have to make multiple assertions), therefore testing only what needs to be tested, and no more.

Another important consideration with testing is that you should try to avoid unnecessary preconditions. If your test relies on outside dependencies or other tests running first, you should factor to isolate the test (much like a pure function).

### **Jest Globals**

- the `it` global is a method you pass a function to; that function is executed as a block of tests by the test runner.
- the `describe` is optional for grouping a number of related `it` statements; this is also known as a `test suite`.

### **Hello World Test**

Let's consider a constant function. We'll use the ever-so-simple `hello` function for testing purposes.

```
export const hello = () => "hello world!";
```

Next we'd move into our tests folder and set up a test asserting that we `expect` the return value of this function to be hello world.

```
import { hello } from "./App";
//arrange
describe("hello", () => {
  //act
  it("should return hello world!", () => {
    //assert
    expect(hello()).toBe("hello world!");
  });
});
```

The test should run automatically in the terminal, thanks to our `watcher`, and you'd see that the test passed. Hopefully this looks familiar to you from our work with react testing library.

Before we dive into writing our own tests with Jest, let's look at a few more details.

### **Important Globals in Jest**

A few objects exist in the global scope like `describe` and `it`. You are already familiar with their use cases. When writing custom tests you may find that some tests need to be run more than once, like a test to render without crashing, for example. Jest has built in globals for this use case:

[Untitled](Web4%203%20Authentication%2032c2841d6bbf4360899f170f1d3263cf/Untitled%20Database%20800743d4712e4e6387aed035c8b777da.csv)

If there's ever a scenario in which you want to skip or isolate a test, use the following globals:

[Untitled](Web4%203%20Authentication%2032c2841d6bbf4360899f170f1d3263cf/Untitled%20Database%207ceeab05eb944b6daa79a2695a375786.csv)

The remaining globals can be found in the Jest [documentation (Links to an external site.)](https://jestjs.io/docs/en/api)

## **Follow Along**

We're going to write our very own unit test for a JavaScript function called `averageTestScore`. This function takes an array of scores (numbers) and returns the average score.

Copy the following function to a file called `mathHelpers.js`.

```
const averageTestScore = testScores => {
  let totalSumScores = 0;
  let numberOfScore = 0;

  for (let i = 0; i < testScores.length; i++) {
    totalSumScores += testScores[i];
    numberOfScore++;
  }

  return totalSumScores / numberOfScore;
};

module.exports = averageTestScore;
```

In a `mathHelpers.test.js` file, we'll start creating the tests we want to run on our function. Remember, the `it` statements describe what the tests will do. While we're brainstorming we can use `it.todo()` to capture ideas for future tests and fill up the test details one test at a time later. This will indicate to indicate to our test runner that we don't want to run that test yet, but to keep note of it instead.

```
describe("mathHelpers", () => {
  describe("averageTestScore", () => {
    it.todo("should calculate the average for an array of numbers");

    it.todo("should throw an error if the argument is not an array");
  });
});
```

After we've created the `it.todo()` statements its time to write the actual tests! We'll start by changing the `it.todo()`s into `it()` globals. First, we'll set up dummy data and, as usual, state the expected outcome in the form of a callback. For example, when we have a score array of `[2,4,6,6,2]`, we expect the average `toBe(4)`.

```
const { averageTestScore } = require("./mathHelpers.js");

describe("mathHelpers", () => {

  describe("averageTestScore", () => {

    it("should calculate the average for an array of numbers", () => {
      const scores = [2, 4, 6, 6, 2];

      const average = averageTestScore(scores);

      expect(average).toBe(4);
    })

    it.todo("should throw an error if the argument is not an array", () => {
      expect(() => { averageTestScore(5) }).toThrow();
      expect(() => { averageTestScore("five and two") }).toThrow();
      expect(() => { averageTestScore({ number: 5 }) }).toThrow();
      expect(() => { averageTestScore(undefined).toThrow();
      expect(() => { averageTestScore(null).toThrow();
      expect(() => { averageTestScore(NaN).toThrow();
    })

  });

});
```

# Objective 3 - use Test Driven Development

## **Overview**

Test driven development is the process of writing tests before code. In theory, when you start with the end (the tests) in mind, you can write much higher quality code. You might be familiar with similar philosophies in teaching (backwards planning) -- or from the famous book "7 Habits of Highly Effective People" (starting with the end in mind).

Let's consider some unit of code. We want this function to take 2 numbers and return the first number to the power of the second number.

Some assertions we might want to check are:

- The function returns a number
- The function returns a to the power of b
- The function does not return b to the power of a
- The function returns undefined if one parameter is not a number

There's really an endless amount of assertions we could check, but for test driven development it helps to think of the most-likely scenarios where the unit could fail.

In this example we'd write all of these tests in Jest. After that we could start hacking away at the function. So as long as all the tests pass, you can be confident in what you've created.

## **Follow Along**

In this tutorial, let's consider an example where we want to write a function to accept a list of salaries and remove all of the salaries that are less than `$50,000`.

1. Spend 3-5 minutes brainstorming test ideas. What are all the possible ways you could design this function wrong? What are all the ways you could design it right? Jot those ideas down.

Your list may contain some of the following ideas, more or less is fine:

- The function should return an array shorter than the original array
- The array should contain numbers
- The function should remove all salaries less than 50,000
- The function should allow for type coercion ("1" = 1)
- The function should not remove 50,000
- The function should not remove any salary above 50,000

1. From the list generated above, we'll want to start by writing a single assertion. That might look something like this:

```
describe("removeSalaries", () => {
  it("should return an array of shorter length", () => {
    // assertions and matchers here
  });
```

1. Next we want to write the test. This is good practice for test writing from logic you are already familiar with. The final result will look something like this:

```
describe('removeSalaries', () => {
    it('should return an array of shorter length', () => {
        const salaries = [50000, 45000, 60000];
        expect(removeSalaries(salaries).toHaveLength(1);
    });
```

1. Once we've written a test we can start writing code to make the test pass. Based on the test we've generated so far we have a rudimentary idea of what our function needs to contain. We'll want to return an array of shorter length than our original array, and that return should filter based on salaries. One version of such a function is below, but there are plenty of options to make our test pass.

```
// name function based on test
const removeSalaries = salaries => {
  //create an empty array
  const higherSalaries = [];
  //use conditional logic to add salaries to the new array
  for (x in salaries) {
    if (salaries[x] < 50000) {
      higherSalaries.append(salaries[x]);
    }
  }
  // return new array
  return higherSalaries;
};
```

5Design a series of tests for a function that accepts an array of objects with the format `{name: "string", age: number}` and returns the names of all people who are over the age of `18`.. Once our first test is passing, the process repeats over and over again! As we write tests and refactor code, we develop something thorough and complete. If you need any extra JavaScript practice, feel free to work on it here.

A final test file might look like this:

```
describe('removeSalaries', () => {
    it('should return an array of shorter length', () => {
        const salaries = [50000, 45000, 60000];
        expect(removeSalaries(salaries).toHaveLength(1);
    });
    it('should return numbers', () => {
        expect(removeSalaries(salaries).toContainType)
    });
    it('should remove all salaries less than 50,000', () => {
        const salaries = [50000, 45000, 60000];
        const expected = [60000];
        expect(removeSalaries(salaries).arrayContaining(expected);
    });
    it('should allow for type coercion', () => {
        const salaries = ["50000", "45000", "60000"];
        const expected = [60000];
        expect(removeSalaries(salaries).arrayContaining(expected);
    });
    it('should not remove 50,000', () => {
        const salaries = [50000, 60000]
        expect(removeSalaries(salaries).toContain([50000]))
    });
})
```

[Aux Info ](Web4%203%20Authentication%2032c2841d6bbf4360899f170f1d3263cf/Aux%20Info%207829a82012d44be084950af3e487a6ad.csv)
