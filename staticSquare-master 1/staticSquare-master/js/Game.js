class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    soldier1 = createSprite(100,300);
    soldier1.addImage("soldier1",soldier1_img);
    soldier2 = createSprite(300,300);
    soldier2.addImage("soldier2",soldier2_img);
    soldier3 = createSprite(500,300);
    soldier3.addImage("soldier3",soldier3_img);
    soldier4 = createSprite(700,300);
    soldier4.addImage("soldier4",soldier4_img);
    soldiers = [soldier1, soldier2, soldier3, soldier4];

    zombie1 = createSprite(100,200);
    zombie1.addImage("zombie1",zombie1_img);
    zombie2 = createSprite(300,200);
    zombie2.addImage("zombie2",zombie2_img);
    zombie3 = createSprite(500,200);
    zombie3.addImage("zombie3",zombie3_img);
    zombie4 = createSprite(700,200);
    zombie4.addImage("zombie4",zombie4_img);

    zombie1.scale = 0.25;
    zombie2.scale = 0.25;
    zombie3.scale = 0.25;
    zombie4.scale = 0.25;
    

  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background("white");
      //image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
       if( allPlayers[plr].distance > 400 ){
         zombie1= createSprite(x,60,10,10);
         zombie2= createSprite(x,50,10,10);
         zombie3= createSprite(x,40,10,10);
         zombie4= createSprite(x,30,10,10);
       }
        soldiers[index-1].x = x;
        soldiers[index-1].y = y;
        //console.log (soldiers);
        
        if (index === player.index){
          soldiers[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = soldiers[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if (zombie1.isTouching (soldier1)){
     soldier1.x = 200;
     soldier1.y = 200;
    }
    if (zombie2.isTouching (soldier2)){
      soldier2.x = 200;
      soldier2.y = 200;
    }
    if (zombie3.isTouching (soldier3)){
      soldier3.x = 200;
      soldier3.y = 200;
    }
    if (zombie4.isTouching (soldier4)){
      soldier4.x = 200;
      soldier4.y = 200; 
    }

    if (soldier1.x,soldier2.x,soldier3.x,soldier4.x = 200||soldier1.y,soldier2.y,soldier3.y,soldier4.y = 200){
      gameState = 2;
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    
    // if(keyIsDown(DOWN_ARROW) && player.index !== null){
    //   player.distance +=10
    //   player.update();
    // }

    if(player.distance > 5000){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
   // console.log("Game Ended");
  }
}
