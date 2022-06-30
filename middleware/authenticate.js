const jwt = require('jsonwebtoken')
const User = require("../db/models/userSchema")


// verify if user is logged in
const authenticate = async (req, res, next) =>{

    try {
        
        //get token 
        console.log(req.cookies.access_token)
        const token = req.cookies.access_token
        const verifyToken = jwt.verify(token, 'shhhhh')

        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token": token})

        if(!rootUser)
        {
            throw new Error('User not found')
        }

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next()

    } catch (error) {
        res.status(401).send("Unauthorised")
        console.log(error)
    }

}

module.exports = authenticate