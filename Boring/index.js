const fs = require('fs-extra');
const NodePath = require('path')
import config from '../boring.config';
import { SSR } from './SSR';
import { Bundle } from './Bundle';
import { DIR } from './constants';

const write = filepath => data => console.log(`writing to ${filepath}`) || fs.outputFileSync(filepath, data); // nice pointfree thing for promise

Bundle();

// go through getRoutes to know what to generate
config
  .getRoutes()
  .then(routes => {
    routes.forEach(({ path, getData = null, ...props }) => {
      const routepath = NodePath.join(DIR,path)
      let routeInfo
      if (getData) {
        routeInfo = getData()
        write(`${routepath}/routeInfo.json`, routeInfo)
      }
      SSR(path, routeInfo)
      .then(write(`${routepath}/index.html`))
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
