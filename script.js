const wrapper = document.querySelector('.video__wrapper');
const video = wrapper.querySelector('.video__player');
const progress = wrapper.querySelector('.video__progress-line');
const progressBar = wrapper.querySelector('.video__progress');
const playBtn = wrapper.querySelector('.video__play');
const range = wrapper.querySelectorAll('.video__range');
const btns = wrapper.querySelectorAll('.video__btn[data-skip]');
const fullBtn = wrapper.querySelector('.video__btn[data-fullscreen]');
let mousedown = false;
let fullscrean = false;

function togglePlay () {
    video.paused ? video.play() : video.pause();
}

function updateButton () {
    const icon = video.paused ? '▻' : '||';
    playBtn.textContent = icon;
}

function skip () {
    const skip = Number(this.dataset.skip);
    video.currentTime += skip;
    
    console.log(video.currentTime);
}

function handleRangeUpdate () {
    video[this.name] = this.value;
}

function handleProgress () {
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.width = percent + "%";
}

function handleProgressBar (e) {
    const time = (e.offsetX / this.offsetWidth) * video.duration;
    if (mousedown) {
        video.currentTime = time;
    }
}

function fullscreen () {
    wrapper.webkitRequestFullscreen();
}

playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
progressBar.addEventListener('click', handleProgressBar);
progressBar.addEventListener('mousemove', handleProgressBar);
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);
fullBtn.addEventListener('click', fullscreen);
btns.forEach(btn => btn.addEventListener('click', skip));
range.forEach(input => input.addEventListener('change', handleRangeUpdate));
range.forEach(input => input.addEventListener('mousemove', handleRangeUpdate));