import $ from 'jquery';


$('.videoPreview').click(function (e) {
  e.preventDefault();

  const modal = $('[data-remodal-id=video]');
  const remodal = modal.remodal();
  const iframe = modal.find('iframe');
  const link = $(e.target).closest('.videoPreview').data('target');

  if (iframe.attr('src') !== link) {
    iframe.attr('src', link);
    setTimeout(() => remodal.open(), 500);
  } else {
    remodal.open();
  }
});

function toggleVideo(e, play) {
  const iframe = $(e.target).find('iframe')[0].contentWindow;
  const func = play ? 'playVideo' : 'stopVideo';
  console.log(func);

  iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
}

$(document).on('opened', '.remodal', function(e) {
  setTimeout(() => toggleVideo(e, true), 500);
});

$(document).on('closing', '.remodal', function(e) {
  toggleVideo(e);
});
