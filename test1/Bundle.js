// import React from 'react';
import Bundler from 'parcel-bundler';
const NodePath = require('path');

export async function Bundle() {
  const path = NodePath.join(__dirname, './BoringShell.js');
  // console.log({ path });
  // bundle that js file
  const bundler = new Bundler(path);
  const bundle = await bundler.bundle().catch(console.error);
}

// function stripPath(name) {
//   return name.replace(NodePath.resolve(__dirname, '../dist'), '');
// }
