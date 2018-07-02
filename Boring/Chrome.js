import React from 'react';

export default function Chrome({ assets = {}, title, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="favicon.ico" />
        {assets['main.css'] && <link rel="stylesheet" href={assets['main.css']} />}
        <title>{title}</title>
      </head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<b>Enable JavaScript to run this app.</b>`
          }}
        />
        {children}
        <script src={assets['main.js']} suppressHydrationWarning={true} />
      </body>
    </html>
  );
}
