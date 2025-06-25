const ContactMessage = require('../models/ContactMessage');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: true, // false if 587, true if 465
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.saveAndNotify = async ({ name, email, message }) => {
  // Save to MongoDB
  const newMessage = new ContactMessage({ name, email, message });
  await newMessage.save();

  // Send email to support
  await transporter.sendMail({
    from: `"SynqTransfer Contact" <${process.env.MAIL_USER}>`,
    to: 'ashishyelisetty@gmail.com',
    subject: `📬 New Contact Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #F9F9F9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background-color: #FF6F3C; padding: 20px; text-align: center;">
            <img src="cid:logo_cid" alt="SynqTransfer Logo" style="height: 40px;" />
            <h1 style="color: white; margin: 0; font-size: 20px;">SynqTransfer</h1>
          </div>

          <!-- Body -->
          <div style="padding: 20px; color: #232323;">
            <h2 style="margin-top: 0;">New Contact Message Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
            <p style="font-size: 12px; color: gray;">Received on ${new Date().toLocaleString()}</p>
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
        cid: 'logo_cid' // referenced by src="cid:logo_cid"
      }
    ]
  });
};
