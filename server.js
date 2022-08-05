const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

routes(app)

app.listen(port, () => console.log(`
-----------------------------------------------------------------------
     API server running at: http://localhost:${port}
     Runtime environment: development
-----------------------------------------------------------------------
`))
