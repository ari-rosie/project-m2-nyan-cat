const playerWin = (player) => {
    player.domElement.style.opacity = '0';
    player.domElement.style.transition = 'opacity 2s';
    setTimeout(() => {
        while (appDiv.firstChild) {
            appDiv.removeChild(appDiv.firstChild);
        }
        gameStart.addMessage("Nice job partner! Man, those tacos were delicious! Now let's try again, but faster..(click again)");
        gameStart.domElement.style.display = 'block';
        exitGame.domElement.style.opacity = '0';
    }, 2000);
    FALLSPEED += 0.25;
    FINAL = false;
    LEVEL++;
}