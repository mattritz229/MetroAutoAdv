
var navScroll = (function() {
  var scrollToAnchor = function(anchor_id) {
    var aTag = $('a[name="' + anchor_id + '"]');
    $('html,body').animate({scrollTop:aTag.offset().top}, 'slow');
  };

  return {
    setUpNavScroll: function() {
      // navigation scrolling functionality
      $('#home').click(function() { 
        $('html,body').animate({scrollTop:0}, 'slow');
      });
      $('#about').click(function() { 
        scrollToAnchor('about'); 
      });
      $('#contact').click(function() {
        scrollToAnchor('contact');
      })

      // navigation sticky menu bar
      var aboveHeight = $('header').outerHeight();
      aboveHeight = aboveHeight + 20; //top padding

      console.log('nav scroll - aboveHeitht' + aboveHeight);

      $(window).scroll(function() { 
        if ($(window).scrollTop() > aboveHeight){
          console.log('nav scroll - scrollTop');
          $('nav').addClass('navbar-fixed-top').css('top','0').next().css('margin-top','40px');
        } else {
          $('nav').removeClass('navbar-fixed-top').next().css('margin-top','0');
        }
      });
    }
  };
})();