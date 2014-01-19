
var navScroll = (function() { 
  var scrollToAnchor = function(anchor_id) {
    var aTag = $('a[name="' + anchor_id + '"]');
    var aboveHeight = $('header').outerHeight();
    aboveHeight = aboveHeight + 20; //top padding

    if ($(window).scrollTop() > aboveHeight){
      var aMenuSize = mainnav1.offsetHeight;     
    } else {
      var aMenuSize = 0;
    }
    $('html,body').animate({scrollTop:aTag.offset().top - 350 + aMenuSize}, 1200);
  };

  return {
    setUpNavScroll: function() {
      // navigation scrolling functionality
      $('#home').click(function() { 
        $('html,body').animate({scrollTop:0}, 1200);
      });
      $('#drivers').click(function() { 
        scrollToAnchor('drivers'); 
      });
      $('#advertisers').click(function() {
        scrollToAnchor('advertisers');
      })
      $('#contact').click(function() {
        scrollToAnchor('contact');
      })

      // navigation sticky menu bar
      var aboveHeight = $('header').outerHeight();
      aboveHeight = aboveHeight + 20; //top padding

      console.log('nav scroll - aboveHeitht  ' + aboveHeight);
      console.log('nav scroll - aboveHeitht  ');

      $(window).scroll(function() { 
        if ($(window).scrollTop() > aboveHeight){
          $('nav').addClass('navbar-fixed-top').css('top','0').next().css('margin-top','40px');
        } else {
          $('nav').removeClass('navbar-fixed-top').next().css('margin-top','0');
        }
      });
    }
  };
})();