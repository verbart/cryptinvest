import $ from 'jquery';


$('a[href*=\\#]').click(function (e) {
  e.preventDefault();

  const href = $(this).attr('href');
  const target = $(href);
  const top = target.offset().top - $('.navbar').height() + 1;

  $('body, html').animate({scrollTop: top}, 1000, function () {
    history.pushState(null, null, '#'+href);
  });

  $('.mainHeader__navbar_active').removeClass('mainHeader__navbar_active');
});

$(window).on('scroll', function() {
  $('section').each(function() {
    const section = $(this);
    const sectionId = section.attr('id');
    const navbarLink = $('.navbar__link[href="#'+sectionId+'"]');

    const top = section.offset().top - $('.navbar').height() - 100;
    const bottom = top + section.height() - $('.navbar').height() - 100;
    const scroll = $(window).scrollTop();

    if (scroll > top && scroll < bottom) {
      $('.navbar__item_active').removeClass('navbar__item_active');
      if (navbarLink.length) {
        navbarLink.closest('.navbar__item').addClass('navbar__item_active');
      }

      history.pushState(null, null, '#'+sectionId);
    }
  });
});
