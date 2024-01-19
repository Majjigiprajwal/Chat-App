const express = require('express');
const sequelize = require('./util/database')
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin :'http://localhost:3001',
    methods : ['GET','POST','PUT','DELETE'],
    credentials : true
}));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser())

const User = require('./Models/user');

const userRoutes = require('./Routes/user');

app.use(userRoutes)
 
sequelize.sync()
  .then((result)=>{
    app.listen(4000,()=>{
        console.log('running')
    })
  })
  .catch((err)=>{
    console.log(err)
  })