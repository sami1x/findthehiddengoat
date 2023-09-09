const container = document.getElementsByClassName("container");
const play = document.getElementsByClassName("play");
const replay = document.getElementsByClassName("replay");
const about = document.getElementsByClassName("about");
const ending = document.getElementsByClassName("ending");
const goat = document.getElementsByClassName("wrapper");
const goatimg = document.getElementsByClassName("goat");
const overlay = document.getElementsByClassName("overlay");
const sound = document.getElementById("sound");
const aoa = document.getElementById("aoa");
const source = document.getElementById("source");
var newheight = 0;
var newwidth = 0;
var normalizedplaybackrate = 0;
var normalizedvolume = 0;

function square(number) {
  return number * number;
}

function normalize(value, min, max, newMin, newMax) {
  const normalizedValue = (value - min) / (max - min);
  const newValue = normalizedValue * (newMax - newMin) + newMin;
  return newValue;
}

function placerandom() {
  const width = container[0].clientWidth;
  const heigth = container[0].clientHeight;
  newwidth = Math.abs(Math.floor(Math.random() * width - 115));
  newheight = Math.abs(Math.floor(Math.random() * heigth - 105));
  goat[0].style.left = `${newwidth}px`;
  goat[0].style.top = `${newheight}px`;
}

function mouseloc(event) {
  const cursorX = event.clientX;
  const cursorY = event.clientY;
  const width = container[0].clientWidth;
  const heigth = container[0].clientHeight;
  let num1 = newwidth + 35 - cursorX;
  let num2 = newheight + 20 - cursorY;
  let distance = Math.sqrt(square(num1) + square(num2)).toFixed();

  num1 = newwidth + 60 - width;
  num2 = newheight + 50 - heigth;
  let max1 = Math.sqrt(square(num1) + square(num2));
  num1 = newwidth + 60 - width;
  num2 = newheight + 50 - 0;
  let max2 = Math.sqrt(square(num1) + square(num2));
  num1 = newwidth + 60 - 0;
  num2 = newheight + 50 - heigth;
  let max3 = Math.sqrt(square(num1) + square(num2));
  num1 = newwidth + 60 - 0;
  num2 = newheight + 50 - 0;
  let max4 = Math.sqrt(square(num1) + square(num2));
  let maxdistance = Math.max(max1, max2, max3, max4);

  normalizedplaybackrate = normalize(
    distance,
    maxdistance,
    1,
    0.8,
    1.5
  ).toFixed(1);
  normalizedvolume = normalize(distance, maxdistance, 1, 0.2, 0.6).toFixed(1);

  if (distance <= 60) {
    sound.playbackRate = 2;
    sound.volume = 1;
  } else if (distance <= 160) {
    sound.volume = 1;
    sound.playbackRate = normalizedplaybackrate;
  } else {
    sound.playbackRate = normalizedplaybackrate;
    sound.volume = normalizedvolume;
  }
}

function startgame() {
  sound.volume = 0.4;
  sound.playbackRate = 1;
  ending[0].style.display = "none";
  goatimg[0].src = "goat1.svg";
  goatimg[0].style.height = "auto";
  goatimg[0].style.width = "auto";
  overlay[0].style.display = "block ";
  goat[0].classList.remove("clicked");
  document.addEventListener("mousemove", mouseloc);
  goat[0].style.display = "block";
  about[0].style.display = "none";
  sound.play();
  placerandom();
}

function endgame() {
  document.removeEventListener("mousemove", mouseloc);
  goat[0].addEventListener("transitionend", showending);
  sound.pause();
  overlay[0].style.display = "none";
  goat[0].classList.add("clicked");
  goat[0].style.left = "50%";
  goat[0].style.top = "50%";
}

function showending() {
  var mytimeout = setTimeout(function () {
    goat[0].style.display = "flex";
    goatimg[0].src = "goat2.svg";
    goatimg[0].style.height = "500px";
    goatimg[0].style.width = "auto";
    aoa.play();
    var mytimeout2 = setTimeout(function () {
      ending[0].style.display = "flex";
      goat[0].style.display = "none";
      goat[0].removeEventListener("transitionend", showending);
      clearTimeout(mytimeout);
      clearTimeout(mytimeout2);
    }, 2500);
  }, 700);
}

play[0].addEventListener("click", startgame);
replay[0].addEventListener("click", startgame);
goat[0].addEventListener("click", endgame);
