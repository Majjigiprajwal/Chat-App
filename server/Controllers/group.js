const Group = require('../Models/group')
const sequelise = require('../util/database')
const GroupMember = require('../Models/groupMember')
const User = require('../Models/user')
const {Op} = require('sequelize')


exports.createGroup = async (req,res,next)=>{
    const user = req.user
    const group = req.body
    let t;
     try{
          t = await sequelise.transaction()
          const response = await user.createGroup(group,{transaction : t})
          await GroupMember.create({userId:user.id,groupId:response.id,role:"admin"},{transaction :t})
          await  t.commit()
          return res.status(201).json({success:true,message:'Group created sucessfully',data:response})
     }
     catch(error){
        console.log(error)
            await t.rollback()
            return res.status(500).json({success:false,Message:'Failed to create group'})
     }
}

exports.getGroups = async (req,res,next)=>{
    const user = req.user
    try{
          const response = await GroupMember.findAll({
            where:{
              userId : user.id
            },
            include :[
              {
                model: Group,
                attributes: ['id', 'groupName'],
              },
            ]
          })
          return res.status(200).json({success:true,message:'Fetched groups successfully',data:response})
    }
    catch(error){
       console.log(error)
       return res.status(500).json({success:false,message:'Failed to get groups'})
    }
}

exports.getAllGroups = async (req,res,next)=>{
    const user = req.user;
     try{
      const userGroupIds = (await GroupMember.findAll({where:{userId : user.id}})).map((group) => group.groupId);
      const groups = await Group.findAll({
        where: {
          id: {
            [Op.notIn]: userGroupIds,
          },
        },
      });
         return res.status(200).json({success:true,message:'Fetched groups Successfully',data:groups})
     }
     catch(error){
         console.log(error)
         return res.status(200).json({success:false,message:'Failed fetch groups'})
     }
}

exports.joinGroup = async (req,res,next)=>{
      const user = req.user
      const group = req.body
      try{
          const response = await GroupMember.create({userId:user.id,groupId:group.groupId,role:'member'})
          return res.status(201).json({success:true,message:'Joined group successfully',data:response}) 
      }
      catch(error){
           return res.status(500).json({success:true,message:'Failed to join group'})
      }
}

exports.getGroupMembers = async (req,res,next)=>{
        const {groupId} = req.query
        console.log(groupId)
     try{
            const response = await GroupMember.findAll({
              where :{
                groupId : groupId
              },  include: [
                {
                  model: User,
                  attributes: ['id', 'name'],
                },
                {
                  model: Group,
                  attributes: ['admin'],
                }
              ]})

             return res.status(200).json({success:true,message:'Fetched groupMembers successfully',data:response})
     }
     catch(error){
       return res.status(500).json({success:false,message:'failed to fetch members'})
     }
}

exports.deleteGroupMember = async (req,res,next)=>{
      const userId = req.body.userId;
      const groupId = req.body.groupId
     try{
            const response = await GroupMember.destroy({where : {
              userId : userId,
              groupId : groupId
            }})
            return res.status(200).json({success:true,message:'Successfully removed from group',data:response})
     }
     catch(error){
      return res.status(500).json({success:false,message:'Failed to remove from group'})
     }
}

exports.assignAdminRole = async (req,res,next)=>{
           const userId = req.body.userId
           const groupId = req.body.groupId
      try{
           const response = await GroupMember.update({ role: 'admin' },{
            where :{
               userId : userId,
               groupId:groupId
            }
           })
           console.log(response)
           return res.status(200).json({success:true,message:'Successfully assigned admin role',data:response})
      }
      catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:'couldnot assign admin role'})
      }
}

exports.searchGroups = async (req,res,next)=>{
       const searchTerm = req.query.searchTerm
      const user = req.user
      console.log(searchTerm)
       try {
        
        const response = await GroupMember.findAll({
          where:{
            userId : user.id,
            ['$Group.groupName$']: {
              [Op.like]: `%${searchTerm}%`,
            },
          },
          include :[
            {
              model: Group,
              attributes: ['id', 'groupName'],
            },
          ]
        })
    
        res.status(200).json({ success: true, data: response});
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    
}
