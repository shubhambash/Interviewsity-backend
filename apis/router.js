const express = require('express');
const router = express.Router()
const welcome = require('./welcome')
const register = require('./LoginSignup/register')
const login = require('./LoginSignup/login')

const getProfileData = require('./Profile/getProfileData')
const addRank = require('./mockInterview/addRank')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser');
// const authenticate = require('../middleware/authenticate')
require('../db/connections')
const User = require('../db/models/userSchema');
const authenticate = require('../middleware/authenticate');




//test router
router.get('/', welcome);



router.use(cookieParser()) ;
router.post('/register', register)
router.post('/login', login)


router.get('/profiledata/:email', getProfileData)

router.post('/addrank', addRank)

router.get('/auth', authenticate, (req, res) => {
    res.status(201).send(req.rootUser)
})

router.get("/logout", async (req, res) => {
    res.clearCookie('access_token')
    res.status(200).json("logged out")
})


module.exports = router