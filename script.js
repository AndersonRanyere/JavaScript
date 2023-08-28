const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');



const coracaoDeAco = {
    songName: 'Coração de Aço',
    artist: 'Hungria',
    file: 'coracao-de-aco'
};

const dubai = {
    songName: 'Dubai',
    artist: 'Hungria',
    file: 'dubai-hungria'
};

const oPlayboyRodou = {
    songName: 'O Playboy Rodou',
    artist: 'Hungria',
    file: 'o-playboy-rodou'
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = [coracaoDeAco, dubai, oPlayboyRodou];
let sortedPlaylist = [originalPlaylist];
let index = 0;

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}
function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}


function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }
    else {
        playSong();
    }
}

function initializeSong(){
    cover.src = `images/covers/${originalPlaylist[index].file}.webp`;
    song.src = `songs/${originalPlaylist[index].file}.mp3`;
    songName.innerText = originalPlaylist[index].songName;
    bandName.innerText = originalPlaylist[index].artist;
}

function previousSong(){
    if(index === 0){
        index = originalPlaylist.length - 1;
    }
    else {
        index -= 1;
    }
    initializeSong();
    playSong();
}
function nextSong(){
    if(index === originalPlaylist.length -1){
        index = 0;
    }
    else {
        index += 1;
    }
    initializeSong();
    playSong();
}

function updateProgressBar(){
    const barWidht = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidht}%`);

}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size -1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random()* size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonClicked(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    }
    else{
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
    }
}

function repeatButtonClicked(){
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active');  
    }
    else{
        repeatOn = false;
        shuffleButton.classList.remove('button-active');
    }

}

function nextOrRepeat(){
    if (repeatOn === false){
        nextSong();

    }
    else {
        playSong();
    }
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
song.addEventListener('ended', nextOrRepeat);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);



