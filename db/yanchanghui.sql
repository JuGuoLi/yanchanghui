set names utf8;
drop database if exists yanchanghui;
create database yanchanghui charset=utf8;
use yanchanghui;

#用户表
create table user(
	uid		int	primary key auto_increment,
	uname	varchar(32),
	upwd  varchar(32),
	ych_id	int
);

#用户细节表
create table user_detail(
	udid		int primary key auto_increment,
	uid			int,
	user_name		varchar(32),
	gender		varchar(16),
	tou_xiang	varchar(128),
	jie_shao	varchar(128),
	address		varchar(128),
	email	varchar(64),
	phone varchar(11),
	foreign key(uid) references user(uid)
);


#演唱会表
create table ych(
	ych_did		int primary key auto_increment,
	ych_uid		int,
	ych_name	varchar(64),
	is_vip		varchar(16),
	is_pvip		varchar(16),
	is_normal	varchar(16),
	price			decimal(10,2),
	kaishiriqi	varchar(128),
	foreign key(ych_uid) references user(uid)
);

#订单表
create table dingdan(
	did			int primary key auto_increment,
	ych_id	int,
	state		varchar(64),
	tuihuo	varchar(64),
	price		decimal(10,2),
	foreign key(ych_id) references ych(ych_did)
);

#首页
create table shouye(
	sid		int	primary key auto_increment,
	ych_img		varchar(128),
	title			varchar(128),
	price			decimal(10,2)
);

#管理员
create table admin(
	aid		int	primary key auto_increment,
	a_uname		varchar(64),
	a_upwd		varchar(64),
	a_username		varchar(64),
	a_touxiang		varchar(128)
);

insert into admin value(1,'admin','admin','韩栋',null);