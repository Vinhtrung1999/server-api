const http = require('./http')
const CRUD = require('./controllers/CRUD')
const sendMail = require('./controllers/sendmail')
let routes = (app) => {
    //======READ========
    app.get('/getData', CRUD.getData)
    app.get('/getAllData', CRUD.getAllData)
    app.get('/getDataByAction', CRUD.getDataByAction)

    //======CREATE=======
    app.post('/addData', CRUD.createData)

    //======UPDATE=======
    app.put('/updateData', CRUD.updateData)

    //======DELETE=======
    app.delete('/deleteData', CRUD.deleteData)

    //======send mail========
    app.post('/sendMail', sendMail.sendMail)
}

module.exports = routes