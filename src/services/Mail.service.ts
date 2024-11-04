import { mailTemplates } from '@/mails/templates/index.template'
import { generateRes, IGenerateResReturn } from '@/utils/generateRes'
import nodemailer, { Transporter } from 'nodemailer'
import { ErrorHandlingService } from './ErrorHandling.service'

interface MailOptions {
  from?: string
  to: string
  subject: string
  text?: string
  template: string
}

interface IBaseSendMailArgs {
  email: string
}

interface IForgotPasswordMail extends IBaseSendMailArgs {
  userName: string
  resetPasswordUrl: string
}

class MailService {
  private transporter: Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT || '587', 10),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    })
  }

  public async sendMail(options: MailOptions): Promise<IGenerateResReturn> {
    const mailOptions = {
      from: `${process.env.NEXT_PUBLIC_APP_NAME} <${options.from || process.env.MAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.template
    }

    try {
      await this.transporter.sendMail(mailOptions)
      return generateRes({
        status: true,
        message: `Email sent to ${options.to}`
      })
    } catch (error) {
      throw ErrorHandlingService.somethingWentWrong({
        message: `Error sending email: ${(error as Error).message}`
      })
    }
  }

  public async forgotPasswordMail(args: IForgotPasswordMail): Promise<IGenerateResReturn> {
    const { forgotPassword } = mailTemplates
    const template = forgotPassword.template
      .replace(forgotPassword.keysToReplace.resetPasswordUrl, args.resetPasswordUrl)
      .replace(forgotPassword.keysToReplace.userName, args.userName)

    return await this.sendMail({
      to: args.email,
      subject: forgotPassword.subject,
      template
    })
  }
}

export default new MailService()
