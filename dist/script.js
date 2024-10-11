import * as Tone from "tone";
const playButton = document.getElementById("playButton");
const vinyl = document.getElementsByClassName("vinyl");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const trackBroken = document.getElementById("broken");
let navbarList = document.querySelector(".nav-list");
let hamburgerMenu = document.querySelector(".hamburger");
const navButton = document.querySelector("button[aria-expanded]");
const pauseImage = "./assets/images/Pause.svg";
const playImage = "./assets/images/Play.svg";
let isPlaying = false;
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
        title: "Kinda Strange",
        artist: "Reptar, the Man",
        duration: "3:32",
        src: "./music/Kinda Strange.mp3",
    },
    {
        id: 3,
        title: "The Stars Aligned",
        artist: "Reptar, the Man",
        duration: "3:41",
        src: "./music/The Stars Aligned.mp3",
    },
];
let player = new Tone.Player(allSongs[0].src).toDestination();
playButton.addEventListener("click", () => {
    player.autostart = false;
    if (!isPlaying) {
        player.start();
        playButton.querySelector("i").classList.add("icon-pause");
        playButton.querySelector("i").classList.remove("icon-play");
        for (let i = 0; i < vinyl.length; i++) {
            vinyl[i].style.animationPlayState = "running";
        }
        isPlaying = true;
    }
    player.start();
});
