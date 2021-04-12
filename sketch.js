
var gameState = "start";
var player,player_running,player_dead ;
var enemyGroup, enemyAnimation;
var bg,bgImg;
var rock, rockImg;
var crab, crabImg;
var coin, coinImg;
var score=0
var ig;
var start, startImg, gameover, gameoverImg;
function preload() {

player_running =loadAnimation("Run0.png","Run1.png","Run2.png");
player_dead = loadAnimation("Dead1.png");
bgImg=loadImage("bg.jpg");
startImg=loadImage("start.jpg");
gameoverImg=loadImage("gameover.png");
coinImg=loadImage("coin.jpg")
rockImg=loadImage("rock.png");
crabImg=loadImage("crab1.png");
//enemyAnimation=loadAnimation("Attack1.png","Attack2.png","Attack3.png","Attack4.png")
}

function setup(){
   createCanvas(800,400);
   edges=createEdgeSprites();
   start=createSprite(width/2,height/2+125); 
   start.addImage(startImg);

    start.scale=0.15;
    start.visible = true;
   textSize(25);
  setLevelOne();
  //setLevelTwo();
  //setEnd();
  
}


function draw(){
    background("yellow");
   
   drawSprites();   



  
    //START Gamestate
    if(gameState==="start"){
      startState();
    }
  
    //LEVEL 1 Gamestate
    if(gameState==="LevelOne"){
        playLevelOne();
    }
  
    //LEVEL 2 Gamestate
    if(gameState==="LevelTwo"){
    // playLevelTwo();

    text("level-2 ",200,200)
    }
  
   // END State
    //if(gameState === "End"){
    //  endState();
    //}
  
    //END2 State
   // if(gameState === "End2"){
     // end2State();
   // }
  
    //Win State
    //if(gameState === "Win"){
     // Win();
    //}
  }
  
  function startState(){
    
      fill(254,182,21);
      stroke("white");
      text("Instructions :\n 1) Use the space key to jump\n 2) Avoid the zombies to survive\n 3) You have to save the hostages in Level 2",width/2-250,height/2-50);
  
      
  
      if(mousePressedOver(start)){
       // resetSound.play();
          clear();
        gameState="LevelOne";
      }
  }
  
  
  
  function setLevelOne(){
   
   bg=createSprite(width/2,height/2,width,height);
   bg.addImage(bgImg);
   
  bg.velocityX=-2
  bg.scale=1.7
  bg.visible = false;
   ig=createSprite(400,380,800,10);
   ig.visible=false;
   player=createSprite(100,160,20,50)
   player.addAnimation("running",player_running);
   player.addAnimation("dead", player_dead);
   player.scale = 0.2;
   
    
  
    rockGroup = new Group();
    rock2Group = new Group();
    coinGroup = new Group();
      
  }
  
  function playLevelOne(){
      
      bg.visible = true;
   
    
      start.visible=false;
      textSize(25);
    textStyle(BOLD);
    fill(0);
      text("Score: " + score, width-200,100);
    text("Level 1",width/2,50);
      
    if(keyDown("space") && player.y>300){
        player.velocityY = -12;
    }

    player.velocityY=player.velocityY+1;
    
    
    if(bg.x<300){
        bg.x=500;
    }

    player.collide(ig);
    player.collide(edges);
      
  
    if(score>1000){
      clear();
      rockGroup.destroyEach();
      rock2Group.destroyEach();
      coinGroup.destroyEach();
      gameState="LevelTwo";
    }
  
      for (var i = 0; i < coinGroup.length; i++) {
      
          if(coinGroup.get(i).isTouching(player)){
        //coinSound.play();
              coinGroup.get(i).remove()
              score =score+100;
          }
      }
      
      if(rockGroup.isTouching(player) || rock2Group.isTouching(player)){
     gameState = "End";
      }
      
    rocks();
      createCoins();
      
  }
  
  function rocks() {
  
    if (frameCount % 100 === 0) {
      rock = createSprite(width, Math.round(random(50,height-150)), 20 , 20);
      rock.addImage(rockImg);
      rock.scale=0.2;
      rock.velocityX = -5;
      rock.lifetime = 300;
  
      crab= createSprite(-50, Math.round(random(50,height-150)), 50 , 50);
      crab.addImage(crabImg);
      crab.scale=0.08;
      crab.velocityX = 5;
      crab.lifetime = 300;
      
      
     rockGroup.add(rock);
     rock2Group.add(crab);
     
    }
  }
  
  function createCoins(){
   
      if (frameCount % 100 === 0) {
          coin = createSprite(Math.round(random(50,width-100)), -50, 20 , 20);
          coin.addImage(coinImg);
          coin.scale=0.1;
          coin.velocityY = 3;
          coin.lifetime = 150;
          coinGroup.add(coin);  
    }
  }
  
  function setLevelTwo(){
    
  
    aladdin3=createSprite(width/2-650, height-100);
    aladdin3.scale=0.2;
    aladdin3.addImage(aladdinImg);
    aladdin3.visible = false;
  
    invisibleGround2 = createSprite(width/2,height-30,width,30);
    invisibleGround2.visible = false;
  
    jafar = createSprite(width-150,height/2,50,50);
    jafar.addImage(jafarImg);
    jafar.scale=0.5;
    jafar.visible = false;
  
    jasmine = createSprite(width-300,height-100,50,50);
    jasmine.addImage(jasmineImg);
    jasmine.scale=0.2;
    jasmine.visible = false;
  
    fireGroup = new Group();
      
  }
  
  function playLevelTwo(){
      
      bg3.visible = true;
    carpet3.visible = true;
    aladdin3.visible = true;
    jafar.visible = true;
    jasmine.visible = true;
    jafar.bounceOff(invisibleGround2);
    jafar.velocityY = 4;
    
      
      textSize(25);
    textStyle(BOLD);
    fill(255);
      text("Lives: " + lives, width/2-700,100);
    text("Level 2",width/2,50);
  
      if(keyDown(UP_ARROW)){
        aladdin3.velocityY = -10;
        carpet3.velocityY = -10;
      }
  
      if(keyDown(LEFT_ARROW)){
        aladdin3.x = aladdin3.x - 5;
        carpet3.x = carpet3.x - 5;
      }
  
      if(keyDown(RIGHT_ARROW)){
        aladdin3.x = aladdin3.x + 5;
        carpet3.x = carpet3.x + 5;
      }
  
      aladdin3.velocityY = aladdin3.velocityY + 0.5;
      carpet3.velocityY = aladdin3.velocityY;
  
      carpet3.collide(edges);
      aladdin3.collide(edges);
      carpet3.collide(invisibleGround2);
      aladdin3.collide(carpet3);
  
      if(lives===0){
        dieSound.play();
        gameState = "End2";
      }
  
      for (var i = 0; i < fireGroup.length; i++) {
        
        if(fireGroup.get(i).isTouching(aladdin3)){
          dieSound.play();
          fireGroup.get(i).remove()
          lives--;
        }
      }
  
      if(carpet3.isTouching(jasmine)){
        winSound.play();
        gameState = "Win";
      }
  
      createFire();
  }
  
  function createFire() {
  
    if(frameCount % 40 === 0){
      fire= createSprite(width-150, Math.round(random(50,height-50)), 75, 20);
      fire.velocityX = -25;
      fire.addImage(fireImg);
      fire.scale=0.2;
      fire.lifetime = 1000;
      jafar.y = fire.y;
      fireGroup.add(fire);
      fireSound.play();
      
    }
    
  }
  
  function setEnd(){
    gameOver = createSprite(width/2,height/2-100,100,100);
    gameOver.addImage(gameoverImg);
    gameOver.scale = 2;
    gameOver.visible = false;
  
    reset = createSprite(width/2,height/2,100,100);
    reset.addImage(resetImg);
    reset.scale = 0.5;
    reset.visible = false;
  }
  
  function endState(){
      rockGroup.destroyEach();
    rock2Group.destroyEach();
      coinGroup.destroyEach();
    aladdin2.setVelocity(0,0);
    carpet2.setVelocity(0,0);
      gameOver.visible = true;
    reset.visible = true;
  
    if(mousePressedOver(reset)){
      resetSound.play();
      score = 0;
      gameState = "LevelOne";
      gameOver.visible = false;
      reset.visible = false;
    }
  
  }
  
  function end2State(){
      fireGroup.destroyEach();
    aladdin3.setVelocity(0,0);
    carpet3.setVelocity(0,0);
    jafar.setVelocity(0,0);
      gameOver.visible = true;
    reset.visible = true;
  
    if(mousePressedOver(reset)){
      resetSound.play();
      lives = 3;
      gameState = "LevelTwo";
      gameOver.visible = false;
      reset.visible = false;
    }
  
  }
  
  function Win(){
  
      fireGroup.destroyEach();
    aladdin3.setVelocity(0,0);
    carpet3.setVelocity(0,0);
    jafar.visible=false;
    reset.visible = true;
    
  
    if(frameCount % 15 === 0){
      confetti = createSprite(Math.round(random(50,width-100)),-10,100,100);
      confetti.addImage(confettiImg);
      confetti.scale=0.1;
      confetti.velocityY = 5;
    }
    
    imageMode(CENTER);
    image(congratsImg,width/2,height/2-150,500,300);
  
    if(mousePressedOver(reset)){
      resetSound.play();
     location.reload();
    }
  
  }
  
  
  
  
  
  
  
