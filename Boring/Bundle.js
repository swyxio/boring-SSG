import Bundler from 'parcel-bundler';
const NodePath = require('path');

export function Bundle() {
  // const path = NodePath.join(__dirname, '../static/index.html');
  const path = NodePath.join(__dirname, './BoringShell.js');
  const bundler = new Bundler(path);
  return bundler.bundle().catch(console.error);
}
