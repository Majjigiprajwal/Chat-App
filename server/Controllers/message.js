const Message = require('../Models/message')
const User = require('../Models/user')
const {Op} = require('sequelize')
const awsServices = require('../services/awsS3')

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
    const messageId = Number(req.query.lastMessageId)
    const groupId = Number(req.query.groupId)
    console.log(groupId)
    try{
         const response = await Message.findAll({where: {
          groupId: groupId,
          id: {
            [Op.gt]: messageId,
          },
        }, include: [
            {
              model: User,
              attributes: ['name'],
              as:'user'
            },
          ],})
         return res.status(200).json({success:true,message:'messsage fetched Successfully',data:response})
    }
    catch(error){
          console.log(error)
          return res.status(500).json({success:false,message:'Failed to fetch message'})
    }
}


exports.saveImageToS3 = async (req,res,next)=>{
       const user = req.user
       const groupId = req.query.groupId
    try{
        const timestamp = new Date().getTime();
        const fileName =`${timestamp}-${Math.floor(Math.random() * 1000)}.${user.id}.${user.name}`;
        const URL = await  awsServices.uploadToS3(fileName,req.file.buffer)
        const response = await user.createMessage({message :URL,groupId:groupId,fileType:'image'})
        return res.status(201).json({success:true,message:'saved image Successfully',data:response})
        
    }catch(error){
          console.log(error)
          return res.status(500).json({success:true,message:'cannot send the image at the moment'})
    }
}