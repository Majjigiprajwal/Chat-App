const Sib =  require('sib-api-v3-sdk')
const { v4: uuidv4 } = require('uuid');
const PasswordRequest = require('../Models/forgotPassword')
const User = require('../Models/user')
const sequelise = require('../util/database')
const bcrypt = require('bcrypt');
const passwordRequest = require('../Models/forgotPassword');
const saltRounds = 8;

const Client = Sib.ApiClient.instance;

const apiKey = Client.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY

exports.sendEmail = async (req,res,next)=>{
       const email = req.body.email
       const id = uuidv4()
       let t;
    try{
        t = await sequelise.transaction()
        const user = await User.findOne({where :{email : email }})
        if(!user){
          return res.status(404).json({success: false,message:'No user found please signup'})
        }
        await user.createPasswordRequest({id : id,isActive:true},{transaction : t})
        const transEmailApi = new Sib.TransactionalEmailsApi()
        const sender = {
          email:'9945163195ab@gmail.com',
          name : 'Prajwal G Majjigi'
        } 
        const reciever = [{
            email : email
          }]

        const response = await  transEmailApi.sendTransacEmail({
             sender,
             to:reciever,
             subject:'Reset Password',
             htmlContent :`<!DOCTYPE html>
             <html lang="en">
             
             <head>
               <meta charset="UTF-8">
               <meta name="viewport" content="width=device-width, initial-scale=1.0">
               <title>Password Reset</title>
               <style>
                 body {
                   font-family: Arial, sans-serif;
                   margin: 0;
                   padding: 0;
                   background-color: #f4f4f4;
                 }
             
                 .container {
                   max-width: 600px;
                   margin: 20px auto;
                   padding: 20px;
                   background-color: #ffffff;
                   border-radius: 5px;
                   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                   font-size:15px;
                   font-weight:500;
                 }
             
                 h1 {
                   color: #333333;
                 }
             
                 p {
                   color: #666666;
                 }
             
                 .button {
                   display: inline-block;
                   padding: 12px 12px;
                   background-color: #ff9999;
                   color: #ffffff;
                   text-decoration: none;
                   border-radius: 15px; 
                   font-size: 20px;
                 }
             
                 .button:hover {
                   background-color: #ff6666;
                 }
               </style>
             </head>
             
             <body>
               <div class="container">
                 <h1>Password Reset</h1>
                 <p>Hello,</p>
                 <p>You have requested to reset your password. Click the link below to reset your password:</p>
                 <p><a class="button" href="http://group-chat-application.s3-website-us-east-1.amazonaws.com/reset-password/${id}">Reset Password</a></p>
                 <p>If you did not request a password reset, please ignore this email.</p>
                 <p>Thank you,</p>
                 <p>Expense Tracker pvt ltd</p>
               </div>
             </body>
             </html>`,
        },{transaction: t})
        await t.commit()
        return res.status(200).json({success:true,message:'Email sent successfully'})

    }
    catch(error){
      console.log(error)
       await t.rollback()
       return res.status(500).json({success:false,message:'Could not send mail try after sometime'})

    }
}

exports.resetPassword = async (req,res,next)=>{
       const id = req.body.id
       const password = req.body.password
       let t;
    try{
        t = await sequelise.transaction()
        const request = await PasswordRequest.findOne({where : {id : id}})
        if(!request){
          return res.status(404).json({success: false, message:'Not a valid link'})
        }
        else if(request.isActive === false){
          return res.status(400).json({success: false, message : 'Link Expired , please try with other link'})
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds)
        
        await User.update({password: hashedPassword},{ where: { id: request.userId}},{transaction : t})
        await passwordRequest.update({isActive: false},{ where: { id: request.id}},{transaction : t})
        await t.commit()

        return res.status(201).json({success : true, message:'Pasword changed successfully'})

    }
    catch(error){
      await t.rollback();
      return res.status(400).json({success : false, message : 'Please try again with valid link'})
    }
}