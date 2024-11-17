import { config } from "dotenv";
config({
  path: "./.env",
  debug: true,
});

const NODE_ENV: string = process.env.NODE_ENV!;
const PORT: number = (process.env.PORT && +process.env.PORT) || 3000;
const DATABASE_USER_PASSWORD: string = process.env.DATABASE_USER_PASSWORD!;
const DATABASE_USER_NAME: string = process.env.DATABASE_USER_NAME!;
const DATABASE_CONNECTION_URL: string = process.env.DATABASE_CONNECTION_URL!;

export {
  DATABASE_CONNECTION_URL,
  DATABASE_USER_NAME,
  DATABASE_USER_PASSWORD,
  NODE_ENV,
  PORT,
};