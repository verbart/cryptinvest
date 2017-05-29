const $ = window.$ = window.jQuery = require('jquery');
import 'slick-carousel';
import 'remodal';
import toastr from 'toastr';
toastr.options.closeButton = true;

import './components/main-header/main-header';
import './components/navbar/navbar';
import './components/sections/testimonials/testimonials';


$('.callbackForm').submit(function (e) {
  e.preventDefault();

  const form = $(this);
  const data = form.serializeArray();

  data.push({
    name: 'location',
    value: location.href
  });

  $.ajax({
    type: 'POST',
    url: './contact.php',
    data: data
  })
    .done(function () {
      toastr.success('Ваша заявка отправлена!');
      form.trigger('reset');
    })
    .fail(function() {
      toastr.error('Произошла ошибка! Пожалуйста, сообщите нам о ней');
    });
});
