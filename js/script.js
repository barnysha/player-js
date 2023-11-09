const wrapper = document.querySelector('.wrapper');
const player = document.querySelector('.player');
const containerImg = document.querySelector('.container-img');
const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const audio = document.querySelector('.audio');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');
const title = document.querySelector('.title');
const singer = document.querySelector('.singer');
const timeSetSong = document.querySelector('.timeSet-song');
const durationSong = document.querySelector('.duration-song');


const songs = ['takeMetoChurch', 'dontSpeak']
const singers = ['Hozier', 'No Doubt'];
const titles = ["Take Me to Church", "Don't Speak"];

let songInd = 0;

function currentSong(song) {
    title.innerHTML =  titles[songInd];
    singer.innerHTML =  singers[songInd];
    audio.src = `assets/audio/${song}.mp3`;
    wrapper.style.background = `no-repeat center/100% url(./assets/img/${song}.jpg)`;
    containerImg.style.backgroundImage = `url(./assets/img/${song}.jpg)`;
}

currentSong(songs[songInd]);

function playSong() {
    player.classList.add('play-it');
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    audio.play();
}

function pauseSong() {
    player.classList.remove('play-it');
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
    audio.pause();

}

playBtn.addEventListener('click', ()=>{
    const isPlay = player.classList.contains('play-it');
    if (isPlay) {
        pauseSong();
    } else {
        playSong();
    }
})

pauseBtn.addEventListener('click', ()=>{
    const isPlay = player.classList.contains('play-it');
    if (isPlay) {
        pauseSong();
    } else {
        playSong();
    }
})



function getNextSong() {
    songInd++;

    if(songInd > songs.length - 1) {
        songInd = 0;
    }

    currentSong(songs[songInd]);
    playSong();
}

nextBtn.addEventListener('click', getNextSong)

function getPrevSong() {
    songInd--;

    if (songInd < 0) {
        songInd = songs.length - 1;
    }

    currentSong(songs[songInd]);
    playSong();
}

prevBtn.addEventListener('click', getPrevSong)

function getProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPart = (currentTime/duration) * 100;
    progressBar.style.width = `${progressPart}%`;
}

audio.addEventListener('timeupdate', getProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    // document.getElementById("timeSet-song").textContent = clickX;
    audio.currentTime = (clickX/width)*duration;
}
progress.addEventListener('click', setProgress);

audio.addEventListener('ended', getNextSong);