import React from 'react';
import ReactDOM from 'react-dom';
import Chrome from './Chrome';
// import Page from './Page';

import App from '../src';

export default function BoringShell(props) {
  // console.log('boringshell', props);
  const { title, assets = {}, children } = props;
  return (
    <Chrome title={title} assets={assets}>
      <App>{children}</App>
    </Chrome>
  );
}

// Render your app
if (typeof document !== 'undefined') {
  const renderMethod = ReactDOM.hydrate || ReactDOM.render;
  const render = Comp => {
    // renderMethod(<Comp />, document.getElementById('root'));
    renderMethod(<Comp />, document);
  };

  // Render!
  render(BoringShell);
}
