var workTime = 25,
    breakTime = 5,
    timerClock = document.querySelector('#clock'),
    workPlus = document.querySelector('#work_plus'),
    workView = document.querySelector('#work_view'),
    workMinus = document.querySelector('#work_minus'),
    breakPlus = document.querySelector('#break_plus'),
    breakView = document.querySelector('#break_view'),
    breakMinus = document.querySelector('#break_minus'),
    startBtn = document.querySelector('#start-btn'),
    pauseBtn = document.querySelector('#pause-btn'),
    resetBtn = document.querySelector('#reset-btn'),
    timerTime = workTime * 60,
    timerInterval = 0,
    currentTimer = 'work',
    workClass = 'work',
    breakClass = 'break';

var alarmSound = new Audio('http://demo.tutorialzine.com/2015/04/material-design-stopwatch-alarm-and-timer/assets/06_Urban_Beat.mp3');

function handleWorkMinus() {
  if (workTime > 1){
    workTime--;
    workView.innerHTML = workTime;
    resetTimer();
    workMinus.classList.remove('disabled')
  } else {
    workMinus.classList.add('disabled')
  }
}

function handleWorkPlus() {
  if (workTime < 60){
    workTime++;
    workView.innerHTML = workTime;
    resetTimer();
    workPlus.classList.remove('disabled')
  } else {
    workPlus.classList.add('disabled')
  }
}

function handleBreakPlus() {
  if (breakTime < 60){
    breakTime++;
    breakView.innerHTML = breakTime;
    breakPlus.classList.remove('disabled')
  } else {
    breakPlus.classList.add('disabled')
  }
}

function handleBreakMinus() {
   if (breakTime > 1) {
    breakTime--;
    breakView.innerHTML = breakTime;
     breakMinus.classList.remove('disabled')
  } else {
    breakMinus.classList.add('disabled')
  }
}

function handleStart() {
  if (timerClock.classList.contains('inactive')) {
    startBtn.classList.add('disabled');
    pauseBtn.classList.remove('disabled');
    resetBtn.classList.remove('disabled');
    currentTimer === 'work' ? startWorkTimer() : startBreakTimer()
  }
}

function handleTimerTick(timerType) {
  timerTime--;
  timerClock.innerHTML = returnFormattedToSeconds(timerTime);

  if (timerTime <= 0) {
    alarmSound.play();
    timerClock.classList.remove(timerType);
    resetTimer();

    if (timerType === workClass) {
      startBreakTimer();
    }
  }
}

function createTimer(timerType) {
  return function () {
    clearInterval(timerInterval);
    timerClock.classList.remove('inactive');
    timerClock.classList.add(timerType);
    timerInterval = setInterval(handleTimerTick.bind(this, timerType), 1000);
  }
}

var startWorkTimer = createTimer(workClass);
var startBreakTimer = createTimer(breakClass);

function pauseTimer(){
  clearInterval(timerInterval);
  timerClock.classList.add('inactive');

  startBtn.classList.remove('disabled');
  pauseBtn.classList.add('disabled');
}

// Reset the clock with the previous valid time.
// Useful for setting the same alarm over and over.
function resetTimer(){
  pauseTimer();

  timerClock.classList.remove('break-timer', 'work-timer');
  timerTime = workTime * 60;
  timerClock.innerHTML = returnFormattedToSeconds(timerTime);

  startBtn.classList.remove('disabled')
  pauseBtn.classList.add('disabled')
  resetBtn.classList.add('disabled')
}

workPlus.addEventListener('click', handleWorkPlus);
workMinus.addEventListener('click', handleWorkMinus);

breakPlus.addEventListener('click', handleBreakPlus);
breakMinus.addEventListener('click', handleBreakMinus);

startBtn.addEventListener('click', handleStart);
pauseBtn.addEventListener('click', pauseTimer)
resetBtn.addEventListener('click', resetTimer)

function returnFormattedToSeconds (seconds){
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;
    return min+":"+(sec >= 10 ? sec : "0"+sec);
}