const jwt = require('jsonwebtoken');
const User = require('../Models/user')

const isAuth = async (req,res,next)=>{

   const token = req.headers.authorization.split(' ')[1];

   const verify = jwt.verify(token,'new-chat-app');

   const user = await User.findOne({where :{id: verify.userId}})

   req.user = user;
   
    next();
}

module.exports =  isAuth