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

// Sound effects
const buttonClickSound = new Audio('button_click.mp3');
const timerEndSound = new Audio('timer_end.mp3');

function playSound(sound) {
  sound.currentTime = 0; // Reset sound to the beginning
  sound.play();
}

function updateTimerDisplay() {
  const minutes = Math.floor(currentTimer / 60);
  const seconds = currentTimer % 60;

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function startStopTimer() {
  playSound(buttonClickSound); // Play button click sound
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    startStopBtn.textContent = "Start";
  } else {
    isRunning = true;
    startStopBtn.textContent = "Stop";
    timerInterval = setInterval(tick, 1000);
  }
}

function resetTimer() {
  playSound(buttonClickSound); // Play button click sound
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
    playSound(timerEndSound); // Play timer end sound
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
