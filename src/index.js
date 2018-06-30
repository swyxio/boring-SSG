import React from 'react';
import { hydrate } from 'react-dom';

import App from './components/App';

console.log('hydrating');
hydrate(<App />, document);
