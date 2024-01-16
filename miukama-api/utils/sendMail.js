const nodemailer = require('nodemailer');

const sendMail = (options) => {
  const config = {
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // sendMail Function take 2 arguments
  // 1) mailOptions
  // 2) a call back function for give status about your mail send or not
  // note -: without call back function sendMail function does not work

  transporter.sendMail(mailOptions);
};

module.exports = sendMail;
