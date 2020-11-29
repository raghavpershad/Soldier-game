var canvas, backgroundImage;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var form, player, game;
var soldier1,soldier2,soldier3,soldier4,soldiers;
var zombie1,zombie2,zombie3,zombie4;
var track, soldier1_img, soldier2_img, soldier3_img, soldier4_img;
var zombie1_img, zombie2_img, zombie3_img, zombie4_img;
var zombies;

function preload(){
  //track = loadImage("./images/track.jpg");
  zombie1_img = loadImage("../images/zombie 1.png");
  zombie2_img = loadImage("../images/zombie 2.png");
  zombie3_img = loadImage("../images/zombie3.png");
  zombie4_img = loadImage("../images/zombie4.png");
  //ground = loadImage("../images/ground.png");
  soldier1_img = loadImage("../images/soldier1.jpg");
  soldier2_img = loadImage("../images/soldier2.jpg");
  soldier3_img = loadImage("../images/soldier3.jpg");
  soldier4_img = loadImage("../images/soldier4.jpg");

  console.log(soldier4_img);
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.update(2);
    game.end();
  }
}
