var PLAY = 1;
var END = 0;
var gameState = PLAY;
	
var player,  player_running, player_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
	
var score=0;
	
var gameOver, restart;
	
   function preload(){
       player_running =   loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png","boy6.png","boy7.png");
       player_collided = loadAnimation("co.png");
	  
	   groundImage = loadImage("ground.jpg");

	   obstacle1 = loadImage("obstacle1.png");
	   obstacle2 = loadImage("obstacle2.png");
	   obstacle3 = loadImage("obstacle3.png");
	   obstacle4 = loadImage("obstacle4.png");
	   obstacle5 = loadImage("obstacle5.png");
	   obstacle6 = loadImage("obstacle6.png");
	   
	 
	   gameOverImg = loadImage("game Over.png");
	   restartImg = loadImage("restart.png");
	  
	  //jumpSound = loadSound("jump.mp3");
	 // dieSound = loadSound("die.mp3");
	 // checkPointSound = loadSound("checkPoint.mp3"); 
	}
	
	function setup() {
	  createCanvas(500, 500);
	  
      player = createSprite(50,180,20,50);
      player.addAnimation("running",  player_running);
      player.addAnimation("collided",  player_collided);
	  player.scale = 0.4;
	  
	  ground = createSprite(200,180,400,20);
	  ground.addAnimation("ground",groundImage);
	  ground.x = ground.width /3;
	  ground.velocityX = -(6 + 3*score/100);
	  
	  gameOver = createSprite(200,100);
	  gameOver.addImage(gameOverImg);
	  gameOver.scale=0.1;
	  
	  restart = createSprite(200,140);
	  restart.addImage(restartImg);
	
	  gameOver.scale = 0.5;
	  restart.scale = 0.5;
	
	  gameOver.visible = false;
	  restart.visible = false;
	  
	  invisibleGround = createSprite(200,350,700,10);
	  invisibleGround.visible = false;
	  
	  cloudsGroup = new Group();
	  obstaclesGroup = new Group();
	  
	  score = 0;
	}
	
	function draw() {
	  background(255);
	  text("Score: "+ score, 500,50);
	  
	  if (gameState===PLAY){
	      score = score + Math.round(getFrameRate()/60);
	    
	  if(keyDown("space") &&  player.y >= 150) {
	      //jumpSound.play();
	      player.velocityY = -14;
	    }
	  
      player.velocityY =  player.velocityY + 0.8
	  
	    if (ground.x < 0){
	      ground.x = ground.width/2;
	    }
	  
      player.collide(invisibleGround);
	    spawnObstacles();
	    
	    if (score>0 && score%100 === 0){
	      //checkPoint.playSound()
	    }
	  
	    if(obstaclesGroup.isTouching( player)){
	      //dieSound.play();  
		  gameState = END;
		  
	    }
	  }
	  else if (gameState === END) {
	     gameOver.visible = true;
	     restart.visible = true;
	    
	     ground.velocityX = 0;
         player.velocityY = 0;
	     obstaclesGroup.setVelocityXEach(0);
	     cloudsGroup.setVelocityXEach(0);
	    
         player.changeAnimation("collided", player_collided);
	    
	    obstaclesGroup.setLifetimeEach(-1);
	    cloudsGroup.setLifetimeEach(-1);
	    
	    if(mousePressedOver(restart)) {
	      reset();
	    }
	  }

	  //ground.depth=player.depth;
	  //player.depth=player.depth+1;

	  //ground.depth=obstaclesGroup.depth;
	  //obstaclesGroup.depth=obstaclesGroup.depth+1;

	  
	  drawSprites();
	}
	
	function spawnObstacles() {
		if(frameCount % 70 === 0) {
		  var obstacle = createSprite(600,340,10,40);
		  obstacle.velocityX = -(5 + 3*score/100);
		  
		  //generate random obstacles
		    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
		  
		  obstacle.scale = 0.1;
		  obstacle.lifetime = 300;
	
		  obstaclesGroup.add(obstacle);
		}
	}
	
	function reset(){
	  gameState = PLAY;
	  ground.velocityX = -(6 + 3*score/100);
	  gameOver.visible = false;
	  restart.visible = false;
	  
	  obstaclesGroup.destroyEach();
	  cloudsGroup.destroyEach();
	  
      player.changeAnimation("running", player_running);
	  
	  score = 0;
	}
