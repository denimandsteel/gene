$(function() {
  var currentURL = 'https://api.instagram.com/v1/locations/229295/media/recent';
  var infiniteScrollPage = 0;

  function loadImages(cb) {
    ga('send', 'event', 'Load Images', ++infiniteScrollPage);
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
          $('<div class="image"><span><a href="' + item.link + '">' + item.user.username + '</a></span><img class="instagram" src="' + item.images[window.devicePixelRatio > 1 ? 'standard_resolution' : resolution].url + '" width="' + item.images[resolution].width + '" height="' + item.images[resolution].height + '"></div>').appendTo('.images');
        });
        $(window).bind('scroll', infiniteScroll);
        if (cb) {
          cb();
        }
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
      if (!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) {
        $(window).bind('scroll', moveCards);
        moveCards();
      }
    }
    else {
      $(window).unbind('scroll', moveCards);
      $('#gene, #open-closed, #hours, #location, #contact').css('transform', 'translate(0, 0)');
    }
  }

  function moveCards() {
    var top = $(window).scrollTop();
    $('#gene').css('transform', 'translate(-320%,' + (-320 - top/4) + '%)');
    $('#open-closed').css('transform', 'translate(-80%,' + (-140 - top/3.5) + '%)');
    $('#hours').css('transform', 'translate(-100%,' + ( -40 - top/3) + '%)');
    $('#location').css('transform', 'translate(11%,' + ( -50 - top/2.5) + '%)');
    $('#contact').css('transform', 'translate(-130%,' + ( 75 - top/2) + '%)');
  }

  var fontClasses = [
    'font-shaded',
    'font-chippewa',
    'font-shlop',
    'font-lust',
    'font-bello',
    'font-alexander',
  ];
  var colourClasses = [
    'colour-bw',
    'colour-blue',
    'colour-green',
    'colour-red',
    'colour-teal',
    'colour-orange',
  ];
  $('#hours, #location, #contact').each(function(index, element) {
    var fontIndex = Math.floor(Math.random()*fontClasses.length);
    var font = fontClasses[fontIndex];
    fontClasses.splice(fontIndex, 1);
    var colourIndex = Math.floor(Math.random()*colourClasses.length);
    var colour = colourClasses[colourIndex];
    colourClasses.splice(colourIndex, 1);
    $(element).addClass(font + ' ' + colour);
  });

  $(window).bind('resize', resize);
  loadImages(function() {
    // If this is a big enough screen, load more images to fill.
    if (306*306*18 < $(window).height() * $(window).width()) {
      $(window).unbind('scroll', infiniteScroll);
      loadImages();
    }
  });
  resize();
  
});
