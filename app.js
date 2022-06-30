const express = require('express')
const app = express();
const port = 5000 || process.env.PORT;
const dotenv = require('dotenv')
var cors = require('cors')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const router = express.Router()
const authenticate = require('./middleware/authenticate')
const {v4 : uuidV4} = require('uuid');
const Queue = require('./db/models/queueSchema');
const Profile = require('./db/models/profileSchema')

global.case = 0;
global.mod = 11;

app.use(cors({origin : "http://localhost:3000", credentials : true}))



app.use(express.json())

dotenv.config({path: './config.env'})
app.use(require('./apis/router'));
app.set('view engine', 'ejs')
app.use(express.static('public'))



app.get('/:room', (req, res) => {

    res.render('room', { roomId: req.params.room })
  })

app.post('/mock', async function mockInterview(req, res)
{

    console.log("root user email is", req.body)

    console.log(global.case)

    // use this during prod
    // if(global.case > 0 && global.case <= 10)
    // {

    if(global.case == 0)
    {

      // use this during prod
      // global.case = (global.case + 1) % mod;

        global.case = 1;

        try {

            //check if user already in queue

            const in_queue = await Queue.findOne({email : req.body.email})
            
            //  get user attributes

            if(!in_queue)
            {
              const profile = await Profile.findOne({email:req.body.email})
            
              if(!profile)
              {
                  res.status(422).json("an error occured")
              }
              const problemsSolved = profile?.problemsSolved
              const rating = profile?.rating
              const behaviour = profile?.behaviour
              const experience = profile?.experience
  
              let score = problemsSolved + rating + behaviour + experience;
  
              // generate a room for socket io interview
              const roomId = uuidV4()
         
  
  
              // store score, email and the socketio server link to waiting queue in db
              const queue = new Queue({email : req.body.email, score, link : roomId});
              const queueAdded = await queue.save()
  
              if(!queueAdded)
              {
                  res.status(422).json("problem occured while queueing")
              }
  
              // return the socket io link as a response 
              res.status(201).send({roomId})
            }
            else{
              res.status(409).json("already in queue")
            }

        } catch (error) {
            console.log(error)
        }

  
    }
    else
    {

     // use this during prod
     // global.case = (global.case + 1) % mod;

      global.case = 0;

        try {

          const profile = await Profile.findOne({email:req.body.email})
            
          if(!profile)
          {
              res.status(422).json("an error occured")
          }
          const problemsSolved = profile?.problemsSolved
          const rating = profile?.rating
          const behaviour = profile?.behaviour
          const experience = profile?.experience

          let score = problemsSolved + rating + behaviour + experience;

          let lowerLim = score - 20;
          let upperLim = score + 20;

          const match = await Queue.findOne({ email : "shubham@yopmail.com"})
          console.log("score", score)
          if(!match)
          {
            res.status(422).json("could not find peer")
          }
          console.log(match.email)
          const roomId = match.link
          res.status(200).send({roomId})
          
        } catch (error) {
          console.log(error)
        }
       
    }



}
)

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId)
      socket.to(roomId).emit('user-connected', userId)
  
      socket.on('disconnect', () => {
        socket.to(roomId).emit('user-disconnected', userId)
      })
    })
  })






require('./db/connections')





server.listen(port, () => {console.log("server running at port ", port)});