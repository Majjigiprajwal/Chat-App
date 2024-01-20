const express = require('express');
const sequelize = require('./util/database')
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser())

const User = require('./Models/user');
const Message = require('./Models/message')


const userRoutes = require('./Routes/user');
const messageRoutes = require('./Routes/message')

app.use(userRoutes)
app.use(messageRoutes)

Message.belongsTo(User)
User.hasMany(Message)
 
sequelize.sync()
  .then((result)=>{
    app.listen(4000,()=>{
        console.log('running')
    })
  })
  .catch((err)=>{
    console.log(err)
  })