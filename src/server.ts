import {
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
  unhandledSigint,
  unhandledSigterm,
} from "@utils/uncaughtEventsHandler.js";
import { establishDataBaseConnection } from "configs/database.js";
import { Server } from "http";
import { app } from "./app.js";
import { PORT } from "./configs/env.js";

// Config DB
async function initApp() {
  await establishDataBaseConnection();
}

let server: Server;
const PORT_NUMBER: number = PORT || 3000;
initApp()
  .then(() => {
    server = app.listen(PORT_NUMBER, () => {
      console.log(`Application is listening on port: ${PORT}`);
    });

    // Registering the process events
    unhandledSigint(server);
    unhandledSigterm(server);
    uncaughtExceptionHandler(server);
    unhandledRejectionHandler(server);
  })
  .catch((error) => {
    throw error;
  });
