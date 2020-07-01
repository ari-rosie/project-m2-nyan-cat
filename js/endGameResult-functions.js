const playerWin = (player) => {
    player.domElement.style.opacity = '0';
    player.domElement.style.transition = 'opacity 3s';
    setTimeout(() => {
        gameStart.addMessage("Nice job partner! Man, those tacos were delicious! Now let's try again, but faster..(click again)");
        gameStart.domElement.style.display = 'block';
        exitGame.domElement.style.opacity = '0';
    }, 4000);
    FALLSPEED += 0.25;
    FINAL = false;
}