import * as Tone from "tone";

type Song = {
  id: number;
  title: string;
  artist: string;
  duration: string;
  src: string;
};


const playButton = document.getElementById("playButton") as HTMLButtonElement;
const vinyl = document.getElementsByClassName("vinyl");
const nextButton = document.getElementById("next") as HTMLButtonElement;
const previousButton = document.getElementById("previous") as HTMLButtonElement;
const progress = document.getElementById("progress") as HTMLProgressElement;
const progressContainer = document.getElementById("progress-container") as HTMLDivElement;
const trackBroken = document.getElementById("broken") as HTMLDivElement;
let navbarList = document.querySelector(".nav-list") as HTMLUListElement;
let hamburgerMenu = document.querySelector(".hamburger") as HTMLButtonElement;
const navButton = document.querySelector("button[aria-expanded]") as HTMLButtonElement;
const pauseImage: string = "./assets/images/Pause.svg";
const playImage: string = "./assets/images/Play.svg";
let isPlaying: boolean = false;



const allSongs: Song[] = [
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
