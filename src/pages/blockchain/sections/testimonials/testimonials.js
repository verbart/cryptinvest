import $ from 'jquery';


$('.testimonials__slider').slick({
  arrows: false,
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [{
    breakpoint: 992,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }]
});
