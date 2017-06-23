const $list = $('ul');

$list.on('click', 'li', function(evt){
  $(this).toggleClass('bought');
})

$('#textField').on('keypress', function(evt){
  var value = $(this).val();
  if(evt.which === 13 && value.length>0) {
    $list.append($('<li>'+value+'</li>'));
    $(this).val("")
  }
})


