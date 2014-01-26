//;(function ( $ ) {
  $.widget( "uix.navScroll", {

      //Options to be used as defaults
      options: {
          animateSpeed: 1200,
          showHeaderPortion: 350  //offsetFromTag to show the header pic
      },

    _create: function() {
      myWidget = this;
      animateSpeed = myWidget.options.animateSpeed;
      showHeaderPortion = myWidget.options.showHeaderPortion;
      aboveHeight = $('header').outerHeight();
      menuSize = mainnav1.offsetHeight;
    },

    scrollToAnchor: function (anchor_id) {
      aTag = $('a[name="' + anchor_id + '"]');
      var aMenuSize = null
      if ($(window).scrollTop() > aboveHeight){ 
        aMenuSize = menuSize;    //Menu is at top of page
      } else {
        aMenuSize = 0;
      }
      $('html,body').animate({scrollTop:aTag.offset().top - showHeaderPortion + aMenuSize}, animateSpeed); 
    },

    navigateHome: function() {
      $('html,body').animate({scrollTop:0}, animateSpeed);
    },

    setUpNavScroll: function() {      // navigation sticky menu bar
      $(window).scroll(function() { 
        if ($(window).scrollTop() > (aboveHeight)){
          $('nav').addClass('navbar-fixed-top').css('top','0').next().css('margin-top',menuSize);
        } else {
          $('nav').removeClass('navbar-fixed-top').next().css('margin-top','0');
        }
      });  
    },

    // Destroy an instantiated plugin and clean up
    // modifications the widget has made to the DOM
    destroy: function () {
      $.Widget.prototype.destroy.call(this);
    },

  });
//})( jQuery);
  
  