
const mongoose = require('mongoose')


//define user schema for users
const queueSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    link : {
        type: String,
        required: true,
    }
 
})


// create a collection using the above schema
const Queue = mongoose.model('QUEUE', queueSchema)

module.exports = Queue
