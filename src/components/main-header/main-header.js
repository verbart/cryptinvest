import $ from 'jquery';


$('.mainHeader__burgerButton').on('click', function toggle() {
  const burger = $(this);
  const target = $('.mainHeader__navbar');

  burger.toggleClass('mainHeader__burgerButton_active');
  target.toggleClass('mainHeader__navbar_active');
});

$(window).scroll(function () {
  const sticky = $('.mainHeader');
  const scroll = $(window).scrollTop();

  if (scroll >= sticky.height()) sticky.addClass('mainHeader_fixed');
  else sticky.removeClass('mainHeader_fixed');
});


// const getAdvice = $('.mainHeader__getAdvice');
// const position = (getAdvice.width() + getAdvice.height()) / 2;
// getAdvice.css('margin-top', -position + 'px');
