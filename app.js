const express=require('express');
const adminRouter=require('./routes/admin.js');
const bodyParser=require('body-parser');
var app=express();
app.listen(3000);
app.use(express.static('user'));
app.use(express.static('product'));
app.use(express.static('background'));
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use('/admin',adminRouter);
