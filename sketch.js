
var bg, backgroundImg,platformImage,platformGroup;
var diamondImage,diamondsGroup;
var spikeImage,spikesGroup;
var score =0;

function preload() {
  //Background Image 
  backgroundImg = loadImage("images/bg.jpg");
  //Ironman Image 
  ironImage = loadImage("images/iron.png");
  //Platform Image 
  platformImage = loadImage("images/stone.png");
  //Diamond Image 
  diamondImage = loadImage("images/diamond.png");
  //Spike Image 
  spikeImage = loadImage("images/spikes.png");
  }

function setup() {
  //Create canvas
  createCanvas(1000, 600);
  //Background Image
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale =2;
  //Ironman Image  
  ironMan = createSprite(200, 505, 20, 50);
  ironMan.addImage("running", ironImage);
  ironMan.scale = 0.3;
  ironMan.setCollider("rectangle",100,0,200,400)
  //Platform Group
  platformGroup = new Group();
  //Diamonds Group
  diamondsGroup = new Group();
  //Spikes Group
  spikesGroup = new Group();
}

function draw() {

  //To move the ironman up , down , right and left
  if (keyDown("up")) {
    ironMan.velocityY = -10;
  }
  if (keyDown("left")) {
    ironMan.x = ironMan.x - 5;
  }
  if (keyDown("right")) {
    ironMan.x = ironMan.x + 5;
  }
  ironMan.velocityY = ironMan.velocityY + 0.5;
  // Using Platforms Command
  generatePlatforms();
  for (var i = 0; i < platformGroup.length; i++) {
    var temp = platformGroup.get(i);

    if (temp.isTouching(ironMan)) {
      ironMan.collide(temp);
    }
  }
  // Using Diamonds Command
  generateDiamonds();
  for(var i = 0 ; i< (diamondsGroup).length ;i++){
    var temp = (diamondsGroup).get(i) ;
    // Diamonds displaying on screen
    if (temp.isTouching(ironMan)) {
      score++;
      temp.destroy();
      temp=null;
      }
        
    }
    // Using Spikes Command
    generateSpikes();
    for(var i = 0 ; i< (spikesGroup).length ;i++){
      var temp = (spikesGroup).get(i) ;
      //Deducting Score and displaying on screen when spicks touch the iron man
      if (temp.isTouching(ironMan)) {
        score=score-5;
        temp.destroy();
        temp=null;
        }
          
      }
    drawSprites();
    textSize(20);
    fill("white")
    text("Diamonds Collected: "+ score, 500,50);
   
}
// Generating Platforms Command
function generatePlatforms() {
  if (frameCount % 60 === 0) {
    var brick = createSprite(1200, 10, 40, 10);
    brick.x = random(50, 850);
    brick.addImage(platformImage);
    brick.velocityY = 5;
    brick.lifetime = 250;
    platformGroup.add(brick);
  }
}

// Generating Diamonds Command
function generateDiamonds() {
  if (frameCount % 80 === 0) {
    var diamond = createSprite(1200, 0, 40, 10);

    diamond.addAnimation("diamond", diamondImage);
    diamond.x = random(50, 850);
    diamond.scale = 0.5;
    diamond.velocityY = 3;
    diamond.lifetime = 1200;
    diamondsGroup.add(diamond);
  }
}

// Generating Spikes Command
function generateSpikes() {
  if (frameCount % 150 === 0) {
    var spikes = createSprite(1200, 90, 10, 40);
    spikes.addAnimation("spike", spikeImage);
    spikes.x = random(50, 850);
    spikes.scale = 0.5;
    spikes.velocityY = 3;
    spikes.lifetime = 600;
    spikesGroup.add(spikes);
  }
}