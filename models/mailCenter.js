const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

class mailCenter {
  constructor(receiver, password) {
    this.receiver = receiver;
    this.password = password;
    this.transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "thomas@wps-hr.net",
          pass: "htpjobs2014"
        },
        tls: {
          rejectUnauthorized: false
        }
      })
    );
    this.mailOptions = {
      from: "thomas@wps-hr.net",
      to: this.receiver,
      subject: "Please reset your password",
      text: "Your new password is: " + this.password
    };
  }

  sendEmail = () => {
    this.transporter.sendMail(this.mailOptions, function(err, info) {
      if (err) {
        console.log("this error" + err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };
}
module.exports = mailCenter;
