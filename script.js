let buttons = $("div.btn");
let gameArray = [];
let userArray = [];
let gameRunning = false;
let currentStep = 0;
let title = $("#level-title");

$(document).on("keydown", (e) => {
  if (gameRunning) return;
  gameRunning = true;
  userArray = [];
  gameArray = [];
  currentLevel = 0;
  currentStep = 0;
  levelUp();
});

buttons.click((e) => {
  if (!gameRunning) return;

  userArray[currentStep] = e.target.dataset.val;
  if (userArray[currentStep] == gameArray[currentStep]) {
    currentStep++;
  } else {
    gameOver();
  }
  if (currentStep == gameArray.length) {
    setTimeout(function () {
      levelUp();
    }, 500);
  }
  animatePress($(e.target));

  playAudio(e.target.id);
});

function animatePress(button) {
  button.addClass("pressed");
  setTimeout(() => {
    button.removeClass("pressed");
  }, 100);
}

function levelUp() {
  currentStep = 0;
  currentLevel++;
  title.text(`Level ${currentLevel}`);
  userArray = [];
  addRandomSequence();
}

function addRandomSequence() {
  let randomNum = Math.floor(Math.random() * 4);
  gameArray.push(randomNum);
  buttons.eq(randomNum).fadeOut().fadeIn();
  playAudio(buttons[randomNum].id);
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  gameRunning = false;
  title.text("Game Over, Press any key to Restart");
  playAudio("wrong");
}

function playAudio(soundName){
  var audio = new Audio(`./sounds/${soundName}.mp3`);
  audio.play();
}