import $ from 'jquery';

$('.navbar').on('click', '.navbar__link', function (e) {
  e.preventDefault();

  const anchor = $($(this).attr('href'));
  const top = anchor.offset().top - $('.navbar').height() + 1;

  $('body, html').animate({scrollTop: top}, 1000);
  $('.mainHeader__navbar_active').removeClass('mainHeader__navbar_active');
});

$(window).scroll(function () {
  $('.navbar__link').each(function(index, link) {
    const navbarLink = $(link);
    const section = $(navbarLink.attr('href'));
    if (section.length) {
      const top = section.offset().top - $('.navbar').height() - 10;
      const bottom = top + section.height();
      const scroll = $(window).scrollTop();

      if (scroll > top && scroll < bottom) {
        $('.navbar__item_active').removeClass('navbar__item_active');
        navbarLink.closest('.navbar__item').addClass('navbar__item_active');
      }
    }
  });
});
