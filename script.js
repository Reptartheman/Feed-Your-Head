const audio = new Audio();
const playButton = document.getElementById("playButton");
const vinyl = document.getElementsByClassName("vinyl");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const trackBroken = document.getElementById("broken");
let isPlaying = false;
let navbarList = document.querySelector(".nav-list");
let hamburgerMenu = document.querySelector(".hamburger");
const navButton = document.querySelector("button[aria-expanded]");
const allSongs = [
  {
    id: 0,
    title: "Broken",
    artist: "Reptar, the Man",
    duration: "3:49",
    src: "./music/Broken.mp3",
  },
  {
    id: 1,
    title: "Final Destination",
    artist: "Reptar, the Man",
    duration: "3:11",
    src: "./music/Final Destination.mp3",
  },
  {
    id: 2,
    title: "Blame",
    artist: "Reptar, the Man",
    duration: "3:55",
    src: "./music/Blame.mp3",
  },
  {
    id: 3,
    title: "Feed Your Head",
    artist: "Reptar, the Man",
    duration: "4:10",
    src: "./music/Feed Your Head.mp3",
  },
];

let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

function playSong(id) {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData.songCurrentTime;
  }

  userData.currentSong = song;

  const existingNowPlayingElement = navbarList.querySelector(".now-playing");
  if (existingNowPlayingElement) {
    existingNowPlayingElement.remove();
  }

  const songList = navbarList.querySelectorAll("li");
  songList.forEach((li, index) => {
    if (index === id) {
      li.classList.add("playing");
    } else {
      li.classList.remove("playing");
    }
  });

  const nowPlayingElement = document.createElement("li");
  nowPlayingElement.textContent = "Now Playing: " + song.title;
  nowPlayingElement.classList.add("now-playing");
  navbarList.insertBefore(nowPlayingElement, navbarList.firstChild);

  document.querySelector(".vinyl-container").classList.add("play");
  playButton.querySelector("i").classList.remove("icon-play");
  playButton.querySelector("i").classList.add("icon-pause");
  for (let i = 0; i < vinyl.length; i++) {
    vinyl[i].style.animationPlayState = "running";
  }
  isPlaying = true;

  setPlayerDisplay();
  audio.play();
}

function setPlayerDisplay() {
  const trackTitle = document.getElementById("title");
  const trackArtist = document.getElementById("artist");

  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;

  trackTitle.textContent = currentTitle ? currentTitle : "";
  trackArtist.textContent = currentArtist ? currentArtist : "";
}

function pauseSong() {
  userData.songCurrentTime = audio.currentTime;
  document.querySelector(".vinyl-container").classList.remove("play");

  playButton.querySelector("i").classList.add("icon-play");
  playButton.querySelector("i").classList.remove("icon-pause");
  for (let i = 0; i < vinyl.length; i++) {
    vinyl[i].style.animationPlayState = "paused";
  }

  isPlaying = false;
  audio.pause();
}

function playNextSong() {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];
    playSong(nextSong.id);
  }
}

function playPreviousSong() {
  if (userData?.currentSong === null) return;
  else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];

    playSong(previousSong.id);
  }
}

const getCurrentSongIndex = () => userData?.songs.indexOf(userData.currentSong);

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

playButton.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

function toggleNav() {
  const $navbarToggler = document.querySelector(".navbar-toggler");

  const expanded =
    $navbarToggler.getAttribute("aria-expanded") === "true" || false;
  $navbarToggler.setAttribute("aria-expanded", !expanded);
  if (expanded) {
    hamburgerMenu.innerHTML = `&#9776;`;
  } else {
    hamburgerMenu.innerHTML = `&#88;`;
  }
}

function playSelected() {
  const songList = navbarList.querySelectorAll("li");
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
navButton.addEventListener("click", toggleNav);
progressContainer.addEventListener("click", setProgress);
progressContainer.addEventListener("mouseup", setProgress);
progressContainer.addEventListener("mouseup", updateProgress);
progressContainer.addEventListener("mousedown", setProgress);
progressContainer.addEventListener("mousedown", updateProgress);
audio.addEventListener("timeupdate", updateProgress);
nextButton.addEventListener("click", playNextSong);
nextButton.addEventListener("touch", playNextSong);
previousButton.addEventListener("click", playPreviousSong);
previousButton.addEventListener("touch", playPreviousSong);
