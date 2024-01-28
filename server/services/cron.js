const {CronJob} = require('cron')
const Message = require('../Models/message')
const ArchivedMessage = require('../Models/archivedMessage')
const {Op} = require('sequelize')


exports. job = new CronJob(
	'59 11 * * *', 
	function () { 
		archiveMessages()
	}, 
	null,
	false,
    'Asia/Kolkata'
);

const archiveMessages = async ()=>{
       try{
        const twoDaysAgo = new Date()
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
        const oldMessages = await Message.findAll({where :{
            date_time :{
                [Op.lt] : twoDaysAgo
            }
        }})
        await Promise.all(
           await oldMessages.map(async(message)=>{ await ArchivedMessage.create({
              id : message.id,
              message : message.message,
              fileType : message.fileType,
              date_time : message.date_time,
              userId : message.userId,
              groupId : message.groupId
           })
           message.destroy()
        }
           ))
        
       }
       catch(error){
          console.log(error)
       }
}