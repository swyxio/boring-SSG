hello! This is an experimental react static site generator using Parcel and @reach/router! Putting together better tooling can make for a very fast and more accessible static site generator!

![routing](https://user-images.githubusercontent.com/35976578/42131568-d1ec8eba-7cd2-11e8-973a-e556a44c061e.gif)

# Try it out

1.  `git clone https://github.com/sw-yx/boring-SSG.git`
2.  `cd boring-SSG`
3.  `yarn` (or `npm install`)
4.  `yarn start`, this should build your pages into the `/dist` folder.
5.  (optional) in another process, `yarn serve` to spin up a small server to see your static pages in <https://localhost:5000>

Things to notice:

- Site works with Javascript off
- After the initial load, the app rehydrates and all routing is clientside (including dynamic routes)
- If you refresh on any page, the server serves that page's HTML and rehydrates from there, it doesn't simply serve `index.html` and navigates you back.
- for invalid URLs, 404 page is served.

# Usage

Everything inside `/src` should be a fully standalone app. `@reach/router` is used for [accessibility-first routing](https://reach.tech/router) and it has the very nice ability of nested routes which don't need a separate idiom to account for in the static page generation.

The static page generation is currently set up in `boring.config.js`. Currently the only active API here is `getRoutes`, where you only return an array of whitelisted routes for static page generation. This array can be programmatically generated, so you are free to write Node.js crawlers to import and (in future) inject data. You do not need to whitelist a "404" route, this is done for you in the background.

# Approach

## Public API

Making the right tradeoff of developer ergonomics and flexibility is a very difficult needle to thread. I have studied Gatsby and [a few of the more recent entries like Docusaurus and React-Static](https://dev.to/swyx/a-glance-through-docusaurus-docz-and-react-static-47in) to get inspiration for this approach. Ultimately I like React-Static's philosophy a lot, where everything inside `src` makes sense as a React app with no magic folders, and the static generation is all done in a single `config.js` file where you can also do data injection. Due to lack of time I haven't been able to experiment/innovate here as much as I would want, but I definitely think there is a lot of promise here to create plugins with a small API surface area that reduce the level of configuration for 80% use cases.

## Under the Hood

A key design consideration for me was to have a rehydrated static site, not just a simple static site. This raised the difficulty but I consider it mandatory in the modern JAMstack era.

I iterated through a couple of approaches before landing on the current method. I originally tried to generate a custom bundle for every generated page, but that proved extremely verbose and probably inadvisable for scaling.

There was another attempt I made at hooking into Parcel's [internal Event system](https://parceljs.org/api.html#events), but frankly they aren't well documented and didn't even seem to work at all. This would have been much nicer to hook into for page generation _even without a whitelist_, which is a very interesting goal, but could also be important for fast multi-asset bundling (incl code split by default). This is probably something to return to when Parcel v2 is out.

The current method is much simpler. Essentially the site generation process is fast because the SSR'ed pages **and** the bundle can be run in parallel. Because all we need to know from the bundle to inject into the page is the name of the bundle, the simplistic approach we have now (doesn't include multiple assets) is sufficient to generate the pages even before the bundler is done.

The rehydration is achieved by having a single app shell, called the "BoringShell", which hydrates the HTML if on clientside, but otherwise is just a thin shell around the actual App defined in `/src`. The accompanying `Chrome` React component handles the HTML meta tags and the asset injection based on its `assets` prop. (more work to do here to handle multiple assets)

Routing is done by [simulating the route](https://reach.tech/router/server-rendering) based on the `config`'s whitelist. This makes rehydration very straightforward.

---

# Todo

- [ ] Work out CSS/multiple asset bundling
- [ ] Demonstrate data injection model (may require creating addtional library level components)
- [ ] Test production build

# Prototype Goal

Currently this is just a "breakable toy" to do R&D for https://github.com/sw-yx/create-jamstack-app, which is the actual CLI based SSG that has the infrastructure to support a more maintainable and fast versino of `boring-SSG`.
