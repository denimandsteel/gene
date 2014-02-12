$(function() {
  var currentURL = 'https://api.instagram.com/v1/locations/229295/media/recent';

  function loadMore()
  {
    console.log('load more called!');
    $.ajax({
      dataType: 'jsonp',
      url: currentURL,
      data: {
        access_token: '1090248051.1d1d36f.d24a1a83cfc14bb8b337245827769d42'
      }
    }).done(function(payload) {
      console.log(payload);
      if (currentURL != payload.pagination.next_url) {
        currentURL = payload.pagination.next_url
        payload.data.forEach(function(item, index) {
          var resolution = 'low_resolution';
          $image = $('<img>').attr('src', item.images[resolution].url).attr('width', item.images[resolution].width).attr('height', item.images[resolution].height);
          $('body').append($image);
        });

        $(window).bind('scroll', bindScroll);
      }

    });
  }

  function bindScroll(){
    console.log('bindscroll called!');
    if($(window).scrollTop() + $(window).height() > $(document).height() - 800) {
       $(window).unbind('scroll');
       loadMore();
    }
  }

  loadMore();
});


