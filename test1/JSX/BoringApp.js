import React, { Component } from 'react';

import Chrome from './Chrome';
// import Page from './Page';

export default function BoringApp(path) {
  return function({ assets }) {
    const Page = require(path);
    return (
      <Chrome title="Hello World" assets={assets}>
        <div>
          {/* <h1>Hello World</h1> */}
          <Page />
        </div>
      </Chrome>
    );
  };
}
