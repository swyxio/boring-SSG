// a very small server because zeit's serve doesnt do it for us
const express = require('express');
const path = require('path');

const app = express();

// Static resources
app.use(
  express.static(path.resolve(__dirname, '..', 'dist'), {
    // index: false,
    extensions: ['html']
  })
);
app.listen(5000, () => {
  console.log('Listening on port 5000...');
});

app.on('error', function(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
