import $ from 'jquery';


if (location.hash) {
  const section = $('section'+location.hash);

  if (section.length) {
    const offset = $('section'+location.hash).offset();
    const top = offset.top - $('.navbar').height();

    $('html, body').animate({scrollTop: top}, 0);
  }
}

$('a[href^="#"]').click(function (e) {
  e.preventDefault();

  const href = $(this).attr('href');
  const target = $(href);
  const navbarHeight = $('.navbar').length ? $('.navbar').height() : 0;
  const top = target.offset().top - navbarHeight;

  $('body, html').animate({scrollTop: top}, 1000, function () {
    history.pushState(null, null, href);
  });

  $('.mainHeader__navbar_active').removeClass('mainHeader__navbar_active');
});

$(window).on('scroll', function() {
  $('section').each(function() {
    const section = $(this);
    const sectionId = section.attr('id');
    // const navbarLink = $('.navbar__link[href="#'+sectionId+'"]');
    const navbarHeight = $('.navbar').length ? $('.navbar').height() : 0;

    const top = section.offset().top - navbarHeight - 100;
    const bottom = top + section.height() - navbarHeight - 100;
    const scroll = $(window).scrollTop();

    if (scroll > top && scroll < bottom) {
      // $('.navbar__item_active').removeClass('navbar__item_active');
      // if (navbarLink.length) {
      //   navbarLink.closest('.navbar__item').addClass('navbar__item_active');
      // }

      history.pushState(null, null, '#'+sectionId);
    }
  });
});
