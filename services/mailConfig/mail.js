const ejs = require("ejs")
const nodemailer = require('nodemailer')
const { mailAdmin, pwdApp } = require('../../services/config/base')

let mail = async (receiver, subject, msg, news) => {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: mailAdmin, //email admin
            pass: pwdApp //app pwd
        }
    })
    const bodymail = await ejs.renderFile(__dirname + "/../mailBody/bodyMail.ejs", { msg, news }) //html file -> text
    let mailOptions = {
        to: receiver,
        subject: subject,
        html: bodymail
    }
    let result = await transporter.sendMail(mailOptions)
    return result
}

module.exports = mail