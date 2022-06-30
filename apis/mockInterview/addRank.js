require('../../db/connections')
const InterviewRating = require('../../db/models/interviewRatingSchema')


module.exports = async function addRank(req, res) {

  
    const {email, rank} = req.body

    try {


       const addRank = await InterviewRating.updateOne(
        {email},
        {
         $push : {
            interviewRank :  {

                    rank : rank
                     
                   } 
          }
        });

      
        
    } catch (error) {
        console.log(error)
    }



}