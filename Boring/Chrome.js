import React from 'react';
import Safe from 'react-safe';
// everything here only exists for SSR purpose
// json loading https://quipblog.com/efficiently-loading-inlined-json-data-911960b0ac0a
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
        {/* {assets['BigBall'] && <Safe.script type="application/json">{JSON.stringify(assets['BigBall'])}</Safe.script>} */}
        {/* <Safe.script suppressHydrationWarning={true}>
          const jsonNode = document.querySelector( "script[type='application/json']"); const jsonText
          =jsonNode.textContent; const jsonData = JSON.parse(jsonText); window.BigBall = jsonData
        </Safe.script> */}
        <Safe.script suppressHydrationWarning={true}>
          {`fetch("/BigBall.json").then(res => res.json()).then(myJson => (window.BigBall=myJson));`}
        </Safe.script>
        <script src={assets['main.js']} suppressHydrationWarning={true} />
      </body>
    </html>
  );
}
