import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerLocation } from '@reach/router';
const fs = require('fs');
import BoringShell from './BoringShell';

// should return html string to be written into the path
export async function SSR(path) {
  let assets;
  if (process.env.NODE_ENV === 'development') {
    assets = {
      'main.js': 'BoringShell.js',
      'main.css': ''
    };
  } else {
    assets = require('../build/asset-manifest.json');
  }
  var html = renderToString(
    <ServerLocation url={path}>
      <BoringShell assets={assets} />
    </ServerLocation>
  );
  // There's no way to render a doctype in React so prepend manually.
  // Also append a bootstrap script tag.
  return '<!DOCTYPE html>' + html;
}
