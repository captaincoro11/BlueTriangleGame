const jwt= require('jsonwebtoken');
const dotenv  = require('dotenv');
dotenv.config({});
const {PrismaClient} = require('prisma/prisma-client');
const prisma = new PrismaClient();

exports.isAuthenticated = async(req,res,next)=>{

    try {
        const authHeader = req.headers.authorization;
        const [type,token] = authHeader.split(' ');

        if(type!=="Bearer"){
            return res.status(403).json({
                message:"Token is not Bearer type"
            })
        };

        if(!token){
            return res.status(402).json({
                message:"Token is required"
            })
        };

        const decoded = await jwt.verify(token,process.env.JWT_SECRET);

        const user = await prisma.user.findFirst({
            where:{
                email:decoded.email

            }
        });

        req.user = user

        next();
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }

}