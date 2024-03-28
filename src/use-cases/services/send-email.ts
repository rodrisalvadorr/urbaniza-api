import { env } from '@/env'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export async function sendEmail(mailOptions: Mail.Options) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.AUTH_EMAIL,
      pass: env.AUTH_EMAIL_PASSWORD,
    },
  })

  const { rejected } = await transporter.sendMail(mailOptions)

  if (rejected.length !== 0) {
    return false
  }
  return true
}
