const express = require('express');
const sequelize = require('./util/database')
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app)

app.use(cors());

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser())

const User = require('./Models/user');
const Message = require('./Models/message')
const Group = require('./Models/group')
const GroupMember = require('./Models/groupMember')


const userRoutes = require('./Routes/user');
const messageRoutes = require('./Routes/message')
const groupRoutes = require('./Routes/group')

app.use(userRoutes)
app.use(messageRoutes)
app.use(groupRoutes)

Message.belongsTo(User)
User.hasMany(Message)

Message.belongsTo(Group)
Group.hasMany(Message)

User.hasMany(Group,{foreignKey:'admin'})
Group.belongsTo(User,{foreignKey:'admin'})

User.belongsToMany(Group, { through: GroupMember });
Group.belongsToMany(User, { through: GroupMember });
 
Group.hasMany(GroupMember)
GroupMember.belongsTo(Group)

GroupMember.belongsTo(User);

const io = new Server(server, {
  cors: {origin:"http://localhost:3000", methods: ["GET", "POST"]},
});


io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);
  
  socket.on("join-group", (data) => {
      socket.join(data.groupName)

  });
  
  socket.on('group-message',(message,group)=>{
    io.to(group).emit('message', message);
  })

  socket.on('image-preview',(data)=>{
       console.log(data)
  })

});


sequelize.sync()
  .then((result)=>{
    server.listen(4000,()=>{
        console.log('running')
    })
  })
  .catch((err)=>{
    console.log(err)
  })