$(function() {
  var currentURL = 'https://api.instagram.com/v1/locations/229295/media/recent';

  function loadImages() {
    $.ajax({
      dataType: 'jsonp',
      url: currentURL,
      data: {
        access_token: '1090248051.1d1d36f.d24a1a83cfc14bb8b337245827769d42'
      }
    }).done(function(payload) {
      if (currentURL != payload.pagination.next_url) {
        currentURL = payload.pagination.next_url
        payload.data.forEach(function(item, index) {
          var resolution = 'low_resolution';
          $image = $('<img>').attr('src', item.images['standard_resolution'].url).attr('width', item.images[resolution].width).attr('height', item.images[resolution].height);
          $('body').append($image);
        });
        $(window).bind('scroll', infiniteScroll);
      }
    });
  }

  function infiniteScroll() {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 800) {
      $(window).unbind('scroll', infiniteScroll);
      loadImages();
    }
  }

  function resize() {
    if ($(window).width() > 767) {
      $(window).bind('scroll', moveCards);
      moveCards();
    }
    else {
      $(window).unbind('scroll', moveCards);
      $('#hours').css('transform', 'rotate(-2deg) translate(0, 0)');
      $('#location, #contact').css('transform', 'translate(0, 0)');
    }
  }

  function moveCards() {
    var top = $(window).scrollTop();
    $('#hours').css('transform', 'rotate(-2deg) translate(-90%,' + (-70 - top/3.5) + '%)');
    $('#location').css('transform', 'translate(20%,' + (-60 - top/2.5) + '%)');
    $('#contact').css('transform', 'translate(-50%,' + (20 - top/2) + '%)');
  }

  $(window).bind('resize', resize);
  loadImages();
  resize();
  
});
