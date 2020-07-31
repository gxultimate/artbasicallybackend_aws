const express =require('express');
const app = express();
var connectDB = require('./connection')

const Port  = process.env.Port || 4000 ;

connectDB();
app.listen(Port , () => console.log('Server Starting.....'))