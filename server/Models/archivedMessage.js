const Sequelize  = require('sequelize');
const sequelize = require('../util/database');

const archivedMessage = sequelize.define('archivedMessage',{
  id : {
    type : Sequelize.INTEGER,
    allowNull:false,
    primaryKey:true
  },
  message:{
    type:Sequelize.STRING,
    allowNull: false
  },
  fileType :{
    type :Sequelize.STRING,
    allowNull :false
  },
  date_time :{
    type : Sequelize.DATE,
    defaultValue : Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  userId:{
    type : Sequelize.INTEGER,
    allowNull:false,
  },
  groupId:{
    type : Sequelize.INTEGER,
    allowNull:false,
  },
},
  {
    timestamps : false
  }
)

module.exports = archivedMessage;