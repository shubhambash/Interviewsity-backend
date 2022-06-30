require('../../db/connections')
const Profile = require('../../db/models/profileSchema')
const User = require('../../db/models/userSchema')

module.exports = async function register(req, res) {
 
    //use destructuring to make things easy
    const { name, email, phone, password, location, institution } = req.body
    
    //backend validation
    console.log(name, email, phone, password)
 
  

    if(!name)
    {
        return res.status(422).json("enter name")
    }

    if(!email)
    {
        return res.status(422).json("enter email")
    }

    if(!phone)
    {
        return res.status(422).json("enter phone")
    }

    if(!password)
    {
        return res.status(422).json("enter pass")
    }

    if(!location)
    {
        return res.status(422).json("enter location")
    }

    if(!institution)
    {
        return res.status(422).json("enter institution")
    }

    

    try {

        // check is user already exists
           const userExist = await User.findOne({email:email})
           if(userExist) {
            return res.status(422).json("error: user email already exists")
            }

           
           
            // create a new instance of the model
            // not the best way : const user = new User(req.body)

            const user = new User({name, email, phone, password, location, institution})
    
            const userCreated = await user.save()
            if(userCreated)
            {

                //create a user profile


             
                
               
                const profile = new Profile({name , phone,location,institution,github : "@github-user-name",email : email, problemsSolved : 0,gfg : 0, hackerrank : 0 ,w3s : 0 ,leetcode : 0 , html : 0 ,css : 0 , js : 0 ,problemSolving : 0, rating : 0, behaviour : 10, experience : 0})
                const profileCreated = await profile.save()

                if(profileCreated)
                {
                     res.status(201).json("Registered succesfully")
                }
                
            }

            
    } catch (error) {

        //catches all errors
        console.log(error)
    }
    

    
}