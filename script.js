console.log("welcome to musicbox");
let songs = [
  {
    songName: "Warriyo - Mortals [NCS Release]",
    filePath: "assets/songs/1.mp3",
    coverPath: "assets/covers/1.jpg",
  },
  {
    songName: "Cielo - Huma-Huma",
    filePath: "assets/songs/2.mp3",
    coverPath: "assets/covers/2.jpg",
  },
  {
    songName: "DEAF KEV - Invincible [NCS Release]-320k",
    filePath: "assets/songs/3.mp3",
    coverPath: "assets/covers/3.jpg",
  },
  {
    songName: "Different Heaven & EH!DE - My Heart [NCS Release]",
    filePath: "assets/songs/4.mp3",
    coverPath: "assets/covers/4.jpg",
  },
  {
    songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release",
    filePath: "assets/songs/5.mp3",
    coverPath: "assets/covers/5.jpg",
  },
  {
    songName: "Rabba - Salam-e-Ishq",
    filePath: "assets/songs/2.mp3",
    coverPath: "assets/covers/6.jpg",
  },
  {
    songName: "Sakhiyaan - Salam-e-Ishq",
    filePath: "assets/songs/2.mp3",
    coverPath: "assets/covers/7.jpg",
  },
  {
    songName: "Bhula Dena - Salam-e-Ishq",
    filePath: "assets/songs/2.mp3",
    coverPath: "assets/covers/8.jpg",
  },
  {
    songName: "Tumhari Kasam - Salam-e-Ishq",
    filePath: "assets/songs/2.mp3",
    coverPath: "assets/covers/9.jpg",
  },
  {
    songName: "Na Jaana - Salam-e-Ishq",
    filePath: "assets/songs/4.mp3",
    coverPath: "assets/covers/10.jpg",
  },
];

//initialise the variables
let songIndex = 1;

//masterSongName
let masterSongName = document.getElementById("masterSongName");

//audio element
let audioElement = new Audio("./assets/songs/1.mp3");

//masterplay
let masterPlay = document.getElementById("masterPlay");

//prgressBar
let myProgressBar = document.getElementById("myProgressBar");

//play song gif
let gif = document.getElementById("gif");

let songItems = Array.from(document.getElementsByClassName("songItem"));
songItems.innerHTML = "";

for (let i = 0; i < songItems.length; i++) {
  songItems[i].innerHTML = `
            <img src=${songs[i].coverPath} alt="${i + 1}" />
              <span class="songName">${songs[i].songName}</span>
                <div class="songlistplay">
                  <span class="timestamp"
                    >05:30</span>
                    <i id=${i + 1} class="far songItemPlay fa-play-circle"></i
                  >
                </div>
  `;
}

let songItemsPlay = Array.from(document.getElementsByClassName("songItemPlay"));

//function to handle play pause
const handlePlay = (element) => {
  element.classList.remove("fa-play-circle");
  element.classList.add("fa-pause-circle");
  gif.style.opacity = 1;
};

const handlePause = (element) => {
  element.classList.remove("fa-pause-circle");
  element.classList.add("fa-play-circle");
  gif.style.opacity = 0;
};

//listen to events

//play / pause click for masterpay under progress bar
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    handlePlay(masterPlay);
    songItemsPlay.forEach((element, index) => {
      if (index === songIndex - 1) {
        handlePlay(element);
      }
    });
  } else {
    audioElement.pause();
    handlePause(masterPlay);
    resetOtherSongsPlay();
  }
});

//audio time change
audioElement.addEventListener("timeupdate", () => {
  //upadate progress bar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

//chnage in progress bar
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const resetOtherSongsPlay = () => {
  songItemsPlay.forEach((element) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  });
};

songItemsPlay.forEach((element) => {
  element.addEventListener("click", (e) => {
    resetOtherSongsPlay();
    if (audioElement.paused || audioElement.currentTime <= 0) {
      songIndex = parseInt(e.target.id);
      console.log(e.target, songIndex);
      handlePlay(e.target);
      audioElement.src = `assets/songs/${songIndex}.mp3`;
      masterSongName.innerText = songs[songIndex - 1].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      handlePlay(masterPlay);
      console.log("masterplay", songIndex, `assets/songs/${songIndex}.mp3`);
    } else {
      audioElement.pause();
      handlePause(masterPlay);
      handlePause(e.target);
    }
  });
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex > 0) {
    resetOtherSongsPlay();
    songIndex = songIndex - 1;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.src = `assets/songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    handlePlay(masterPlay);
    songItemsPlay.forEach((element, index) => {
      if (index === songIndex - 1) {
        handlePlay(element);
      }
    });
  } else songIndex = 0;
  console.log("previous", songIndex, `assets/songs/${songIndex}.mp3`);
});

document.getElementById("next").addEventListener("click", () => {
  if (songIndex > 9) {
    songIndex = 0;
  } else {
    resetOtherSongsPlay();
    songIndex = songIndex + 1;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.src = `assets/songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    handlePlay(masterPlay);
    songItemsPlay.forEach((element, index) => {
      if (index === songIndex - 1) {
        handlePlay(element);
      }
    });
  }
  console.log("next", songIndex, `assets/songs/${songIndex}.mp3`);
});
