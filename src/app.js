const $ = window.$ = window.jQuery = require('jquery');
import 'slick-carousel';
import 'remodal';
import toastr from 'toastr';
import AOS from 'aos';

import './pages/main/main-header/main-header';
import './components/navbar/navbar';
import './components/testimonials/testimonials';


toastr.options.closeButton = true;
AOS.init();

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
  const data = form.serializeArray().reduce((result, item) => {
    result[item.name] = item.value;
    return result;
  }, {});

  const modal = form.closest('[data-remodal-id]');

  data.site = 'crypto-invest.bitrix24.ru';
  data.source = location.search;

  $.ajax({
    type: 'POST',
    url: 'https://avarkom.pw/api/v2/feedback',
    data: JSON.stringify(data)
  })
    .done(function () {
      if (modal.length) {
        modal.remodal().close();
      }
      toastr.success('Ваша заявка отправлена!');
      form.trigger('reset');

      switch (form.attr('id')) {
        case 'start-investing':
          fileDownload(location.origin+'/Cryptoinvest.pdf', 'Cryptoinvest.pdf');
          break;
        case 'closed-chat':
          fileDownload(location.origin+'/KP_Signaly.pdf', 'KP_Signaly.pdf');
      }
    })
    .fail(function() {
      toastr.error('Произошла ошибка! Пожалуйста, сообщите нам о ней');
    });
});

$(document).on('closed', '.remodal', function (e) {
  $('.remodal form').trigger('reset');
});

import './assets/scripts/yandex-metrika'
import './assets/scripts/google-analytics'
import './assets/scripts/bitrix24-form'
