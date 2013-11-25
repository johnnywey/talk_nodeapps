<pre>
   ____   _       _                                          
  / __ \ (_) ___ | |__  _ __  _ __  _   ___      _____ _   _ 
 / / _` || |/ _ \| '_ \| '_ \| '_ \| | | \ \ /\ / / _ \ | | |
| | (_| || | (_) | | | | | | | | | | |_| |\ V  V /  __/ |_| |
 \ \__,_|/ |\___/|_| |_|_| |_|_| |_|\__, | \_/\_/ \___|\__, |
  \____/__/                         |___/              |___/ 

</pre>
# Creating Node Web Applications - Soup to Nuts

## Intro
---
Hi, I'm Johnny Wey.

* [https://twitter.com/johnnywey](Twitter)
* [https://github.com/johnnywey](Github)

## Outline
---
* Benefits of Node web server
* Project organization
* Grunt
* Nodemon
* Persistance (Mongoose)
* Testing (Mocha)
* Test coverage using BlanketJS
* Debugging
* Adding web stuff
  * Connect for middleware
  * Restify for API
* Authentication / Authorization
* Putting it all together
  * UI
  * CI options (Grunt, Mocha xunit, coverage script) 

#### If there's time:
* Deploy it
  * Check in node_modules?
  
### Things I'm Not Covering
---
* Logging ([Bunyan](https://github.com/trentm/node-bunyan))
* Mocks / spies ([Sinon](http://sinonjs.org/))
* HTTP request mock ([Nock](https://github.com/flatiron/nock))
* Config handling
* Better return flow handling (promises; options)

## Benefits of Using Node as a Web Application Server
---
* JSON from end to end; no data conversation
* JavaScript on client and server, so tooling and libraries can be re-used
* HTTP as common protocool
* Easy to build project with lose coupling of client and server
* Simplified, reactive programming model
* Huge library of easily accessible 

## Project Organization
---
So, let's start creating a Node application. We'll create a really simple server with a ```package.json```

```git checkout step-1```

```npm install```

## Grunt
---
If we want to do anything more than a simple server, we'll want to take advantage of things like code style and automatic testing. To do that, we can use Grunt.

Grunt gives us a rich set of plugins we can use to perform all sorts of tasks. Once Grunt is installed, we can create a ```GruntFile.js``` and being to orchestrate some simple steps like linting of our JavaScript.

```git checkout step-2```

```npm install```

```grunt watch```

## Nodemon
---
If you're anything like me, you've gotten used to frameworks like Grails and Rails automatically reloading when changes are made to the application. This is a huge time-saver.

Nodemon will watch the files in your directly and automatically restart the applicaiton when a change is detected. Combined with ```grunt watch```, this behavior allows you to lint, run tests and restart the application whenever a change to a file is saved.

In terms of usage, Nodemon is meant to be a drop-in replacement for ```node``` including starting in debug mode, running a file and passing command line variables among others.

```npm install -g nodemon```

[Demo of Nodemon]

## Mongoose
---
Since we're using JSON from the client into our server, it makes sense that we would choose to use that as both our DTO and storage format as well if we could.

[Mongoose](http://mongoosejs.com/) is a simple ORM tools to map JSON objects to documents in MongoDB.

So, let's install Mongoose and create some domain objects.

```git checkout step-3```

```npm install```

[Demo Mongoose]

## Testing
---
Testing Node has come a really long way. On the server, I've had a lot of luck with [Mocha](http://visionmedia.github.io/mocha) and [should.js](https://github.com/visionmedia/should.js/).

Mocha is a BDD style testing framework and should.js compliments Mocha with BDD assertions.

```git checkout step-4```

```npm install```

[Demo Mocha]

## Test Coverage
---
When I started caring about JavaScript testing metrics, the ecosystem was pretty horrible. Luckily, that's changed and there are some great coverage tools out there including the possibility of integrating with CI.

We'll be adding test coverage metrics using [Blanket.JS](http://blanketjs.org/).

Blanket copies off the JavaScript source files and adds instrumentation to them. It then executes the tests against that instrumentation and reads the result. The concept is actually surprisingly simple, but works pretty well.

```git checkout step-5```

```npm install```

[Demo Blanket]

## Debugging
---
Debugging node is actually pretty straight forward using [Node-inspector](https://github.com/node-inspector/node-inspector).

```npm install -g node-inspector```

```node-inspector &```

```nodemon app/server.js --debug```

[Demo Debug]

We can also debug directly from WebStorm which is extremely useful.

[Demo WebStorm]

## Adding Web Stuff: Connect
---
We've gone over a lot of low-level concepts but still haven't made anything a browser can hit beyond 'Hello World!'

Here's the part where we add some of that stuff.

I mentioned before that Node makes it very easy to create decoupled client and server applications. While there are a slew of great web frameworks available (all the way from Sinatra style routes and simple templating like [Express](http://expressjs.com/) to full stack Rails MVC like [Sails.js](http://sailsjs.org/) and [Compound.js](http://compoundjs.com/) to those that put heavy emphasis on real-time applications like [Meteor](http://www.meteor.com/)), each one is an extension of a basic idea:

Take the Node native HTTP request and response objects and augment them with additional capabilities.

[Demo Node Request Object]

You can see that the Node request object has a bunch of raw properties but the barebones in terms of higher-level functionality. This is really the story of Node: give enough raw power to do the tasks necessary and then let NPM packages add shortcuts and additional capabilities on top of this power.

The process of augmenting the Node base objects is called **Middleware**.

One of the most popular Middleware packages (and also what Express is built on) is [Connect](https://github.com/senchalabs/Connect).

This gives us enough basic web functionality to do interesting things like examine cookies, define routes, implement authentication, parse request bodies, etc. without having to resort to a full-stack framework.

I've found the combination of Connect and Restify creates an extremely powerful way to create API based client applications all the while keeping things as light as possible.

Let's see how our applicaiton changes when we install Connect.

```git checkout step-6```

```npm install```

http://localhost:8000/test.html

[Demo Connect]

## Adding Web Stuff: Restify
---
[Restify](http://mcavage.me/node-restify/) is a lightweight web framework specifically designed for API integration. It contains easy routing, content negotiation, built-in DTrace for performance evaluation.

And, just like Connect, it works by extending the capabilities of Node's request and response objects.

In our application, we are going to designate a Connect route that we will then tie into Restify. To do this, we'll beef up our system to support a UserService.

```git checkout step-7```

```npm install```

[Demo Bootstrap and Mongo connection]

[Demo Restify]

[Demo test with sandboxed-module]

## Adding authorization / authentication
---
Adding auth is something we can piece together by using Connect's session management and our own route handlers.

The idea is to add the session handler before the request makes it down the chain to the service API.

```git checkout step-8```

```npm install```

[Demo Restify changes]

```npm checkout step-9```

```npm install```

[Demo connect changes]

[Demo cookie now exists when hitting resource]

[Demo sessions now exist in Mongo]

## Putting it all together
---
Now that we have the pieces we need in place, let's add a UI that uses our API and shows admin tools for admins and a login dialog.

```git checkout step-10```

```npm install```

[Demo running app with login dialog]

```git checkout step-11```

```npm install```

```cd public```

```bower install```

[Demo full app with admin vs. regular user functionality]

