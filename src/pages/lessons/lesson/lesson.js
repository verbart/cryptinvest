import $ from 'jquery';

const urlParams = new URLSearchParams(window.location.search);
const lessonID = urlParams.get('lesson');

const lessons = [
  {
    id: 'CfIQfvWiq8Y',
    title: '1-й урок',
    description: 'Первый урок по криптовалюте'
  }, {
    id: 'cudOLvOO25U',
    title: '2-й урок',
    description: 'Второй урок по криптовалюте'
  }, {
    id: 'g0hTqpjL3e4',
    title: '3-й урок',
    description: 'Третий урок по криптовалюте'
  }
];

const lessonIndex = lessons.findIndex(lesson => lesson.id == lessonID);

const lessonFrame = $('#lessonFrame');
const lessonsList = $('#lessonsList');
const Lesson = ({id, title, description, url}) => `
  <div class="col-6 margin_bottom_half">
    <a class="lesson" href="${url}" data-lesson-id="${id}">
      <h3 class="lesson__title">${title}</h3>
      <p class="lesson__description">${description}</p>
    </a>
  </div>
`;

$('.lesson').click(e => {
  e.preventDefault();

  const iframe = lessonFrame.find('iframe');
  const lessonID = $(e.target).closest('[data-lesson-id]').data('lesson-id');
  const link = `http://www.youtube.com/embed/${lessonID}?enablejsapi=1&controls=0`;

  urlParams.set('lesson', lessonID);
  window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);

  if (iframe.attr('src') !== link) {
    iframe.attr('src', link);
    // setTimeout(() => '', 500);
  } else {
  }
});

lessonsList.html(lessons.map(Lesson).join(''));

console.log(lessonID, lessonIndex);
