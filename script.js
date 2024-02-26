const pomodoroOptions = document.querySelector('.pomodoro-options');
const elemOptions = pomodoroOptions.querySelectorAll('.btn');

const btnPomodoro = document.querySelector('#pomodoro');
const btnBreak = document.querySelector('#break');
const btnStart = document.querySelector('#start');
const btnReset = document.querySelector('#reset');

const timer = document.querySelector('#pomodoro-time');
let min = timer.textContent.slice(0, 2);
let sec = timer.textContent.slice(3, 5);
let timerId;
let pauseTimer = false;

pomodoroOptions.addEventListener('click', (event) => {
  let target = event.target;

  if (target.classList.contains('btn')) {
    for (let i = 0; i < elemOptions.length; i++) {
      elemOptions[i].classList.toggle('active');
    }
  }
});

btnStart.addEventListener('click', startTimer);

btnPomodoro.addEventListener('click', setInitialTimer);

btnBreak.addEventListener('click', setInitialBreak);

btnReset.addEventListener('click', function () {
  if (btnPomodoro.classList.contains('active')) {
    setInitialTimer()
    clearInterval(timerId);
  } else if (btnBreak.classList.contains('active')) {
    setInitialBreak()
  }
});

function setInitialTimer() {
  timer.textContent = `${min}:${sec}`;
  btnStart.textContent = 'start';
  stopStartTimer()
};

function setInitialBreak() {
  timer.textContent = '05:00';
  btnStart.textContent = 'start';
  stopStartTimer()
};

function stopStartTimer() {
  clearInterval(timerId);
  btnStart.addEventListener('click', startTimer);
};

function startTimer() {

  btnStart.textContent = 'stop';
  let duration;
  if (btnPomodoro.classList.contains('active')) {
    duration = (+parseInt(min) * 60) + (+parseInt(sec));
  } else if (btnBreak.classList.contains('active')) {
    duration = 5 * 60;
  }

  timerId = setInterval(() => {


    if (!pauseTimer) {

      let minutes = Math.floor(duration / 60);
      let seconds = duration % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      timer.textContent = `${minutes}:${seconds}`;

      duration--;

      if (duration < 0) {
        clearInterval(timerId);

        setTimeout(() => {
          btnStart.textContent = 'start';
          timer.textContent = `${min}:${sec}`;
        }, 1000);
      }
    }
  }, 1000);
  
  btnStart.removeEventListener('click', startTimer);
  btnStart.addEventListener('click', stopTimer);
};

function stopTimer() {
  if (!pauseTimer) {
    pauseTimer = true;
    btnStart.textContent = 'start';
  } else {
    pauseTimer = false;
    btnStart.textContent = 'stop';
  }
};