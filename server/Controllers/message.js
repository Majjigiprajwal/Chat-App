const Messsage = require('../Models/message')


exports.postMessage = async (req,res,next)=>{
    const user = req.user;
    const message = req.body;
    try{
         const response = await user.createMessage(message)
         return res.status(201).json({success:true,message:'messsage Saved Successfully'})
    }
    catch(error){
          return res.status(500).json({success:false,message:'Failed to save message'})
    }
}

exports.getMessages = async ()=>{
    try{

    }
    catch(error){

    }
}