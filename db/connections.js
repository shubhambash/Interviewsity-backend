const mongoose = require('mongoose')
const DB = process.env.DATABASE


mongoose.connect(DB,{ useNewUrlParser: true }, function (err) { 
    if (err) throw err; console.log('DB Successfully connected'); })

