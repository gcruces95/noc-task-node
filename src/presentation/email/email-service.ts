import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin';

export interface SendEmailOptions {

  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];

}

export interface Attachment {

  filename: string;
  path: string;

}

export class EmailService {

  private transporter = nodemailer.createTransport({

    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }

  });

  constructor() { }

  async sendEmail(options: SendEmailOptions): Promise<boolean> {

    const { to, subject, htmlBody, attachments = [] } = options;

    try {

      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments
      });

      console.log(sentInformation)

      return true;

    } catch (error) {

      return false;

    }

  }

  async sendEmalWithFileSystemLogs(to: string | string[]) {

    const subject = 'Logs del servidor';
    const htmlBody = `
            <h1>Logs de Sistema - NOC</h1>
            <p>Logs de sistema enviados por email</p>
            <p>Incididunt dolor eu exercitation irure. Enim minim enim velit mollit. Qui in cupidatat elit aliquip ex. Pariatur cupidatat dolor est dolor sint est est sint officia.</p>
            `;
    const attachments: Attachment[] = [

      { filename: 'logs-all.log', path: 'logs/logs-all.log' },
      { filename: 'logs-low.log', path: 'logs/logs-low.log' },
      { filename: 'logs-medium.log', path: 'logs/logs-medium.log' },
      { filename: 'logs-high.log', path: 'logs/logs-high.log' }

    ]

    return this.sendEmail({
      to, subject, htmlBody, attachments
    });
  }
}