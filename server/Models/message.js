const Sequelize = require ('sequelize');

const sequelize = require('../util/database');

const message = sequelize.define('message',{
  id : {
    type : Sequelize.INTEGER,
    autoIncrement : true,
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
},
{
  timestamps : false
}
)

module.exports = message;