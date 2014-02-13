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
          $image = $('<div class="image"><span><a href="' + item.link + '">' + item.user.username + '</a></span><img class="instagram" src="' + item.images['standard_resolution'].url + '" width="' + item.images[resolution].width + '" height="' + item.images[resolution].height + '"></div>');
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
      // $('#hours').css('transform', 'rotate(-2deg) translate(0, 0)');
      $('#gene, #open-closed, #hours, #location, #contact').css('transform', 'translate(0, 0)');
    }
  }

  function moveCards() {
    var top = $(window).scrollTop();
    // $('#hours').css('transform', 'rotate(-2deg) translate(-90%,' + (-70 - top/3.5) + '%)');
    $('#gene').css('transform', 'translate(-320%,' + (-320 - top/4) + '%)');
    $('#open-closed').css('transform', 'translate(-80%,' + (-140 - top/3.5) + '%)');
    $('#hours').css('transform', 'translate(-100%,' + ( -40 - top/3) + '%)');
    $('#location').css('transform', 'translate(11%,' + ( -50 - top/2.5) + '%)');
    $('#contact').css('transform', 'translate(-150%,' + ( 75 - top/2) + '%)');
  }

  $(window).bind('resize', resize);
  loadImages();
  resize();
  
});
