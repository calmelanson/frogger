// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions. 
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

// This code assumes the collide2d library has been loaded in.

let backgroundColor, frogX, frogY, score, lives, gameIsOver, log1X, log1Y, log1V, redCar1X, redCar1Y, redCar1V, blueCar1V, blueCar1X, blueCar1Y, greenCar1V, greenCar1X, greenCar1Y, redCar2X, redCar2Y, redCar2V, blueCar2V, blueCar2X, blueCar2Y, greenCar2V, greenCar2X, greenCar2Y, log2X, log2Y, log2V, log3X, log3Y, log3V, log4X, log4Y, log4V, log5X, log5Y, log5V, frogImage, logImage, redCar1, blueCar1, greenCar1, redCar2, blueCar2, greenCar2, hitRedCar1, hitBlueCar1, hitGreenCar1, hitRedCar2, hitBlueCar2, hitGreenCar2, hitLog1, hitLog2, hitLog3, hitLog4, hitLog5, hitriver;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 30;
  frogX = 220;
  frogY = 455;
  score = 0;
  lives = 3;
  gameIsOver = false;
  log1X = 0;
  log1Y = 100;
  log1V = 3;
  log2X = 170;
  log2Y = 100;
  log2V = 3;
  log3X = 320;
  log3Y = 100;
  log3V = 3;
  // lane 1
  log4X = 150;
  log4Y = 150;
  log4V = -2;
  log5X = 460;
  log5Y = 150;
  log5V = -2;
  // Lane 2
  redCar1X = 450; 
  redCar1Y = 350; 
  redCar1V = -1;
  blueCar1X = 250; 
  blueCar1Y = 350; 
  blueCar1V = -1;
  greenCar1X = 50; 
  greenCar1Y = 350; 
  greenCar1V = -1;
  //lane 3
  redCar2X = 450; 
  redCar2Y = 240; 
  redCar2V = 2;
  blueCar2X = 250; 
  blueCar2Y = 240; 
  blueCar2V = 2;
  greenCar2X = 50; 
  greenCar2Y = 240; 
  greenCar2V = 2;

  hitRedCar1 = false;
  hitBlueCar1 = false;
  hitGreenCar1 = false;
  hitRedCar2 = false;
  hitBlueCar2 = false;
  hitGreenCar2 = false;
  hitLog1 = false;
  hitLog2 = false;
  hitLog3 = false;
  hitLog4 = false;
  hitLog5 = false;
  hitriver = false;
  
  frogImage=loadImage("https://cdn.glitch.com/166b356a-65f0-4c20-bc99-48a5ec7138bb%2Ffrog.png?v=1626797512376")
  logImage=loadImage("https://cdn.glitch.com/166b356a-65f0-4c20-bc99-48a5ec7138bb%2F8ef89d2669b8851.png?v=1626797657943")
  redCar1=loadImage("https://cdn.glitch.com/166b356a-65f0-4c20-bc99-48a5ec7138bb%2FClipartKey_1666032.png?v=1626799963070")
  blueCar1= loadImage ("https://cdn.glitch.com/166b356a-65f0-4c20-bc99-48a5ec7138bb%2FClipartKey_1740578.png?v=1626800602225")
  greenCar1= loadImage ("https://cdn.glitch.com/166b356a-65f0-4c20-bc99-48a5ec7138bb%2FPikPng.com_pixel-png_1153391.png?v=1626799966324")
  redCar2=loadImage("https://cdn.glitch.com/166b356a-65f0-4c20-bc99-48a5ec7138bb%2Foutput-onlinepngtools%20copy.png?v=1626802067471")
  blueCar2=loadImage("https://cdn.glitch.com/166b356a-65f0-4c20-bc99-48a5ec7138bb%2Foutput-onlinepngtools.png?v=1626800605141")
  greenCar2=loadImage("https://cdn.glitch.com/166b356a-65f0-4c20-bc99-48a5ec7138bb%2Foutput-onlinepngtools%20copy%202.png?v=1626802069329")

}

function draw() {
  background(backgroundColor);
  drawGoal();
  drawRiver();
  fill(120, 80, 80);
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
  drawFrog();
}

function drawGoal() {
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
}

function drawRiver() {
  // Code for river
  fill(234, 100, 100);
  rect(0, 100, width, 100);

}



function drawFrog() {
  // Code to display frog
  image(frogImage, frogX, frogY, 50, 40);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    frogY -= 50;
  } else if (keyCode === LEFT_ARROW) {
    frogX -= 50;
  } else if (keyCode === RIGHT_ARROW) {
    frogX += 50;
  } else if (keyCode === DOWN_ARROW) {
    frogY += 50;
  }
}

function moveCars() {
  // Move the car...
  log1X += log1V;
  log2X += log2V;
  log3X += log3V;
  log4X += log4V;
  log5X += log5V;
  redCar1X += redCar1V;
  blueCar1X += blueCar1V;
  greenCar1X += greenCar1V;
  redCar2X += redCar2V;
  blueCar2X += blueCar2V;
  greenCar2X += greenCar2V;

  // and reset if it moves off screen
  if (log1X >= width) {
    log1X = -30;
  }
  if (log2X >= width) {
    log2X = -30;
  }
  if (log3X >= width) {
    log3X = -30;
  }
  if (log4X <= -100) {
    log4X = width;
  }
  if (log5X <= -100) {
    log5X = width;
  }
  if (redCar1X <= -100) {
    redCar1X = width;
  }
  if (blueCar1X <= -100) {
    blueCar1X = width;
  }
  if (greenCar1X <=-100) {
    greenCar1X = width;
  }
  if (redCar2X >= width) {
    redCar2X = -100;
  }
  if (blueCar2X >= width) {
    blueCar2X = -100;
  }
  if (greenCar2X >= width) {
    greenCar2X = -100;
  }
  
}

function drawCars() {
  fill(0, 80, 80);
  image(logImage, log1X, log1Y, 100, 50); 
  image(logImage, log2X, log2Y, 100, 50); 
  image(logImage, log3X, log3Y, 100, 50);
  image(logImage, log4X, log4Y, 100, 50);
  image(logImage, log5X, log5Y, 100, 50);
  image(redCar1, redCar1X, redCar1Y, 100, 50); 
  image(blueCar1, blueCar1X, blueCar1Y, 100, 50);
  image(greenCar1, greenCar1X, greenCar1Y, 100, 50);
  image(redCar2, redCar2X, redCar2Y, 100, 50); 
  image(blueCar2, blueCar2X, blueCar2Y, 100, 50);
  image(greenCar2, greenCar2X, greenCar2Y, 100, 50);
}

function checkCollisions() {
  // Check for Car 1 collision, and if so...
  hitRedCar1 = collideRectCircle(redCar1X, redCar1Y, 40, 30, frogX, frogY, 20);
  hitBlueCar1 = collideRectCircle(blueCar1X, blueCar1Y, 40, 30, frogX, frogY, 20);
  hitGreenCar1 = collideRectCircle(greenCar1X, greenCar1Y, 40, 30, frogX, frogY, 20);
  hitRedCar2 = collideRectCircle(redCar2X, redCar2Y, 40, 30, frogX, frogY, 20);
  hitBlueCar2 = collideRectCircle(blueCar2X, blueCar2Y, 40, 30, frogX, frogY, 20);
  hitGreenCar2 = collideRectCircle(greenCar2X, greenCar2Y, 40, 30, frogX, frogY, 20);
  hitLog1 = collideRectCircle(log1X, log1Y, 40, 30, frogX, frogY, 20);
  hitLog2 = collideRectCircle(log2X, log2Y, 40, 30, frogX, frogY, 20);
  hitLog3 = collideRectCircle(log3X, log3Y, 40, 30, frogX, frogY, 20);
  hitLog4 = collideRectCircle(log4X, log4Y, 40, 30, frogX, frogY, 20);
  hitLog5 = collideRectCircle(log5X, log5Y, 40, 30, frogX, frogY, 20);
  hitriver= collideRectCircle(0, 100, width, 50, frogX, frogY, 20);

  
  if (hitRedCar1 || hitBlueCar1 || hitGreenCar1 || hitRedCar2 || hitBlueCar2 || hitGreenCar2) {
    console.log("collided with a car");
    // ...reset frog and subtract a life.
    frogY = 455;
    lives -= 1;
  }
  
  if (hitLog1) {
    frogX += log1V;
  } else if (hitLog2) {
    frogX += log2V;
  } else if (hitLog3) {
    frogX += log3V;
  } else if (hitLog4) {
    frogX += log4V;
  } else if (hitLog5) {
    frogX += log5V;
  } else if (hitriver) {
    frogY = 455;
    lives -= 1;
  }

  
  if (lives <= 0) {
    gameIsOver = true;
  }
}

function checkWin() {
  if (frogY <= 50) {
    score += 1;
    frogY = 455;
  }
}

function displayScores() {
  textSize(12);
  // Display Lives
  fill(0);
  text(`Lives: ${lives}`, 10, 20);
  // Display Score
  fill(0);
  text(`Score: ${score}`, 10, 38);
  // Display game over message
  if (gameIsOver) {
    textSize(60);
    text("GAME OVER", 70, height/2);
  }
}
