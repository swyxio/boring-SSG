import React from 'react';
import { renderToString } from 'react-dom/server';

import { ServerLocation } from '@reach/router';

import App from '../src/components/App';

const Bundler = require('parcel-bundler');
const Path = require('path');
const file = Path.join(__dirname, '../src/index.js');
const bundler = new Bundler(file);

export default async function render() {
  const bundle = await bundler.bundle();
  // console.log({ bundle: [...bundle.childBundles][0] });

  let assets;
  if (process.env.NODE_ENV === 'development') {
    const bundledPath = stripPath(bundle.name);
    console.log({ bundle });
    // const bundledPath = [...bundle.childBundles][0].name.replace(Path.resolve(__dirname, '../'), '');
    // console.log({ bundledPath, __dirname: Path.resolve(__dirname, '../') });
    // let count = 0;
    // for (let x of [...bundle.childBundles]) {
    //   // if (!x.name.includes('node_modules')) {
    //   console.log('count', count++);
    //   console.log(x.type);
    //   console.log(x.name);
    //   console.log(x.entryAsset);
    //   console.log(Object.keys(x));
    //   console.log('______________');
    //   // }
    // }
    assets = {
      'main.js': bundledPath,
      'main.css': ''
    };
  } else {
    assets = require('../build/asset-manifest.json');
  }

  var html = renderToString(
    <ServerLocation url={'/'}>
      <App assets={assets} />
    </ServerLocation>
  );
  // There's no way to render a doctype in React so prepend manually.
  // Also append a bootstrap script tag.
  return '<!DOCTYPE html>' + html;
}

function stripPath(name) {
  console.log('stripping ', name);
  return name.replace(Path.resolve(__dirname, '../dist'), '');
}
