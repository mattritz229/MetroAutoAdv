$(document).ready(function(){

  // set up the parallax scrolling
 // $('.slide').each(function(){
  //  var $bgobj = $(this); // assigning the object


      var $window = $(window); 
      var velocity = 0.1; 
      var lastScrollTop = 0;
    //$(window).scroll(function() {
 
    function update(){

      //Check what direction is being scrolled

      $('.slide').each(function() { 

        var pos = $window.scrollTop(); 
        var $element = $(this); 
        var offsetObjTop = $(this).offset().top;
        var height = $element.height(); 
        var offsetObjBottom = offsetObjTop + height;
        //var topObj =  offsetObj.top;

        var parent = $(this).offsetParent();
        var offsetParTop = parent.offset().top;
        var parentHeight = $(this).parent().height();
        var offsetParBottom = offsetParTop + parentHeight;

        //check if the object is in the view window plus a 5px buffer
        if ((pos + $(window).height() - 10) > offsetObjTop  && (pos + 10 < offsetObjBottom)){
          if (pos > lastScrollTop){
              //downscroll code
              if (offsetParBottom > offsetObjBottom){ 
                $(this).css('margin-top','' + ((offsetObjTop - offsetParTop) + 3 )+ 'px');

              }
            } else {
              // upscroll code
              if (offsetParTop < offsetObjTop){ 
                $(this).css('margin-top','' + ((offsetObjTop - offsetParTop) - 3) + 'px'); 
              }
            }
            lastScrollTop = pos;
        } 
      });

    };

    $window.bind('scroll', update);


      //var yPos = -($(window).scrollTop() / $bgobj.data('speed')); 

      // Put together our final background position
      //var coords = '50% '+ yPos + 'px';

      // Move the background
      //$bgobj.css({ backgroundPosition: coords });
    //}); 
  //});   

  // set up the sticky menu
  // var aboveHeight = $('header').outerHeight();

  // $(window).scroll(function() { 
  //   if ($(window).scrollTop() > aboveHeight){
  //     $('nav').addClass('fixed').css('top','0').next().css('margin-top','40px');
  //   } else {
  //     $('nav').removeClass('fixed').next().css('margin-top','0');
  //   }
  // });

  // set up navigation
  navScroll.setUpNavScroll();


  // set up submit button for service area
  // $('#service_area_submit_btn').click(function() {
  //   var url = $('form[name="service_area_form"]').attr('action');
  //   var zip = $('#zipcode').val();
    
  //   $('#valid-area').addClass('hidden');

  //   if (!IsValidZipCode(zip)) {
  //     $('#zipcode').addClass('error');
  //     $('#zipcode-error-msg').removeClass('hidden');
  //   } else {
  //     $('#zipcode').removeClass('error');
  //     $('#zipcode-error-msg').addClass('hidden');
  
  //     $.ajax({
  //       type: "GET",
  //       url: url + '/' + zip,
  //       //data: $("#zipcode").val(),
  //       success: function(data) {
  //         console.log(data);
  //         if (!data) {
  //           $('#notifyModal').modal('show');
  //         } else {
  //           $('#signInModal').modal('show');
  //         }
  //       }
  //     });
  //   }
  
  //   return false; // avoid to execute the actual submit of the form.    
  // });

  // $('#feedback_send_btn').click(function() {
  //   var url = $('form[name="feedback_form"]').attr('action');
  //   var email = $('#feedback_email');
  //   var subject = $('#feedback_subject');
  //   var message = $('#feedback_message');

  //   $.ajax({
  //     type: 'POST',
  //     url: url,
  //     data: {
  //       email: email.val(),
  //       subject: subject.val(),
  //       message: message.val()
  //     },
  //     success: function(data) {
  //       email.val('');
  //       message.val('');
  //       $('#feedbackModal').modal('show');
  //     }
  //   });

  //   return false; // avoid refresh post to form
  // });

  
});

function IsValidZipCode(zip) {
  var isValid = /^[0-9]{5}(?:-[0-9]{4})?$/.test(zip);
  return isValid;
}