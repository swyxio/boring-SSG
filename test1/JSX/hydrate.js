import React from 'react';
import { hydrate } from 'react-dom';

export default function BoringHydrate(path) {
  // import App from './components/App';
  const Page = require(path);
  hydrate(<Page />, document);
}
