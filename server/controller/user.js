const {PrismaClient} = require("prisma/prisma-client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()



exports.register = async(req,res)=>{
  try {
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(401).json({
            message:"Please Provide All the Details"
        })
    };

    const user = await prisma.user.findFirst({
        where:{
            email

        }
    });

    if(user){
        return res.status(402).json({
            message:"User Already Exists"
        })
    };

    const hashedPassword = await bcrypt.hash(password,10);
    const token = await jwt.sign({email:email},process.env.JWT_SECRET,{expiresIn:'1h'})


    const newUser  = await prisma.user.create({
        data:{
            username:username,
            email:email,
            password:hashedPassword
        }
    });

   
    res.status(200).json({
        message:"User Registered Successfully",
        newUser,
        token:token
    })

        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}



exports.login = async(req,res)=>{
    try {
      const {email,password} = req.body;
      if( !email || !password){
          return res.status(401).json({
              message:"Please Provide All the Details"
          })
      };
  
      const user = await prisma.user.findFirst({
        where:{
          email


        }
      });
  
      if(!user){
          return res.status(402).json({
              message:"User Does Not Exists"
          })
      };

      const isMatch = await bcrypt.compare(password,user.password);

      if(!isMatch){
        return res.status(403).json({
            message:"Wrong Password Please Try Again"
        })
      }
  
      const token = await jwt.sign({email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'});
  
  
     
  
      res.status(200).json({
          message:"User Logged in Successfully",
          user,
          token:token
      })
  
          
      } catch (error) {
          res.status(500).json({
              message:error.message
          })
      }
  }

  exports.logout = async(req,res)=>{
    try {
       
        res.cookie("token",null,{expires:new Date(Date.now())}).status(200).json({
            message:"User Logged Out SuccessFully"
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
  }

  exports.loaduser = async(req,res)=>{
    try {
        const user = req.user;
        res.status(201).json({
            user
        })
        
    } catch (error) {
        
        res.status(500).json({
            message:error.message
        })
    }
  }

  exports.getUsername = async(req,res)=>{
    try {
        const id = req.params.id;
        const username = await prisma.user.findFirst({
            id:id
        });

        res.status(200).json({
            message:"User fetched successfully",
            username
        })

        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
  }