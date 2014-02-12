$(function() {
  FastClick.attach(document.body);
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
          $image = $('<img>').attr('src', item.images['high_resolution'].url).attr('width', item.images[resolution].width).attr('height', item.images[resolution].height);
          $('body').append($image);
        });

        $(window).bind('scroll', bindScroll);
      }

    });
  }

  function bindScroll(){
    if($(window).scrollTop() + $(window).height() > $(document).height() - 800) {
       $(window).unbind('scroll', bindScroll);
       loadMore();
    }
  }

  loadMore();

  $(window).bind('resize', function() {
    bindScrollToMovement();
  });

  function bindScrollToMovement() {
    if ($(window).width() > 767) {
      $(window).bind('scroll', moveThings);
      moveThings();
    } else {
      $(window).unbind('scroll', moveThings);
      $('#hours, #location, #contact').css('-webkit-transform', 'translate(0, 0)');
    }
  }

  function moveThings() {
    var top = $(window).scrollTop();
    $('#hours').css('-webkit-transform', 'translate(-90%,' + (-70 - top/3.5) + '%)');
    $('#location').css('-webkit-transform', 'translate(20%,' + (-60 - top/2.5) + '%)');
    $('#contact').css('-webkit-transform', 'translate(-50%,' + (20 - top/2) + '%)');
  }

  bindScrollToMovement();
  
});


