const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const nodemailer = require('nodemailer')
var data = require('./data')
const ejs = require("ejs")

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "trungtran.110199@gmail.com",
        pass: "wesxnquszceigwel"
    },
    tls: {
        rejectUnauthorized: false
    }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    return res.json({ code: 0, message: 'Welcome to api' })
})

//========*** Day 1 ***=======================================
app.get('/listNews/:page?', (req, res) => {
    let page = req.params.page || 1;
    let start = (page * 10) - 10;
    let end = page * 10;
    let data_return = data.filter((val, index) => {
        if (index >= start && index < end) {
            return val
        }
    })
    return res.json({ code: 0, data: data_return })
})

app.get('/news-detail/:id', (req, res) => {
    let id = req.params.id;
    if (!id)
        return res.json({ code: 1, message: 'enter id' })

    let data_return = data.filter(val => val.id === id)
    return res.json({ code: 0, data: data_return })
})

//========*** Day 2 ***=======================================

//Get data (use query)
app.get('/getData', (req, res) => {
    let page = req.query.page || 0
    if (page !== 0) {
        let start = (page * 10) - 10;
        let end = page * 10;
        let data_return = data.filter((val, index) => {
            if (index >= start && index < end) {
                return val
            }
        })
        return res.json({ code: 0, page: 1, length: data_return.length, data: data_return })
    }
    return res.json({ code: 0, length: data.length, data })

})

app.get('/getAllData', (req, res) => {
    return res.json({ code: 0, length: data.length, data })
})

app.get('/getDataByAction', (req, res) => {
    let action = req.body
    switch (action.type) {
        case "id":
            data_return = data.filter(val => val.id === action.id)
            return res.json({ code: 0, data: data_return })
        case "type":
            data_return = data.filter(val => val.type === action.typeNews)
            return res.json({ code: 0, data: data_return })
        default:
            return res.json({ code: 1, message: 'Error' })
    }
})

//create data
app.post('/addData', (req, res) => {
    let news = req.body
    if (news.id && news.title && news.content && news.image && news.type) {
        let check = data.find(val => val.id == news.id)
        if (!check) {
            data = [...data, news]
            return res.json({ code: 0, message: 'create success', data: news })
        }
    }

    return res.json({ code: 1, message: 'Error' })
})

//update data
app.put('/updateData', (req, res) => {
    let news_update = req.body
    if (news_update.id && news_update.title && news_update.content && news_update.image && news_update.type) {
        let check = data.find(val => val.id == news_update.id)
        if (check) {
            data.forEach((val, index) => {
                if (val.id === news_update.id) {
                    data[index] = news_update
                }
            })
            return res.json({ code: 0, message: 'update success', data: news_update })
        }
    }
    return res.json({ code: 1, message: 'Error' })
})

//delete data
app.delete('/deleteData', (req, res) => {
    let { id } = req.body
    if (id) {
        let check = data.find(val => val.id == id)
        if (check) {
            data = data.filter(val => val.id !== id)
            return res.json({ code: 0, message: 'delete success', data: check })
        }
    }
    return res.json({ code: 1, message: 'Error' })
})

//========*** Day 3 (Send mail) ***=======================================
app.post('/send-mail', async (req, res) => {
    //receiver: email of receiver
    //transactionInfo: info of transaction: transaction id, registration id,...
    let { receiver, transactionInfo } = req.body
    if (receiver && transactionInfo.transactionID && transactionInfo.registrationID) {
        const data = await ejs.renderFile(__dirname + "/views/bodyMail.ejs", { transactionInfo }) //html file -> text
        let mailOptions = {
            from: 'trungtran.110199@gmail.com',
            to: receiver,
            subject: 'Sending Email using Node.js',
            html: data
        }
        try {
            let result = await transporter.sendMail(mailOptions)
            return res.json({ code: 0, message: 'Mail has been sent', data: transactionInfo })
        }
        catch (err) {
            console.log(err)
        }
    }
    return res.json({ code: 1, message: 'Error' })
})

app.listen(port, () => console.log(`http://localhost:${port}`))