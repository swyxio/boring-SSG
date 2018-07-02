# Boring SSG

> Static Site Generation So Good, It's Boring

**Demo**: <https://boring-ssg.netlify.com>

hello! This is an experimental react static site generator using [Parcel](https://parceljs.io) and [@reach/router](https://reach.tech/router)! Putting together better tooling can make for a very fast and more accessible static site generator!

![blog](https://user-images.githubusercontent.com/35976578/42151286-7cd6eb5e-7daa-11e8-91b1-1c4b30c157f5.gif)

# Try it out

1.  `git clone https://github.com/sw-yx/boring-SSG.git`
2.  `cd boring-SSG`
3.  `yarn` (or `npm install`)
4.  `yarn start`, this should build your pages into the `/dist` folder and serve from there.

Things to notice:

- Site works with Javascript off
- After the initial load, the app rehydrates and all routing is clientside (including dynamic routes)
- If you refresh on any page, the server serves that page's HTML and rehydrates from there, it doesn't simply serve `index.html` and navigates you back.
- for invalid URLs, 404 page is served.

# Deploy on Netlify with NetlifyCMS

Assuming you have a [Netlify](https://netlify.com) account linked up to your Github/Gitlab/Bitbucket:

1. Make sure this repo (or your fork of it) is pushed to your git host account
2. Head to <https://app.netlify.com/account/sites> and click "New Site from Git"
3. Under "Continuous Deployment" click your git host and look for the repo
4. For "Deploy settings", the default settings are ok, but change "Publish directory" to "dist" instead of "build" and hit Deploy.
5. While your site deploy is in progress, let's set up NetlifyCMS as well! Head to **Settings > Identity** and hit "Enable Identity"
6. On the Identity page, scroll allllll the way down to **Services > Git Gateway** and hit "Enable Git Gateway"
7. Last thing! Head to "Build & Deploy", scroll to **Post processing > Snippet injection** and hit "Add Snippet"
8. Insert this script before </head>: <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script> and name it whatever you want
9. Your site should be deployed by now! head to **your-new-boring-ssg-subdomain.netlify.com/admin** to set up your NetlifyCMS admin panel for your new static site!

---

# Usage of boring-SSG

Everything inside `/src` should be a fully standalone app. `@reach/router` is used for [accessibility-first routing](https://reach.tech/router) and it has the very nice ability of nested routes which don't need a separate idiom to account for in the static page generation.

The static page generation is currently set up in `boring.config.js`. Currently the only active API here is `getRoutes`, where you only return an array of whitelisted routes for static page generation. This array can be programmatically generated, so you are free to write Node.js crawlers to import and (in future) inject data. You do not need to whitelist a "404" route, this is done for you in the background.

```js
// Example boring.config.js
export default {
  getRoutes: async () => {
    // you can pull data sources in here
    return [
      {
        path: '/'
        // in future you can inject data here as well
      },
      {
        path: '/about'
      },
      {
        path: '/blog'
      }
    ]; // generate more pages based on data
  }
};
```

# Discussion of Approach

## Public API

Making the right tradeoff of developer ergonomics and flexibility is a very difficult needle to thread. I have studied Gatsby and [a few of the more recent entries like Docusaurus and React-Static](https://dev.to/swyx/a-glance-through-docusaurus-docz-and-react-static-47in) to get inspiration for this approach.

Ultimately I like React-Static's philosophy a lot, where everything inside `src` makes sense as a React app with no magic folders, and the static generation is all done in a single `config.js` file where you can also do data injection.

Due to lack of time I haven't been able to experiment/innovate here as much as I would want, but I definitely think there is a lot of promise here to create plugins with a small API surface area that reduce the level of configuration for 80% use cases.

## Under the Hood

A key design consideration for me was to have a rehydrated static site, not just a simple static site. This raised the difficulty but I consider it mandatory in the modern JAMstack era.

I iterated through a couple of approaches before landing on the current method. I originally tried to generate a custom bundle for every generated page, but that proved extremely verbose and probably inadvisable for scaling.

There was another attempt I made at hooking into Parcel's [internal Event system](https://parceljs.org/api.html#events), but frankly they aren't well documented and didn't even seem to work at all. This would have been much nicer to hook into for page generation _even without a whitelist_, which is a very interesting goal, but could also be important for fast multi-asset bundling (incl code split by default). This is probably something to return to when Parcel v2 is out.

**The current method is much simpler.** Essentially the site generation process is fast because the SSR'ed pages **and** the bundle can be run in parallel. Because all we need to know from the bundle to inject into the page is the name of the bundle, the simplistic approach we have now (doesn't include multiple assets) is sufficient to generate the pages even before the bundler is done.

**Performance**: although of course boring-ssg does much less than Gatsby so this is a terrible measurement, I looked into the measured performance for essentially the same tasks (rendering `gatsby-starter-netlify-cms` from Markdown + JSX to JAMstack HTML) takes `boring-ssg` 2-6 seconds (depending on cache) and for Gatsby about 45 seconds, or **about 87% less build time.**

![image](https://user-images.githubusercontent.com/6764957/42155854-82d1ba86-7db7-11e8-90c8-22c00c731709.png)
<img width="789" alt="image" src="https://user-images.githubusercontent.com/6764957/42155866-88df3dea-7db7-11e8-858e-10339eb6e1eb.png">

### The details

The rehydration is achieved by having a single app shell, called the "BoringShell", which hydrates the HTML if on clientside, but otherwise is just a thin shell around the actual App defined in `/src`. The accompanying `Chrome` React component handles the HTML meta tags and the asset injection based on its `assets` prop. (more work to do here to handle multiple assets)

Routing is done by [simulating the route](https://reach.tech/router/server-rendering) based on the `config`'s whitelist. This makes rehydration very straightforward.

Data injection is a tricky topic. The very optimal approach is to chunk up data so that only necessary data is fetched for any particular route, but I didn't have time to coordinate how this might work between the server rendering and clientside bundle. So I essentially punted on it by opting for a "big ball of data" - just as we serve the same JS bundle for the entire site to rehydrate, we, we also serve the same `json` data ball for the entire site to use. It's not at all efficient but it made the project work within the timeframe.

CSS is another tricky bit. The gold standard (eg Gatsby) would inline CSS automatically so that the initial render looks good without flash of unstyled content. I have not gotten to it - and just serve a main css bundle.

---

# Todos

- [ ] Work out CSS/multiple asset bundling
- [x] basic data injection model (big ball of data)
- [ ] Demonstrate split data injection model (may require creating addtional library level components)
- [x] Test production build
- [ ] Inline css to every page.
- [ ] NetlifyCMS integration

# Prototype Goal

Currently this is just a "breakable toy" to do R&D for https://github.com/sw-yx/create-jamstack-app, which is the actual CLI based SSG that has the infrastructure to support a more maintainable and fast versino of `boring-SSG`.
