var shooter_1 , shooter_2 , shooter_3;
var heart_1 , heart_2 , heart_3;
var backgroundimg,backgroundSprite;
var zombieimg;
var zombieGroup;
var heart1 , heart2 , heart3 ;
var bullets = 100;
var gameState = "fight";
var lose , win , explosionsounds;
var life = 3;
var score = 0;


function preload(){
  backgroundimg = loadImage("bg.jpeg");
  shooter_1 = loadImage("shooter_2.png");
  shooter_2 = loadImage("shooter_3.png");
  zombieimg = loadImage("zombie.png");
  heart_1 = loadImage("heart_1.png");
  heart_2 = loadImage("heart_2.png");
  heart_3 = loadImage("heart_3.png");
  lose = loadSound("lose.mp3");
  win = loadSound("win.mp3");
  explosionsounds = loadSound("explosion.mp3");

}



function setup() {
  createCanvas(windowWidth,windowHeight);
 backgroundSprite = createSprite(displayWidth/2-20,displayHeight/2-40, 50, 50);
 backgroundSprite.addImage(backgroundimg);
 backgroundSprite.scale = 1.1;

 shooter_3 = createSprite(displayWidth-1250,displayHeight-500,50,50);
 shooter_3.addImage(shooter_1);
 shooter_3.scale = 0.3;

 heart1 = createSprite(displayWidth-150,40,50,50);
 heart1.visible = false;
 heart1.addImage(heart_1);
 heart1.scale = 0.4;

 heart2 = createSprite(displayWidth-100,40,50,50);
 heart2.visible = false;
 heart2.addImage(heart_2);
 heart2.scale = 0.4;

 heart3 = createSprite(displayWidth-150,40,50,50);
 heart3.addImage(heart_3);
 heart3.scale = 0.4;

 zombieGroup = new Group()
 bulletGroup = new Group()


 }
  


function draw() {
  background(0); 
 

  if(gameState === "fight"){
    if(life === 3){
     heart3.visible = true;
     heart2.visible = false;
     heart1.visible = false;

    }
    if(life === 2){
      heart3.visible = false;
      heart2.visible = true;
      heart1.visible = false;
 
     }
     if(life === 1){
      heart3.visible = false;
      heart2.visible = false;
      heart1.visible = true;
 
     }
     if(life === 0){
      gameState = "lost"
     }
     if(score === 100){
      gameState = "won"
      win.play();
     }
  
  
  if(keyDown("UP_ARROW") || touches.length > 0){
    shooter_3.y-= 20;
  }
  if(keyDown("DOWN_ARROW")|| touches.length > 0){
    shooter_3.y+= 20;
  }


  if(keyWentDown("space")){
    shooter_3.addImage(shooter_2);
    fill("white")
    bullet = createSprite(shooter_3.x + 50,shooter_3.y-30,20,10);
    bullet.velocityX = 20;
    bulletGroup.add(bullet);
    bullet.depth = shooter_3.depth 
    shooter_3.depth = shooter_3.depth + 2;
    bullets = bullets - 1;

  }
  else if(keyWentUp("space")){
    shooter_3.addImage(shooter_1);
  }
  if(bullets === 0 ){
    gameState = "bullet"
    lose.play();

  }
  if(zombieGroup.isTouching(bulletGroup)){
    for (var i=0 ; i<zombieGroup.length ; i++){
      if (zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
        explosionsounds.play();
        score = score + 2;
      }
    }


  }
  if (zombieGroup.isTouching(shooter_3)){
    lose.play();
    for (var i=0 ; i<zombieGroup.length ; i++){
      if (zombieGroup[i].isTouching(shooter_3)){
        zombieGroup[i].destroy();
        life = life - 1;
      }
    }

  }
  spawnEnemy();
}
drawSprites();
fill ("white");
textSize(20);
text("bullets: "+ bullets,displayWidth-210,displayHeight/2-250);
text("score: "+ score,displayWidth-200,displayHeight/2-220);
text("lifes: " + life,displayWidth-200,displayHeight/2-280);

  if(gameState === "lost"){
    textSize(100);
    fill ("white")
    text("You lost!",displayWidth/2,displayHeight/2);
    zombieGroup.destroyEach();
    shooter_3.destroy();
    heart1.visible = false;
  }
  else if(gameState === "Won"){
    textSize(100);
    fill ("white")
    text("Congrats!",400,400)
    zombieGroup.destroyEach();
    shooter_3.destroy();
    
  }
  else if(gameState === "bullet"){
    textSize(100);
    fill ("white")
    text("You ran out of bullets!",400,400)
    zombieGroup.destroyEach();
    shooter_3.destroy();
    bulletGroup.destroyEach();
  }

  
 
}

function spawnEnemy(){
  if (frameCount % 50 === 0){
    zombie = createSprite(random(500,1100),random(100,500),40,40);
    zombie.addImage(zombieimg);
    zombie.scale = 0.15;
    zombie.velocityX = -6;
    zombie.lifetime = 350;
    zombie.debug = true;
    zombie.setCollider("rectangle",0,0,400,900);
    zombieGroup.add(zombie);
  }
}