import React from 'react';
import { hydrate } from 'react-dom';

export default function BoringHydrate(path) {
  return function() {
    const Page = require(path);
    hydrate(<Page />, document);
  };
}
