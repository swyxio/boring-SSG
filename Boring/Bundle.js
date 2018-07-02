import Bundler from 'parcel-bundler';
const NodePath = require('path');

export function Bundle() {
  // const path = NodePath.join(__dirname, '../static/index.html');
  const path = NodePath.join(__dirname, './BoringShell.js');

  // let options = {}
  // if (process.env.NODE_ENV === 'production') {
  //   options = {
  //     minify: true,
  //   }
  // }

  const bundler = new Bundler(path);
  return bundler.bundle().catch(console.error);
}
