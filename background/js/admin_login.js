  function $(id){
    return document.getElementById(id);
  }

  function createXhr(){
    if(window.XMLHttpRequest){
      return new XMLHttpRequest();
    }else{
      return new ActiveXObject('Microsoft XMLHttp');
    }
  }
function admin_login(){
  var xhr=createXhr();
  var uname=$('username').value;
  var upwd=$('password').value;
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      var res=xhr.responseText;
      if(res=='0'){
        alert('用户名不能为空');
      }else if(res=='1'){
        alert('密码不能为空');
      }else if(res=='2'){
        alert('用户名或密码错误');
      }else if(res=='3'){
        window.location.href = 'admin_index.html?uname='+uname+'&upwd='+upwd;
      }
    }
  }
  xhr.open('post','/admin',true);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  var formdata='uname='+uname+'&upwd='+upwd;
  xhr.send(formdata);
}

jQuery('#password').keyup(function(e){
  if(e.keyCode==13){
    jQuery('#login_btn').click();
  }
})