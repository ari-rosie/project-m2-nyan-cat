const container = document.querySelector('#app_container');// GAME WRAPPER DIV (non-disposable elements)
const appDiv = document.querySelector('#app'); // GAME MAIN DIVISION (disposable elements)
LEVEL = 1;

// Welcome message to the game, will start on click
let gameStart = new BoardItem('80%', 'auto', container);
gameStart.positionScreen('25%', '10%');
gameStart.setStyle('black', '4px', 'dotted 5px white', 'pointer');
gameStart.addMessage("Hello! My name is Don Bulihno Del Taco and I need your help to escape DOG JAIL! We have to avoid the evil officers and eat as many tacos as possible.. they will help us get extra strength! Use the left and right arrow to move, and exit thru the red door when you see it. (click to start)", 'white');
gameStart.domElement.addEventListener('click', function () {
  const bark = new Sound('sounds/barksnarl.mp3');
  bark.play();
  gameStart.domElement.style.display = 'none';  
  gameStartFn(); // STARTS GAME
});

//creating action sounds
const badCollision = new Sound('sounds/bad.mp3');
const goodCollision = new Sound('sounds/taco.mp3');

// creating end of mission door
const exitGame = new BoardItem('211px', '300px', container);
exitGame.domElement.style.opacity = '0';
exitGame.domElement.innerHTML = "<img src='images/reddoor.png'>";
exitGame.positionScreen(`${GAME_HEIGHT - 300}px`, '70%', '5');
exitGame.domElement.style.position = 'absolute';
const endMission = () => { // FUNCTION DOOR APEARS
  exitGame.domElement.style.opacity = '1';
  FINAL = true;
}

let keydownHandler; //declaring outside function to allow accessibility

// starts the first mission
const gameStartFn = () => {
  let gameEngine = new Engine(appDiv);
  keydownHandler = (event) => {
    if (event.code === 'ArrowLeft') {
      let playerMoves = requestAnimationFrame(gameEngine.player.animateWalk);
      gameEngine.player.moveLeft(); 
  
    }
  
    if (event.code === 'ArrowRight') {
      let playerMoves = requestAnimationFrame(gameEngine.player.animateWalk);
      gameEngine.player.moveRight();
    }
  };
  
  document.addEventListener('keydown', keydownHandler);
  
  // We call the gameLoop method to start the game and set timer 
  gameEngine.gameLoop();  
  setTimeout(endMission, 2000);
}
