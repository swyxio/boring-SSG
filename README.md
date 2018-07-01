hello! This is an experimental react static site generator using Parcel and @reach/router! Putting together better tooling can make for a very fast and more accessible static site generator!

![routing](https://user-images.githubusercontent.com/35976578/42131568-d1ec8eba-7cd2-11e8-973a-e556a44c061e.gif)

# Try it out

1.  `git clone https://github.com/sw-yx/boring-SSG.git`
2.  `cd boring-SSG`
3.  `yarn` (or `npm install`)
4.  `yarn start`, this should build your pages into the `/dist` folder.
5.  (optional) in another process, `yarn server` to spin up a small server to see your static pages locally.

# Usage

Everything inside `/src` should be a fully standalone app. `@reach/router` is used for [accessibility-first routing](https://reach.tech/router) and it has the very nice ability of nested routes which don't need a separate idiom to account for in the static page generation.

The static page generation is currently set up in `boring.config.js`. Currently the only active API here is `getRoutes`, where you only return an array of whitelisted routes for static page generation. This array can be programmatically generated, so you are free to write Node.js crawlers to import and (in future) inject data. You do not need to whitelist a "404" route, this is done for you in the background.

# Approach

## Public API

Making the right tradeoff of developer ergonomics and flexibility is a very difficult needle to thread. I have studied Gatsby and [a few of the more recent entries like Docusaurus and React-Static](https://dev.to/swyx/a-glance-through-docusaurus-docz-and-react-static-47in) to get inspiration for this approach. Ultimately I like React-Static's philosophy a lot, where everything inside `src` makes sense as a React app with no magic folders, and the static generation is all done in a single `config.js` file where you can also do data injection. Due to lack of time I haven't been able to experiment/innovate here as much as I would want, but I definitely think there is a lot of promise here to create plugins with a small API surface area that reduce the level of configuration for 80% use cases.

## Under the Hood

# Todo

- [ ] Work out CSS/multiple asset bundling
- [ ]
