var doremon,doremonImage1;
var bg,bgImage;
var ground;
var obstacle,obstacleGroup;
var life=3;
var PLAY=1;
var END=0;
var gameState=PLAY;
var coins,coinGroup;
var Score=0;

function preload(){
  bgImage=loadImage("bg.jpg");
  doremonImage1=loadAnimation("doremon1.png","doremon2.png","doremon3.png","doremon4.png");
  obstacleImage1=loadImage("obstacle1.png");
  obstacleImage2=loadImage("obstacle2.png");
  obstacleImage3=loadImage("obstacle3.png");
  obstacleImage4=loadImage("obstacle4.png");
  h1Image=loadImage("h1.png");
  h2Image=loadImage("h2.png");
  h3Image=loadImage("h3.png");
  coinImage=loadImage("c1.png");
}

function setup(){
  createCanvas(1200,600);
  
  
  bg=createSprite(200,60,1200,600);
  bg.addImage(bgImage);
  bg.scale=4;
 
  doremon=createSprite(100,400,20,20);
  doremon.addAnimation("sprite",doremonImage1);
  doremon.scale=1;
  //doremon.setCollider("rectangle",0,0,50,doremon.height);
  //doremon.debug=true;

  ground=createSprite(400,600,900,20);

  ground.visible=false;
  
  obstacleGroup= new Group();

  h1=createSprite(1100,100,20,20);
  h1.addImage(h1Image);
  h1.visible=false;
  h1.scale=0.4;

  h2=createSprite(1100,100,20,20);
  h2.addImage(h2Image);
  h2.visible=false;
  h2.scale=0.4;

  h3=createSprite(1100-150,100,20,20);
  h3.addImage(h3Image);
  h3.scale=0.4;

  coinGroup= new Group();

  var Score=0;

}

function draw() {
  background("white");
  doremon.collide(ground);
  drawSprites();
  textSize(20);
  fill("black");
  text("YOU HAVE SCORE:" + Score, 50, 120);
  if (gameState === PLAY) {
    bg.velocityX = -(6+3*Score/100);
    if (bg.x < 0) {
      bg.x = bg.width / 3;
    }
    if (keyDown("space") && doremon.y >= 504) {
      doremon.velocityY = -20;
      //console.log(doremon.y);
    }
    doremon.velocityY = doremon.velocityY + 0.8
    if (World.frameCount % 200 === 0) {
      spawnObstacles();
    }

    if (World.frameCount % 60 === 0) {
      spawnCoins();
    }

    if (obstacleGroup.isTouching(doremon)) {
      console.log("isTouching");
      for (var i = 0; i < obstacleGroup.length; i++) {
        if (obstacleGroup[i].isTouching(doremon)) {
          life = life - 1;
          obstacleGroup[i].destroy();
          console.log(life);
        }
      }
    }
  
    if (coinGroup.isTouching(doremon)) {
      // console.log("isTouching");
      for (var i = 0; i < coinGroup.length; i++) {
        if (coinGroup[i].isTouching(doremon)) {
          Score = Score + 10
          coinGroup[i].destroy();

        }
      }
    }
  }

  if (life === 3) {
    h1.visible = false;
    h2.visible = false;
    h3.visible = true;
  }

  if (life === 2) {
    h2.visible = true;
    h1.visible = false;
    h3.visible = false;
  }

  if (life === 1) {
    h1.visible = true;
    h2.visible = false;
    h3.visible = false;
  }

  if (life === 0) {
    gameState = END;

  }

  if (gameState === END) {
    bg.velocityX = 0;
    console.log("END");
    h1.visible = false;
    textSize(100);
    fill("red")
    text("YOU LOST", 400, 400);

    obstacleGroup.destroyEach();
    doremon.destroy();
  }
}




function spawnObstacles(){
 
 obstacle=createSprite(800,570);
 obstacle.setCollider("rectangle",0,0,50,obstacle.height);
 obstacle.debug=true;
 obstacle.velocityX=-6;
 obstacle.scale=1.5


 var rand = Math.round(random(1,4));
 switch(rand) {
   case 1: obstacle.addImage(obstacleImage1);
           break;
   case 2: obstacle.addImage(obstacleImage2);
           break;
   case 3: obstacle.addImage(obstacleImage3);
           break;
   case 4: obstacle.addImage(obstacleImage4);
           break;
   default: break}
   obstacleGroup.add(obstacle);

   obstacle.lifetime=130;

}

function spawnCoins(){
  coin=createSprite(900,random(300,400));
  coin.addImage(coinImage);
  coin.scale=0.4;
  coin.velocityX=-(6+3*Score/100);
  coinGroup.add(coin);
  
}