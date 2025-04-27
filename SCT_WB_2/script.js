// DOM Elements
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

// Variables
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 1;

// Format time to always show 2 digits
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Format milliseconds to always show 2 digits
function formatMilliseconds(ms) {
    return ms < 10 ? `0${ms}` : ms.toString().slice(0, 2);
}

// Update the stopwatch display
function updateDisplay() {
    const currentTime = Date.now() - startTime + elapsedTime;
    const totalSeconds = Math.floor(currentTime / 1000);
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((currentTime % 1000) / 10);

    hoursDisplay.textContent = formatTime(hours);
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatMilliseconds(milliseconds);
}

// Start the stopwatch
function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
        
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

// Pause the stopwatch
function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    lapCount = 1;
    
    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';
    
    lapsList.innerHTML = '';
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
}

// Record a lap time
function recordLap() {
    if (isRunning) {
        const lapTime = `${hoursDisplay.textContent}:${minutesDisplay.textContent}:${secondsDisplay.textContent}.${millisecondsDisplay.textContent}`;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `<span>Lap ${lapCount++}</span><span>${lapTime}</span>`;
        lapsList.prepend(lapItem);
    }
}

// Event Listeners
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);