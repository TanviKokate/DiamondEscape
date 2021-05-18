const START = 1;
const PLAY = 2;
const END = 0;
var gameState = START;
var score = 0;
var chance = 2;

function preload(){
  groundImg = loadImage("images/track.jpg");
  alertImg = loadAnimation("images/alert/alert1.png", "images/alert/alert2.png",  "images/alert/alert3.png", "images/alert/alert4.png",
  "images/alert/unscreen-005.png", "images/alert/unscreen-006.png", "images/alert/unscreen-007.png");
  coinsImg = loadAnimation("images/coins/sprite_0.png", "images/coins/sprite_1.png", "images/coins/sprite_2.png",
  "images/coins/sprite_3.png", "images/coins/sprite_4.png");
  stopCoins = loadAnimation("images/coins/sprite_0.png");
  thiefImg = loadAnimation("images/thiefRunning/thief1.png","images/thiefRunning/thief3.png", "images/thiefRunning/thief8.png",
   "images/thiefRunning/thief12.png", "images/thiefRunning/thief15.png");
  thief2Img  = loadAnimation("images/moneyThief/unscreen-001.png", "images/moneyThief/unscreen-003.png", "images/moneyThief/unscreen-005.png",
  "images/moneyThief/unscreen-007.png", "images/moneyThief/unscreen-009.png", "images/moneyThief/unscreen-011.png", "images/moneyThief/unscreen-003.png",)
  standingThief = loadAnimation("images/thiefRunning/thief8.png");
  thiefCaughtImg = loadAnimation("images/thiefcaught/tc1.png", "images/thiefcaught/tc2.png", "images/thiefcaught/tc3.png",
   "images/thiefcaught/tc4.png", "images/thiefcaught/tc5.png", "images/thiefcaught/tc6.png", "images/thiefcaught/tc7.png",
   "images/thiefcaught/tc8.png", "images/thiefcaught/tc9.png", "images/thiefcaught/tc10.png");
  policeImg = loadAnimation("images/police/cop1.png", "images/police/cop3.png", "images/police/cop8.png",
   "images/police/cop12.png")
  police2Img = loadAnimation("images/police/cop1.png");
  policeCaughtImg = loadAnimation("images/copLaughing/laugh1 (2).png", "images/copLaughing/laugh2.png");
  obstacle1Img = loadImage("images/copLaughing/laugh1.png");
  obstacle2Img = loadImage("images/sprite_2.png");
  obstacle3Img = loadImage("images/sprite_0.png");
  diamondImg = loadImage("images/sprite_3.png");
  magicBallImg = loadAnimation("images/magicball/unscreen-001.png", "images/magicball/unscreen-003.png", "images/magicball/unscreen-005.png",
  "images/magicball/unscreen-001.png", "images/magicball/unscreen-001.png", "images/magicball/unscreen-001.png",
  "images/magicball/unscreen-007.png", "images/magicball/unscreen-009.png");
  end2Img = loadAnimation("images/Appereciate1/app1.png", "images/Appereciate1/app2.png");
  endImg = loadAnimation("images/win/win1.png", "images/win/win4.png","images/win/win12.png", "images/win/win18.png", 
  "images/win/win21.png");
  //Sounds
  gameOverSound = loadSound("sounds/gameOver.mp3");
  gameBonusSound = loadSound("sounds/points.mp3");
  bgm = loadSound("sounds/game.mp3");
  sound1 = loadSound("sounds/moves1.mp3");
  sound2 = loadSound("sounds/monster.mp3");
  sound3 = loadSound("sounds/space.mp3");
  sound4 = loadSound("sounds/scoring.mp3");
  sound5 = loadSound("sounds/replay.mp3");
  sound6 = loadSound("sounds/extra.mp3")
}

function setup(){
  createCanvas(displayWidth, displayHeight);

  ground = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight/3);
  ground.addImage("movingGround", groundImg);
  ground.velocityX = -3;

  thief = createSprite(300, 280, 10, 10);
  thief.addAnimation("running", thiefImg);
  thief.addAnimation("standing", standingThief);
  thief.addAnimation("caught", thiefCaughtImg);
  thief.addAnimation("2running", thief2Img);
  thief.scale = 0.19;
  thief.setCollider("rectangle", 0, 0, 350, 520);

  police = createSprite(200, 280, 10, 10);
  police.addAnimation("chasing", policeImg);
  police.addAnimation("copStanding", police2Img);
  police.addAnimation("policeLaugh", policeCaughtImg);
  police.scale = 0.3;
  police.setCollider("rectangle", 0, 0, 170, 350);

  ale_rt = createSprite(765, 30);
  ale_rt.addAnimation("redAlert", alertImg);
  //Great Job
  ale_rt.addAnimation("gameEnd", end2Img);
  ale_rt.scale = 0.18;

  //Win Images
  end = createSprite(400, 290);
  end.visible = false;
  end.addAnimation("ending", endImg);

  coinsGroup = new Group();
  obstaclesGroup1 = new Group();
  obstaclesGroup2 = new Group();
  obstaclesGroup3 = new Group();
  magicballGroup = new Group();
  diamondGroup = new Group();
}

function draw(){
  if(gameState === START){
    background(29, 153, 213);
    fill(255);
    textSize(40);
    textFont("Showcard Gothic");
    text("Diamond Escape",displayWidth/2 - 220, displayHeight/9 - 30);

    textSize(25);
    text("You're a thief name Jack Rhyl . And you have to run away", displayWidth/5 - 60, displayHeight/5 - 45);
    text("from the police and reach the port by collecting \ndiamonds and coins. Also there are obstacles \n(so be careful)...Press 'Space' to start the game!! \nAnd you would be getting some magic balls which would \nbe boosting your points..So do collect them . \nScore 1000 points to win the game !!", displayWidth/5 - 60, displayHeight/5 - 18);
    textSize(23);
    text("If you gain 200 points, you will one more chance.", displayWidth/6 - 20, displayHeight/2);
    stroke(0);
    strokeWeight(3);
    fill(67, 75, 255);
    textSize(40);
    text("All the Best !!",displayWidth/6 - 20, displayHeight - 300);

    if (keyCode === 32){
      gameState = PLAY;
      sound3.play();
    }
}

if (gameState === PLAY){

  if (ground.x < 200){
    ground.x = 740;
  }
  if (keyDown(UP_ARROW)){
    thief.y -= 3;
    sound1.play();
  } 
   if (keyDown(DOWN_ARROW)){
    thief.y += 3;
    sound1.play();
  }
  if (keyDown(RIGHT_ARROW)){
    thief.x += 3;
    sound1.play();
  }
  if (thief.isTouching(coinsGroup)){
    score += 1;
    sound4.play();
    coinsGroup.destroyEach();
  }
  if (thief.isTouching(diamondGroup)){
    score += 2;
    sound6.play();
    diamondGroup.destroyEach();
  }
  if (thief.isTouching(obstaclesGroup1) || thief.isTouching(obstaclesGroup2) || thief.isTouching(obstaclesGroup3)){
    chance -= 1;
    sound2.play();
    obstaclesGroup1.destroyEach();
    obstaclesGroup2.destroyEach();
    obstaclesGroup3.destroyEach();
  } 
  if(thief.isTouching(magicballGroup)){
    magicballGroup.destroyEach();
    score += 100;
    gameBonusSound.play();
  }
  if (chance === 0){
    gameState = END;
    gameOverSound.play();
  }
  if (score >= 1000){
    end.visible = true;
    ale_rt.visible = true; 
    ale_rt.changeAnimation("gameEnd", end2Img);

    ground.velocityX = 0;
    coinsGroup.setVelocityXEach(0);
    coinsGroup.setLifetimeEach(-1);
    diamondGroup.setVelocityXEach(0);
    diamondGroup.setLifetimeEach(-1);
    obstaclesGroup1.setVelocityXEach(0);
    obstaclesGroup2.setVelocityXEach(0);
    obstaclesGroup3.setVelocityXEach(0);
    thief.changeAnimation("standing", standingThief);
    police.changeAnimation("copStanding", police2Img);
    coin.changeAnimation("CoinsStoping", stopCoins);  
    magicballGroup.setVelocityEach(0);
    magicballGroup.setLifetimeEach(-1);  
  }
  drawSprites();
  textFont("Showcard Gothic");
  textSize(30);
  fill("white");
  text("Score : " + score, 200, 30);
  text("Chance : " + chance, 15, 30);

  if(score >= 1000){
    fill(0);
    textSize(50);
    textFont("Showcard Gothic");
    textSize(40);
    text("Yay..you have won the game!!", 50, 100);
  }
  magicBall();
  spawnCoins();
  spawnDiamonds();
  spawnObstacles();
}

if (gameState === END){
  thief.x = 420;
  thief.y = 320;
  thief.changeAnimation("caught", thiefCaughtImg);
  thief.scale = 0.37;
  police.x = 310;
  police.y = 320;
  police.changeAnimation("policeLaugh", policeCaughtImg);
  police.scale = 0.8;
  ale_rt.changeAnimation("gameEnd", end2Img);
  coin.changeAnimation("CoinsStoping", stopCoins);

  ground.velocityX = 0;
  coinsGroup.setVelocityXEach(0);
  coinsGroup.setLifetimeEach(-1);
  diamondGroup.setVelocityXEach(0);
  diamondGroup.setLifetimeEach(-1);
  obstaclesGroup1.setVelocityXEach(0);
  obstaclesGroup2.setVelocityXEach(0);
  obstaclesGroup3.setVelocityXEach(0);
  magicballGroup.setVelocityEach(0);
  magicballGroup.setLifetimeEach(-1);
  
  if(keyDown("R")){
    gameState = PLAY;
    ground.velocityX = -3;
    thief.x = 300;
    thief. y = 280;
    thief.changeAnimation("2running", thief2Img);
    thief.scale = 0.4;
    police.x = 200;
    police.y = 280;
    police.changeAnimation("chasing", policeImg);
    police.scale = 0.3;
    chance = 2;
    score -= 100;
    bgm.play();
    coinsGroup.destroyEach();
    diamondGroup.destroyEach();
    magicballGroup.destroyEach();
    obstaclesGroup1.destroyEach();
    obstaclesGroup2.destroyEach();
    obstaclesGroup3.destroyEach();
 }
  drawSprites();
  textFont("Showcard Gothic");
  textSize(30);
  fill("white");
  text("Score : " + score, 200, 30);
  text("Chance : " + chance, 15, 30);
  textFont("Showcard Gothic");
  stroke(0);
  strokeWeight(10);
  fill(255);
  textSize(138);
  text("Game Over", 20, 190);
  stroke(255);
  strokeWeight(4);
  fill(0);
  textSize(35);
  text("Press 'R' to restart the game", 150, 230);
}
  edges = createEdgeSprites();
  thief.collide(edges);
}

function spawnCoins(){
   if (frameCount % 150 === 0){
    coin = createSprite(1000, 200, 10, 10);
    coin.addAnimation("points", coinsImg);
    coin.addAnimation("CoinsStoping", stopCoins);
    coin.scale = 0.1;  
    coin.velocityX = -3;
    coin.lifetime = 335; 
    coin.y = Math.round(random(40, 350));
    coinsGroup.add(coin); 
  }
}

function spawnObstacles(){
  if (frameCount % 160 === 0){
    obstacleCop = createSprite(1000, 200, 10, 10);
    obsBike = createSprite(1000, 200, 10, 10);
    monster = createSprite(1000, 200, 10, 10);
    var rand = Math.round(random(1,3));
    switch (rand){
      case 1 : obstacleCop.addImage(obstacle1Img);
      break;
      case 2 : monster.addImage(obstacle2Img);
      break;
      case 3 : obsBike.addImage(obstacle3Img);
      break;
      default : break;
    }
    obstacleCop.scale = 0.5;
    obstacleCop.lifetime = 335;
    obstacleCop.y = Math.round(random(40, 350));
    obsBike.velocityX = -3;
    obstaclesGroup1.add(obstacleCop); 

    obsBike.scale = 0.4;
    obsBike.lifetime = 335;
    obsBike.y = Math.round(random(40, 350));
    obstacleCop.velocityX = -3;
    obstaclesGroup2.add(obsBike); 

    monster.scale = 0.2;
    monster.lifetime = 335;
    monster.y = Math.round(random(40, 350));
    monster.velocityX = -3;
    obstaclesGroup3.add(monster); 
  }
}

function spawnDiamonds(){
  if (frameCount % 100 === 0){
    diamond = createSprite(1000, 200, 10, 10);
    diamond.addAnimation("points", diamondImg);
    diamond.scale = 0.1;  
    diamond.velocityX = -3;
    diamond.lifetime = 335;
    diamond.y = Math.round(random(60, 350));
    diamondGroup.add(diamond);
   }
}

function magicBall(){
   if(frameCount % 400 === 0){
     magicball = createSprite(displayWidth, displayHeight);
     magicball.addAnimation("extraPoints", magicBallImg);
     magicball.scale = 0.17
     magicball.velocityX = -8;
     magicball.y = Math.round(random(displayHeight/6 - 200, displayHeight - 200));
     magicballGroup.add(magicball);
   }
}