require('ignore-styles');
const babelRegister = require('babel-register');

babelRegister({
  ignore: /\/(build|node_modules)\//,
  presets: ['react-app'],
});

const fs = require('fs');

fs.writeFileSync('output.html', require('./render').default);
