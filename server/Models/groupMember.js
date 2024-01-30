const Sequelize = require ('sequelize');

const sequelize = require('../util/database');

const groupMember = sequelize.define('groupMember',{
  id : {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    allowNull:false,
    primaryKey:true
  },
  role :{
    type : Sequelize.STRING,
    allowNull :false
  }
})

module.exports = groupMember;