const imageUrl = `${process.env.NEXT_PUBLIC_APP_PROD_HOSTNAME}/Novotech-Logo.svg`

const template = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <title>[MAIL_SUBJECT]</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <style>
    .hover-underline:hover {
      text-decoration: underline !important;
    }

    @media (max-width: 600px) {
      .sm-w-full {
        width: 100% !important;
      }

      .sm-px-24 {
        padding-left: 24px !important;
        padding-right: 24px !important;
      }

      .sm-py-32 {
        padding-top: 32px !important;
        padding-bottom: 32px !important;
      }
    }
  </style>
</head>

<body
  style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #eceff1;">
  <div role="article" aria-roledescription="email" aria-label="Reset your Password" lang="en"
    style="font-family: "Poppins", sans-serif; mso-line-height-rule: exactly;">
    <table style="width: 100%; font-family: Poppins, -apple-system, 'Segoe UI', sans-serif;" cellpadding="0"
      cellspacing="0" role="presentation">
      <tr>
        <td align="center"
          style="mso-line-height-rule: exactly; background-color: #eceff1; font-family: Poppins, -apple-system, 'Segoe UI', sans-serif;">
          <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td class="sm-py-32 sm-px-24"
                style="mso-line-height-rule: exactly; padding: 20px; text-align: center; font-family: Poppins, -apple-system, 'Segoe UI', sans-serif;">
                <a href="#"
                  style="font-family: 'Poppins', sans-serif; mso-line-height-rule: exactly;">
                  <img src="${imageUrl}" width="200"  height="105" alt="${process.env.NEXT_PUBLIC_APP_NAME} App"
                    style="max-width: 100%; vertical-align: middle; line-height: 100%; border: 0;">
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" class="sm-px-24"
                style="font-family: 'Poppins', sans-serif; mso-line-height-rule: exactly;">
                <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="sm-px-24"
                      style="mso-line-height-rule: exactly; border-radius: 4px; background-color: #ffffff; padding: 48px; text-align: left; font-family: Poppins, -apple-system, 'Segoe UI', sans-serif; font-size: 16px; line-height: 24px; color: #626262;">
                      [MAIL_CONTENT]
                      <p
                        style="font-family: 'Poppins', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px;">
                        Best regards, <br>The ${process.env.NEXT_PUBLIC_APP_NAME} Team</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family: 'Poppins', sans-serif; mso-line-height-rule: exactly; height: 20px;">
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>

</html>`

const baseTemplate = {
  template,
  keysToReplace: {
    content: '[MAIL_CONTENT]',
    subject: '[MAIL_SUBJECT]'
  }
}

export { baseTemplate }
