// Welcome message to the game, will start on click
const appDiv = document.querySelector('#app');
let gameStart = new BoardItem('80%', 'auto', appDiv);
gameStart.positionScreen('25%', '10%');
gameStart.setStyle('black', '4px', 'dotted 5px white', 'pointer');
gameStart.addMessage("Hello! My name is Don Bulihno Del Taco and I need your help to escape DOG JAIL! We have to avoid the evil officers and eat as many tacos as possible.. they will help us get extra strength! Use the left and right arrow to move, and exit thru the red door when you see it. (click to start)", 'white');
gameStart.domElement.addEventListener('click', function () {
  const bark = new Sound('sounds/barksnarl.mp3');
  bark.play();
  gameStart.domElement.style.display = 'none';
  gameStartFn();
});

//creating action sounds
const badCollision = new Sound('sounds/bad.mp3');
const goodCollision = new Sound('sounds/taco.mp3');

// accessing this exit means user ends game in success, will appear only after timeout
const exitGame = new BoardItem('211px', '300px', appDiv);
exitGame.domElement.style.opacity = '0';
exitGame.domElement.innerHTML = "<img src='images/reddoor.png'>";
exitGame.positionScreen('50%', '70%', '5');
exitGame.domElement.style.position = 'absolute';
const endMission = () => {
  exitGame.domElement.style.opacity = '1';
  FINAL = true;
}


// starts the first mission
const gameStartFn = () => {
  const gameEngine = new Engine(appDiv);
  const keydownHandler = (event) => {
    if (event.code === 'ArrowLeft') {
      requestAnimationFrame(gameEngine.player.animateWalk);
      gameEngine.player.moveLeft();
  
  
    }
  
    if (event.code === 'ArrowRight') {
      requestAnimationFrame(gameEngine.player.animateWalk);
      gameEngine.player.moveRight();
    }
  };
  
  document.addEventListener('keydown', keydownHandler);
  
  // We call the gameLoop method to start the game and set timer 
  gameEngine.gameLoop();  
  setTimeout(endMission, 20000);
}
