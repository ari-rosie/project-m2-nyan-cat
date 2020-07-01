const GAME_WIDTH = screen.width;
const GAME_HEIGHT = screen.height -156;

const ENEMY_WIDTH = 113;
const ENEMY_HEIGHT = 125;
const MAX_ENEMIES = 3;

const TACO_WIDTH = 100;
const TACO_HEIGHT = 90;

let FALLSPEED = 0.25;
const PLAYER_WIDTH = 222;
const PLAYER_HEIGHT = 150;

// Player animation global variables
let FRAME = 1;
let TIME_COUNT = 0;
let playerMoves;


// Will determine how many lifes player starts with, minus 1 everytime he hits an enemy
let LIFES = ['❤️', '❤️', '❤️', '❤️'];
const MAX_LIFES = 4;

// Counting the tacos, 3 tacos = 1 life
let tacoPoint = 0;
const MAX_TACO = 3;

// Set to true this variable tells the game mission ended
let FINAL = false;

// on true means player won mission
let WIN = false;