// function $(id){
//   return document.getElementById(id);
// }
//
// function createXhr(){
//   if(window.XMLHttpRequest){
//     return new XMLHttpRequest();
//   }else{
//     return new ActiveXObject('Microsoft XMLHttp');
//   }
// }
document.write("<script language=javascript src='common.js'></script>");
function admin_login(){
  var xhr=createXhr();
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      var res=xhr.responseText;
      if(res=='0'){
        alert('用户名不能为空');
      }else if(res=='1'){
        alert('密码不能为空');
      }else if(res=='2'){
        alert('用户名或密码错误');
      }else{
        window.location.href = 'index.html';
      }
    }
  }
  xhr.open('post','/admin/login',true);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  var uname=$('username').value;
  var upwd=$('password').value;
  var formdata='uname='+uname+'&upwd='+upwd;
  xhr.send(formdata);
}
console.log(123);