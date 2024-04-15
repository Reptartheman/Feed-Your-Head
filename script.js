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
const pauseImage = "./assets/images/Pause.svg";
const playImage = "./assets/images/Play.svg";
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

  isPlaying = true;
  if (isPlaying) {
    playButton.querySelector("img").src = pauseImage;
  } else {
    alert("Something went wrong");
  }
  setPlayerDisplay();
  audio.play();

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

  for (let i = 0; i < vinyl.length; i++) {
    vinyl[i].style.animationPlayState = "running";
  }
  
}

function setPlayerDisplay() {
  const trackTitle = document.getElementById("title");
  const trackArtist = document.getElementById("artist");

  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;

  trackTitle.textContent = currentTitle ? `Now Playing: ${currentTitle} ` : "";
  trackArtist.textContent = currentArtist ? currentArtist : "";
}

function pauseSong() {
  userData.songCurrentTime = audio.currentTime;
  document.querySelector(".vinyl-container").classList.remove("play");

  isPlaying = false;
  if (!isPlaying) {
    playButton.querySelector("img").src = playImage;
  } else {
    alert("Something went wrong");
  }

  for (let i = 0; i < vinyl.length; i++) {
    vinyl[i].style.animationPlayState = "paused";
  }



  audio.pause();
}

function playNextSong() {
  const currentSongIndex = getCurrentSongIndex();
  if (currentSongIndex !== -1 && currentSongIndex < userData.songs.length - 1) {
    const nextSong = userData.songs[currentSongIndex + 1];
    playSong(nextSong.id);
  } else {
    playSong(userData.songs[0].id);
  }
}

function playPreviousSong() {
  const currentSongIndex = getCurrentSongIndex();
  if (currentSongIndex !== -1 && currentSongIndex > 0) {
    const previousSong = userData.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  } else {
    const lastSongIndex = userData.songs.length - 1;
    playSong(userData.songs[lastSongIndex].id);
  }
}

const getCurrentSongIndex = () => userData?.songs.indexOf(userData.currentSong);

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const elapsedMinutes = Math.floor(currentTime / 60);
  const elapsedSeconds = Math.floor(currentTime % 60);
  const formattedElapsed = `${elapsedMinutes}:${elapsedSeconds
    .toString()
    .padStart(2, "0")}`;

  let remainingTime = duration - currentTime;
  if (isNaN(remainingTime)) {
    remainingTime = 0;
  }
  const remainingMinutes = Math.floor(remainingTime / 60);
  const remainingSeconds = Math.floor(remainingTime % 60);
  const formattedRemaining = `${remainingMinutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;

  const elapsedTimeContainer = document.getElementById("elapsed-time");
  const remainingTimeContainer = document.getElementById("remaining-time");
  elapsedTimeContainer.textContent = formattedElapsed;
  remainingTimeContainer.textContent = `-${formattedRemaining}`;
}

function setProgress(e) {
  const width = this.clientWidth;
  let offsetX;

  if (
    e.type === "mousedown" ||
    e.type === "mouseup" ||
    e.type === "mousemove"
  ) {
    offsetX = e.offsetX;
  } else if (
    e.type === "touchstart" ||
    e.type === "touchmove" ||
    e.type === "touchend"
  ) {
    offsetX = e.touches[0].clientX - this.getBoundingClientRect().left;
  }

  const duration = audio.duration;

  const newTime = (offsetX / width) * duration;
  audio.currentTime = newTime;

  function moveProgress(e) {
    let moveX;

    if (e.type === "mousemove") {
      moveX = e.offsetX;
    } else if (e.type === "touchmove") {
      moveX = e.touches[0].clientX - this.getBoundingClientRect().left;
    }

    const newTime = (moveX / width) * duration;
    audio.currentTime = newTime;
  }

  function stopMove() {
    if (e.type === "mousedown") {
      progressContainer.removeEventListener("mousemove", moveProgress);
      progressContainer.removeEventListener("mouseup", stopMove);
    } else if (e.type === "touchstart") {
      progressContainer.removeEventListener("touchmove", moveProgress);
      progressContainer.removeEventListener("touchend", stopMove);
    }
  }

  if (e.type === "mousedown") {
    progressContainer.addEventListener("mousemove", moveProgress);
    progressContainer.addEventListener("mouseup", stopMove);
  } else if (e.type === "touchstart") {
    progressContainer.addEventListener("touchmove", moveProgress);
    progressContainer.addEventListener("touchend", stopMove);
  }
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
audio.addEventListener("ended", playNextSong);
nextButton.addEventListener("click", playNextSong);
nextButton.addEventListener("touch", playNextSong);
previousButton.addEventListener("click", playPreviousSong);
previousButton.addEventListener("touch", playPreviousSong);
