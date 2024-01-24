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


sequelize.sync()
  .then((result)=>{
    app.listen(4000,()=>{
        console.log('running')
    })
  })
  .catch((err)=>{
    console.log(err)
  })