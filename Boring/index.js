const fs = require('fs-extra');
const NodePath = require('path');
import config from '../boring.config';
import { SSR } from './SSR';
import { Bundle } from './Bundle';
import { DIR } from './constants';
var ncp = require('ncp').ncp;
ncp.limit = 16;

const write = filepath => data => console.log(`writing to ${filepath}`) || fs.outputFileSync(filepath, data); // nice pointfree thing for promise

(async () => {
  Bundle();

  // get big ball of data
  const BigBall = await config.getData();
  write(NodePath.join(DIR, '/BigBall.json'))(JSON.stringify(BigBall));

  // copy files from static to dist
  ncp('static', DIR, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('done!');
  });

  // go through getRoutes to know what to generate
  config
    .getRoutes(BigBall)
    .then(routes => {
      routes.forEach(({ path, ...props }) => {
        const routepath = NodePath.join(DIR, path);
        SSR(path, BigBall)
          .then(write(`${routepath}/index.html`))
          .catch(console.error);
      });
      // insist on 404
      SSR('/404', BigBall)
        .then(write(`${DIR}/404.html`))
        .catch(console.error);
    })
    .catch(err => {
      console.error('getRoutes failed');
      console.error(err);
    });
})();
