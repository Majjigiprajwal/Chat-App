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

exports.getMessages = async (req,res,next)=>{
    const user = req.user;
    try{
         const response = await user.getMessages()
         return res.status(200).json({success:true,message:'messsage fetched Successfully',data:response})
    }
    catch(error){
          console.log(error)
          return res.status(500).json({success:false,message:'Failed to fetch message'})
    }
}