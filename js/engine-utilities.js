
// The purpose of this function is to determine in which slot to place our next enemy.
// The possibilities are 0, 1, 2, 3 or 4.
const nextEnemySpot = (enemies, enemyWidth) => {
  const enemySpots = GAME_WIDTH / enemyWidth;

  const spotsTaken = [false, false, false, false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });

  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    // candidate is assigned a random number between 0 and enemySpots (not including enemySpots). (what number is enemySpots?)
    candidate = Math.floor(Math.random() * enemySpots);
  }

  // When the while loop is finished, we are assured that we have a number that corresponds to a free spot, so we return it.
  return candidate;
};



const addBackground = (root) => {
  const bg = document.createElement('img');

  switch (LEVEL) {
    case 1 :
      bg.src = 'images/dogjail.jpg';
      break;
    case 2 :
      bg.src = 'images/city.jpg';
      break;
    default : 
      bg.src = 'images/dogjail.jpg';
  }
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH}px`;

  root.append(bg);

  const whiteBox = document.createElement('div');
  // We put a high z-index so that the div is placed over all other DOM nodes
  whiteBox.style.zIndex = 100;
  whiteBox.style.position = 'absolute';
  whiteBox.style.top = `${GAME_HEIGHT}px`;
  whiteBox.style.height = `${ENEMY_HEIGHT}px`;
  whiteBox.style.width = `${GAME_WIDTH}px`;
  whiteBox.style.background = '#fff';
  root.append(whiteBox);
};

//function to check COLLISION between 2 objects
let checkCollision = (objPos1, objSize1, objPos2, objSize2) => {
  let collision = false;
  for (let i = objPos1; i <= objPos1 + objSize1; i++) {
    if(i >= objPos2 && i <= objPos2 + objSize2)  
      collision = true;
  }  
  return collision;
}

//function to pop the restart button
const restartButton = () => {
  let btn = new BoardItem('150px', 'auto', container);
  btn.positionScreen('50%', '40%', '10');
  btn.setStyle('pink', '5px', 'dotted 2px grey', 'pointer');
  btn.addMessage('START NEW GAME?');
  btn.domElement.onclick = () => location.reload();
}

//function that shows a score board
const scoreBoard = (board, top, left, z, bkg, radius, border, pointer, color) => {
  board.positionScreen(top, left, z);
  board.setStyle(bkg, radius, border, pointer);
  board.domElement.style.color = color;
}

