import $ from 'jquery';


$('.faq_interactive .faq__item').click(function () {
  const isActiveItem = $(this).hasClass('faq__item_active');

  $('.faq_interactive .faq__item_active').removeClass('faq__item_active');

  if (!isActiveItem) {
    $(this).addClass('faq__item_active');
  }
});
