const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

routes(app)


//========*** Day 3 (Send mail) ***=======================================
// app.post('/send-mail', async (req, res) => {
//     console.log(emailAdmin);
//     //receiver: email of receiver
//     //transactionInfo: info of transaction: transaction id, registration id,...
//     let { receiver, transactionInfo } = req.body
//     if (receiver && transactionInfo.transactionID && transactionInfo.registrationID) {
//         const data = await ejs.renderFile(__dirname + "/services/mailBody/bodyMail.ejs", { transactionInfo }) //html file -> text
//         let mailOptions = {
//             from: emailAdmin, //email admin
//             to: receiver,
//             subject: 'Sending Email using Node.js',
//             html: data
//         }
//         try {
//             let result = await transporter.sendMail(mailOptions)
//             return res.json({ code: 0, message: 'Mail has been sent', data: transactionInfo })
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }
//     return res.json({ code: 1, message: 'Error' })
// })

app.listen(port, () => console.log(`
-----------------------------------------------------------------------
     API server running at: http://localhost:${port}
     Runtime environment: development
-----------------------------------------------------------------------
`))
