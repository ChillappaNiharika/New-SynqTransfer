const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: true, // use false if port is 587, true if port is 465
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.sendFileEmail = async ({ to, from, title, message, link }) => {
  const info = await transporter.sendMail({
    from: `"SynqTransfer" <${from}>`,
    to,
    subject: title || "File Shared via SynqTransfer",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #F9F9F9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background-color: #FF6F3C; padding: 20px; text-align: center;">
            <img src="cid:logo_cid" alt="SynqTransfer" style="height: 40px;" />
            <h1 style="color: white; margin: 0; font-size: 20px;">SynqTransfer</h1>
          </div>

          <!-- Body -->
          <div style="padding: 20px; color: #232323;">
            <p style="font-size: 16px;">${message || "You have received a file via SynqTransfer."}</p>
            <p style="font-size: 16px;">Click the button below to download your file:</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <a href="${link}" target="_blank" style="background-color: #FFC93C; color: #232323; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
                Download File
              </a>
            </div>

            <p style="font-size: 14px; color: #7D7D7D;">This link will expire in 24 hours for your privacy and security.</p>
          </div>

          <!-- Footer -->
          <div style="background-color: #F1F1F1; padding: 12px; text-align: center; font-size: 12px; color: #7D7D7D;">
            © ${new Date().getFullYear()} SynqTransfer. All rights reserved.
          </div>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: 'logo.png',
        path: './public/images/Logo with text.png',
        cid: 'logo_cid'
      }
    ]
  });

  console.log("📧 Email sent:", info.messageId);
};

exports.sendConfirmationEmail = async ({ to, title, link }) => {
  const info = await transporter.sendMail({
    from: `"SynqTransfer" <${process.env.MAIL_USER}>`,
    to,
    subject: "Your file has been sent successfully ✔",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #F9F9F9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
          <div style="background-color: #FF6F3C; padding: 20px; text-align: center;">
            <img src="cid:logo_cid" alt="SynqTransfer" style="height: 40px;" />
            <h1 style="color: white; margin: 0; font-size: 20px;">SynqTransfer</h1>
          </div>
          <div style="padding: 20px; color: #232323;">
            <p style="font-size: 16px;">Your file has been shared successfully.</p>
            <p style="font-size: 16px;">Here is the download link (valid for 24 hours):</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${link}" target="_blank" style="background-color: #FFC93C; color: #232323; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
                View File
              </a>
            </div>
          </div>
          <div style="background-color: #F1F1F1; padding: 12px; text-align: center; font-size: 12px; color: #7D7D7D;">
            © ${new Date().getFullYear()} SynqTransfer. All rights reserved.
          </div>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: 'logo.png',
        path: './public/images/Logo with text.png',
        cid: 'logo_cid',
      }
    ]
  });

  console.log("📧 Confirmation email sent to sender:", info.messageId);
};
