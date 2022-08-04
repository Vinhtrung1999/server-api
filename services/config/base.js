require('dotenv').config()
const mailAdmin = process.env.ADMIN_MAIL //email of sender
const pwdApp = process.env.APP_PASSWORD //password of app 
const mailReceiver = process.env.RECEIVER_MAIL //email of receiver
module.exports = { mailAdmin, pwdApp, mailReceiver }