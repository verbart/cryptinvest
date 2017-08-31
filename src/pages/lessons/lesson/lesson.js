import $ from 'jquery';


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

const urlParams = new URLSearchParams(window.location.search);
const startLessonID = urlParams.get('lesson');
const startLessonIndex = lessons.findIndex(lesson => lesson.id === startLessonID);
const lessonFrame = $('#lessonFrame iframe');
const warnMessage = $('#warnMessage');

const Lesson = ({id, title, description, url}) => `
  <div class="col-6 margin_bottom_half">
    <div class="lesson" data-lesson-id="${id}">
      <h3 class="lesson__title">${title}</h3>
      <p class="lesson__description">${description}</p>
    </div>
  </div>
`;

const lessonsList = $('#lessonsList');
lessonsList.html(lessons.map(Lesson).join(''));

const setVideoLink = lessonID => {
  const link = `http://www.youtube.com/embed/${lessonID}?enablejsapi=1&controls=0`;
  const lessonIndex = lessons.findIndex(lesson => lesson.id === lessonID);

  if (startLessonIndex >= lessonIndex) {
    warnMessage.hide();
    lessonFrame.show();

    if (lessonFrame.attr('src') !== link) {
      lessonFrame.attr('src', link);
      urlParams.set('lesson', lessonID);
      window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
    }
  } else {
    warnMessage.show();
    lessonFrame.hide();
  }
};

$('.lesson').click(e => {
  const lessonID = $(e.target).closest('[data-lesson-id]').data('lesson-id');

  setVideoLink(lessonID);
});

setVideoLink(startLessonID);
