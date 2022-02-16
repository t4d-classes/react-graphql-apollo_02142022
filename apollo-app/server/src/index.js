import dotenv from 'dotenv';

dotenv.config();

import { logger } from './logger.js';
import { getApp } from './app.js';

getApp().then(([ apollo, httpServer, subscriptionServer ]) => {

  httpServer
    .listen(process.env.PORT)
    .on('listening', async () => {
      logger.info(
        `web server listening on port http://localhost:${process.env.PORT}${apollo.graphqlPath}`,
      );
      logger.info(
        `web socket server listening on port ws://localhost:${process.env.PORT}${subscriptionServer.wsServer.options.path}`,
      );
    })
    .on('error', (err) => {
      console.log(err);
    });

});

