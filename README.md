# WHSClubs v3.0 - Credit Sheet Seach
Check your club credit status with [React](https://facebook.github.io/react/) and [Flux](https://github.com/facebook/flux/)

Comes with fun fonts!
* Lato
* Lobster

Demo: [WHSClubs](http://whsclubs.herokuapp.com)

<img src="https://i.imgur.com/GvkrgCx.png">

## Getting Started
* Quick start: `git clone`, then `npm install` and `npm start`
* Compile server-side code: `npm run babel` or `npm run babel:w` (watch for changes)
* Bundle client-side code: `npm run webpack` or `npm run webpack:w`

## Stack
* [Babel](https://babeljs.io/)
  * ES6+, async/await etc.
* [Webpack](https://webpack.github.io/)
  * [CSS Modules](https://github.com/css-modules/css-modules)
  * [babel-loader](https://github.com/babel/babel-loader)
* [React](https://facebook.github.io/react/)
  * Official Facebook [Flux](https://github.com/facebook/flux/) w/ [ReduceStore](https://facebook.github.io/flux/docs/flux-utils.html)
  * Component hierarchy
    * AppStore (query, clubs data) => ClubsList => ClubBox => ClubRoster
    * SearchInput => dispatches query change => AppStore
* [Express](http://expressjs.com/)
  * Server gets club credit data using [request-promise](https://github.com/request/request-promise), then processes it with [csvtojson](https://www.npmjs.com/package/csvtojson)
  * Adding a club is easy, just edit the clubs.js file

## Notes
After coding the site up and loading in the initial clubs (FBLA, Key Club,
Science Club), WHSClubs was a mostly low-maintenance affair:
here and there a club would edit the headers of
their spreadsheet and I'd have to change a few characters in the csvtojson
parsing code to make sure the data still displayed correctly, but save for that,
nothing much else.

While not unpleasant, the minimal scope of these updates inured me to
lassitude and indolence, and, as I would find out later, I had neglected one key
consideration which would eventually prove to be my downfall. Nothing could've
prepared me for what was soon to come.

One fine morning, I was approached by a student inquiring about the addition of the
Wiss Pals club credit sheet. I eagerly agreed, excited for a dash of variety to spice up
the blandness of the previous administrative updates to the site.

When I arrived home, the warm afternoon sun was shining, bathing my room in a golden
glow. Alas, it was powerless to save me from the darkness that soon enveloped me.
As I trudged through line after line of
utter madness, my eagerness quickly turned to dread. I spent hours searching for
strings in various files mixed between client and server code, strings
that I needed to attach to inconsistently named API endpoints: endpoints to which I
needed to send requests in order to display the
new club data on the front end.

Yet, in my darkest hour, on the brink of kicking the bucket on my illustrious
work, there was a light.

In a blinding flash of white, Zuck appeared to me.

"Use React," he said, "one-way data binding will help you keep your code straight"

"Yeah, whatever" I said.

"Hey, all the cool people are using it. Like the boys over at Airbnb!"

"Why didn't you tell me earlier?! `npm install react --save`"

And that's how WHSClubs went from being a Vue.js app to a React/Flux app.

### More about v2 to v3
You probably can check the v2.0.0 tag to verify, but most likely the majority of the
refactoring
that made it possible for all the club data to be in one file
(`server/util/clubs.js`) happened on the server side. Previously, each club
had its own API endpoint and all the club names had to be stored on both the client
and server side, which complicated the addition of new clubs to the site: there were 3 or 4 places
where the club name had to be added for everything to work correctly.
In v3, with only one endpoint for all the data, the addition of clubs became much easier and as a nice benefit
the client
side could be vastly simplified.

Not to diminish the contribution of React, though — it's still a great library
(even though it _is_ the "hot JS framework/library/tool" of the month).
I enjoyed working with it (in fact, to a greater extent than the React/Redux projects
I've worked on earlier — it feels like there's a lot less bloat working with Facebook's
minimal Flux implementation) on WHSClubs v3 and in the end I got nice, well-organized
code to boot. Unlike Vue.js which allows you to get away
with some pretty bad stuff (c.f. v2.0.0),
React forces (well maybe not _force_, but it definitely encourages it, at least more
so than Vue) you to work with components and keep your state and data binding straight,
which is conducive to making great code.

Go try it our for yourself! All you gotta do is `npm install react`!

> "It's going to be a beautiful thing to watch"
> > Donald J. Trump, 2016
> > Republican Nominee for President
