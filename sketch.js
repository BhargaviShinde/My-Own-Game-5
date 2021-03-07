const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var slingShot;
var score = 0;
var level = 1;
var Mbottle;
var PLAY = 1,END = 0,WON = 2;
var gamestate = PLAY;
var isLaunched = false;//initially not launched
var attempts= 5;


function preload() {  
    backgroundImg=loadImage("Background L1.jpg");
}

function setup(){

    canvas = createCanvas(1650,880);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(width/2,height-20,width,20);

    base1 = new Ground(1050,600,600,20);
    //base2 = new Ground(980,300,400,20);

    level1 = new Level1();

    Mbottle = new Bird(200,250);

    slingshot = new SlingShot(Mbottle.body,{x:200, y:250});

}

function draw(){

    Engine.update(engine);
    background(backgroundImg);

    if(attempts<0){
        gamestate=END;
    }
    
    if(gamestate===PLAY){
        
        textSize(20);
        strokeWeight(1);
        stroke("lavender");
        fill("lightblue");
        text("Score: " + score,80,50);
        text("Press space to get one more chance.", 80,80);
        text("Level: " + level, 200,50)

        strokeWeight(0);
        ground.display();
        base1.display();
        slingshot.display();
   
        if(level === 1){ 

            textSize(32);
            fill("white");
            stroke("blue");
            strokeWeight(4);
            text("Replace platic bottles with a reusable bottle!",300,200);
            
            level1.display();
            level1.score();
            Mbottle.display();

            if(score >200 && score<450){
                fill("#560A86");
                stroke("#F148FB");
                text("Great Going... You will soon make the Change.",300,150);
            }

            if(score>500){
                level++;
                level1.destroy();
                level1 = new Level2();
            }
        }else if(level === 2){       
                Bird.image = loadImage("Cloth Bag.png"); 
                backgroundImg = loadImage("BG L2.jpg");
                noStroke();
                base2 = new Ground(980,250,200,10);
            
                level1.display();
                Mbottle.display();
                level1.score();
                base2.display();
                
                textSize(32);
                fill("white");
                stroke(255,228,225);
                strokeWeight(4);
                text("Replace platic bags with a reusable Cloth Bag!",300,200);

                if(score >750 && score<950){
                    fill("#560A86");
                    stroke("#F148FB");
                    text("Fantabulous!! Be Proud of Yourself!!",300,150);
                }

                if(score >= 1000){
                    level++;
                    level1.destroy();
                    level1 = new Level3();   
                }

            } else if(level === 3){
                    noStroke();
                    base2 = new Ground(980,250,200,10);
                    Mbottle.width = 130;
                    Mbottle.height = 125;
                    Bird.image = loadImage("apple.png");
                    backgroundImg = loadImage("BG L3.jpg");
                    level1.display();
                    Mbottle.display();
                    level1.score();
                    base2.display();

                    textSize(32);
                    fill("white");
                    stroke("red");
                    strokeWeight(4);
                    text("Replace junk food with healthy food!",300,200);

                if(score >1200 && score<1450){
                    fill("#560A86");
                    stroke("#F148FB");
                    text("Congratulations on changing habits!!!",300,150);
            }

                if(score >= 1500){
                    level++;
                    level1.destroy();
                    //Mbottle.destroy();
                    level1 = new Level4();
                }
        }else if(level === 4){
                Bird.image = loadImage("e vehicle.png"); 
                backgroundImg = loadImage("BG L4.jpg");
                level1.display();
                Mbottle.display();
                level1.score();
                textSize(32);
                fill("white");
                stroke("green");
                strokeWeight(4);
                text("Replace polluting vehicles with eco-friendly E-vehicles...",300,200);

                if(score >1700 && score<1950){
                    fill("#560A86");
                    stroke("#F148FB");
                    text("You are the Real Hero of Today....",300,150);
                    gamestate=WON;
                }

        /*if(score >= 1500){
            level++;
            level1.destroy();
            //level = new Level4();
        }
        */
    }

   // Mbottle.display();  

    text(mouseX+","+mouseY,mouseX,mouseY);
    }else if(gamestate === END){
                textSize(42);
                fill("white");
                stroke("green");
                strokeWeight(4);
        text("Congratulations on Reaching Level " + level + " with a Score of " + score + "!!", width/2 - 200, height/2);
        stroke("blue");
        text("Press 'R' to restart the Game", width/2 - 200, height/2);
        
    }else if(gamestate === WON){
                backgroundImg=loadImage("wonBG.jpg");
                //var t = createSprite(width/2 - 200, height/2);
                textSize(42);
                fill("white");
                stroke("green");
                strokeWeight(4);
        text("Congratulations on clearing all levels with a high score of " + score,width/2-200,height/2);
    }

}

function mouseDragged(){
    if(isLaunched === false){
    Matter.Body.setPosition(Mbottle.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    isLaunched = true;
    attempts -= 1;
}

function keyPressed(){
    if(keyCode === 32 && attempts>0){
        Matter.Body.setPosition(Mbottle.body, {x: 200 , y: 250});
        slingshot.attach(Mbottle.body);
        isLaunched = false;
    }
    if(keyCode === 82 || keyCode === 114){
        gamestate = PLAY;
        score = 0;
        attempts = 5;
        level = 1;
    }
}