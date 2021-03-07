const PLAY = 1;
const END = 0;

var trex,edges,gameState = PLAY;
var iground;
var ground, groundImg;
var trex_running, collision;
var obstacle, ob1, ob2, ob3, ob4;
var clouds, cloud;
var oGroup, cGroup;
var score = 0;
var gameOver, restart, gameOverImg, restartImg;
var jSound, dSound, cSound;
function preload() {
  trex_running = loadAnimation("Trex1.png","trex3.png","trex4.png");
  groundImg = loadImage("ground2.png"); 
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  clouds = loadImage("cloud.png");
  collision = loadImage("trex_collided.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  jSound = loadSound("jump.mp3");
  dSound = loadSound("die.mp3");
  cSound = loadSound("checkPoint.mp3");
}
function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",collision);
  trex.scale=0.75;

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImg);
  
  iground = createSprite(200,200,400,20);
  iground.visible = false;

  oGroup = new Group();
  cGroup = new Group();
gameOver = createSprite(300,100);
restart= createSprite(300,140);
gameOver.addImage("gameOver",gameOverImg);
restart.addImage("restart",restartImg);
restart.scale=0.60;
//trex.debug = true;


}
function draw() { 
  background("white");
  text("Score = "+score,500,50);
  //console.log(gameState);
  if (gameState===PLAY ){
    trex.changeAnimation("running", trex_running);
    gameOver.visible = false;
    restart.visible = false;
    ground.velocityX = -(6+3*score/100);
    if (ground.x < 0){
      ground.x = ground.width/2;
      
      }
score+=Math.round(getFrameRate()/60);
if (score%100===0 && score>0){
  cSound.play();
}
      //console.log(trex.y);
  if (keyDown("e")&& trex.y>120){
    trex.velocityY=-8;
    jSound.play();
  }
      //function call//
  spawnCloud();
  spawnObstacles();  
  if (trex.isTouching(oGroup)){
    gameState = END;
    dSound.play();
  }
  }
  else if (gameState===END){
    gameOver.visible= true;
    restart.visible = true;
    ground.velocityX = 0;
    trex.changeAnimation("collided",collision);
    oGroup.setVelocityXEach(0);
    cGroup.setVelocityXEach(0);
    oGroup.setLifetimeEach(-1);
    cGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)) {
      reset();
    }
    }
  trex.velocityY=trex.velocityY+0.5;
  trex.collide(iground);
  console.log(trex.y);
  drawSprites();
} 
//function definition//
function spawnCloud(){
  if(frameCount%60 === 0){
  cloud = createSprite(600,50,40,10);
  cloud.velocityX = -4;
  cloud.addImage("clouds",clouds);
  cloud.scale = 0.75;  
  cloud.lifetime = 150;
  cloud.depth = trex.depth;
  trex.depth++;

  cGroup.add(cloud);
  }
}

function reset() {
  gameState= PLAY;
  score = 0;
  oGroup.destroyEach();
  cGroup.destroyEach();

}
function spawnObstacles() {
  if(frameCount%60 === 0) { 
    obstacle = createSprite(600,165,10,40);
    var rand = Math.round(random(1,4));
    obstacle.lifetime = 150;
    switch(rand){
      case 1: obstacle.addImage("cactus",ob1); break;
      case 2: obstacle.addImage("cactus",ob2); break;
      case 3: obstacle.addImage("cactus",ob3); break;
      case 4: obstacle.addImage("cactus",ob4); break;
    }
    obstacle.scale = 0.6;
    obstacle.velocityX = -(6+3*score/100); 
    oGroup.add(obstacle);
     }
}