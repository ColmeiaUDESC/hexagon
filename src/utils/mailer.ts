import nodemailer from 'nodemailer';
import { env } from '../env/server.mjs';

interface Props {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail({ ...props }: Props) {
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_SERVER,
    port: Number(env.EMAIL_PORT),
    secure: true,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: '"Hexagon" <colmeiasexo@gmail.com>',
    to: props.to,
    subject: props.subject,
    text: props.text,
    html: props.html
  });

  transporter.close();
}
