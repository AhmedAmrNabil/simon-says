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
  }else{
	loseScreen();
  }
  if (currentStep == gameArray.length) {
    levelUp();
  }
  let button = $(e.target);
  button.addClass("pressed");
  setTimeout(()=>{
	  button.removeClass("pressed");
  },100);
});

function levelUp() {
  currentStep = 0;
  currentLevel++;
  title.text(`Level ${currentLevel}`);
  userArray = [];
  addRandomSequence();
}

function addRandomSequence() {
  gameArray.push(Math.floor(Math.random() * 4));
  buttons
    .eq(gameArray[gameArray.length - 1])
    .fadeOut()
    .fadeIn();
}
function loseScreen(){
	$("body").addClass("game-over");
	setTimeout(()=>{
		$("body").removeClass("game-over");
	},200)
	gameRunning = false;
	title.text("Game Over, Press any key to Restart");
}