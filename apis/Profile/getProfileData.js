require('../../db/connections')
const Profile = require('../../db/models/profileSchema')


module.exports = async function getProfileData(req, res) {
 
    const email = req.params.email;
    console.log(email)

    try {

        // check is profile exists
           const userExist = await Profile.findOne({email:email})
           if(userExist) {

            return res.status(200).send(userExist)

            }

            
    } catch (error) {

        //catches all errors
        console.log(error)
    }
    

    
}