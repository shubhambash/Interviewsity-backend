require('../../db/connections')
const User = require('../../db/models/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const express = require('express')
const router = express.Router()
const cors = require('cors')

router.use(cookieParser())


router.use(cors({origin : "http://localhost:3000", credentials : true}))

module.exports = async function(req, res) {

    const {email, password} = req.body;

    //backend validdation phase 1
    if(!email || !password)
    {
        res.status(422).json("Please enter the fields")
    }


    try {

        // backend validation phase 2
        const userExist = await User.findOne({email: email})

        //email exists now check password match
        if(userExist != null)
        {
            const isMatch = await bcrypt.compare(password, userExist.password)
            if(isMatch)
            {
                //generate token
                const token = await userExist.generateAuthToken()

                //create a cookie jwtoken whenever user logs in

                
                res.cookie("access_token", token, {
                httpOnly: true,
            
                })
                res.status(201).json("logged in")


                // res.cookie("jwtoken", token, {
                //     expires: new Date(Date.now() + 2589000000),
                //     httpOnly: true
                // })
            
            }
            else
            {
                res.status(422).send("Wrong details entered")
            }
        }
        else
        {
            res.status(422).json("user doesn't exist")
        }
        
    } catch (error) {
        console.log(error)
    }



}