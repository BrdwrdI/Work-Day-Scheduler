const dateEl = $('#currentDay');
const saveBtn = $('.saveBtn');
const currentHour = dayjs().format('HH');

$(function () {
  
  function dateTimeDisplay() {
    const now = dayjs().format('MMMM DD, YYYY hh:mm:ss');
    dateEl.text(now);
  }
  setInterval(dateTimeDisplay, 500);

  saveBtn.on('click', function() {
    const timeBlock = $(this).parent().attr('id');
    const blockText = $(this).siblings('description').val();
    localStorage.setItem(timeBlock, blockText);
  });

  function blockColor() {
    $('.time-block').each(function () {
      const inputString = $(this).attr('id');
      const number = parseInt(inputString.split('-')[1]);
      if (number < currentHour) {
        $(this).addClass('past');
      }
      if (number === currentHour) {
        $(this).addClass('present');
      }
      if (number > currentHour) {
        $(this).addClass('future');
      };
    });
  };
  blockColor();

  function loadTasks() {
    $('.description').each(function () {
      const timeBlock = $(this).parent().attr('id');
      const task = localStorage.getItem(timeBlock);
      $(this).val(task);
    });
  };
  loadTasks();
});
