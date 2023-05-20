// get Elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreen = player.querySelector(".fullscreen");

// write the functions
function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
};
function updateBtn() {
    const Btn = this.paused ? "►" : "&#9611;&#9611;";
    toggle.innerHTML = Btn;
};
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
};
function handleRangeUpdate() {
    video[this.name] = this.value;
};
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
};
function handlFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
}


// hook up the events
video.addEventListener("click", togglePlay);
video.addEventListener("pause", updateBtn);
video.addEventListener("play", updateBtn);
video.addEventListener("timeupdate", handleProgress);
video.addEventListener("dblclick", handlFullscreen);

skipButtons.forEach(button => button.addEventListener("click", skip));

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

toggle.addEventListener("click", togglePlay);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
fullscreen.addEventListener("click", handlFullscreen);