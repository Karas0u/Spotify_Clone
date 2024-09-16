function player() {
    let bigfooter = document.getElementsByClassName("bigfooter")[0];
    let displayStyle = window.getComputedStyle(bigfooter).display;

    if (displayStyle === "block") {
        bigfooter.style.display = "none";
        document.getElementsByClassName("player")[0].style.display = "block";
    }
}

const songDirectory = './Songs/';
const audioPlayer = document.getElementById('audioPlayer');
function playSong(songElement) {
    const songName = songElement.querySelector('.name').textContent;
    const artistname = songElement.querySelector('.subname').textContent;
    if (decodeURIComponent(audioPlayer.src.substring(audioPlayer.src.lastIndexOf('/') + 1)) === songName + " - " + artistname + ".mp3") {
        audioPlayer.play();
    }
    else {
        audioPlayer.src = songDirectory + songName + " - " + artistname + ".mp3";
        audioPlayer.play();
    }
    document.getElementsByClassName("play")[0].style.display = "none";
    document.getElementsByClassName("pause")[0].style.display = "block";

    let clickedsongSrc = songElement.querySelector(".segalbimg img").src;
    document.getElementsByClassName("runningsongpic")[0].innerHTML = `<img src="${clickedsongSrc}" alt="Now playing song cover">`;
    document.getElementsByClassName("runningsongname")[0].innerHTML = songName;
    document.getElementsByClassName("runningsongartistname")[0].innerHTML = artistname;
}

const progressBar = document.querySelector(".timeline .progress");
const timeline = document.querySelector(".timeline");
const progressCircle = document.querySelector(".timeline .progress-circle");
const currentTimeDisplay = document.getElementsByClassName('ct')[0];
const volumeSlider = document.getElementById('volumeSlider');

audioPlayer.addEventListener('loadedmetadata', () => {
    const min = Math.floor(audioPlayer.duration / 60);
    const sec = Math.floor(audioPlayer.duration % 60);
    const formattedMin = min.toString().padStart(2, '0');
    const formattedSec = sec.toString().padStart(2, '0');
    document.getElementsByClassName('dur')[0].textContent = `${formattedMin}:${formattedSec}`;
});

audioPlayer.addEventListener('timeupdate', () => {
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = percentage + "%";
    progressCircle.style.left = percentage + "%";

    const minutes = Math.floor(audioPlayer.currentTime / 60);
    const seconds = Math.floor(audioPlayer.currentTime % 60);
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    currentTimeDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
});

function playpause() {
    let play = document.getElementsByClassName("play")[0];
    let pause = document.getElementsByClassName("pause")[0];
    let playdisplayStyle = window.getComputedStyle(play).display;
    if (playdisplayStyle === "none") {
        play.style.display = "block";
        pause.style.display = "none";
        audioPlayer.pause();
    }
    else {
        play.style.display = "none";
        pause.style.display = "block";
        audioPlayer.play();
    }
}

timeline.addEventListener('click', (e) => {
    const timelineWidth = timeline.offsetWidth;
    const clickPosition = e.offsetX;
    const clickPercentage = (clickPosition / timelineWidth) * 100;
    const newTime = (clickPercentage / 100) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
})

volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});

function hplaypause(event, ele) {
    event.stopPropagation();
    let bigfooter = document.getElementsByClassName("bigfooter")[0];
    let displayStyle = window.getComputedStyle(bigfooter).display;
    if (displayStyle === "block") {
        bigfooter.style.display = "none";
        document.getElementsByClassName("player")[0].style.display = "block";
    }
    
    let hplay = ele.getElementsByClassName("hplay")[0];
    let hpause = ele.getElementsByClassName("hpause")[0];
    let hplaydisplayStyle = window.getComputedStyle(hplay).display;
    let parent = ele.parentElement;
    let nameinparent = parent.getElementsByClassName("name")[0].textContent;
    let subnameinparent = parent.getElementsByClassName("subname")[0].textContent;
    if (hplaydisplayStyle === "none") {
        document.getElementsByClassName("play")[0].style.display = "block"
        document.getElementsByClassName("pause")[0].style.display = "none"
        hplay.style.display = "block";
        hpause.style.display = "none";
        audioPlayer.pause();
    }
    else {
        if (decodeURIComponent(audioPlayer.src.substring(audioPlayer.src.lastIndexOf('/') + 1)) === nameinparent + " - " + subnameinparent + ".mp3") {
            document.getElementsByClassName("play")[0].style.display = "none"
            document.getElementsByClassName("pause")[0].style.display = "block"
            hplay.style.display = "none";
            hpause.style.display = "block";
            audioPlayer.play();
        }
        else {
            audioPlayer.src = songDirectory + nameinparent + " - " + subnameinparent + ".mp3";
            hplay.style.display = "none";
            hpause.style.display = "block";
            document.getElementsByClassName("play")[0].style.display = "none"
            document.getElementsByClassName("pause")[0].style.display = "block"
            audioPlayer.play();
            console.log(nameinparent + " - " + subnameinparent + ".mp3");
            console.log(audioPlayer.src.substring(audioPlayer.src.lastIndexOf('/') + 1));
            console.log(decodeURIComponent(audioPlayer.src.substring(audioPlayer.src.lastIndexOf('/') + 1)))
        }
    }
    let clickedsongSrc = parent.querySelector(".segalbimg img").src;
    document.getElementsByClassName("runningsongpic")[0].innerHTML = `<img src="${clickedsongSrc}" alt="Now playing song cover">`;
    document.getElementsByClassName("runningsongname")[0].innerHTML = nameinparent;
    document.getElementsByClassName("runningsongartistname")[0].innerHTML = subnameinparent;
} 

function toggleMute() {
    if (audioPlayer.muted) {
        audioPlayer.muted = false;
        volumeSlider.value = 1;  
        audioPlayer.volume = 1;
    } else {
        audioPlayer.muted = true;
        volumeSlider.value = 0;
    }
}

function mutevisible() {
    let muteButton = document.getElementById("muteButton");
    let unmuteButton = document.getElementById("unmuteButton");
    let mtbtn = window.getComputedStyle(muteButton).display;
    if (mtbtn === "block"){
        muteButton.style.display = "none"
        unmuteButton.style.display = "block"
    }
    else {
        muteButton.style.display = "block"
        unmuteButton.style.display = "none"
    }
}
