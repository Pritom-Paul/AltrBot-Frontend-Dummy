import "dotenv/config";

import { createTerminus } from "@godaddy/terminus";
import express from "express";
import helmet from "helmet";
import http from "http";
import { handler } from "./build/handler.js";

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "base-uri": ["'none'"],
        "connect-src": ["*"],
        "img-src": ["*"],
        "object-src": ["'none'"],
        "script-src": ["'self'", "'unsafe-inline'"],
        "style-src": ["'self'", "'unsafe-inline'"],
      },
    },
    referrerPolicy: {
      policy: ["same-origin"],
    },
  })
);

app.use(handler);

const server = http.createServer(app);

createTerminus(server, {
  signals: ["SIGTERM", "SIGINT"],
  onSignal: async () => {
    // Call your cleanup functions below. For example:
    // db.shutdown()
  },
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
