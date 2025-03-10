import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(to: string, subject: string, text: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
  }
  
await transporter.sendMail(mailOptions);

}
