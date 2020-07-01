class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];
    this.tacos = [];
    addBackground(this.root);

    // adding score boards that keeps track of lifes left and tacos eaten
    this.lifeScore = new BoardItem('100px', '30px', container);
    scoreBoard(this.lifeScore, '20px', '10%', '10', 'black', '30%', 'dotted 2px white', 'none', 'white');
    this.tacoScore = new BoardItem('80px', '30px', container);
    scoreBoard(this.tacoScore, '20px', '90%', '10', 'orange', '30%', 'solid 1px white', 'none', 'red');

  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    this.lifeScore.domElement.innerText = LIFES.join(' ');
    this.tacoScore.domElement.innerText = ` Tacos: ${tacoPoint}/3`;

    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();

    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    this.tacos.forEach((taco) => {
      taco.update(timeDiff);
    });
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });
    this.tacos = this.tacos.filter((taco) => {
      return !taco.destroyed;
    });

    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemySpot(this.enemies, ENEMY_WIDTH);
      this.enemies.push(new Enemy(this.root, spot));
    }

    while (this.tacos.length < 1) {
      const tacoSpot = nextEnemySpot(this.tacos, TACO_WIDTH);
      this.tacos.push(new Taco(this.root, tacoSpot));
      
    }

    if (this.ateTaco()) {      
      if (tacoPoint < MAX_TACO) {
        goodCollision.play();
        tacoPoint++;
      }
    }

    while (tacoPoint === MAX_TACO && LIFES.length < MAX_LIFES) {
      LIFES.push('❤️');
      tacoPoint = 0;
    } 


    // checks if player hit an enemy
    if (this.isPlayerDead()) {
      badCollision.play();

      if (LIFES.length > 1) {
        LIFES.pop();
      } else {
        document.removeEventListener('keydown', keydownHandler);
        this.lifeScore.domElement.innerText = "GAME OVER";
        // this.player.stopWalk();
        exitGame.domElement.style.display = 'none';
        restartButton();
        return ;
      }
    }

    // checks if the mission ended, when player reaches the door he wins
    if (FINAL === true) {
      let door = exitGame.domElement.getBoundingClientRect();
      if (this.player.x + (PLAYER_WIDTH / 2) >= door.left) {
        this.enemies.forEach(enemy => enemy.domElement.style.display = 'none');
        this.tacos.forEach(taco => taco.domElement.style.display = 'none');
        playerWin(this.player);
        return;
      }
    }

    // If the player didnt lose or win
    setTimeout(this.gameLoop, 20);
  };

  isPlayerDead = () => {
    let playerDead = false;
    this.enemies.forEach(enemy => {
      if (checkCollision(enemy.y, ENEMY_HEIGHT, GAME_HEIGHT - PLAYER_HEIGHT + 40, PLAYER_HEIGHT) && checkCollision(enemy.x + 10, ENEMY_WIDTH - 10, this.player.x + 30, PLAYER_WIDTH - 30)) {//added and removed px so objects touch visually
        playerDead = true;
        enemy.domElement.style.display = 'none';
        enemy.destroyed = true;
      }
    })
    return playerDead;
  };

  ateTaco = () => {
    let crunch = false;
    this.tacos.forEach(taco => {
      if (checkCollision(taco.y, TACO_HEIGHT, GAME_HEIGHT - PLAYER_HEIGHT + 40, PLAYER_HEIGHT) && checkCollision(taco.x + 10, TACO_WIDTH - 10, this.player.x + 30, PLAYER_WIDTH - 30)) {
        crunch = true;
        taco.domElement.style.display = 'none';
        taco.destroyed = true;
      }
    })
    return crunch;
  }
}
