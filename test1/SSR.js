import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerLocation } from '@reach/router';
import Bundler from 'parcel-bundler';
const NodePath = require('path');
import { DIR, HYDRATE } from './constants';
const fs = require('fs');
import BoringShell from './JSX/BoringShell';

export async function SSR(path, componentPath) {
  // const file = NodePath.join(__dirname, '../', componentPath);
  const hydratepath = NodePath.join(__dirname, '../', HYDRATE, `${path}.js`);
  console.log({ hydratepath });
  // write out a js file with hydration
  fs.writeFileSync(
    hydratepath,
    `
  import React from 'react';
  import { hydrate } from 'react-dom';

  import App from '../${componentPath}';
  import BoringShell from '../test1/JSX/BoringShell'

  console.log('hydrating');
  hydrate(<BoringShell><App /></BoringShell>, document);
  `
  );

  // bundle that js file
  const bundler = new Bundler(hydratepath);
  const bundle = await bundler.bundle();

  // should return html string to be written into the path
  let assets;
  if (process.env.NODE_ENV === 'development') {
    const bundledPath = stripPath(bundle.name);
    // console.log({ bundle });
    // console.log(bundle.name);
    // console.log(Object.keys(bundle));
    assets = {
      'main.js': bundledPath,
      'main.css': ''
    };
  } else {
    assets = require('../build/asset-manifest.json');
  }
  console.log({ componentPath });
  const App = require(`../${componentPath}`).default;
  var html = renderToString(
    <ServerLocation url={'/'}>
      <BoringShell assets={assets}>
        <App />
      </BoringShell>
    </ServerLocation>
  );
  // There's no way to render a doctype in React so prepend manually.
  // Also append a bootstrap script tag.
  return '<!DOCTYPE html>' + html;
}

function stripPath(name) {
  return name.replace(NodePath.resolve(__dirname, '../dist'), '');
}
