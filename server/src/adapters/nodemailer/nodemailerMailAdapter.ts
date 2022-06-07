import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "72acc536443f02",
    pass: "76207ea8241cc9",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    //configurações de envio de email
    await transport.sendMail({
      from: "Equipe Feedget <oi@gmail.com>",
      to: "Marcos vinicius <souza.marcosv2@gmail.com>",
      subject,
      html: body,
    });
  }
}
