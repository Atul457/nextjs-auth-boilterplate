import { MAIL } from '@/constants/mail.const'

const template = `<p
style="font-family: "Vidaloka", serif; mso-line-height-rule: exactly; margin-bottom: 0; font-size: 20px; font-weight: 600;">
Hey [USER_NAME]</p>
<br>
<p
style="font-family: 'Poppins', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 24px;">
A request to reset password was received for your
<span style="font-weight: 600;">${process.env.NEXT_PUBLIC_APP_NAME} account</span>.
</p>
<br>
<table cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td
    style="mso-line-height-rule: exactly; mso-padding-alt: 16px 24px; border-radius: 4px; background-color: #002047; font-family: Poppins, -apple-system, 'Segoe UI', sans-serif;">
    <a href="[RESET_PASSWORD_URL]"
        style="font-family: 'Rajdhani', sans-serif; mso-line-height-rule: exactly; display: block; padding-left: 24px; padding-right: 24px; padding-top: 16px; padding-bottom: 16px; font-size: 16px; font-weight: 600; line-height: 100%; color: #ffffff; text-decoration: none;">Reset
        Password &rarr;</a>
</td>
</tr>
</table>
<br>
<p
style="font-family: 'Poppins', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-top: 24px; margin-bottom: 24px;">
    Please Note: This link is valid for 10 minutes from the time it was sent to you and can be used to change your password only once. After the expiration of the time period you need to again request for password reset.
</p>
<p
style="font-family: 'Poppins', sans-serif; mso-line-height-rule: exactly; margin: 0;">
If this was a mistake, just ignore this email and nothing will happen.
</p>
<br>
`

const forgotPasswordTemplate = {
  template,
  subject: MAIL.SUBJECTS.FORGOT_PASSWORD,
  keysToReplace: {
    userName: '[USER_NAME]',
    resetPasswordUrl: '[RESET_PASSWORD_URL]'
  }
}

export { forgotPasswordTemplate }
