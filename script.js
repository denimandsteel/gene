$(function() {
  // $.get('http://gene-cafe.herokuapp.com/', function(payload) {
  //   payload.forEach(function(item, index) {
  //     // var img = $('img').attr('src', );
  //     // console.log(img)
  //     $('body').append('<img src="' + item.images.low_resolution.url + '">');
  //   });
  // });
  // http://dmolsen.com/2013/04/05/generating-access-tokens-for-instagram/
  $.ajax({
    dataType: 'jsonp',
    url: 'https://api.instagram.com/v1/locations/229295/media/recent',
    data: {
      access_token: '1090248051.1d1d36f.d24a1a83cfc14bb8b337245827769d42'
    }
  }).done(function(payload) {
    payload.data.forEach(function(item, index) {
      // var resolution = 'thumbnail';
      var resolution = 'low_resolution';
      // var resolution = 'standard_resolution';
      $image = $('<img>').attr('src', item.images[resolution].url).attr('width', item.images[resolution].width).attr('height', item.images[resolution].height);
      $('body').append($image);
    });
  });
});
