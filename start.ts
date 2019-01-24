require('source-map-support').install();
require('reflect-metadata');

import MainServer from './api/server';
import * as Config from './config';

const server = new MainServer(Config.server);

// Start listening for requests...
server.listen().catch((error) => {
  console.error(error);
  process.exit(1);
});