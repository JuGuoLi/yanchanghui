const express=require('express');
const pool=require('../pool.js');
var router=express.Router();

//登录界面
router.post('/',function(req,res){
  var $uname=req.body.uname;
  var $upwd=req.body.upwd;
  if(!$uname){
    res.send('0');
    return;
  };
  if(!$upwd){
    res.send('1');
    return;
  };
  var sql='select * from admin where uname=? and upwd=?';
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

//后台用户列表
router.get('/admin_userList',function(req,res){
  var output={
    pno:0,
    pageSize:10,
    count:0,
    pageCount:0, //=ceil(count/pageSize)
    users:[]  //所有商品中starti,endi结束
  }
  if(req.query.pno!==undefined)
    output.pno=parseInt(req.query.pno);
  var sql='select * from user';  
  pool.query(sql,function(err,result){
    if(err) console.log(err);
    var count=result.length;
    var pageCount=
      Math.ceil(count/output.pageSize);
    output.count=count;
    output.pageCount=pageCount;
    var starti=output.pno*output.pageSize;
    output.users=result.slice(
      starti,starti+output.pageSize
    );
    res.send(output)
  })
})

//删除用户列表中的用户信息
router.get('/admin_userList_del',function(req,res){
  var $uid=req.query.uid;
   var sql='delete from user where user_id=? ';
   pool.query(sql,[$uid],function(err,result){
     if(err) throw err;
     res.send('1')
   })
})

//后台管理员信息
router.get('/admin_info',function(req,res){
  var $uname=req.query.uname;
  var $upwd=req.query.upwd;
  var sql='select * from admin where uname=? and upwd=?';
  pool.query(sql,[$uname,$upwd],function(err,result){
    if(err) throw err;
    res.send(result);
  })
})

//更新后台管理员信息
router.post('/admin_updata',function(req,res){
  var $admin_id=req.body.admin_id;
  var $uname=req.body.uname;
  var $upwd=req.body.upwd;
  var $username=req.body.username;
  var $phone=req.body.phone;
  var $touxiang=req.body.touxiang;
  var sql='update admin set uname=?,upwd=?,username=?,phone=?,touxiang=? where admin_id=?';
  pool.query(sql,[$admin_id,$uname,$upwd,$username,$phone,$touxiang],function(err,result){
    if(err) throw err;
    res.send('1');
  })
})

//后台订单列表
router.get('/admin_order',function(req,res){
  var sql='select * from ych_order';
  pool.query(sql,function(err,result){
    if(err) throw err;
    res.send(result);
  })
})

module.exports=router;