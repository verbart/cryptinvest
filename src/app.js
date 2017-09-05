const $ = window.$ = window.jQuery = require('jquery');
import 'slick-carousel';
import 'remodal';
const toastr = window.toastr = require('toastr');
import AOS from 'aos';


toastr.options.closeButton = true;

AOS.init({
  disable: 'mobile'
});

$('[data-remodal-id]').remodal({
  hashTracking: false
});

$(document).on('closed', '.remodal', function (e) {
  $('.remodal form').trigger('reset');
});

// Plugins start
import './assets/scripts/yandex-metrika'
import './assets/scripts/google-analytics'
import './assets/scripts/chatra'
// Plugins end

import './components/main-header/main-header';
import './components/faq/faq';
import './components/navbar/navbar';
import './components/testimonials/testimonials';
import './components/videos/videos';
import './assets/scripts/file-download';
import './assets/scripts/form';
import './assets/scripts/mailerlite';
if (location.pathname.indexOf('/lessons') !== -1) require('./pages/lessons/lesson/lesson');
