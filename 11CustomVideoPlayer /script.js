// flags
let isUpdatingRange = false;
let isDraging = false;
//get elements
const player = document.querySelector('.player');

const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const progressBar = player.querySelector('.progress');
const progressBarFilled = player.querySelector('.progress__filled');

const skipButtons = player.querySelectorAll('[data-skip]');
const rangeBtns = player.querySelectorAll('.player__slider');

const fullScreenBtn = document.querySelector('.js-full-screen-btn');
// build our function

function togglePlay() {
  if (video.paused) {
    video.play();
    isPlaying = true;
  } else {
    video.pause();
    isPlaying = false;
  }
}
function updateProgressBar() {
  const timePassed = video.currentTime;
  const duration = video.duration;
  const percent = (timePassed / duration) * 100;

  progressBarFilled.style = `flex-basis: ${percent}%`;
}
function updateButton() {
  const icon = this.paused ? '►' : '⏸';
  toggle.textContent = icon;
}
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
function toggleRangeUpdate() {
  isUpdatingRange = !isUpdatingRange;
}
function handleRangeUpdate() {
  video[this.name] = this.value;
}

function toggleDrag(e) {
  isDraging = !isDraging;
}
function scrub(e) {
  const newTime = (e.offsetX / progressBar.offsetWidth) * video.duration;

  video.currentTime = newTime;
}
function toggleFullScreen() {
  video.requestFullscreen();
}

// hook up even-listeners
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach((btn) => {
  btn.addEventListener('click', skip);
});

rangeBtns.forEach((rangeBtn) => {
  rangeBtn.addEventListener('mouseup', toggleRangeUpdate);
  rangeBtn.addEventListener('mousedown', toggleRangeUpdate);
  rangeBtn.addEventListener('mousemove', handleRangeUpdate);
});

video.addEventListener('timeupdate', updateProgressBar);

progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (e) => isDraging && scrub(e));
progressBar.addEventListener('mousedown', () => (isDraging = true));
progressBar.addEventListener('mouseup', () => (isDraging = false));
progressBar.addEventListener('mouseleave', () => (isDraging = false));

fullScreenBtn.addEventListener('click', toggleFullScreen);
