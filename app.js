const express=require('express');
const adminRouter=require('./routes/admin.js');
const bodyParser=require('body-parser');
const cors=require('cors');
const front=require('./routes/front.js')
var app=express();
const session=require('express-session');
//对模块进行配置
app.use(session({
	secret:'128位随机字符',
	resave:false,
	saveUninitialized:true,
	cookie:{
		maxAge:1000 * 60 *60*24	
	}//这部分的值是控制cookie存活的时间
}))
app.listen(3001);
app.use(express.static('front'));
app.use(express.static('background'));
app.use(cors({
  origin:"http://localhost:3001",
  credentials:true //要求客户端必须携带cookie
}))
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use('/admin',adminRouter);
app.use('/front',front);
