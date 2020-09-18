let startImage;
let gotham;
let batmanImage;
let batmanVerticalPoint;
let matrizBatmanPositions;
let joker;
let joker2;
let jokerImage;
let jokerVerticalPoint;
let matrizJokerPositions;
let currentFrame;
let backgroundImage;
let batman;
let backgroundSpeed;
let lifeImage;
let life;
let lives;
let isColliding = false;
let score;
let music;
let jumpSound;
let gameOverSound;
let canvasHeight;
let gameOver;
let maxJokerSpeed;
let minJokerSpeed;
let blinking;
let blinkingCounter;
let batmanEndGame = false;
let startGame = false;
let instructionSize;


function preload() {
  if (windowHeight > 640) {
    canvasHeight = 640;
  } else {
    canvasHeight = windowHeight;
  }

  startImage = loadImage("imagens/cenario/start.png");
  gotham = loadImage("imagens/cenario/background.png");
  batmanImage = loadImage("imagens/personagem/batman.png");
  music = loadSound("sons/batmantitle.mp3");
  jokerImage = loadImage("imagens/inimigos/joker.png");
  lifeImage = loadImage("imagens/cenario/life.png");
  gameOver = loadImage("imagens/assets/game-over.png");
  jumpSound = loadSound("sons/somPulo.mp3");
  gameOverSound = loadSound("sons/gameover.mp3");
  backgroundSpeed = 5;
  maxJokerSpeed = 9;
  minJokerSpeed = 8;
  blinking = false;
  blinkingCounter = 0;
  lives = 3;
  matrizBatmanPositions = [
    [0, 0],
    [70, 0],
    [140, 0],
    [210, 0],
    [280, 0],
    [350, 0],
    [0, 50],
    [70, 50],
    [140, 50],
    [210, 50],
    [280, 50],
    [350, 50],
    [0, 100],
    [70, 100],
    [140, 100],
    [210, 100],
    [280, 100],
    [350, 100]
  ];
  matrizJokerPositions = [
    [0, 0],
    [52, 0],
    [104, 0],
    [156, 0],
    [208, 0],
    [260, 0]
  ];
  setup();
}

function setup() {
  createCanvas(windowWidth, canvasHeight);
  batmanVerticalPoint = height - 102;
  jokerVerticalPoint = height - 102;
  image(startImage, 0, 0, width, height);
  backgroundImage = new BackgroundImage(gotham, backgroundSpeed);
  batman = new Batman(batmanImage, batmanVerticalPoint, matrizBatmanPositions);
  joker = new Joker(jokerImage, jokerVerticalPoint, matrizJokerPositions, 9);
  joker2 = new Joker(jokerImage, jokerVerticalPoint, matrizJokerPositions, 10);
  joker2.visible = false;
  score = new Score();
  life = new Life();
  frameRate(35);
  currentFrame = 0;
  music.loop();
}

function draw() {

  if (startImage) {

    if (width > 750) {
      instructionSize = 50;
    } else {
      instructionSize = 20;
    }
    textSize(instructionSize);
    textAlign(CENTER);
    text('Click or press', width / 5, height / 3);
    fill(0, 102, 153);
    text('Up Arrow Key', width / 5, height / 3 + instructionSize);
    fill(0, 102, 153, 51);
    text('to play...', width / 5, height / 3 + instructionSize * 2);
  } else {
    backgroundImage.display();
    backgroundImage.move();
    score.display();
    score.increment(0.1);
    life.display();
    if (!blinking || batmanEndGame) {
      batman.display();
      batman.applyGravity();
    }
    if (!blinking && blinkingCounter > 0) {
      blinking = true;
      blinkingCounter--;
      batman.blink();
    }

    if (batmanEndGame) {
      image(gameOver, width / 2 - 200, height / 3);
      music.stop();
      noLoop();
    }
    if (joker.visible && !batmanEndGame) {
      joker.display();
      joker.move();
    }
    if (joker2.visible && !batmanEndGame) {
      joker2.display();
      joker2.move();
    }
    if (!joker.visible && joker2.currentX < width / 5) {
      joker.speed = parseInt(random(minJokerSpeed, maxJokerSpeed));
      joker.visible = true;
    }
    if (!joker2.visible && joker.currentX < width / 5) {
      joker2.speed = parseInt(random(minJokerSpeed, maxJokerSpeed));
      joker2.visible = true;
    }

    if (batman.isCollidingWith(joker) || batman.isCollidingWith(joker2)) {
      isColliding = true;
      life.freeze();
      lives--;
      blinking = true;
      blinkingCounter = 6;
      batman.blink();
      if (lives == 0) {
        gameOverSound.play();
        batmanEndGame = true;
      }
    }

    if (maxJokerSpeed >= 30) {
      minJokerSpeed = 8;
      maxJokerSpeed = 15;
    } else if (maxJokerSpeed > 24) {
      minJokerSpeed = 20;
    } else if (maxJokerSpeed > 19) {
      minJokerSpeed = 15;
    }
  }
}

function keyPressed() {
  if (key === 'ArrowUp') {
    batman.jump();
    startImage = false;
  }
}

function touchEnded() {
  console.log('touchEnded');
  batman.jump();
  startImage = false;
  return false;
}
