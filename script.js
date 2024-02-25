const timer = document.querySelector('#pomodoro-time');
let min = timer.textContent.slice(0, 2);
let sec = timer.textContent.slice(3, 5);
let duration = (+parseInt(min) * 60) + (+parseInt(sec));

const btnStart = document.querySelector('#start');
let timerId;
let pauseTimer = false;

btnStart.addEventListener('click', startTimer);

function startTimer() {

  btnStart.textContent = 'stop';

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
              }, ms);
            }
        }
    }, 1000);
  
  btnStart.removeEventListener('click', startTimer);
  btnStart.addEventListener('click', stopTimer);
  console.log(`старт - ${timerId}`)
}

function stopTimer() {
  if (!pauseTimer) {
            pauseTimer = true;
            btnStart.textContent = 'start';
        } else {
            pauseTimer = false;
            btnStart.textContent = 'stop';
        }
   console.log(`пауза - ${timerId}`)
}

