const express=require('express');
const pool=require('../pool.js');
var router=express.Router();

//登录界面
router.post('/login',(req,res)=>{
  var uname=req.body.uname;
  var upwd=req.body.upwd;
  var sql='select * from user where uname=? and upwd =?'
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err) throw err;
    if(result.length==1){
      req.session.uid=result[0].user_id
      res.send({code:1,msg:'登录成功',uid:req.session.uid})
    }else
    res.send({code:-1,msg:'登录失败'})
  })
})

//注册界面
router.post('/reg',(req,res)=>{
  var uname=req.body.uname;
  var upwd=req.body.upwd;
  var phone=req.body.phone;
  var sql='select * from user where uname=?'
  pool.query(sql,[uname],(err,result)=>{
    if(err) throw err;
    if(result.length==1){
      res.send({code:1,msg:'用户名已被注册'})
      return;
    }else{
      var sql='select * from user where phone=?';
      pool.query(sql,[phone],(err,result)=>{
        if(err) throw err;
        if(result.length==1){
          res.send({code:2,msg:'手机号已被注册'})
          return;
        }else{
          var sql='insert into user (uname,upwd,phone) values (?,?,?)'
          pool.query(sql,[uname,upwd,phone],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows<1){
              res.send({code:3,msg:'注册失败'})
            }else{
              res.send({code:4,msg:'注册成功'})
            }
          })
        }
      })
    }
  })
})

router.get('/cart',(req,res)=>{
  var uid=req.session.uid;
  var pid=req.query.pid;
  var count=parseInt(req.query.count);
  var sql='select title,price from ych where ych_id=? '
  pool.query(sql,pid,(err, result)=>{
    if(err) throw err;
    var title=result[0].title;
    var price=result[0].price;
    var sql='select * from shopcar where title=? and user_id=?'
    pool.query(sql,[title,uid],(err,result)=>{
      if(err) throw err;
      if(result.length==0){
        var sql='insert into shopcar(user_id,title,price,count) values (?,?,?,?)';
        pool.query(sql,[uid,title,price,count],(err,result)=>{
          if(err) throw err;
          if(result.affectedRows>=1){
            res.send({code:1,msg:'添加成功'})
          }else{
            res.send({code:-1,msg:'添加失败'})
          }
        })
      }else{
        count = count+parseFloat(result[0].count);
        var sql='update shopcar set count=? where user_id=? and title=?'
        pool.query(sql,[count,uid,title],(err,result)=>{
          if(err) throw err;
          if(result.affectedRows>=1)
            res.send({code:1,msg:'添加成功'})
          else
            res.send({code:-1,msg:'添加失败'})
        })
      }
    })
  })
})
module.exports=router;