require('dotenv').config();
const mailTemplate = require('./sendMailTemplate');
const SibApi = require('sib-api-v3-sdk');

const SibClient = SibApi.ApiClient.instance;
SibClient.authentications['api-key'].apiKey = process.env.API_KEY;

const transactionEmailApi = new SibApi.TransactionalEmailsApi();
let smtpMailData = new SibApi.SendSmtpEmail();

const sender = {
  email: process.env.SENDER_EMAIL,
  name: process.env.SENDER_NAME,
};

const sendinBlueMail = async (options) => {
  try {
    smtpMailData.sender = sender;
    smtpMailData.to = [
      {
        email: options.email,
        name: options.name,
      },
    ];
    smtpMailData.subject = options.subject;
    smtpMailData.htmlContent = mailTemplate(options.redirectLink);
    await transactionEmailApi.sendTransacEmail(smtpMailData);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendinBlueMail;
