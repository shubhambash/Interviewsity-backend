
const mongoose = require('mongoose')


//define user schema for users
const interviewRatingSchema = new mongoose.Schema({
    
    email :{
        type : String,
        required : true
    },
    interviewRank : [{
        rank : String,
    }]

    

})


// create a collection using the above schema
const InterviewRating = mongoose.model('INTERVIEWRATING', interviewRatingSchema)

module.exports = InterviewRating
