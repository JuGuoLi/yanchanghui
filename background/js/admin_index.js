$(function () {
  //这部分为用户列表
  var pno = 0;
  function loadPage(no = 0) {
    pno = no;
    $.ajax({
      url: 'http://127.0.0.1:3001/admin/admin_userList',
      type: 'get',
      data: {
        pno
      },
      dataType: 'json',
      success: function (res) {
        var {
          users
        } = res;
        var html = '';
        for (var i = 0; i < users.length; i++) {
          html += "<tr>"
          html += "<td>" + users[i].user_id + "</td>"
          if (users[i].tou_xiang != null)
            html += `<td><img src='${users[i].tou_xiang}'></td>`
          else
            html += `<td>空</td>`
          html += "<td>" + users[i].uname + "</td>"
          html += "<td>" + users[i].upwd + "</td>"
          if (users[i].email == null)
            users[i].email = '空'
          html += "<td>" + users[i].email + "</td>"
          if (users[i].phone == null)
            users[i].phone = '空'
          html += "<td>" + users[i].phone + "</td>"
          if (users[i].user_name == null)
            users[i].user_name = '空'
          html += "<td>" + users[i].user_name + "</td>"
          if (users[i].gender == null)
            users[i].gender = '空'
          html += "<td>" + users[i].gender + "</td>"
          if (users[i].address == null)
            users[i].address = '空'
          html += "<td>" + users[i].address + "</td>"
          html += "<td>"
          html += "<a href='#'>删除</a>"
          html += "</td>"
          html += "</tr>"
        }
        $("#tbody").html(html);

        var html = '';
        var {
          pno,
          pageCount
        } = res;
        html += `<li class="page-item  ${pno==0?'disabled':''}"><a class="page-link bg-transparent" href="#">上一页</a></li>`;

        for (var i = 0; i < pageCount; i++) {
          html += `<li class="page-item ${pno==i?'active':''}"><a class="page-link ${pno==i?'border':'bg-transparent'}" href="#">${i+1}</a></li>`
        }

        html += `<li class="page-item ${pno==pageCount?'disabled':''}"><a class="page-link bg-transparent" href="#">下一页</a></li>`;

        $('#user>div>ul').html(html);
      }
    })
  }
  loadPage();

  $('.pagination').on('click', 'a:not(.disabled):not(.active)', function (e) {
    e.preventDefault();
    var $a = $(this);
    if ($a.html() == '上一页')
      loadPage(pno - 1)
    else if ($a.parent().is(':last-child'))
      loadPage(pno + 1);
    else {
      loadPage($a.html() - 1);
    }
  })

  //这部分为订单列表
  $.ajax({
    url: 'http://127.0.0.1:3001/admin/admin_order',
    type: 'get',
    dataType:'json',
    success:function(res){
      var html = '';
        for (var i = 0; i < res.length; i++) {
          html += "<tr>"
          html += "<td>" + res[i].order_id + "</td>"
          html += '<td>'+res[i].title+'</td>';
          html += "<td>" + res[i].state + "</td>"
          html += "<td><button>退货</button></td>"
          html += "<td>" + res[i].price+ "</td>"
          html += "<td>" + res[i].count + "</td>"
          html += "<td>"+ res[i].price*res[i].count+ "</td>"
          html += "<td>" + res[i].tuihuo+ "</td>"
          html += "<td>" + res[i].uname + "</td>"
          html += "</tr>"
        }
        $("#order tbody").html(html);
    }
  })
})

//在用户列表——绑定删除事件
$('#tbody').on('click', 'a', function (e) {
  var $a = $(this);
  e.preventDefault();
  var $tr = $a.parent().parent();
  var uname = $a.parent().parent().children()[2].innerHTML;
  var uid = $a.parent().parent().children()[0].innerHTML;
  if (confirm("是否继续删除 " + uname + "?")) {
    $tr.remove();
    $.ajax({
      url: 'http://127.0.0.1:3001/admin/admin_userList_del',
      type: 'get',
      data: 'uid=' + uid,
      success: function (res) {
        if (res == '1')
          alert('删除成功')
      }
    })
  }
})

//这部分代码是后台首页轮播
var imgs = document.getElementById('welcome').children;
function hd() {
  var img = welcome.getElementsByClassName('show')[0];
  img.className = '';
  if (img.nextElementSibling != null) {
    img.nextElementSibling.className = 'show';
  } else
    img.parentNode.children[0].className = 'show';
}
var timer = setInterval(hd, 1500);
welcome.onmouseover = function () {
  clearInterval(timer)
}
welcome.onmouseout = function () {
  timer = setInterval(hd, 1500)
}


//点击按钮切换内容
$('body').on('click', '[data-toggle=tab]', function (e) {
  e.preventDefault();
  var $a = $(this);
  var $id = $a.attr('data-id');
  var $div = $($id);
  var $ds = $('body>div:not(:first-child)');
  $ds.addClass('hide');
  $div.removeClass('hide');
})

//显示当前管理员信息
$(function () {
  var search = location.search.slice(1);
  var uname = search.split('&')[0].split('=')[1];
  var upwd = search.split('&')[1].split('=')[1];
  $(function () {
    $.ajax({
      url: 'http://127.0.0.1:3001/admin/admin_info',
      type: 'get',
      data: {
        uname,
        upwd
      },
      datatype: 'json',
      success: function (res) {
        var img = res[0].touxiang;
        $(`<img src='${img}'>`).appendTo('#header_img2>a');
        $('#admin tr:nth-child(1)>td:last-child>input').val(res[0].uname);
        $('#admin tr:nth-child(2)>td:last-child>input').val(res[0].upwd)
        $('#admin tr:nth-child(3)>td:last-child>input').val(res[0].username)
        $('#admin tr:nth-child(4)>td:last-child>input').val(res[0].phone)
        $('#admin tr:nth-child(5)>td:last-child').html(`<img src='${res[0].touxiang}'>`)
        $('#adminer_id').val(res[0].admin_id)
        //管理员信息更新按钮提交
        $('#admin button').click(function () {
          var uname = $('#admin tr:nth-child(1)>td:last-child>input').val();
          var upwd = $('#admin tr:nth-child(2)>td:last-child>input').val();
          var username = $('#admin tr:nth-child(3)>td:last-child>input').val();
          var phone = $('#admin tr:nth-child(4)>td:last-child>input').val();
          var touxiang = $('#admin tr:nth-child(5)>td:last-child>img').attr('src');
          var admin_id = $('#adminer_id').val();
          $.ajax({
            url: 'http://127.0.0.1:3001/admin/admin_updata',
            type: 'post',
            data: {
              admin_id,
              uname,
              upwd,
              username,
              phone,
              touxiang
            },
            datatype: 'json',
            success: function (res) {
              if (res == '1') {
                alert('修改成功')
              }
            }
          })
        })
      }
    })
  })
})



