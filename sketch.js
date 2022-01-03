//State variables
var main, backgroundImage, lava, coin, gameover, clouds

var mainSprite, backgroundImageSprite, coinSprite, gameoverSprite

var gameState

var PLAY
var END

gameState=PLAY
var Score = 0

function preload(){
  //load images & sounds
  coin = loadImage("coin.png");

  gameover = loadImage("Game over.png");

  main = loadImage("character.png");

  backgroundImage = loadImage("background.jpg");

  clouds = loadImage("clouds-remove-preview.png")

  jumpSound = loadSound("jumpSound.mp3")
}

function setup() {

  //create sprites and traits

  createCanvas(800,400);

  coinSprite = createSprite(400, 200, 50, 50);
  coinSprite.addAnimation("coin", coin)

  lavaSprite = createSprite(400, 200, 50, 50);
  lavaSprite.addAnimation("lava", lava)

  mainSprite = createSprite(400, 200, 50, 50);
  mainSprite.addAnimation("main", main)

  backgroundImageSprite = createSprite(400, 200, 50, 50);
  backgroundImageSprite.addAnimation("background", backgroundImage)

  gameoverSprite = createSprite(400, 200, 50, 50);
  gameoverSprite.addAnimation("gameover", gameover)

  cloudGroup = createGroup()
}

function draw() {

  if (mainSprite.isTouching("lavaSprite")){
    gameState=END;
  }

  if (mainSprite.isTouching("coinSprite")){
    Score = Score+2
  }

  if(gameState==END){

    text(400, 200, "GAME OVER");

    fontSize(50)

    main.velocityX=0
    main.velocityY=0

    lava.velocityX=0
    lava.velocityY=0

    coin.velocityX=0
    coin.velocityY=0
  }

  main.velocityX=5
  main.velocityY=5

  background(255,255,255); 

  if(keyDown("space")){
    main.velocityY = -12
    jumpSound.play()
  }

  if(frameCount%30 == 0){
    main.velocityX=main.velocityX+2
  }

  main.velocityY = main.velocityY+0.8;
  coinSprite.x = Math.random()

  spawnClouds();

  drawSprites();

  text(190, 690, "Score "+Score);
  fontSize(16)
}

function spawnClouds(){
  if (frameCount%40){

    //Cloud traits when activated

    cloud = createSprite(200, 390)

    cloud.addAnimation("clouds", clouds)

    cloud.x = Math.round(Math.random(200, 700))

    cloud.velocityX = -3

    if (cloud.x == 0){
      cloud.destroy()
    }

    cloudGroup.add(cloud);
  }
}