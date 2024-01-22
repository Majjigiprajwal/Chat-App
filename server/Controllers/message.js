const Message = require('../Models/message')
const User = require('../Models/user')
const {Op} = require('sequelize')

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
    try{
         const response = await Message.findAll({where: {
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