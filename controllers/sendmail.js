const mail = require('../services/mailConfig/mail')
let sendMail = async (req, res) => {
    let pkgMail = req.body
    if (pkgMail.receiver && pkgMail.subject && pkgMail.msg && pkgMail.news) {
        try {
            await mail(pkgMail.receiver, pkgMail.subject, pkgMail.msg, pkgMail.news)
            return res.send({ code: 0, message: 'Send mail success' })
        }
        catch (err) {
            console.log(err);
            return res.send({ code: 1, message: 'ERR! error send mail', err })
        }
    }
    return res.send({ code: 1, message: 'ERR! mail not enough params' })
}
module.exports = {
    sendMail
}