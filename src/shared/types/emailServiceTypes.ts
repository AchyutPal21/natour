type SMTPTransporterOptions = {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
};

type EmailSendingOptions = {
  from: string;
  to: string;
  subject: string;
  text?: string;
  template?: string;
  context?: Record<string, any>;
};

export { EmailSendingOptions, SMTPTransporterOptions };
