/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';// 當video有paused這個property的時候，執行play這個method
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';//'this' is bound to the video: video.addEventListener('play', updateButton);
  console.log(icon);
  toggle.textContent = icon;//const toggle = player.querySelector('.toggle');
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);//parseFloat將字串轉成數字
 //console.log(this.dataset)會是一個有skip:'25'的物件
}

function handleRangeUpdate() {
  video[this.name] = this.value;
   //console.log(this.value)是數值
   //volume、playbackRate是this.name，同時也是HTML Audio/Video Properties
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event listners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
//html audio/video dom reference:https://www.w3schools.com/tags/ref_av_dom.asp
