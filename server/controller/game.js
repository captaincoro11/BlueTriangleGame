
const { get } = require('http');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()
exports.newGameSession = async(req,res)=>{

   try {
      
       const user = req.user;
       const newGame = await prisma.game.create({
        data:{
            userId: user.id
        }
       });

       res.status(200).json({
        message:"User created Successfully",
        newGame
       })




        

     } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
     }
}


exports.getAllGames = async(req,res)=>{
    try {
        const games = await prisma.game.findMany({
            orderBy:{
                score:"desc",
            },
            take:10
            
            
        });
        res.status(200).json({
            games

        })

        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}
