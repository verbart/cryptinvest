import $ from 'jquery';
import toastr from 'toastr';

import fileDownload from './file-download';


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

      if (location.href.indexOf(location.origin + '/ico') !== -1) {
        fileDownload(location.origin+'/cryptinvest_ico.pdf', 'cryptinvest_ico.pdf');
      }

      // switch (form.attr('id')) {
      //   case 'start-investing':
      //     fileDownload(location.origin+'/Cryptinvest.pdf', 'Cryptinvest.pdf');
      //     break;
      //   case 'closed-chat':
      //     fileDownload(location.origin+'/KP_Signaly.pdf', 'KP_Signaly.pdf');
      // }
    })
    .fail(function() {
      toastr.error('Произошла ошибка! Пожалуйста, сообщите нам о ней');
    });
});
