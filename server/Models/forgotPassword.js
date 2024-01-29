const Sequelize = require ('sequelize');

const sequelize = require('../util/database');

const passwordRequest = sequelize.define('passwordRequest',{
  id : {
    type : Sequelize.STRING,
    allowNull:false,
    primaryKey:true
  },
  isActive:{
    type:Sequelize.BOOLEAN,
    allowNull:false
  }
})

module.exports = passwordRequest;