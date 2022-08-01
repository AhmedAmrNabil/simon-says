var game = false;
var colors = ["red","green","blue","yellow"];
var rndmPattern = [];
var gamePattern = [];

$(document).keydown(function () {
  //check if there is no game currently running
  if (!game) {
    //starting the game
    startGame();
  }
});
//adding the event listeners
$(".btn").mousedown(function (e) {
  //adding the click effect on the buttons
  if(game){
    $(`#${e.target.id}`).addClass("pressed");
    setTimeout(function(){
      $(`#${e.target.id}`).removeClass("pressed");
    },100)
    //playing audio for each button
    var audio = new Audio(`sounds/${e.target.id}.mp3`);
    audio.play();
    //checking the input
    check(e.target.id);
  }
});

function startGame() {
  //resetting values
  rndmPattern = [];
  gamePattern = [];
  game = true;
  //starting the game
  nextLevel();
}
function nextLevel() {
  gamePattern = [];
  $("#level-title").text("Level " + (rndmPattern.length + 1));
  //generating a random color
  var random = Math.floor(Math.random() * 4);
  //choosing the color to add to the random color list
  highlight(colors[random]);
}

function highlight(color) {
  //highlighting the buttons
  $(`.${color}`).fadeOut().fadeIn();
  //add the color the random color list
  rndmPattern.push(color);
}

function check(color) {
  //add the input to the gamePattern array
  gamePattern.push(color);
  var length = gamePattern.length - 1;
  //checking if the last color added to the
  //gamepattern array matches the color in the same
  //index as the random color list
  if (gamePattern[length] != rndmPattern[length]) {
    gameOver();
  } else if (gamePattern.length == rndmPattern.length) {
    //checking if the round is done
      setTimeout(function(){    
        nextLevel();
      },500)
    }
  
}

function gameOver() {
  //change the header text to game over
  $("#level-title").text("Game Over, Press Any Key to Restart");
  //playing game over audio
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  //reset game state
  game = false;
  //flashing the background for game over
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
}