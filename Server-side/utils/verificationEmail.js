const sendEmail = require("./sendMail");

const verificationEmail = async({
    name,
    email,
    verificationToken,
    origin
}) => {
    const verifyEmail = `${origin}/verify-email/?token=${verificationToken}&email=${email}`

    const message = `<p>Please confirm your email by clicking the link below.</p>
    
    <br><br>Verification Link: ${verifyEmail}`;

    return sendEmail({
        to: email,
        subject: "Email confirmation",
        html: `<h3>Hello ${name},</h3>
        ${message}`
    });
};

module.exports = verificationEmail;