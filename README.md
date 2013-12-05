# NOTE - This is the Markdown generated from a slide deck. To check out the deck, visit: http://presentboldly.com/johnnywey/javascript-mv-shootout

# Otherwise, you can see the Markdown'd version of it below ...

<!--

_id: 52962ad0e37c01e82f000019
master: title
createdAt: 2013-11-27T17:24:32.000Z
updatedAt: 2013-12-05T20:31:47.320Z


-->

# JavaScript MV* Shootout!

## @johnnywey
-----

<!--

_id: 52a0e24f006c72cc5d00001c
master: focus
createdAt: 2013-12-05T20:30:07.000Z
updatedAt: 2013-12-05T20:31:47.320Z


-->

# JavaScript MV* Shootout!

## @johnnywey

Twitter: [twitter.com/johnnywey](http://www.twitter.com/johnnywey)

Github: [github.com/johnnywey](https://github.com/johnnywey)

Email: [johnnywey@gmail.com](mailto:johnnywey@gmail.com)


-----

<!--

_id: 52962ad0e37c01e82f00001a
master: content
createdAt: 2013-11-27T17:24:32.000Z
updatedAt: 2013-12-05T20:31:47.320Z


-->

# Before we get started ...

## Some provisos

* Used Backbone and Angular extensively in production ... but not Ember
* Backbone is evaluated "stand-alone" without augmentation of frameworks like [Chaplin](http://chaplinjs.org/) or [Marionette](http://marionettejs.com/)
  * But you should seriously check these out if you want to use Backbone!
* Evaluation of various aspects is **extremely** biased to my personal preferences
  * You may or may not agree; either way, would love to hear what you think!

-----

<!--

_id: 529650487aedcdec2f000015
master: content
createdAt: 2013-11-27T20:04:24.000Z
updatedAt: 2013-12-05T20:31:47.320Z


-->

# Before we get started ...

## Why the star?

* "C" in MVC doesn't exist in many of the new frameworks
  * Backbone has no ```Controller``` object to extend; it's more like an **MVP** framework where the view does more than displaying data
  * Angular has controllers and services ... MVCS?
  * Ember has controllers in a more um ... classical(?) sense

-----

<!--

_id: 529651ca7aedcdec2f000016
master: content
createdAt: 2013-11-27T20:10:50.000Z
updatedAt: 2013-12-05T20:31:47.320Z


-->

# Before we get started ...

## Why Not include [insert other framework]?

* Backbone as sort of a "control"
  * Oldest of the three, wildly successful and well-understood
* Angular and Ember because they seemed to have the most steam
* There are **many** others
  * [KnockoutJS](http://knockoutjs.com/)
  * [CanJS](http://canjs.com/)
  * [React](http://facebook.github.io/react/)
  * ... (list goes on and on: [ToDoMVC](http://todomvc.com/))

-----

<!--

_id: 52964adf040bdbe02f000013
master: content
createdAt: 2013-11-27T19:41:19.000Z
updatedAt: 2013-12-05T20:31:47.320Z


-->

# Evaluation

## A complex scoring system

<table width="100%"><tr><td>**Symbol**</td><td>**Points**</td></tr><tr><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/sad_face.png" height="64" width="64"/></td><td>1</td></tr><tr><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/meh_face.png" height="64" width="64"/></td><td>2</td></tr><tr style="border: none">
<td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td><td>3</td></tr></table>

-----

<!--

_id: 5298bfeae37c01e82f000022
master: content
createdAt: 2013-11-29T16:25:14.000Z
updatedAt: 2013-12-05T20:31:47.320Z


-->

# Brief History

## Backbone

* Created by Jeremy Ashkenas; announced 09/2010
  * [announcement](https://news.ycombinator.com/item?id=1787429)
* Models, views and collections (MVC?)
* Wildly popular
  

-----

<!--

_id: 5298c28f040bdbe02f000025
master: content
createdAt: 2013-11-29T16:36:31.000Z
updatedAt: 2013-12-05T20:31:47.320Z


-->

# Brief History

## Ember

* Created by Yehuda Katz
* Roots in [Sproutcore](http://sproutcore.com/)
  * Sproutcore powered Apple's MobileMe initiative
* 1.0 release 08/2013
  * [Announcement](http://emberjs.com/blog/2013/08/31/ember-1-0-released.html)



-----

<!--

_id: 5298c39d040bdbe02f000026
master: content
createdAt: 2013-11-29T16:41:01.000Z
updatedAt: 2013-12-05T20:31:47.321Z


-->

# Brief History

## Angular

* Created by Miško Hevery, Igor Minár and Vojta Jína
* 1.0 release in 06/2012
  * [Announcement](http://googledevelopers.blogspot.com/2012/06/better-web-templating-with-angularjs-10.html)
* Backed by Google
* Foundation is an advanced HTML compiler


-----

<!--

_id: 5298c5587aedcdec2f000024
master: content
createdAt: 2013-11-29T16:48:24.000Z
updatedAt: 2013-12-05T20:31:47.321Z


-->

# 1 - Naive Homepage Cold Start

## How fast can I get up and running from homepage link?

### Backbone
<img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/backbone_starter.png" width=500/>

-----

<!--

_id: 5298c679e37c01e82f000024
master: content
createdAt: 2013-11-29T16:53:13.000Z
updatedAt: 2013-12-05T20:31:47.321Z


-->

# 1 - Naive Homepage Cold Start

## How fast can I get up and running from homepage link?

### Ember
<img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/ember_starter.png" width=500/>

-----

<!--

_id: 5298c7b3fcffd6e32f000020
master: content
createdAt: 2013-11-29T16:58:27.000Z
updatedAt: 2013-12-05T20:31:47.321Z


-->

# 1 - Naive Homepage Cold Start

## How fast can I get up and running from homepage link?

### Angular
<img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/angular_starter.png" width=400/>

-----

<!--

_id: 5298c7ed040bdbe02f000027
master: content
createdAt: 2013-11-29T16:59:25.000Z
updatedAt: 2013-12-05T20:31:47.321Z


-->

# 1 - Naive Homepage Cold Start

## How fast can I get up and running from homepage link?

<table width="100%"><tr><td>**Backbone**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/sad_face.png" height="64" width="64"/></td></tr><tr><td>**Ember**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr><tr><td>**Angular**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/meh_face.png" height="64" width="64"/></td></tr></table>

-----

<!--

_id: 5298ccf9e37c01e82f000025
master: content
createdAt: 2013-11-29T17:20:57.000Z
updatedAt: 2013-12-05T20:31:47.321Z


-->

# 1 - Naive Homepage Cold Start

## Worth knowing ...

* All three have **fantastic** [Yeoman](http://yeoman.io/) generators
  * See https://github.com/yeoman for the supported list
---
<img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/yeoman.png" width=400/>



-----

<!--

_id: 5298c9267aedcdec2f000025
master: content
createdAt: 2013-11-29T17:04:38.000Z
updatedAt: 2013-12-05T20:31:47.321Z


-->

# 2 - Dependencies

## How big is the library and what else I need?

### Backbone
* Requires [Underscore](http://underscorejs.org/) and [JQuery](http://jquery.com/) = ~42kb total (gzip / minified)
  
### Ember
* Requires [Handlebars](http://handlebarsjs.com/) and [JQuery](http://jquery.com/) = ~67kb total (gzip / minified)

### Angular
* No external dependencies = ~35kb total (gzip / minified)


-----

<!--

_id: 5298ce907aedcdec2f000027
master: content
createdAt: 2013-11-29T17:27:44.000Z
updatedAt: 2013-12-05T20:31:47.321Z


-->

# 2 - Dependencies

## How big is the library and what else I need?

<table width="100%"><tr><td>**Backbone**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/meh_face.png" height="64" width="64"/></td></tr><tr><td>**Ember**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/meh_face.png" height="64" width="64"/></td></tr><tr><td>**Angular**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr></table>


-----

<!--

_id: 5298cf117aedcdec2f000028
master: content
createdAt: 2013-11-29T17:29:53.000Z
updatedAt: 2013-12-05T20:31:47.321Z


-->

# 3 - Data Binding

## How does this work?

### Backbone
* Data-binding is not supported out of the box but there are plugins available
* Backbone provides APIs for models and collections that can fire events when changes occur
* Models use getters and setters and often require ```toJSON()``` when sending to view for template render


-----

<!--

_id: 5298cfa9e37c01e82f000026
master: content
createdAt: 2013-11-29T17:32:25.000Z
updatedAt: 2013-12-05T20:31:47.321Z


-->

# 3 - Data Binding

## How does this work?

### Ember
* Data-binding is fully supported
* Models use getters and setters but the binding is automatically wired so less of an issue than with Backbone

-----

<!--

_id: 5298d0b4040bdbe02f000028
master: content
createdAt: 2013-11-29T17:36:52.000Z
updatedAt: 2013-12-05T20:31:47.321Z


-->

# 3 - Data Binding

## How does this work?

### Angular
* Data-binding is fully supported
* Models use standard JSON properties (e.g. ```car.color = "red";```)
  * Can be an issue when integrating to libraries that don't do things the "Angular" way

-----

<!--

_id: 5298d1b3fcffd6e32f000023
master: content
createdAt: 2013-11-29T17:41:07.000Z
updatedAt: 2013-12-05T20:31:47.321Z


-->

# 3 - Data Binding

## How does this work?

<table width="100%"><tr><td>**Backbone**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/sad_face.png" height="64" width="64"/></td></tr><tr><td>**Ember**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/meh_face.png" height="64" width="64"/></td></tr><tr><td>**Angular**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr></table>


-----

<!--

_id: 5298d23b7aedcdec2f000029
master: content
createdAt: 2013-11-29T17:43:23.000Z
updatedAt: 2013-12-05T20:31:47.321Z


-->

# 4 - Routers

## How good are the routers?

### Backbone
```javascript
var TestApp = Backbone.Router.extend({
  routes: {
    "person": "person",
    "person/:id": "person",
	"person/:id/p:page": "person"
  },

  person: function(query, page) {
		// Do some stuff
  }
});```


--> ```/person/12/p:101```

-----

<!--

_id: 5298d4177aedcdec2f00002a
master: content
createdAt: 2013-11-29T17:51:19.000Z
updatedAt: 2013-12-05T20:31:47.321Z


-->

# 4 - Routers

## How good are the routers?

### Ember
* Router is extremely capable but very complex
* Supported embedded routes
```javascript
App.Router.map(function() {
	this.resource('person', { path: '/:person_id' }, function() {
		this.resource('p', { path: '/:p_id' });
	});
});```

--> ```/person/12/p:101```

-----

<!--

_id: 5298d4f8040bdbe02f000029
master: content
createdAt: 2013-11-29T17:55:04.000Z
updatedAt: 2013-12-05T20:31:47.321Z


-->

# 4 - Routers

## How good are the routers?

### Angular
* Router is similar to Backbone's
```javascript
angular.module('APP').config(function($routeProvider) {
        $routeProvider
			.when('/person', {
				templateUrl: 'views/person-list.html',
				controller: 'PersonCtrl'
			})
            .when('/person/:id', { 
				templateUrl: 'views/person-detail.html',
				controller: 'PersonDetailCtrl'
			});
});
```
* Router data (e.g. 'id') can be found in ```$routeParams``` inside controller

-----

<!--

_id: 5298d64f7aedcdec2f00002b
master: content
createdAt: 2013-11-29T18:00:47.000Z
updatedAt: 2013-12-05T20:31:47.322Z


-->

# 4 - Routers

## How good are the routers?

<table width="100%"><tr><td>**Backbone**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr><tr><td>**Ember**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr><tr><td>**Angular**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr></table>


-----

<!--

_id: 5298d7167aedcdec2f00002c
master: content
createdAt: 2013-11-29T18:04:06.000Z
updatedAt: 2013-12-05T20:31:47.322Z


-->

# 5 - Views

## How to get stuff on the screen?

### Backbone
* Extend ```Backbone.View```, grab an element and put stuff in it
* Straight-forward approach; easy for JQuery and DOM skills to transfer over
  * If you know ```$('.person').append('<div></div>');```, you're good to go!
* Templating isn't officially built-in, but easy to add with Underscore (required anyway) or Handlebars

-----

<!--

_id: 5298d80f040bdbe02f00002a
master: content
createdAt: 2013-11-29T18:08:15.000Z
updatedAt: 2013-12-05T20:31:47.322Z


-->

# 5 - Views

## How to get stuff on the screen?

### Ember
* Handlebars for templating (main type of "view")
* Extensive view type support (e.g. ```CollectionView``` ```ContainerView```) for more advanced features
* Very easy to create re-usable components (```Ember.Component.extend```)


-----

<!--

_id: 5298d907fcffd6e32f000025
master: content
createdAt: 2013-11-29T18:12:23.000Z
updatedAt: 2013-12-05T20:31:47.322Z


-->

# 5 - Views

## How to get stuff on the screen?

### Angular
* Uses HTML as templating language
* Automatically pulls in HTML templates via AJAX when needed
* DOM interactions outside templates (e.g. add ```active``` class to element) use ```Directives``` which are totally confusing and not familiar at all with DOM manipulation


-----

<!--

_id: 5298d9777aedcdec2f00002e
master: content
createdAt: 2013-11-29T18:14:15.000Z
updatedAt: 2013-12-05T20:31:47.322Z


-->

# 5 - Views

## How to get stuff on the screen?

<table width="100%"><tr><td>**Backbone**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr><tr><td>**Ember**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr><tr><td>**Angular**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/meh_face.png" height="64" width="64"/></td></tr></table>


-----

<!--

_id: 5298d695fcffd6e32f000024
master: content
createdAt: 2013-11-29T18:01:57.000Z
updatedAt: 2013-12-05T20:31:47.322Z


-->

# 6 - Testing

## How hard to test?

* **Backbone** - No official test solution; roll your own (and don't forget to mock JQuery and the DOM!)
* **Ember** - Poor testing at first; pretty good testing support now
* **Angular** - Designed from the beginning to be easy to test. Fantastic test support. DI makes it **really** easy to mock required objects 

-----

<!--

_id: 5298da1c7aedcdec2f00002f
master: content
createdAt: 2013-11-29T18:17:00.000Z
updatedAt: 2013-12-05T20:31:47.322Z


-->

# 6 - Testing

## How hard to test?

<table width="100%"><tr><td>**Backbone**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/sad_face.png" height="64" width="64"/></td></tr><tr><td>**Ember**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/meh_face.png" height="64" width="64"/></td></tr><tr><td>**Angular**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr></table>


-----

<!--

_id: 5298da38e37c01e82f000027
master: content
createdAt: 2013-11-29T18:17:28.000Z
updatedAt: 2013-12-05T20:31:47.322Z


-->

# 7 - Application Structure

## Where do I put stuff?

### Backbone
* Wherever you want (?)
* No built-in conventions for file organization, re-use, etc.
* Lack of first-class controller / presenter metaphor makes things um, *interesting*, when trying to decide where to put application logic
* Can easily bolt on something like [RequireJS](http://requirejs.org/) but not built in

-----

<!--

_id: 5298daeafcffd6e32f000026
master: content
createdAt: 2013-11-29T18:20:26.000Z
updatedAt: 2013-12-05T20:31:47.322Z


-->

# 7 - Application Structure

## Where do I put stuff?

### Ember
* Definite separation of concerns
* How templates get referenced is up to you (in html? Pulled in via AJAX?)
* Line between first class views and templates is sometimes fuzzy

-----

<!--

_id: 5298dbafe37c01e82f000028
master: content
createdAt: 2013-11-29T18:23:43.000Z
updatedAt: 2013-12-05T20:31:47.322Z


-->

# 7 - Application Structure

## Where do I put stuff?

### Angular
* Definite separation of concerns
* DI makes stuff a lot easier
  * Can reference objects anywhere and they will be injected when needed
* Templates have a definite pattern and are automatically pulled in over AJAX when needed

-----

<!--

_id: 5298dbe6e37c01e82f000029
master: content
createdAt: 2013-11-29T18:24:38.000Z
updatedAt: 2013-12-05T20:31:47.322Z


-->

# 7 - Application Structure

## Where do I put stuff?

<table width="100%"><tr><td>**Backbone**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/sad_face.png" height="64" width="64"/></td></tr><tr><td>**Ember**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/meh_face.png" height="64" width="64"/></td></tr><tr><td>**Angular**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr></table>


-----

<!--

_id: 52a0dfb9006c72cc5d00001b
master: content
createdAt: 2013-12-05T20:19:05.000Z
updatedAt: 2013-12-05T20:31:47.322Z


-->

# 8 - Data

## How do I get data from the sever?

### Backbone
* Uses JQuery's ```$.ajax``` under the covers to power ```Backbone.Collection```
* Very easy to understand behavior if you understand ```$.ajax```
* Default behavior is _relatively_ easy to override

-----

<!--

_id: 52a0e016a3491ed45d000015
master: content
createdAt: 2013-12-05T20:20:38.000Z
updatedAt: 2013-12-05T20:31:47.322Z


-->

# 8 - Data

## How do I get data from the sever?

### Ember
* Also uses JQuery's ```$.ajax``` under the covers
* Just "getting data" is relatively easy to do e.g.
```javascript
jQuery.getJSON("/person/1", function(json) {
	person.setProperties(json);
});
```
* Doing things the "Ember way" is a bit more complex, though ...

-----

<!--

_id: 52a0e096a3491ed45d000016
master: content
createdAt: 2013-12-05T20:22:46.000Z
updatedAt: 2013-12-05T20:31:47.322Z


-->

# 8 - Data

## How do I get data from the sever?

### Angular
* No JQuery here, ma'am
* Can do with Angular's ```$http``` but much better using ```$resource``` (http://docs.angularjs.org/api/ngResource.$resource)
  * ```$resource``` is a "plugin" that needs to be separately included in the project
* API is really nice, though

-----

<!--

_id: 52a0e1e6fed071d05d000021
master: content
createdAt: 2013-12-05T20:28:22.000Z
updatedAt: 2013-12-05T20:31:47.323Z


-->

# 8 - Data

## How do I get data from the sever?

<table width="100%"><tr><td>**Backbone**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr><tr><td>**Ember**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/meh_face.png" height="64" width="64"/></td></tr><tr><td>**Angular**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr></table>


-----

<!--

_id: 5298dbfae37c01e82f00002a
master: content
createdAt: 2013-11-29T18:24:58.000Z
updatedAt: 2013-12-05T20:31:47.323Z


-->

# 9 - Community / Docs

## How easy to get help?

<table width="100%"><tr><td>**Backbone**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr><tr><td>**Ember**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr><tr><td>**Angular**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/sad_face.png" height="64" width="64"/></td></tr></table>


-----

<!--

_id: 52a0dcd1a3491ed45d000013
master: content
createdAt: 2013-12-05T20:06:41.000Z
updatedAt: 2013-12-05T20:31:47.323Z


-->

# 10 - Third Party Integration

## How easy to integrate another JS lib?

<table width="100%"><tr><td>**Backbone**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr><tr><td>**Ember**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/meh_face.png" height="64" width="64"/></td></tr><tr><td>**Angular**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/sad_face.png" height="64" width="64"/></td></tr></table>


-----

<!--

_id: 52a0defc006c72cc5d00001a
master: content
createdAt: 2013-12-05T20:15:56.000Z
updatedAt: 2013-12-05T20:31:47.323Z


-->

# 11 - Development Tools

## Anything that can help?

<table width="100%"><tr><td>**Backbone**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/sad_face.png" height="64" width="64"/></td></tr><tr><td>**Ember**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr><tr><td>**Angular**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr></table>


-----

<!--

_id: 5298dc5d7aedcdec2f000030
master: content
createdAt: 2013-11-29T18:26:37.000Z
updatedAt: 2013-12-05T20:31:47.323Z


-->

# 12 - What I like

## Johnny's totally biased opinion

<table width="100%"><tr><td>**Backbone**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/meh_face.png" height="64" width="64"/></td></tr><tr><td>**Ember**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/meh_face.png" height="64" width="64"/></td></tr><tr><td>**Angular**</td><td><img src="http://johnny-resources.s3.amazonaws.com/talks/mvstar/happy_face.png" height="64" width="64"/></td></tr></table>


-----

<!--

_id: 52a0ddb6a3491ed45d000014
master: content
createdAt: 2013-12-05T20:10:30.000Z
updatedAt: 2013-12-05T20:31:47.323Z


-->

# The Result?

## And the winner is ...

<table width="100%"><tr><td>**Backbone**</td><td>**24**</td></tr><tr><td>**Ember**</td><td>**29**</td></tr><tr><td>**Angular**</td><td>**30**</td></tr></table>
