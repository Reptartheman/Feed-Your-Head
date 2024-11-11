import pauseImage from "./assets/images/Pause.svg";
import playImage from "./assets/images/Play.svg";
import brokenAudioFile from "./music/Broken.mp3";
import finalDestinationAudioFile from "./music/Final Destination.mp3";
import blameAudioFile from "./music/Blame.mp3";
import feedYourHeadAudioFile from "./music/Feed Your Head.mp3";

const DOM = {
  playButton: document.getElementById("playButton"),
  vinyl: document.getElementsByClassName("vinyl"),
  nextButton: document.getElementById("next"),
  previousButton: document.getElementById("previous"),
  progress: document.getElementById("progress"),
  progressContainer: document.getElementById("progress-container"),
  navbarList: document.querySelector(".nav-list"),
  hamburgerMenu: document.querySelector(".hamburger"),
  navButton: document.querySelector("button[aria-expanded]"),
  elapsedTimeContainer: document.getElementById("elapsed-time"),
  remainingTimeContainer: document.getElementById("remaining-time"),
};


const audio = new Audio();
const allSongs = [
  { id: 0, title: "Broken", artist: "Reptar, the Man", duration: "3:49", src: brokenAudioFile },
  { id: 1, title: "Final Destination", artist: "Reptar, the Man", duration: "3:11", src: finalDestinationAudioFile },
  { id: 2, title: "Blame", artist: "Reptar, the Man", duration: "3:55", src: blameAudioFile },
  { id: 3, title: "Feed Your Head", artist: "Reptar, the Man", duration: "4:10", src: feedYourHeadAudioFile },
];

const appState = {
  isPlaying: false,
  userData: {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0,
  },
};


function playSong(id) {
  const song = appState.userData.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  audio.currentTime = appState.userData.currentSong?.id === song.id
    ? appState.userData.songCurrentTime
    : 0;

  appState.userData.currentSong = song;
  appState.isPlaying = true;

  updatePlayButton(true);
  setPlayerDisplay();
  updateNowPlaying(id);
  audio.play();
}

function updatePlayButton(isPlaying) {
  const playIcon = DOM.playButton.querySelector("img");
  playIcon.src = isPlaying ? pauseImage : playImage;

  for (let i = 0; i < DOM.vinyl.length; i++) {
    DOM.vinyl[i].style.animationPlayState = isPlaying ? "running" : "paused";
  }
}

function updateNowPlaying(selectedSongId) {
  const existingNowPlayingElement = DOM.navbarList.querySelector(".now-playing");
  if (existingNowPlayingElement) existingNowPlayingElement.remove();
  const songList = DOM.navbarList.querySelectorAll("li");
  songList.forEach((li, index) => {
    li.classList.toggle("playing", index === selectedSongId);
  });
}

function pauseSong() {
  appState.userData.songCurrentTime = audio.currentTime;

  appState.isPlaying = false;

  updatePlayButton(false);

  audio.pause();
}

function playNextSong() {
  const currentSongIndex = appState.userData.songs.indexOf(appState.userData.currentSong);
  
  const nextSongIndex = (currentSongIndex + 1) % appState.userData.songs.length;
  
  playSong(appState.userData.songs[nextSongIndex].id);
}


function playPreviousSong() {

  const currentSongIndex = appState.userData.songs.indexOf(appState.userData.currentSong);
  
  const previousSongIndex = (currentSongIndex - 1 + appState.userData.songs.length) % appState.userData.songs.length;

  playSong(appState.userData.songs[previousSongIndex].id);
}



function setPlayerDisplay() {
  const trackTitle = document.getElementById("title");
  const trackArtist = document.getElementById("artist");

  const currentTitle = appState.userData?.currentSong?.title;
  const currentArtist = appState.userData?.currentSong?.artist;

  trackTitle.textContent = currentTitle ? `Now Playing: ${currentTitle} ` : "";
  trackArtist.textContent = currentArtist ? currentArtist : "";
}






function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;

  if (!isFinite(duration)) return;

  const progressPercent = (currentTime / duration) * 100;
  DOM.progress.style.width = `${progressPercent}%`;

  DOM.elapsedTimeContainer.textContent = formatTime(currentTime);
  DOM.remainingTimeContainer.textContent = `-${formatTime(duration - currentTime)}`;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}


function setProgress(e) {
  if (!isFinite(audio.duration) || audio.duration === 0) {
    console.warn("Audio duration is not available yet.");
    return;
  }

  const width = this.clientWidth
  const clickX = e.offsetX;
  const duration = audio.duration

  const newTime = (clickX / width) * duration;
  if (isFinite(newTime)) {
    audio.currentTime = newTime;
  }

}





DOM.playButton.addEventListener("click", () => {
  if (appState.isPlaying) {
    pauseSong();
  } else if (appState.userData?.currentSong === null) {
    playSong(appState.userData?.songs[0].id);
  } else {
    playSong(appState.userData?.currentSong.id);
  }
});

function toggleNav() {
  const $navbarToggler = document.querySelector(".navbar-toggler");

  const expanded =
    $navbarToggler.getAttribute("aria-expanded") === "true" || false;
  $navbarToggler.setAttribute("aria-expanded", !expanded);
  if (expanded) {
    DOM.hamburgerMenu.innerHTML = `&#9776;`;
  } else {
    DOM.hamburgerMenu.innerHTML = `&#88;`;
  }
}

function playSelected() {
  const songList = DOM.navbarList.querySelectorAll("li.song");
  const songArray = [];
  songList.forEach((li, index) => {
    songArray.push(li.textContent.trim());

    li.addEventListener("click", () => {
      songList.forEach((element) => {
        element.classList.remove("playing");
      });
      li.classList.toggle("playing");
      playSong(index);
    });
  });
}

playSelected();
function initializeEventListeners() {
  const mouseEvents = ["mousedown", "mouseup", "click"];

  mouseEvents.forEach(event => {
    DOM.progressContainer.addEventListener(event, setProgress)
    DOM.progressContainer.addEventListener(event, updateProgress)
  })

  DOM.navButton.addEventListener("click", toggleNav);
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("ended", playNextSong);

  ["click", "touch"].forEach(event => {
    DOM.nextButton.addEventListener(event, playNextSong);
    DOM.previousButton.addEventListener(event, playPreviousSong);
  });
}


initializeEventListeners();

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
      event.preventDefault();
      if (appState.isPlaying) {
          pauseSong();
      } else {
          if (appState.userData?.currentSong === null) {
              playSong(appState.userData?.songs[0].id);
          } else {
              playSong(appState.userData?.currentSong.id);
          }
      }
  }
});
