import $ from 'jquery';


$('.mainHeader__burgerButton').on('click', function toggle() {
  const burger = $(this);
  const target = $('.mainHeader__navbar');

  burger.toggleClass('mainHeader__burgerButton_active');
  target.toggleClass('mainHeader__navbar_active');
});

const getAdvice = $('.mainHeader__getAdvice');
const position = (getAdvice.width() + getAdvice.height()) / 2;
getAdvice.css('margin-top', -position + 'px');
