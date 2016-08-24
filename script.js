$(function() {

  /* Handle infinite scroll and add images to background. */

  // var imageLocations = [
  //   'https://api.instagram.com/v1/locations/250042503/media/recent',
  //   'https://api.instagram.com/v1/locations/235275822/media/recent',
  //   'https://api.instagram.com/v1/locations/317377480/media/recent',
  //   // 'https://api.instagram.com/v1/locations/229295/media/recent',
  // ];
  // var currentURL = 'https://api.instagram.com/v1/locations/229295/media/recent';
  // var scrollPage = 0;

  // function scroll() {
  //   if ($(window).scrollTop() + $(window).height() > $(document).height() - 800) {
  //     $(window).unbind('scroll', scroll);
  //     addImages();
  //   }
  // }

// on local: http://localhost:3000/images/
$.get('https://gene-server.herokuapp.com/images', function(images) {
  images.forEach(function(image) {
    var resolution = 'low_resolution';
    $('<div class="image"><span><a href="' + image.link + '">' + image.user + '</a></span><img src="' + image.url + '" width="450" height="450"></div>').appendTo('.images');
  });
})
// https://api.instagram.com/v1/media/shortcode/BJavyFgA1hc?access_token=1090248051.1677ed0.b6ece2ccc9c54d8bb61aa97e83e5485e
// https://www.instagram.com/p/BJavyFgA1hc/
  // function addImages(cb) {
  //   // var images = [];
  //   var images = ['https://www.instagram.com/p/BJavyFgA1hc/', 'https://www.instagram.com/p/BI3HA-HA1xz/'];
  //   var todo = imageLocations.length;

  //   ga('send', 'event', 'Load Images', ++scrollPage);

  //   imageLocations.forEach(function(item, index) {
  //     if (typeof imageLocations[index] !== 'undefined') {
  //       fetchImages(index, function(data) {
  //         images = images.concat(data);
  //         if (--todo <= 0) {
  //           done();
  //         }
  //       });
  //     }
  //     else if (--todo <= 0) {
  //       done();
  //     }
  //   });

  //   function fetchImages(index, cb) {
  //     $.ajax({
  //       dataType: 'jsonp',
  //       url: imageLocations[index],
  //       data: {
  //         // access_token: '1090248051.1d1d36f.d24a1a83cfc14bb8b337245827769d42'
  //         access_token: '1090248051.1677ed0.b6ece2ccc9c54d8bb61aa97e83e5485e'
  //       }
  //     }).done(function(payload) {
  //       if (imageLocations[index] !== payload.pagination.next_url) {
  //         imageLocations[index] = payload.pagination.next_url;
  //         cb(payload.data);
  //       }
  //     });
  //   }

  //   function done() {
  //     images = images.sort(function(a, b) { return b.created_time - a.created_time; });
  //     images.forEach(function(item) {
  //       var resolution = 'low_resolution';
  //       $('<div class="image"><span><a href="' + item.link + '">' + item.user.username + '</a></span><img src="' + item.images[window.devicePixelRatio > 1 ? 'standard_resolution' : resolution].url + '" width="' + item.images[resolution].width + '" height="' + item.images[resolution].height + '"></div>').appendTo('.images');
  //     });
  //     $(window).bind('scroll', scroll);
  //     if (cb) {
  //       cb();
  //     }
  //   }
  // }

  // addImages(function() {
  //   // If this is a big enough screen, load more images to fill.
  //   if (306 * 306 * 18 < $(window).height() * $(window).width()) {
  //     $(window).unbind('scroll', scroll);
  //     addImages();
  //   }
  // });


  /* If the browser is responsive enough, get the cards to fly out. */

  function resize() {
    if ($(window).width() > 767) {
      // Parallax effects with touch aren't the happiest.
      if (!(('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch))) {
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
    $('#gene').css('transform', 'translate(-320%,' + (-320 - top / 4) + '%)');
    $('#open-closed').css('transform', 'translate(-80%,' + (-140 - top / 3.5) + '%)');
    $('#hours').css('transform', 'translate(-100%,' + (-40 - top / 3) + '%)');
    $('#location').css('transform', 'translate(11%,' + (-50 - top / 2.5) + '%)');
    $('#contact').css('transform', 'translate(-130%,' + (75 - top / 2) + '%)');
  }

  $(window).bind('resize', resize);
  resize();


  /* Mix up the fonts and colours on the hours, location, and contact. */

  var fontClasses = [
    'font-shaded',
    'font-chippewa',
    'font-shlop',
    'font-lust',
    'font-bello',
    'font-alexander'
  ];

  var colourClasses = [
    'colour-bw',
    'colour-blue',
    'colour-green',
    'colour-red',
    'colour-teal',
    'colour-orange'
  ];

  $('#hours, #location, #contact').each(function(index, element) {
    var fontIndex = Math.floor(Math.random() * fontClasses.length);
    var font = fontClasses[fontIndex];
    fontClasses.splice(fontIndex, 1);

    var colourIndex = Math.floor(Math.random() * colourClasses.length);
    var colour = colourClasses[colourIndex];
    colourClasses.splice(colourIndex, 1);

    $(element).addClass(font + ' ' + colour);
  });


  /* Show the open sign, if Gene is open. */

  var currentDate = new Date();
  var openHour = [0, 6].indexOf(currentDate.getDay()) !== -1 ? 16 : 15;
  var open = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), openHour, 30, 0));
  var close = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), openHour + 10, 30 + 30, 0));
  if (open < currentDate && currentDate < close) {
    $('#open-closed').addClass('open');
  }
  
});
