const express = require("express");
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const userRoutes = require('../routes/user');
const { PrismaClient} = require('@prisma/client')
const gameRoutes = require('../routes/game');
const server = http.createServer(app);
const socketIo = require('socket.io');
const axios  = require("axios");
const cors = require('cors');
const {isAuthenticated} =require('../middleWare/userAuthentication')
const prisma = new PrismaClient();
const io = socketIo(server)

// Use body-parser middleware before defining routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());

app.use('/user', userRoutes);
app.use('/game', gameRoutes);

const getTime = (time)=>{
  switch(time){
    case '5m':
      return new Date(Date.now() - 5*60*1000);
    case '10m':
      return new Date(Date.now() - 10*60*1000);
    case '30m':
      return new Date(Date.now() - 30*60*1000);
    case '1h':
      return new Date(Date.now() - 60*60*1000);
    default:
      return new Date(0);  
  }
}

const fetchLeaderBoard =async(time)=>{
   console.log(time)
  const timeCondition = getTime(time);


  try{
      const games = await prisma.game.findMany({
          where:{
              timestamp:{
                  gte:timeCondition
              },
              
          },
          orderBy:{
              score:"desc"
          },
          take:10
      });
 

      return games
      
  } catch (error) {
      console.log(error.message)
      
  }
}

io.on("connection",(socket)=>{
   console.log("User Connected");
   socket.on("getLeaderBoard",async(time)=>{
    const leaderBoard = await fetchLeaderBoard(time);

    socket.emit("LeaderBoardData",leaderBoard);
   });

   socket.on('disconnect', () => {
    console.log('user disconnected');
});
})

app.put('/game/updateScore/:id',isAuthenticated,async(req,res)=>{
  try {
      const gameid = req.params.id;
      const {score,blueTriangles} = req.body;
      const gameSession = await prisma.game.update({
          where:{
              id:gameid
          },
          data:{
              score:score,
              blueTriangles:blueTriangles
          }
      });

      const leaderboard = await fetchLeaderBoard('5m'); 
      io.emit('leaderboard_update', leaderboard);

      res.status(200).json({
          message:"User updated Successfully",
          gameSession
      })
      
  } catch (error) {
      res.status(500).json({
          message:error.message
      })
  }
}
);




app.get("/", (req, res) => res.send("Express on Vercel"));

server.listen(4000, () => console.log("Server ready on port 4000."));

module.exports = app;
