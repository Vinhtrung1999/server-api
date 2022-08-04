let routes = (app) => {
    const CRUD = require('./controllers/CRUD')
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
}

module.exports = routes