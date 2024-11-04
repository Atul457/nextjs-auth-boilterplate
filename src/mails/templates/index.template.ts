import { baseTemplate } from './base.template'
import { forgotPasswordTemplate } from './forgotPassword.template'

const mailTemplates = {
  forgotPassword: {
    ...forgotPasswordTemplate,
    template: baseTemplate.template
      .replace(baseTemplate.keysToReplace.content, forgotPasswordTemplate.template)
      .replace(baseTemplate.keysToReplace.subject, forgotPasswordTemplate.subject)
  }
}

export { mailTemplates }
