const video = document.querySelector(".viewer");
const toggleButton = document.querySelector(".player__button.toggle");
const volumeSlider = document.querySelector('input[name="volume"]');
const speedSlider = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll("[data-skip]");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress__filled");

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateToggleIcon() {
  toggleButton.textContent = video.paused ? "►" : "❚ ❚";
}

function handleVolumeChange() {
  video.volume = volumeSlider.value;
}

function handleSpeedChange() {
  video.playbackRate = speedSlider.value;
}

function skip() {
  const seconds = parseFloat(this.dataset.skip);
  video.currentTime += seconds;
}

function updateProgressBar() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

toggleButton.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateToggleIcon);
video.addEventListener("pause", updateToggleIcon);
video.addEventListener("timeupdate", updateProgressBar);

volumeSlider.addEventListener("input", handleVolumeChange);
speedSlider.addEventListener("input", handleSpeedChange);

skipButtons.forEach((button) => button.addEventListener("click", skip));

let isMouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousedown", () => (isMouseDown = true));
progress.addEventListener("mouseup", () => (isMouseDown = false));
progress.addEventListener("mousemove", (e) => isMouseDown && scrub(e));
progress.addEventListener("mouseleave", () => (isMouseDown = false));
