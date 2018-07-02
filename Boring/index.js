const fs = require('fs');
import config from '../boring.config';
import { SSR } from './SSR';
import { Bundle } from './Bundle';

// // ensure temp folder is there
import { DIR } from './constants';
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR);
const write = filepath => data => console.log(`writing to ${filepath}`) || fs.writeFileSync(filepath, data); // nice pointfree thing for promise

Bundle();

// go through getRoutes to know what to generate
config
  .getRoutes()
  .then(routes => {
    routes.forEach(({ path, ...props }) => {
      SSR(path)
        .then(write(`${DIR}${path === '/' ? '/index' : path}.html`))
        .catch(console.error);
    });
    // insist on 404
    SSR('/404')
      .then(write(`${DIR}/404.html`))
      .catch(console.error);
  })
  .catch(err => {
    console.error('getRoutes failed');
    console.error(err);
  });
