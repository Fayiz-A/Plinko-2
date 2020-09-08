const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var particle;
var plinkos = [];
var divisions = [];

var divisionHeight = 300;
var score = 0;

var gameState = 'start';
var turn = 0;

var scoreArray = [];
var scoreCorX = 100;
var incrementArray = [4, 3, 3];

var startXLimit = [0, 321, 561];
var endXLimit = [320, 560, 800];

function setup() {
  createCanvas(800, 800);

  for(var i = 0; i < 3; i++) {
    var score = 0;
    var testExpression = Math.round(random(1, 19));
    for(var j = 0; j < testExpression; j++) {
      score += 50;
    }
    scoreArray.push(score);
  }
  
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width / 2, height, width, 20);

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
  }

  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 375));
  }
}

function draw() {
  background("black");
  textSize(20)
  text("Score : " + score, 20, 30);
  Engine.update(engine);
  scoreCorX = 30;
  for (var i = 0; i < scoreArray.length; i++) {
    for (var row = 0; row < incrementArray[i]; row++) {
      fill('white');
      text(scoreArray[i], scoreCorX, 600);
      scoreCorX += 80;
    }
  }

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {

    divisions[k].display();
  }

  if (particle) {
    particle.display();

    var pos = particle.body.position;

    if (pos.y > 500) {
      for (var i = 0; i < startXLimit.length; i++) {
        if (pos.x > startXLimit[i] && pos.x < endXLimit[i]) {
          score += scoreArray[i];
          particle = null;
        }
      }
      turn++;
      gameState = 'start';
    }
  }

  if (turn >= 5) {
    gameState = 'end';
  }

  if (gameState == 'end') {
    push();
    textSize(70);
    fill('yellow');
    text('GAME OVER', 150, 300);
    pop();
  }
}

function mousePressed() {
  if (gameState == 'start') {
    particle = new Particle(mouseX, 0, 10, 10);
    gameState = 'particleFalling';
  }
}