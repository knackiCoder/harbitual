const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodeMailerConfig");

const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport(nodemailerConfig);

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject, 
        html,
    }

    const info = await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;