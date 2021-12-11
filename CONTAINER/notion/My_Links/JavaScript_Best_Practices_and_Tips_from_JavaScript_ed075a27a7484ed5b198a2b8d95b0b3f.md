# JavaScript Best Practices and Tips from JavaScript Experts | Toptal®

Created: November 3, 2021 6:33 AM
URL: https://www.toptal.com/javascript/tips-and-practices

![js-01-19529a859aba21cf118760eee39e923e-bae9c18c7ac876173b542fc7264fb013-a779458e535990d60ea41e29d9264d45.png](JavaScript%20Best%20Practices%20and%20Tips%20from%20JavaScript%20ed075a27a7484ed5b198a2b8d95b0b3f/js-01-19529a859aba21cf118760eee39e923e-bae9c18c7ac876173b542fc7264fb013-a779458e535990d60ea41e29d9264d45.png)

## How to Avoid Global Scope Pollution by Using Immediately Invoked Function Expression?

Declaring global scope variables in JavaScript is a bad practice, and is often referred to as global scope pollution. One of the solutions to avoid global scope pollution is to use Immediately Invoked Function Expression, or IIFE for short. IIFE basic code example looks like this:

```
    (function () {
        // Do fun stuff
    })()

```

A function declared in that way is an anonymous function expression, and is immediately and automatically invoked.

How does IIFE work, and how is an anonymous function immediately invoked? The pair of parentheses surrounding the anonymous function turns it into a function expression, or variable expression. The result is an unnamed function expression with its own scope.

Use of the IIFE is very simple. When you create IIFE, every single variable definition inside that function will only exist in that scope, like a modularization or isolation of the data. IIFE declaration example can look like this:

```
    (function(){
        var my_data = '';
        var init = function(){
		// Do something
        };

	  init()

    })(); //This IIFE will be invoked and executed automatically, without the need to call by yourself

```

This way, there is no need to declare global scope variables at all. Every variable declared inside the anonymous function is easily accessible inside its own scope, and in the same time it is keeping the global naming space clean. This is important because it is avoiding any potential collisions with another library, or even with our own code.

Beside the most popular use for IIFE to have a clean global scope, one other benefit of using IIFE is that it keeps the code inside isolated modules. How? With the IIFE any `var` declared inside isn’t accessible from the outside. The IIFE is just a function, so it can return anything, as every function does, which enables you to create your own modules like this:

```
var mySuperModule = (function(){
    var myVar = ‘Some string’;

    var privateFunction = function (){
	//DO something
    };
    return {
	getMyVar: function(){
		return myVar
      }
    };
})();

```

Now the variable `myVar` only exists inside the `mySuperModule`, which can even have private and public methods.

Many libraries use this technique (like jQuery), and it is recommended to be used at least in the top-level of your applications.

To learn more on the subject, you can read [Ben Alman’s article](http://benalman.com/news/2010/11/immediately-invoked-function-expression/), [Mastering the Module Pattern](http://toddmotto.com/mastering-the-module-pattern/), or [Essential JavaScript Namespacing Patterns](http://addyosmani.com/blog/essential-js-namespacing/).

### Contributors

Matías is an experienced software engineer with more than seven years of work as a freelancer, giving him lots of experience with a number of companies all around the globe and a variety of challenging projects. He has proven experience helping companies to develop new features, improve performance, or fix their apps. As a consultant, he can help companies to grow and scale their apps for future features and changes.

[Show More](https://www.toptal.com/resume/matias-hernandez-arellano)

## How to Compare Two URLs from JSON for Equality

Comparing two strings for equality in any language sounds like an easy task - you just use the equality operator (`==`). In JavaScript, the best practice is to use the strict equality operator (`===`) which behaves identically to the simple equality operator (`==`), except no type conversion is done. When strict equality operator is used object types must be the same to be considered equal. On the other hand, simple equality operator will first attempt to coerce the values and then do the comparison.

This sounds great in theory, but what to do when you face the following problem: you know the input values you are comparing are equal, but JavaScript equality operator is telling you that they are not?

In our example, we are parsing two JSONs from separate sources, and we are trying to see if their link property is identical. When we print JSON link property in the console they appear the same, but still, `a.link == b.link` returns false. Notice we are not using strict equality operator here, so things should be simpler even if the JSON link property object types are not the same, strings in our case. If we go a step further and test values printed in the console and compare them, they will be equal. Keeping your sanity is important here. Probably you are hitting your head against the keyboard by now, but keep up with us. The problem is that they are unequal before printing.

The solution for our problem is quite simple: we must prepare the input JSON data and not just assume we are getting valid strings. Since we are dealing with URLs, we have to encode them first using the `encodeURIComponent()` function, like in the following example:

```
console.log( encodeURIComponent('http://www.example.com/') );
> "http%3A%2F%2Fwww.example.com%2F"

```

The “ugly” but URL friendly is now standardized and properly encoded. To make our URL readable again, we can use `unescape()` function:

```
console.log( unescape(encodeURIComponent('http://www.example.com/')) );
> "http://www.example.com/"

```

This way, if one URL was missing encoding somewhere and other didn’t, they will finish in the end as the same strings:

```
console.log( unescape(encodeURIComponent(a.link)) == unescape(encodeURIComponent(b.link)) );

```

Output in the console now will be `true`.

### Contributors

## How Do I Determine The Length Of A Text Snippet That Would Fit Inside A Given Element?

Imagine you have some text of arbitrary length, and you would like to determine what length of a prefix of this text would fit inside a `div` element of given width and height. It turns out this is one of those deceptively tricky problems that comes up when trying to manipulate the presentation of your web page.

One [possible solution](http://jsfiddle.net/hjr265/yy7udypv/) is to create an identical `div`, with its height or width unset, and try out all possible lengths of prefixes of that given string to see which brought the height of this new `div` close to the original one.

This solution works for most cases, but, mysteriously, fails when any HTML-specific character appears at the end of the text. In fact, this condition may even cause the page to crash! The reason for this behavior, it turns out, is that the innerHTML property of an element does not behave as you would expect any typical property of an object to. [For example](http://jsfiddle.net/hjr265/2tc714zn/), if you were to assign `&` to innerHTML of a `div` element, the browser would eventually convert this to `&amp;`. Therefore, adding an `&` near the end of the large text would result in a situation where the loop will always try to remove the suffix `p;` from `&amp;`, and the browser would immediately turn it into `&amp;am`. This effect then repeats itself, resulting in a never-ending loop!

If you are trying to create an ellipsis effect on some text snippet, more often than not, all you need is a [few lines of CSS](https://css-tricks.com/snippets/css/truncate-string-with-ellipsis/) - given that your text will all appear on a single line. For multi-line texts, however, JavaScript is what we can use, and often makes more sense.

A small change to the partial solution above can solve the issue caused by special characters. Instead of using `boxCl.innerHTML`, you can use `boxCl.textContent`:

```
// ...
boxCl.textContent = text
document.body.appendChild(boxCl)
while(boxCl.clientHeight > box.clientHeight) {
    boxCl.textContent = boxCl.textContent.substring(0, boxCl.textContent.length-1)
}
box.textContent = boxCl.textContent

```

This [tackles the infinite-loop issue](http://jsfiddle.net/hjr265/yy7udypv/1/) fair-and-square. You can also directly [use the original string variable](http://jsfiddle.net/hjr265/yy7udypv/2/) to determine the substring on every iteration. That way, you can add a trailing string such as ‘…’ without any issue. Moreover, if you want, you can possibly take this a step further by replacing the naive loop with a binary search. If you think about it, with a naive loop like this, a text snippet that is a thousand characters long will need almost a thousand tries in worst cases. A [binary search based solution](http://jsfiddle.net/hjr265/yy7udypv/3/) will work the same thing out in about 10 tries.

### Contributors

## Strictly ‘use strict’

Should you find yourself working in an environment that is not conducive to modern JavaScript, this tip regarding the ‘use strict’ directive is for you. Developers writing in ES6 or with transpilers need not read on.

Strictly speaking, “use strict” mode helps in a variety of ways. This directive imposes some law and order in the wild west of JavaScript programming by enforcing such things as declared variables, disallowing preserved keywords and preventing the use of `with` statements. The strict directive can be applied to an entire script or contained within the scope of a function.

Make a habit of using the “use strict” directive since it helps you write better code, code that is both more test-friendly and easier for the next programmer. Strict code also offers assistance when optimizing since it is less error prone; it will help you in the long run since ES6 modules already enforce strict mode. To learn more, I recommend reading [Mozilla’s reference on Strict Mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) for a better understanding of using strict mode in JavaScript.

That said, when implementing `use strict`, it’s important to wrap it inside an anonymous function to avoid setting it globally, which can cause unexpected behaviors.

```
//myGreatApp.js
"use strict"; // could have unforeseen effects

(function (){
    "use strict";
    // do incredible things
})();

```

### Contributors

## What Is the Best Tool for Drawing Graphs and Diagrams?

Say you are a front-end developer and you need to draw nice looking graphs and diagrams, such as binary tree structures. They obviously need to be interactive and filterable. Where would you start? What tools could you use? Recently, Toptal developers had a discussion on this topic. After some long nights and many arguments, a final conclusion was reached: at the moment, the best tool for drawing graphs and diagrams is D3.js.

What is D3.js then? In short, [D3.js](http://d3js.org/) is a data visualization library. D3.js allows developers to easily generate and manipulate DOM elements based on the input data, and offers powerful tools for developing vector data visualizations from scratch. Its idea is to bridge the gap between static display of data and interactive and animated data visualizations, by utilizing JavaScript, CSS, HTML and SVG. The result can be simple HTML output, or interactive SVG charts with dynamic behavior like animations, transitions, and interaction. All the data transformations and renderings are done client-side, in the browser. D3.js is also open sourced, and extensible via [plugins](https://github.com/mbostock/d3/wiki/Plugins).

Just keep in mind D3.js is not an easy tool to master and it has a steep learning curve. Developers need to be familiar with a lot of technologies, namely JavaScript objects, jQuery chaining syntax, SVG and CSS, and of course [D3’s API](https://github.com/mbostock/d3/wiki/API-Reference). On top of that, one needs to have a bit of design skills to create nice looking graphics in the end. Luckily, D3.js has a big community, and there are a lot of [resources and tutorials](https://github.com/mbostock/d3/wiki/Tutorials) for people to dig into.

So next time you find yourself facing a project with graphs and you don’t have the right tools, grab a D3.js library and let your imagination be the only limit in your creations.

### Contributors

## Meteor: The Good, The Bad, The Ugly

For a long time, I’ve been working with Node.js and Express on the server side, and jQuery and other popular JavaScript frameworks for front-end development. Some time ago I started working for a company that is using Meteor for around 80% of all their projects. After I got to learn and work with Meteor for some time, I feel it is a step in the wrong direction. Before you get out your pitchforks and torches, let me explain why.

**Isomorphic and universal apps**

Sharing client-side code with back-end code is probably the holy grail right now. Having the same code running in the browser and on the server is very convenient. We get to share some of the JavaScript files that are often called “business logic”: be it controllers, models, validation or even constants. This saves us time and effort re-implementing the same front-end logic on the back-end.

**Minimongo**

Minimongo is simply amazing. Having a full MongoDB-like interface in the browser which behaves like a full MongoDB database. We get to inspect the whole database in the browser just by opening up the browser’s developer console. In debug mode even, it automatically synchronizes with our back-end database when we change a value. To some degree it feels very similar to [PouchDB](http://pouchdb.com/), a CouchDB-inspired database. When comparing PouchDB directly to Minimongo, I feel Minimongo has the upper hand, mostly because querying for data requires less effort.

### The Bad

**Package Management**

Meteor comes with its own package management system called Atmosphere. The problem is most of the packages that include popular libraries are not being maintained by its original authors on Atmosphere. This leads to you not knowing what the package actually includes and if it’s being updated as regularly as the original module. Some packages may even include more than the official distribution, and some less.

**Module Management**

The notion of modules does not exist in Meteor at all. Meteor loads all the files in their alphabetical order as they are present in the file system. I’ve seen projects where this resulted in interesting prefixes for the file names, such as underscores, double underscores or numerical identifiers, or a combination of those.

You are essentially working with global variables on the server and client side. As a result, you pretty much have to deal with everything you had to deal with before modules (like CommonJS, AMD or ES2015) became popular and the de-facto standard.

As you don’t have control of when your client-side scripts will be loaded, you need to rely on checking for your own scripts and third-party libraries in the global scope. This is my most prominent and major gripe with Meteor. Meteor gives us a default load order for our libraries, but there are some instances where we need to change that, for example when we have multiple libraries depending on each other. With popular module options, we need to define our imports and exports explicitly, but this adds predictability to modules and we know which modules interact with each other. In Meteor, we don’t have that and this may lead to side effects if we are not careful enough.

**Enforcing bad practices**

For a variable to be available on both the server and the client, we omit the `var` keyword when defining that variable. While Meteor bundles the JavaScript files for us, it wraps function around our JavaScript code and inserts the `var` statement for us. This will be safe in the end result, but it still feels as taking advantage of one of JavaScript’s pitfalls.

**Compatibility with Node libraries**

Meteor uses a library called [Fibers](https://www.npmjs.com/package/fibers) for control flow. Pretty much all asynchronous actions in Meteor feel synchronous and are being defined that way. Usually callbacks, promises, generators and async/await are the prominent solution to deal with asynchronicity. Asynchronicity is a core concept in JavaScript, and one I’ve seen many developers struggle with. Since there is a huge gap between how libraries in Node.js and Meteor handle control flow, compatibility is not always given. While Meteor can work with most NPM libraries, it becomes difficult the other way around.

**Atmosphere is closed source**

Atmosphere is not open sourced. While this in itself may not necessarily be an issue, I can’t help but wonder what would happen if the company behind Meteor wouldn’t exist any more. Who will take over Atmosphere, provide maintenance and cover the costs?

### Wrap up

There are some minor gripes I have with Meteor, for example there are some instances where I feel its documentation is not as thorough as I would like it to be, or a few things can be misinterpreted — especially for those just starting out in the JavaScript world.

All in all, I feel Meteor got stuck with its original design decisions, and its development since hasn’t been as radical as it should have been. As much as we crucify the Angular 1.x to 2.x version changes and its more-or-less complete redesign, I feel something like that might actually help Meteor. While Meteor is embracing ES2015 with its newest release, I would like to see more of these concepts brought over to Meteor: Using the ES2015 module system, ES2016’s async/await syntax for control flow, class decorators and a better notion of UI components are some of the ideas I would have in mind.

Would I have a different opinion if Meteor was an Express middleware and I would be able to specify and control certain aspects. For example, specify how and which files get loaded, instead of it being abstracted away into a seemingly “black box”. Definitely.

### Contributors
