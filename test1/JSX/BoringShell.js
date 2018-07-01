import React from 'react';
import Chrome from './Chrome';
// import Page from './Page';

export default function BoringShell({ title, assets = {}, children }) {
  return (
    <Chrome title={title} assets={assets}>
      {children}
    </Chrome>
  );
}
