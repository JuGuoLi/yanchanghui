$('#header_info').on('mouseenter','li',function(){
  $li=$(this);
  $li.addClass('header_info_active'),
  $li.children('div').removeClass('header_info_hide');
})

$('#header_info').on('mouseleave','li',function(){
  $li=$(this);
  $li.removeClass('header_info_active');
  $li.children('div').addClass('header_info_hide');
})