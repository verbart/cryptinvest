const $ = window.$ = window.jQuery = require('jquery');
import 'slick-carousel';
import 'remodal';
import toastr from 'toastr';
toastr.options.closeButton = true;

import './components/main-header/main-header';
import './components/navbar/navbar';
import './components/sections/testimonials/testimonials';

const fileDownload = function (url, name) {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.download = name;
  link.dispatchEvent(new MouseEvent('click'));
};

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
      $('[data-remodal-id]').remodal().close();
      toastr.success('Ваша заявка отправлена!');
      form.trigger('reset');

      switch (form.attr('id')) {
        case 'start-investing':
          fileDownload(location.origin+'/Cryptoinvest.pdf');
          break;
        case 'closed-chat':
          fileDownload(location.origin+'/KP_Signaly.pdf');
      }
    })
    .fail(function() {
      toastr.error('Произошла ошибка! Пожалуйста, сообщите нам о ней');
    });
});

$(document).on('closed', '.remodal', function (e) {
  $('.remodal form').trigger('reset');
});
