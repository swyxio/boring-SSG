require('ignore-styles');
// const babelRegister = require('babel-register');

// babelRegister({
//   ignore: /\/(build|node_modules)\//,
//   presets: ['react-app'],
// });
require('babel-register')({
  presets: ['env', 'react-app'],
});

const fs = require('fs');

// write it out
require('./render')
  .default()
  .then(res => fs.writeFileSync('output.html', res));
