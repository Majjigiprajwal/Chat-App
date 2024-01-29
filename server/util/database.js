const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.AWS_DATABASE_NAME,
    process.env.AWS_DATABASE_USER_NAME,
    process.env.AWS_DATABASE_PASSWORD,{
    dialect:process.env.AWS_DATABASE_DIALECT,
    host:process.env.AWS_DATABASE_HOST
})

module.exports = sequelize;
