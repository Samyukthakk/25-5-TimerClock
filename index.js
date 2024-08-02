const TWENTYFIVE_MINUTES = 25 * 60;
const FIVE_MINUTES = 5 * 60;
let isSessionMode = true;
let breakSessionLength = 5 * 60;
let sessionLength = 25 * 60;
let sessionTimer;
let breakTimer;
const breakMinusElement = document.getElementById("break-minus-element");
const breakPlusElement = document.getElementById("break-plus-element");
const breakSessionElement = document.getElementById("break-session-element");
const sessionMinusElement = document.getElementById("session-minus-element");
const sessionPlusElement = document.getElementById("session-plus-element");
const sessionElement = document.getElementById("session-session-element");
const timerMinutes = document.getElementById("timer-minutes");
const timerSeconds = document.getElementById("timer-seconds");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");

function startBreak() {
    clearInterval(sessionTimer);
    isSessionMode = false;
    title.textContent = "Break";
    breakTimer = setInterval(() => {
        breakSessionLength -= 1;
        updateTimer(breakSessionLength);
        if(breakSessionLength === 0) {
          sessionLength = parseInt(sessionElement.textContent,10) * 60;
            updateTimer(sessionLength);
            startSession();
        }
    }, 1000)
}

function startSession() {
    clearInterval(breakTimer);
    isSessionMode = true;
    title.textContent = "session";
    sessionTimer = setInterval(() => {
        sessionLength -= 1;
        updateTimer(sessionLength);
        if (sessionLength === 0) {
            breakSessionLength = parseInt(breakSessionElement.textContent,10) * 60;
            updateTimer(breakSessionLength);
            startBreak();
        }
    }, 1000)
}


function updateTimer(length) {
    timerMinutes.textContent = Math.floor(length / 60);
    timerSeconds.textContent = length % 60;
}

function resetTimer() {
    breakSessionLength = FIVE_MINUTES;
    sessionLength = TWENTYFIVE_MINUTES;
    breakSessionElement.textContent = FIVE_MINUTES / 60;
    sessionElement.textContent = TWENTYFIVE_MINUTES / 60;
    clearInterval(sessionTimer);
    timerMinutes.textContent = TWENTYFIVE_MINUTES / 60;
    timerSeconds.textContent = "00";
    // sessionElement.textContent = FIVE_MINUTES / 60;
}

playButton.addEventListener("click", () => {
    if (isSessionMode) {
       startSession();
    } else {
        startBreak();
    }

})

pauseButton.addEventListener("click", () => {
    if (isSessionMode) {
        clearInterval(sessionTimer);
    }

})

resetButton.addEventListener("click", () => {
    if (isSessionMode) {
        resetTimer();
    }



})


breakPlusElement.addEventListener("click", () => {
    breakSessionLength += 60;
    breakSessionElement.textContent = breakSessionLength / 60;
});

breakMinusElement.addEventListener("click", () => {
    if(breakSessionLength- 60 === 0) {
        return;
    }
    breakSessionLength -= 60;
    breakSessionElement.textContent = breakSessionLength / 60;
});

sessionMinusElement.addEventListener("click", () => {
    if(sessionLength- 60 === 0) {
        return;
    }
    sessionLength -= 60;
    sessionElement.textContent = sessionLength / 60;
    if (isSessionMode) {
        timerMinutes.textContent = sessionLength / 60;
    }
});

sessionPlusElement.addEventListener("click", () => {
    sessionLength += 60;
    sessionElement.textContent = sessionLength / 60;
    if (isSessionMode) {
        timerMinutes.textContent = sessionLength / 60;
    }
});

