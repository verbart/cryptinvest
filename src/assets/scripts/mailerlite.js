window.ml_webform_success_5553273 = function (param) {
  const $ = ml_jQuery || jQuery;
  const forms = $('#mlb2-5553273 form');

  if (forms.length) forms.each((index, item) => {
    const form = $(item);
    const modal = form.closest('[data-remodal-id]');

    form.trigger('reset');
    if (modal.length) modal.remodal().close();
  });

  toastr.success('Перейдите на Ваш почтовый ящик и начните просмотр видео!');
};
