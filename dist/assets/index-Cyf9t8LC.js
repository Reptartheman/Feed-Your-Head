(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const c=new Audio,v=document.getElementById("playButton"),f=document.getElementsByClassName("vinyl"),I=document.getElementById("next"),P=document.getElementById("previous"),C=document.getElementById("progress"),d=document.getElementById("progress-container");document.getElementById("broken");let m=!1,y=document.querySelector(".nav-list"),h=document.querySelector(".hamburger");const M=document.querySelector("button[aria-expanded]"),b="./assets/images/Pause.svg",q="./assets/images/Play.svg",N=[{id:0,title:"Broken",artist:"Reptar, the Man",duration:"3:49",src:"./music/Broken.mp3"},{id:1,title:"Final Destination",artist:"Reptar, the Man",duration:"3:11",src:"./music/Final Destination.mp3"},{id:2,title:"Blame",artist:"Reptar, the Man",duration:"3:55",src:"./music/Blame.mp3"},{id:3,title:"Feed Your Head",artist:"Reptar, the Man",duration:"4:10",src:"./music/Feed Your Head.mp3"}];let t={songs:[...N],currentSong:null,songCurrentTime:0};function a(e){const o=t==null?void 0:t.songs.find(n=>n.id===e);c.src=o.src,c.title=o.title,(t==null?void 0:t.currentSong)===null||(t==null?void 0:t.currentSong.id)!==o.id?c.currentTime=0:c.currentTime=t.songCurrentTime,t.currentSong=o,m=!0,m?v.querySelector("img").src=b:alert("Something went wrong"),A(),c.play();const s=y.querySelector(".now-playing");s&&s.remove(),y.querySelectorAll("li").forEach((n,i)=>{i===e?n.classList.add("playing"):n.classList.remove("playing")});for(let n=0;n<f.length;n++)f[n].style.animationPlayState="running"}function A(){var n,i;const e=document.getElementById("title"),o=document.getElementById("artist"),s=(n=t==null?void 0:t.currentSong)==null?void 0:n.title,r=(i=t==null?void 0:t.currentSong)==null?void 0:i.artist;e.textContent=s?`Now Playing: ${s} `:"",o.textContent=r||""}function L(){t.songCurrentTime=c.currentTime,document.querySelector(".vinyl-container").classList.remove("play"),m=!1,m?alert("Something went wrong"):v.querySelector("img").src=q;for(let e=0;e<f.length;e++)f[e].style.animationPlayState="paused";c.pause()}function S(){const e=B();if(e!==-1&&e<t.songs.length-1){const o=t.songs[e+1];a(o.id)}else a(t.songs[0].id)}function $(){const e=B();if(e!==-1&&e>0){const o=t.songs[e-1];a(o.id)}else{const o=t.songs.length-1;a(t.songs[o].id)}}const B=()=>t==null?void 0:t.songs.indexOf(t.currentSong);function E(e){const{duration:o,currentTime:s}=e.srcElement,r=s/o*100;C.style.width=`${r}%`;const n=Math.floor(s/60),i=Math.floor(s%60),l=`${n}:${i.toString().padStart(2,"0")}`;let u=o-s;isNaN(u)&&(u=0);const g=Math.floor(u/60),p=Math.floor(u%60),w=`${g}:${p.toString().padStart(2,"0")}`,x=document.getElementById("elapsed-time"),T=document.getElementById("remaining-time");x.textContent=l,T.textContent=`-${w}`}function O(e){const o=this.clientWidth;let s;e.type==="mousedown"||e.type==="mouseup"||e.type==="mousemove"?s=e.offsetX:(e.type==="touchstart"||e.type==="touchmove"||e.type==="touchend")&&(s=e.touches[0].clientX-this.getBoundingClientRect().left);const r=c.duration,n=s/o*r;c.currentTime=n;function i(u){let g;u.type==="mousemove"?g=u.offsetX:u.type==="touchmove"&&(g=u.touches[0].clientX-this.getBoundingClientRect().left);const p=g/o*r;c.currentTime=p}function l(){e.type==="mousedown"?(d.removeEventListener("mousemove",i),d.removeEventListener("mouseup",l)):e.type==="touchstart"&&(d.removeEventListener("touchmove",i),d.removeEventListener("touchend",l))}e.type==="mousedown"?(d.addEventListener("mousemove",i),d.addEventListener("mouseup",l)):e.type==="touchstart"&&(d.addEventListener("touchmove",i),d.addEventListener("touchend",l))}v.addEventListener("click",()=>{m?L():(t==null?void 0:t.currentSong)===null?a(t==null?void 0:t.songs[0].id):a(t==null?void 0:t.currentSong.id)});function R(){const e=document.querySelector(".navbar-toggler"),o=e.getAttribute("aria-expanded")==="true"||!1;e.setAttribute("aria-expanded",!o),o?h.innerHTML="&#9776;":h.innerHTML="&#88;"}function k(){const e=y.querySelectorAll("li.song"),o=[];e.forEach((s,r)=>{o.push(s.textContent.trim()),s.addEventListener("click",()=>{e.forEach(n=>{n.classList.remove("playing")}),s.classList.toggle("playing"),a(r)})})}k();function X(){M.addEventListener("click",R),["click","mouseup","mousedown"].forEach(e=>{d.addEventListener(e,O),d.addEventListener(e,E)}),c.addEventListener("timeupdate",E),c.addEventListener("ended",S),["click","touch"].forEach(e=>{I.addEventListener(e,S),P.addEventListener(e,$)})}X();window.addEventListener("keydown",e=>{e.code==="Space"&&(e.preventDefault(),m?L():(t==null?void 0:t.currentSong)===null?a(t==null?void 0:t.songs[0].id):a(t==null?void 0:t.currentSong.id))});