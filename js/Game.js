class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);
        player2 = createSprite(800,500);
        player2.addImage("player2", player_img);
        players=[player1,player2];
    }
    
    play(){
        form.hide();
        Player.getPlayerInfo();
        
        if(allPlayers !== undefined){
            background(255);
            image(back_img, 0, 0, 1000, 800);
            var index = 0;
           // var score = 0;
            var x = 100;
            var y= 200;

            drawSprites();
            
            for(var plr in allPlayers){
                index +=1;
                x = 500-allPlayers[plr].distance;
                y=500;
                
                players[index -1].x = x;
                players[index - 1].y = y;
                
                if(index === player.index){  
                    fill("black");
                    stroke("black")
                    textSize(25);
                    text(allPlayers[plr].name ,x-35,y+20);      
                }    
            }
        }
            
        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }
        
            if (frameCount % 20 === 0) {
                fruits = createSprite(random(100, 1000), 0, 100, 100);
                fruits.velocityY = 6;
               // console.log("yo");
                var rand = Math.round(random(1,5));
                
                switch(rand){
                    case 1: fruits.addImage("fruit1",fruit1_img);
                    break;
                    case 2: fruits.addImage("fruit2", fruit2_img);
                    break;
                    case 3: fruits.addImage("fruit3", fruit3_img);
                    break;
                    case 4: fruits.addImage("fruit4", fruit4_img);
                    break;
                    case 5: fruits.addImage("fruit5", fruit5_img);
                    break;
                }
               
                fruitGroup.add(fruits);
            }
            for(var i = 0; i<fruitGroup.length; i++){
                var fruitTemp = fruitGroup.get(i);
                if(fruitGroup.isTouching(players) && player.index !== null){
                    fruitTemp.destroy();
                    player.score ++;
                    player.update();
                }
        }
        textSize(30);
        stroke("white");
        fill("white");
        if(allPlayers!==undefined){
            text("Player1: " + allPlayers.player1.score,100,100);
            text("Player2: " + allPlayers.player2.score,100,160);
        }
        
    }

    end(){
        console.log("Game Ended");
    }
}