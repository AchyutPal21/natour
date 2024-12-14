import { config } from "dotenv";
config({
  path: "./.env",
  debug: true,
});

// Application
const NODE_ENV: string = process.env.NODE_ENV!;
const PORT: number = (process.env.PORT && +process.env.PORT) || 3000;

// Database
const DATABASE_USER_PASSWORD: string = process.env.DATABASE_USER_PASSWORD!;
const DATABASE_USER_NAME: string = process.env.DATABASE_USER_NAME!;
const DATABASE_CONNECTION_URL: string = process.env.DATABASE_CONNECTION_URL!;

// Encryption
const ENCRYPT_SALT_ROUND: number = +process.env.ENCRYPT_SALT_ROUND!;

// Jwt
const JWT_SECRET: string = process.env.JWT_SECRET!;
const JWT_ACCESS_TOKEN_EXPIRES_IN: string =
  process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!;

const JWT_REFRESH_TOKEN_EXPIRES_IN: string =
  process.env.JWT_REFRESH_TOKEN_EXPIRES_IN!;

// Email service
const EMAIL_SERVICE_HOST: string = process.env.EMAIL_SERVICE_HOST!;
const EMAIL_SERVICE_PORT: number = +process.env.EMAIL_SERVICE_PORT!;
const EMAIL_SERVICE_USERNAME: string = process.env.EMAIL_SERVICE_USERNAME!;
const EMAIL_SERVICE_PASSWORD: string = process.env.EMAIL_SERVICE_PASSWORD!;
const JWT_VERIFICATION_TOKEN_EXPIRES_IN: string =
  process.env.JWT_VERIFICATION_TOKEN_EXPIRES_IN!;

// URLs
const EMAIL_VERIFICATION_URL: string = process.env.EMAIL_VERIFICATION_URL!;

export {
  DATABASE_CONNECTION_URL,
  DATABASE_USER_NAME,
  DATABASE_USER_PASSWORD,
  EMAIL_SERVICE_HOST,
  EMAIL_SERVICE_PASSWORD,
  EMAIL_SERVICE_PORT,
  EMAIL_SERVICE_USERNAME,
  EMAIL_VERIFICATION_URL,
  ENCRYPT_SALT_ROUND,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  JWT_SECRET,
  JWT_VERIFICATION_TOKEN_EXPIRES_IN,
  NODE_ENV,
  PORT,
};
