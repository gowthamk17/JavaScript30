let countdown;
const displayTime = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
    // clear existing timer
    clearInterval(countdown);


    const now = Date.now();
    const then = now + seconds * 1000;
    displayEndTime(then);
    displayTimeLeft(seconds);
    countdown = setInterval(function () {
        const secondsLeft = Math.floor((then - Date.now()) / 1000)
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remSeconds = seconds % 60;
    const display = `${minutes}:${remSeconds < 10 ? '0' : ''}${remSeconds}`;
    displayTime.textContent = display;
    document.title = display;
}

function displayEndTime(timeStamp) {
    const time = new Date(timeStamp);
    const hour = time.getHours();
    const minute = time.getMinutes();
    endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${minute < 10 ? '0' + minute : minute}`
}

function setTimer() {
    timer(this.dataset.time)
}


buttons.forEach(button => button.addEventListener('click', setTimer));

document.customForm.addEventListener("submit", function (e) {
    e.preventDefault();
    timer(this.minutes.value * 60);
    this.reset();
})