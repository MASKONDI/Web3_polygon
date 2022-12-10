
var jwt = require('jsonwebtoken');
require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())


// Routes
app.use('/api', require('./routes/ethroutes'))


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})