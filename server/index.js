const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const sequelize = require('./util/database')
const bodyParser = require('body-parser');
const cors = require('cors');
const CronJob = require('./services/cron')
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require("socket.io");

const PORT = process.env.PORT

const app = express();

const server = http.createServer(app)

app.use(cors());

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser())
CronJob.job.start()

const User = require('./Models/user');
const Message = require('./Models/message')
const Group = require('./Models/group')
const GroupMember = require('./Models/groupMember')
const ArchivedMessage = require('./Models/archivedMessage')
const PasswordRequests = require('./Models/forgotPassword')


const userRoutes = require('./Routes/user');
const messageRoutes = require('./Routes/message')
const groupRoutes = require('./Routes/group')
const forgotPasswordRoutes = require('./Routes/forgotPasssword')

app.use(userRoutes)
app.use(messageRoutes)
app.use(groupRoutes)
app.use(forgotPasswordRoutes)

Message.belongsTo(User)
User.hasMany(Message)

Message.belongsTo(Group)
Group.hasMany(Message)

User.hasMany(PasswordRequests,{foreignKey : 'userId'});
PasswordRequests.belongsTo(User,{foreignKey : 'userId'});


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

  socket.on('group-image',(image,group)=>{
       io.to(group).emit('image',image)
  })

});


sequelize.sync()
  .then((result)=>{
    server.listen(PORT,()=>{
        console.log('running')
    })
  })
  .catch((err)=>{
    console.log(err)
  })