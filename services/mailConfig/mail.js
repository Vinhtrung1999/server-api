const ejs = require("ejs")
let sendMail = async (receiver, subject, msg, news, transporter) => {
    const bodymail = await ejs.renderFile(__dirname + "/../mailBody/bodyMail.ejs", { msg, news }) //html file -> text
    let mailOptions = {
        to: receiver,
        subject: subject,
        html: bodymail
    }
    let result = await transporter.sendMail(mailOptions)
    return result
}

module.exports = sendMail