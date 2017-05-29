import $ from 'jquery';
import toastr from 'toastr';


$('.callbackForm').submit(function (e) {
  e.preventDefault();

  const form = $(this);

  $.ajax({
    type: 'POST',
    url: './contact.php',
    data: form.serialize()
  })
    .done(function () {
      toastr.success('Ваша заявка отправлена!');
      form.trigger('reset');
    });
});
