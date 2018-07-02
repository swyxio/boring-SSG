import React from 'react';
import ReactDOM from 'react-dom';
import Chrome from './Chrome';

import App from '../src';

export default function BoringShell(props) {
  const { title, assets = {
    'main.js': '/BoringShell.js',
    'main.css': '/BoringShell.css',}, children } = props;
  return (
    <Chrome title={title} assets={assets}>
      <App data={assets.BigBall}>{children}</App>
    </Chrome>
  );
}

// Render your app
if (typeof document !== 'undefined') {
  const renderMethod = ReactDOM.hydrate || ReactDOM.render;
  const render = Comp => {
    renderMethod(<Comp />, document);
  };

  // Render!
  render(BoringShell);
}
