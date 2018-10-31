const express=require('express');
const pool=require('../pool.js');
var router=express.Router();

//登录界面
router.post('/login',function(req,res){
  var $uname=req.body.uname;
  var $upwd=req.body.upwd;
  if(!$uname){
    res.send('0');
    return;
  };
  if(!$upwd){
    res.send(1);
    return;
  };
  var sql='select * from admin where a_uname=? and a_upwd=?';
  pool.query(sql,[$uname,$upwd],function(err,result){
    if(err) throw err;
    if(result.length>0){
      res.send('3');
      return;
    }else{
      res.send('2');
      return;
    };
  });
});

module.exports=router;