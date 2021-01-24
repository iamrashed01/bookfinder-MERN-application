const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (to, code) => {
  const msg = {
    to,
    from: process.env.SENDGRID_SEND_FROM, // Use the email address or domain you verified above
    subject: 'Account Verification Mail From BookFinder',
    text: `To verify account use this code: ${code}`,
    html: `<h1>To verify account use this code: <i>${code}</i></h1>`,
  };
  sgMail
    .send(msg)
    .then(() => {}, (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    });
};

module.exports = sendMail;
