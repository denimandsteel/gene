$(function() {
  $.get('http://gene-cafe.herokuapp.com/', function(payload) {
    payload.forEach(function(item, index) {
      // var img = $('img').attr('src', );
      // console.log(img)
      $('body').append('<img src="' + item.images.low_resolution.url + '">');
    });
  });
});
