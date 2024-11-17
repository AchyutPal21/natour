import { establishDataBaseConnection } from "configs/database.js";
import { app } from "./app.js";
import { PORT } from "./configs/env.js";

// Config DB
async function initApp() {
  try {
    await establishDataBaseConnection();
  } catch (error) {
    throw new Error("Failed to establish database connection");
  }
}

const PORT_NUMBER: number = PORT || 3000;
initApp()
  .then(() => {
    app.listen(PORT_NUMBER, () => {
      console.log(`Application is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
