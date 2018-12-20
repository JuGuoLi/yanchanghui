//用于页面的滑动
$(function(){
	$('.main').onepage_scroll({
		sectionContainer: '.page',
		direction: 'horizontal'
	});
	$('.dowebok').liMarquee();
});

// 定义图片路径 {num} 为 可变的图片序号
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

function loadPage(event){
	var title = event.name;
	var img_src = "img/" +event.id+".jpg";
	$('img','#timeline-content').attr('src' , img_src).show();
	$('#event_title_123').html(title);
	var d = event.on
	$('#date_123').html(d.getDate()+"-"+ (d.getMonth() + 1) +"-"+d.getFullYear() + " : ");
}

var ev = [{
	id : 1,
	name : "Nintendo releases 3 DS.",
	on : new Date(2011,2,27)
},{
	id : 2,
	name : "Joined Facebook",
	on : new Date(2011,2,17)
},{
	id : 3,
	name : "Joined Twitter",
	on : new Date(2011,5,30)
},{
	id : 4,
	name : "Pirates of Black Cove released",
	on : new Date(2011,7,5)
},{
	id : 6,
	name : "Sony releases the PS Vita.",
	on : new Date(2012,1,27)
},{
	id : 7,
	name : "Nintendo releases the Wii U.",
	on : new Date(2012,8,18)
},{
	id : 8,
	name : "Max Payne 3: Painful Memories Map Pack",
	on : new Date(2012,11,3)
},{
	id : 10,
	name : "Battlefield 3: Aftermath",
	on : new Date(2012,11,4)
},{
	id : 11,
	name : "Guardians of Middle-earth",
	on : new Date(2012,11,5)
},{
	id : 9,
	name : "Sony can release PS 4",
	on : new Date(2013,6,10)
}]
$('#longTimeLine').jqtimeline({
	events : ev,
	numYears:3,
	startYear:2011,
	click:function(e,event){
		loadPage(event);
	}
});