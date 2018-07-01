require('ignore-styles');
// const babelRegister = require('babel-register');

// babelRegister({
//   ignore: /\/(build|node_modules)\//,
//   presets: ['react-app'],
// });
// require('@babel/register')({
//   presets: [
//     'env', // babel 7 TypeError: Cannot read property 'bindings' of null // scope.bindings[name] = info;
//     // ["@babel/env", {
//     //   "targets": {
//     //     "browsers": ["last 2 versions"]
//     //   }
//     // }],
//     // '@babel/react'
//     'react-app' // babel 7 Error: Plugin/Preset files are not allowed to export objects, only functions.
//   ]
// });

const fs = require('fs');

// write it out
require('./render')
  .default()
  .then(res => fs.writeFileSync('dist/index.html', res));
