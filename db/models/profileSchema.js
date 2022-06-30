
const mongoose = require('mongoose')


//define user schema for users
const profileSchema = new mongoose.Schema({
    name : {
        type: String,
    },
    phone : {
        type: String,
    },
    location : {
        type: String,
    },
    institution : {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    problemsSolved : {
        type : Number,

    },
    gfg : {
        type : Number,
    },
    hackerrank : {
        type : Number,
    },
    w3s : {
        type : Number,
    },
    leetcode : {
        type : Number,
    },
    rating : {
        type : Number,
    },
    html : {
        type : Number,
    },
    css : {
        type : Number,
    },
    js : {
        type : Number,
    },
    problemSolving : {
        type : Number,
    },
    github : {
        type : String,
    },
    behaviour : {
        type : Number,
    },
    experience : {
        type : Number,
    }

    

})


// create a collection using the above schema
const Profile = mongoose.model('PROFILE', profileSchema)

module.exports = Profile
