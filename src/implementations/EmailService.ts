import {
  EMAIL_SERVICE_HOST,
  EMAIL_SERVICE_PASSWORD,
  EMAIL_SERVICE_PORT,
  EMAIL_SERVICE_USERNAME,
  EMAIL_VERIFICATION_URL,
} from "@configs/env.js";
import { InternalException } from "@exceptions/InternalException.js";
import {
  EmailSendingOptions,
  SMTPTransporterOptions,
} from "@shared/types/emailServiceTypes.js";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

class EmailService {
  private transporter;
  private emailConfig: SMTPTransporterOptions;

  constructor() {
    this.emailConfig = {
      host: EMAIL_SERVICE_HOST,
      port: EMAIL_SERVICE_PORT,
      auth: {
        user: EMAIL_SERVICE_USERNAME,
        pass: EMAIL_SERVICE_PASSWORD,
      },
    };

    this.transporter = nodemailer.createTransport(this.emailConfig);

    // Configure Handlebars with partials
    this.transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".hbs",
          layoutsDir: path.resolve("src/templates"),
          defaultLayout: false,
          partialsDir: path.resolve("src/templates/partials"),
        },
        viewPath: path.resolve("src/templates/emails"),
        extName: ".hbs",
      })
    );
  }

  private async sendEmail(
    to: string,
    subject: string,
    emailTemplateName: string,
    context: Record<string, any>
  ) {
    try {
      const mailOptions: EmailSendingOptions = {
        from: context.from || "no-reply@yourdomain.com",
        to,
        subject,
        template: emailTemplateName,
        context,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new InternalException("Failed to send email.");
    }
  }

  public async sendVerificationEmail(
    userName: string,
    email: string,
    token: string
  ) {
    // ! This "verificationURL" should get frontend url. Upon verifying the link,
    // ! url will go to the frontend and frontend will request to the backend with the same token to verify.
    const verificationURL = `${EMAIL_VERIFICATION_URL}?token=${token}`;
    await this.sendEmail(
      email,
      "Verify Your Email Address",
      "verificationEmail",
      {
        userName,
        verificationLink: verificationURL,
        year: new Date().getFullYear(),
      }
    );
  }
}

export { EmailService };
