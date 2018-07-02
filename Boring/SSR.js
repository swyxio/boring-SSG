import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerLocation } from '@reach/router';
const fs = require('fs');
import BoringShell from './BoringShell';
import { RouteDataProvider } from './withRouteData';

// should return html string to be written into the path
export async function SSR(path, routeInfo = null) {
  let assets;
  // if (process.env.NODE_ENV === 'development') {
  assets = {
    'main.js': 'BoringShell.js',
    'main.css': '',
    routeInfo
  };
  // someday maybe do something different for prod
  var html = renderToString(
    <ServerLocation url={path}>
      <RouteDataProvider value={{ routeInfo }}>
        <BoringShell assets={assets} />
      </RouteDataProvider>
    </ServerLocation>
  );
  // There's no way to render a doctype in React so prepend manually.
  // Also append a bootstrap script tag.
  return '<!DOCTYPE html>' + html;
}
