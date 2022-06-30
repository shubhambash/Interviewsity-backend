const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')

//define user schema for users
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: true
    }, 
    institution : {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
    

})



userSchema.pre('save',async function(next) {
    //hash the password before executing event save
   
    if(this.isModified('password'))
    {
        console.log("inside the hashing pre middleware fun")
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
})

//generating a token
userSchema.methods.generateAuthToken = async function(){
    try {

        var token = jwt.sign({_id: this._id}, 'shhhhh');
        this.tokens = this.tokens.concat({token:token}) 
        await this.save()
        return token;
    } catch (error) {
        console.log("token gen error", error)
    }
}



// create a collection using the above schema
const User = mongoose.model('USER', userSchema)

module.exports = User
