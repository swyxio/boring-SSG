// require('ignore-styles');
const fs = require('fs');
import config from '../boring.config';
import { SSR } from './SSR';

// ensure temp folder is there
import { DIR, HYDRATE } from './constants';
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR);
if (!fs.existsSync(HYDRATE)) fs.mkdirSync(HYDRATE);
const write = filepath => data => fs.writeFileSync(filepath, data); // nice pointfree thing for promise

// go through getRoutes to know what to generate
config
  .getRoutes()
  .then(routes => {
    routes.forEach(({ path, component, is404 = false, ...props }) => {
      // validation
      if (!path && !is404) throw new Error('must either have path or is404');
      if (!component) throw new Error('component missing');

      // special overrides
      if (path === '/') path = '/index';
      if (!path && is404) path = '/404';

      // the money shot
      SSR(path, component)
        .then(write(`${DIR}${path}.html`))
        .catch(console.error);
    });
  })
  .catch(err => {
    console.error('getRoutes failed');
    console.error(err);
  });

// export default async function render() {
//   const bundle = await bundler.bundle();
//   // console.log({ bundle: [...bundle.childBundles][0] });
//   let assets;
//   if (process.env.NODE_ENV === 'development') {
//     const bundledPath = stripPath(bundle.name);
//     // console.log({ bundle });
//     // console.log(bundle.name);
//     // console.log(Object.keys(bundle));
//     assets = {
//       'main.js': bundledPath,
//       'main.css': ''
//     };
//   } else {
//     assets = require('../build/asset-manifest.json');
//   }

//   var html = renderToString(
//     <ServerLocation url={'/'}>
//       <App assets={assets} />
//     </ServerLocation>
//   );
//   // There's no way to render a doctype in React so prepend manually.
//   // Also append a bootstrap script tag.
//   return '<!DOCTYPE html>' + html;
// }

// // write it out
// require('./render')
//   .default()
//   .then(res => fs.writeFileSync('dist/index.html', res));

// // junk

// // const babelRegister = require('babel-register');

// // babelRegister({
// //   ignore: /\/(build|node_modules)\//,
// //   presets: ['react-app'],
// // });
// // require('@babel/register')({
// //   presets: [
// //     'env', // babel 7 TypeError: Cannot read property 'bindings' of null // scope.bindings[name] = info;
// //     // ["@babel/env", {
// //     //   "targets": {
// //     //     "browsers": ["last 2 versions"]
// //     //   }
// //     // }],
// //     // '@babel/react'
// //     'react-app' // babel 7 Error: Plugin/Preset files are not allowed to export objects, only functions.
// //   ]
// // });
