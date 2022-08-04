const nodemailer = require('nodemailer')
const { mailAdmin, pwdApp, mailReceiver } = require('../services/config/base')
const sendMail = require('../services/mailConfig/mail')
var data = require('../data')
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: mailAdmin, //email admin
        pass: pwdApp //app pwd
    }
})
//=====READ===================
getData = (req, res) => {
    let page = req.query.page || 0
    if (page !== 0) {
        let start = (page * 10) - 10;
        let end = page * 10;
        let dataReturn = data.filter((val, index) => {
            if (index >= start && index < end) {
                return val
            }
        })
        return res.send({ code: 0, page: 1, length: dataReturn.length, data: dataReturn })
    }
    return res.send({ code: 0, length: data.length, data })

}

getAllData = (req, res) => {
    return res.send({ code: 0, length: data.length, data })
}

getDataByAction = (req, res) => {
    let action = req.body
    switch (action.type) {
        case "id":
            dataReturn = data.filter(val => val.id === action.id)
            return res.send({ code: 0, data: dataReturn })
        case "type":
            dataReturn = data.filter(val => val.type === action.typeNews)
            return res.send({ code: 0, data: dataReturn })
        default:
            return res.send({ code: 1, message: 'ERR! Your data doesn\'t exist' })
    }
}

//======CREATE===========
let createData = async (req, res) => {
    let news = req.body
    if (news.id && news.title && news.content && news.image && news.type) {
        let check = data.find(val => val.id == news.id)
        if (!check) {
            data = [...data, news]
            let result = await sendMail(mailReceiver, 'CREATE DATA', 'You have been created a post:', news, transporter)
            return res.send({ code: 0, message: 'create success', data: news })
        }
    }
    return res.send({ code: 1, message: 'Your data was created' })
}

//======UPDATE===========
let updateData = async (req, res) => {
    let newsUpdate = req.body
    if (newsUpdate.id && newsUpdate.title && newsUpdate.content && newsUpdate.image && newsUpdate.type) {
        let check = data.find(val => val.id == newsUpdate.id)
        if (check) {
            data.forEach((val, index) => {
                if (val.id === newsUpdate.id) {
                    data[index] = newsUpdate
                }
            })
            let result = await sendMail(mailReceiver, 'UPDATE DATA', 'You have been updated a post:', newsUpdate, transporter)
            return res.send({ code: 0, message: 'update success', data: newsUpdate })
        }
        else {
            return res.send({ code: 1, message: 'ERR! Your data doesn\'t exist' })
        }
    }
    return res.send({ code: 1, message: 'ERR! Your data not enough params' })
}

//======DELETE===========
let deleteData = async (req, res) => {
    let { id } = req.body
    if (id) {
        let check = data.find(val => val.id == id)
        if (check) {
            data = data.filter(val => val.id !== id)
            let result = await sendMail(mailReceiver, 'DELETE DATA', 'You have been deleted a post:', check, transporter)
            return res.send({ code: 0, message: 'delete success', data: check })
        }
        else {
            return res.send({ code: 1, message: 'ERR! Your data doesn\'t exist' })
        }
    }
    return res.send({ code: 1, message: 'ERR! Your data not enough params' })
}

module.exports = {
    createData,
    getData,
    getAllData,
    getDataByAction,
    updateData,
    deleteData
}