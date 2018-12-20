// 这部分是背景图片轮播
var num=1;
var bgImgUrl = 'img/ych_{num}.jpg', bgNum,
	bgImgArr = [],
	bgDiv = document.getElementById("bg");
// 组合数组 此处 200 为 图开始序号 结束 210
for (var i=2; i <= 6; i++){
	bgImgArr.push(bgImgUrl.replace('{num}', i));
}
setBGimg();
function setBGimg(d){
	if(!bgNum || bgNum >= bgImgArr.length) bgNum = 0;
	bgDiv.style.opacity = .8;
	setTimeout(function(){
		bgDiv.style.backgroundImage = 'url('+ bgImgArr[bgNum] +')';
		bgNum++;
		bgDiv.style.opacity = 1;
	}, 1000);
	if(typeof d == 'undefined')
	setInterval(function(){setBGimg(true);}, 5000);
	// 上一行的 6000 是背景图片自动切换时间(单位 毫秒)
}

//开始对登录进行数据操作
var unameCheck=false;
var upwdCheck=false;
var regUname=/^\w{3,10}$/
var regUpwd=/^\w{6,18}$/
var btnName=$('#uname');
var btnUpwd=$('#upwd');
btnName.blur(function(){
	if(regUname.test(btnName.val())==true){
		btnName.next().removeClass('login_fail');
		btnName.next().addClass('login_success').html('格式正确')
	unameCheck=true;
}else{
	btnName.next().removeClass('login_success');
	btnName.next().addClass('login_fail').html('格式错误')
}
})
btnUpwd.blur(function(){
	if(regUpwd.test(btnUpwd.val())==true){
		btnUpwd.next().removeClass('login_fail');
		btnUpwd.next().addClass('login_success').html('格式正确')
	upwdCheck=true;
}else{
	btnUpwd.next().removeClass('login_success');
	btnUpwd.next().addClass('login_fail').html('格式错误')
}
})

$('button').click(function(){
	if(unameCheck&&upwdCheck)
	{
		var uname=$('#uname').val();
	var upwd=$('#upwd').val();
	$.ajax({
		url:'http://127.0.0.1:3001/front/login',
		type:'post',
		data:{uname,upwd},
		dataType:'json',
		success:function(res){
			if(res.code==1){
				window.location.href = 'index.html'
			}else{
				alert('用户名或密码错误')
			}
		}
	})
	}
})