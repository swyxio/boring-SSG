import Bundler from 'parcel-bundler';
const NodePath = require('path');

export async function Bundle() {
  const path = NodePath.join(__dirname, './BoringShell.js');
  const bundler = new Bundler(path);
  const bundle = await bundler.bundle().catch(console.error);
}
