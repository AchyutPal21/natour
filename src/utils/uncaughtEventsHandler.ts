import { Server } from "http";
import mongoose from "mongoose";

const CLEANUP_TIMEOUT = 10000;

async function cleanUpResources() {
  console.log("Cleaning up resources...");

  // Close MongoDB connection
  if (mongoose.connection.readyState !== 0) {
    try {
      await mongoose.connection.close();
      console.log("Database connection closed.");
    } catch (error) {
      console.error("Error while closing the database connection:", error);
    }
  }

  // Other Connections...
}

async function shutdown(server: Server, error: Error | null = null) {
  if (error) {
    console.error("Shutting down due to error:", error.message);
    console.error("Stack Trace:", error.stack);
  } else {
    console.log("Initiating graceful shutdown...");
  }

  console.log("Closing server...");
  server.close(async () => {
    try {
      // Add a timeout to ensure cleanup doesn't hang
      await Promise.race([
        cleanUpResources(),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Cleanup timeout")),
            CLEANUP_TIMEOUT
          )
        ),
      ]);
      console.log("Cleanup completed. Exiting.");
      process.exit(error ? 1 : 0); // Exit with appropriate code
    } catch (cleanupError) {
      console.error("Error during cleanup:", cleanupError);
      process.exit(1); // Force exit with error code
    }
  });
}

function unhandledSigint(server: Server) {
  process.on("SIGINT", (error: Error) => {
    console.log("SIGINT received");
    shutdown(server, error);
  });
}

function unhandledSigterm(server: Server) {
  process.on("SIGTERM", (error: Error) => {
    console.log("SIGTERM received");
    shutdown(server, error);
  });
}

function unhandledRejectionHandler(server: Server) {
  process.on("unhandledRejection", (error: Error) => {
    console.error("Unhandled Rejection Caught.");
    shutdown(server, error);
  });
}

function uncaughtExceptionHandler(server: Server) {
  process.on("uncaughtException", (error: Error) => {
    console.error("Uncaught Exception Caught.");
    shutdown(server, error);
  });
}

export {
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
  unhandledSigint,
  unhandledSigterm,
};
