const timer = document.querySelector('#pomodoro-time');

const btnPomodoro = document.querySelector('#pomodoro');
const btnBreak = document.querySelector('#break');
const btnStart = document.querySelector('#start');
const btnReset = document.querySelector('#reset');

let timerMode = 'pomodoro';
let isStarted = false;
let timerId = 0;

btnPomodoro.addEventListener('click', () => {
  timerMode = 'pomodoro';
  btnStart.textContent = 'start';
  timer.textContent = '25:00';
  btnPomodoro.classList.add('active');
  btnBreak.classList.remove('active');
  stopTimer();
});

btnBreak.addEventListener('click', () => {
  timerMode = 'break';
  btnStart.textContent = 'start';
  timer.textContent = '05:00';
  btnBreak.classList.add('active');
  btnPomodoro.classList.remove('active');
  stopTimer();
});

btnStart.addEventListener('click', startTimer);
btnReset.addEventListener('click', resetTimer);

function resetTimer() {
  if (timerMode === 'pomodoro') {
    timer.textContent = '25:00';
  } else {
    timer.textContent = '05:00';
  };
  stopTimer();
};

function stopTimer() {
 isStarted = false;
 clearInterval(timerId);
 btnStart.textContent = 'start';
};

function startTimer() {
  if (isStarted) {
    stopTimer();
    return;
  };
 
  let minutes = +timer.textContent.slice(0, 2);
  let seconds = +timer.textContent.slice(3, 5);

  timerId = setInterval(() => {
    if (seconds > 0) {
      seconds -= 1;
    } else if (minutes > 0) {
      minutes -= 1;
      seconds = 59;
    };

    if (seconds >= 0 && minutes >= 0) {
      timer.textContent = `${format(minutes)}:${format(seconds)}`;
    };

    if (!seconds && !minutes) {
      resetTimer();
    };
  }, 1000);

  btnStart.textContent = 'stop';
  isStarted=!isStarted;
};

function format(val) {
  if (val < 10) {
    return `0${val}`;
  };
  return val;
};