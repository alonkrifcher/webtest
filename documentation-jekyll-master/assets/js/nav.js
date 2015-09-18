var scrollHandler = function() {
  var y = $(this).scrollTop();
  if (y > 271) {
    $('.header-sidebar').removeClass('invisible');
  } else {
    $('.header-sidebar').addClass('invisible');
  }
};

var checkSize = function () {
  if ($('#header').css('display') == 'none') { // small window
    $('.header-sidebar').removeClass('invisible');
    $(window).off("scroll", scrollHandler);
  } else { // large window
    $(window).scroll(scrollHandler);
    scrollHandler();
  }
};

$(document).ready(function() {
  // Use Bootstrap's "Affix" plugin to pin nav bar to top
  $('#nav-menu').affix({
    offset: {
      top: 271
    }
  });

  checkSize();

  $(window).resize(checkSize);

  $('.platforms p').click(function() {
    $(this).toggleClass('active');
  });
});
