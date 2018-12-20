set names utf8;
drop database if exists ych;
create database ych charset=utf8;
use ych;

#用户表
create table user(
	user_id		int	primary key auto_increment,
	uname	varchar(32),
	upwd  varchar(32),
	user_name		varchar(32) default null, 
	gender		varchar(16) default null,
	tou_xiang	varchar(128) default null,
	address		varchar(128) default null,
	email	varchar(64) default null,
	phone varchar(32) default null
);


#演唱会表
create table ych(
	ych_id		int primary key auto_increment,
	title			varchar(64),
	subtitle	varchar(64),		
	price			varchar(64),
	onsale_data	varchar(128)
);

#订单表
create table ych_order(
	order_id	int primary key auto_increment,
	uname		varchar(64),
	title		varchar(64),
	state		varchar(64),
	tuihuo	varchar(64),
	price		varchar(32),
	count		varchar(64)
);

#首页
create table ych_index(
	index_id		int	primary key auto_increment,
	biaoti		varchar(128),
	jieshao		varchar(128),
	title			varchar(128)
);

#管理员
create table admin(
	admin_id		int	primary key auto_increment,
	uname		varchar(64),
	upwd		varchar(64),
	user_name		varchar(64),
	phone 			varchar(18),
	touxiang		varchar(128)
);

#购物车
create table shopCar(
	shopCar_id  	int primary key auto_increment,
	user_id		int,
	title			varchar(64),
	price			decimal(10,2),
	count			int,
	foreign key(user_id) references user(user_id)
);


insert into admin values(1,'handong',123456,'韩栋',15822895227,'img/touxiang.jpg');

insert into user values(1,'handong',123456,'韩栋','男','img/touxiang.jpg','中国','15822895227@163.com','15822895227'),
(2,'liangliang',123456,'张亮','男','img/touxiang.jpg','北京市','2754105409@qq.com','15112345678'),
(null,'nianpeng',123456,'年鹏','女','img/touxiang.jpg','黑龙江','nianpeng@qq.com','15112345678'),
(null,'qiye',123456,'祁野','男','img/touxiang.jpg','河北','qiye@qq.com','18112345678'),
(null,'wangjie',123456,'王姐','女','img/touxiang.jpg','大连','wangjie@qq.com','13012345678'),
(null,'xiaoxin',123456,'小鑫','男','img/touxiang.jpg','山东','xiaoxin@163.com','17212345678'),
(null,'wangwei',123456,'王玮','女','img/touxiang.jpg','河北','wangwei@126.com','18112345678');

insert into user(user_id,uname,upwd) values (8,'dingding',123456),(9,'meimei',123456);

insert into user(uname,upwd) values
('dingding',123456),('meimei',123456),('chengcheng',123456),('zhangsan',123456),('lisi',123456),
('dingding',123456),('meimei',123456),('chengcheng',123456),('zhangsan',123456),('lisi',123456),
('dingding',123456),('meimei',123456),('chengcheng',123456),('zhangsan',123456),('lisi',123456),
('dingding',123456),('meimei',123456),('chengcheng',123456),('zhangsan',123456),('lisi',123456),
('dingding',123456),('meimei',123456),('chengcheng',123456),('zhangsan',123456),('lisi',123456),
('dingding',123456),('meimei',123456),('chengcheng',123456),('zhangsan',123456),('lisi',123456),
('dingding',123456),('meimei',123456),('chengcheng',123456),('zhangsan',123456),('lisi',123456),
('dingding',123456),('meimei',123456),('chengcheng',123456),('zhangsan',123456),('lisi',123456),
('dingding',123456),('meimei',123456),('chengcheng',123456),('zhangsan',123456),('lisi',123456),
('dingding',123456),('meimei',123456),('chengcheng',123456),('zhangsan',123456),('lisi',123456);

insert into ych_order values (1,'handong','五月天演唱会','已付款','未退货','4999',2);

insert into shopCar values(1,1,'五月天演唱会',4999,2);

insert into ych values (1,'五月天演唱会','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis eligendi debitis nemo consequuntur facere obcaecati necessitatibus itaque fugiat deleniti, quae voluptatibus harum, numquam voluptates provident repudiandae sint omnis. Temporibus, aliquam!','4999.00','2016-5-4');