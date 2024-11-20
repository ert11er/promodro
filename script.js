const timerDisplay = document.getElementById('timer-display');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');

let isRunning = false;
let isWorkTime = true;
let workTimeInSeconds = 25 * 60;
let breakTimeInSeconds = 5 * 60;
let currentTimer = workTimeInSeconds;

function updateTimerDisplay() {
  const minutes = Math.floor(currentTimer / 60);
  const seconds = currentTimer % 60;

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`; 1 
}

function startStopTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    startStopBtn.textContent = "Start";
  } else {
    isRunning = true;
    startStopBtn.textContent = "Stop";

    // Validate input values (optional, adjust as needed)
    // ...

    timerInterval = setInterval(tick, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  startStopBtn.textContent = "Start";
  if (isWorkTime) {
    currentTimer = workTimeInSeconds;
  } else {
    currentTimer = breakTimeInSeconds;
  }
  updateTimerDisplay();
}

function tick() {
  if (currentTimer > 0) {
    currentTimer--;
    updateTimerDisplay();
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    startStopBtn.textContent = "Start";
    isWorkTime = !isWorkTime;
    currentTimer = isWorkTime ? workTimeInSeconds : breakTimeInSeconds;
    updateTimerDisplay();
  }
}

workTimeInput.addEventListener('change', () => {
  const inputValue = workTimeInput.value.trim();
  const [minutes, seconds] = inputValue.split(',').map(Number);

  workTimeInSeconds = minutes * 60 + seconds;

  if (!isRunning && isWorkTime) {
    currentTimer = workTimeInSeconds;
    updateTimerDisplay();
  }
});

breakTimeInput.addEventListener('change', () => {
  const inputValue = breakTimeInput.value.trim();
  const [minutes, seconds] = inputValue.split(',').map(Number);

  breakTimeInSeconds = minutes * 60 + seconds;

  if (!isRunning && !isWorkTime) {
    currentTimer = breakTimeInSeconds;
    updateTimerDisplay();
  }
});

startStopBtn.addEventListener('click', startStopTimer);
resetBtn.addEventListener('click', resetTimer);

updateTimerDisplay();