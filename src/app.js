const $ = window.$ = window.jQuery = require('jquery');
import 'slick-carousel';
import 'remodal';
import toastr from 'toastr';
import AOS from 'aos';

import './components/main-header/main-header';
import './components/navbar/navbar';
import './components/testimonials/testimonials';
import './pages/chat/sections/videos/videos';
import './assets/scripts/file-download';
import './assets/scripts/form';


toastr.options.closeButton = true;

AOS.init();

$('[data-remodal-id]').remodal({
  hashTracking: false
});

$(document).on('closed', '.remodal', function (e) {
  $('.remodal form').trigger('reset');
});

import './assets/scripts/yandex-metrika'
import './assets/scripts/google-analytics'
import './assets/scripts/bitrix24-form'
