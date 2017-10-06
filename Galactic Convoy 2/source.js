var ship;
var stars;
var enemies;
var missles;
var enemyMissles;
var dead = false;
var enemySpeed = 1;
var credits = 10;
var gameScore = 0;
var kills = 0;
var escorts = 0;
var respawnCount = 201;
var starVelX;
var starVelY;
var planets;
var backgroundColor;
var onPlanet = false;
var Xcoord = 0;
var Ycoord = 0;
var backgroundStars;
var health = 100;
var currentPlanet = 0;
var airFriction = 0.97; //0=Max
var boostSpeed = 1.5;//1.5
var warpFullSpeed = 8;
var warpSpeed = 2;
var healCost;
var refuelCost;
var fuel = 100;
var coal=0;
var iron=0;
var titanium=0;
var pieces;
var renderDistance = 80000;
var cleanupCount = 0;
var cleanupFrequency = 100;
var marker;
var turnSpeed = 0.13;
var trails = false;
var trailCount = 0;
var trailTime = 50;
var shipSpeed = 0;
var speedometerCount = 0;
var oneOrTwo = 1;
var shipPosA;
var shipPosB;
var planetNumber = 100;




function setup(){
  marker = createVector();
  pieces = [];
  enemies = [];
  stars = [];
  enemies = [];
  missles = [];
  enemyMissles = [];
  friendlies = [];
  planets = [];
  backgroundStars = [];
  backgroundColor = [];
  backgroundColor.push(0,0,0)
  ship = new Ship();
  createCanvas(1400,930);
  shipPosA = createVector();
  shipPosB = createVector();


  for(var i=0;i<100;i++){
    backgroundStars.push(new Star(round(random(0,windowWidth)),round(random(0,windowHeight)),random(0.2,6)));
  }
  for(var i=0;i<40;i++){
    stars.push(new Star(round(random(0,windowWidth)),round(random(0,windowHeight)),random(7,20)));
  }
  for(var i=0;i<planetNumber;i++){
    planets.push(new Planet(round(random(-renderDistance,windowWidth+renderDistance)),round(random(-renderDistance,windowHeight+renderDistance)),random(300,600),i));
  }
  for(var i=0;i<50;i++){
    var squadX = random(-renderDistance,renderDistance);
    var squadY = random(-renderDistance,renderDistance);
    for(var m=0;m<3;m++){
      var offsetX = random(-300,300);
      var offsetY = random(-300,300);
      enemies.push(new Enemy(squadX+offsetX,squadY+offsetY));
    }
  }
 
}


function draw(){

  if(speedometerCount<25){
    speedometerCount++;
  }else{
    speedometerCount = 0;
    if(oneOrTwo == 1){
      shipPosA.x = ship.pos.x;
      shipPosA.y = ship.pos.y;
      oneOrTwo = 2;
    }else{
      oneOrTwo = 1;
      shipPosB.x = ship.pos.x;
      shipPosB.y = ship.pos.y;
    }
  }

  shipSpeed = abs(shipPosA.x - shipPosB.x) + abs(shipPosA.y - shipPosB.y);


  cleanupCount++;
  if(cleanupCount==cleanupFrequency){
    cleanupCount =0;
    enemyMissles.splice(0,1);
    pieces.splice(0,1);
  }

  if(onPlanet == false){
  stroke(255);
  if(credits<0.1){
    credits = 0;
  }


  if (trails == false){
    background(backgroundColor[0],backgroundColor[1],backgroundColor[2]);
  }else{
    if(trailCount<trailTime){
      trailCount++; 
      warpSpeed = 0.5 +((warpFullSpeed/(trailTime+550)) *trailCount);
    }
    else{
      warpCountDown = 0;
      trails = false;
      warpSpeed = warpFullSpeed;
    }
  }




  for(var i=0;i<backgroundStars.length;i++){
    backgroundStars[i].update();
    backgroundStars[i].render();
  }
  for(var i=0;i<planets.length;i++){
    planets[i].render();
    planets[i].update();
  }
  for(var i=0;i<stars.length;i++){
    stars[i].update();
    stars[i].render();
  }
  for(var i=0;i<friendlies.length;i++){
    friendlies[i].render();
    friendlies[i].update();
  }
  for(var i=0;i<missles.length;i++){
    missles[i].render();
    missles[i].update();
  }
   for(var i=0;i<enemyMissles.length;i++){
    enemyMissles[i].render();
    enemyMissles[i].update();
  }
  for(var i=0;i<enemies.length;i++){
    enemies[i].render();
    enemies[i].update();
  }


  stroke(0,255,0);
  fill(0,255,0);
  var cx = constrain(marker.x - ship.pos.x+ windowWidth/2,0,windowWidth); 
  var cy = constrain(marker.y - ship.pos.y + windowHeight/2,0,windowHeight); 
  ellipse(cx,cy,50,50);
  noStroke();

  roundX = round(ship.pos.x);
  roundY = round(ship.pos.y);
  writeText("x:"+roundX.toString()+" y:"+roundY.toString(),10,10);
  writeText(round(shipSpeed*0.0208).toString() + " megameters per second",10,60);
  if((ship.pos.x>renderDistance||ship.pos.x<renderDistance*-1)||(ship.pos.y>renderDistance||ship.pos.y<renderDistance*-1)){
    writeText("out of bounds",10,110);
  }




  fill(50);
  rect(220,windowHeight-65,170,60);
  fill(100);
  rect(225,windowHeight-60,50,50);
  rect(280,windowHeight-60,50,50);
  rect(335,windowHeight-60,50,50);

    fill(0);
    ellipse(250,windowHeight-35,40,40);
    textSize(23);
    fill(255);
    text(coal.toString(), 250,windowHeight-20);

    fill(135,32,32);
    ellipse(305,windowHeight-35,40,40);
    var textShade = 255;
    fill(255);
    text(iron.toString(),305,windowHeight-20);

    fill(180);
    ellipse(360,windowHeight-35,40,40);
    var textShade = 255;
    fill(255);
    text(titanium.toString(),360,windowHeight-20);

  
  var roundCredits = round(credits);
  writeText("credits:" + roundCredits.toString(),10,840);
  fill(50,50,50);
  rect(5,windowHeight-65,210,30);
  fill(0,180,0);
  rect(10,windowHeight-60,200,20);
  fill(0,255,0);
  rect(10,windowHeight-60,health*2,20);
  fill(50,50,50);
  rect(5,windowHeight-35,210,30);
  fill(180,180,0);
  rect(10,windowHeight-30,200,20);
  fill(255,255,0);
  rect(10,windowHeight-30,fuel*2,20);
  if(dead == false){
  ship.update();
  ship.render();
  }
}else{
  background(backgroundColor[0],backgroundColor[1],backgroundColor[2]);



  fill(backgroundColor[0]-50,backgroundColor[1]-50,backgroundColor[2]-50);
  noStroke();
  rect(0,windowHeight-100,windowWidth,100);



  if(planets[currentPlanet].craters == true){
      fill(backgroundColor[0]-100,backgroundColor[1]-100,backgroundColor[2]-100)
      ellipse(100,windowHeight-80,50,20);
      ellipse(300,windowHeight-40,75,30);
      ellipse(600,windowHeight-50,70,30);
      ellipse(800,windowHeight-70,70,32);
      ellipse(1100,windowHeight-60,60,22);
      ellipse(1500,windowHeight-60,65,32);
  }
  if(planets[currentPlanet].civilized == true){

    fill(backgroundColor[0]-100,backgroundColor[1]-100,backgroundColor[2]-100)

    ellipse(windowWidth/2,windowHeight-100,350,250);

    fill(backgroundColor[0]-50,backgroundColor[1]-50,backgroundColor[2]-50);
    noStroke();
    rect(0,windowHeight-100,windowWidth,100);

    roundX = round(ship.pos.x);
    roundY = round(ship.pos.y);
 
    fill(100);
    rect(windowWidth/2-35,windowHeight-200,70,140);
    fill(100,100,255);
    rect(windowWidth/2-25,windowHeight-190,10,10);
    rect(windowWidth/2-5,windowHeight-190,10,10);
    rect(windowWidth/2+15,windowHeight-190,10,10);
    rect(windowWidth/2-25,windowHeight-170,10,10);
    rect(windowWidth/2-5,windowHeight-170,10,10);
    rect(windowWidth/2+15,windowHeight-170,10,10);
    rect(windowWidth/2-25,windowHeight-150,10,10);
    rect(windowWidth/2-5,windowHeight-150,10,10);
    rect(windowWidth/2+15,windowHeight-150,10,10);
    rect(windowWidth/2-25,windowHeight-130,10,10);
    rect(windowWidth/2-5,windowHeight-130,10,10);
    rect(windowWidth/2+15,windowHeight-130,10,10);
    rect(windowWidth/2-25,windowHeight-110,10,10);
    rect(windowWidth/2-5,windowHeight-110,10,10);
    rect(windowWidth/2+15,windowHeight-110,10,10);

    fill(100);
    rect(windowWidth/2-125,windowHeight-180,70,120);
    fill(100,100,255);

    rect(windowWidth/2-115,windowHeight-170,10,10);
    rect(windowWidth/2-95,windowHeight-170,10,10);
    rect(windowWidth/2-75,windowHeight-170,10,10);
    rect(windowWidth/2-115,windowHeight-150,10,10);
    rect(windowWidth/2-95,windowHeight-150,10,10);
    rect(windowWidth/2-75,windowHeight-150,10,10);
    rect(windowWidth/2-115,windowHeight-130,10,10);
    rect(windowWidth/2-95,windowHeight-130,10,10);
    rect(windowWidth/2-75,windowHeight-130,10,10);
    rect(windowWidth/2-115,windowHeight-110,10,10);
    rect(windowWidth/2-95,windowHeight-110,10,10);
    rect(windowWidth/2-75,windowHeight-110,10,10);

    fill(100);
    rect(windowWidth/2+55,windowHeight-180,70,120);
    fill(100,100,255);

    rect(windowWidth/2+65,windowHeight-170,10,10);
    rect(windowWidth/2+85,windowHeight-170,10,10);
    rect(windowWidth/2+105,windowHeight-170,10,10);
    rect(windowWidth/2+65,windowHeight-150,10,10);
    rect(windowWidth/2+85,windowHeight-150,10,10);
    rect(windowWidth/2+105,windowHeight-150,10,10);
    rect(windowWidth/2+65,windowHeight-130,10,10);
    rect(windowWidth/2+85,windowHeight-130,10,10);
    rect(windowWidth/2+105,windowHeight-130,10,10);
    rect(windowWidth/2+65,windowHeight-110,10,10);
    rect(windowWidth/2+85,windowHeight-110,10,10);
    rect(windowWidth/2+105,windowHeight-110,10,10);



  }
  var roundCredits = round(credits);

  if((planets[currentPlanet].colorR + planets[currentPlanet].colorG + planets[currentPlanet].colorB)/3 > 120){
    textShade = 0;
  }else{
    textShade = 255;
  }

  for(var i=0;i<missles.length;i++){
    missles[i].render();
    missles[i].update();
  }
  for(var i=0;i<planets[currentPlanet].resources.length;i++){
      planets[currentPlanet].resources[i].render();
  }
  for(var i=0;i<pieces.length;i++){
      pieces[i].render();
      pieces[i].update();
  }
  var roundCredits = round(credits);
  writeText("credits:" + roundCredits.toString(),10,840);
  fill(50,50,50);
  rect(5,windowHeight-65,210,30);
  fill(0,180,0);
  rect(10,windowHeight-60,200,20);
  fill(0,255,0);
  rect(10,windowHeight-60,health*2,20);
  fill(50,50,50);
  rect(5,windowHeight-35,210,30);
  fill(180,180,0);
  rect(10,windowHeight-30,200,20);
  fill(255,255,0);
  rect(10,windowHeight-30,fuel*2,20);
  fill(50);
  rect(220,windowHeight-65,170,60);
  fill(100);
  rect(225,windowHeight-60,50,50);
  rect(280,windowHeight-60,50,50);
  rect(335,windowHeight-60,50,50);

    fill(0);
    ellipse(250,windowHeight-35,40,40);
    textSize(23);
    fill(255);
    text(coal.toString(), 250,windowHeight-20);

    fill(135,32,32);
    ellipse(305,windowHeight-35,40,40);
    var textShade = 255;
    fill(255);
    text(iron.toString(),305,windowHeight-20);

    fill(180);
    ellipse(360,windowHeight-35,40,40);
    var textShade = 255;
    fill(255);
    text(titanium.toString(),360,windowHeight-20);

  if(planets[currentPlanet].civilized == true){
    townScreen();
  }

  if(dead == false){
  ship.update();
  ship.planetRender();
  }

  }
}


function keyPressed(){
  if(dead == false){
  if(keyCode==68){
    ship.turning = true;
    ship.turnDirection = turnSpeed;
  }else if(keyCode==65){
    ship.turning = true;
    ship.turnDirection = -turnSpeed;
  }else if(keyCode==87){
    if(ship.warping==false){
      ship.boosting = true;
      ship.boostForce = boostSpeed;
    }
  }else if(keyCode==83){
    ship.braking = true;
    turnSpeed = 0.04;
  }else if(keyCode==186){
    missles.push(new Missle());
    if(document.getElementById("laser").paused==true){
      document.getElementById("laser").play();
    }else if(document.getElementById("laser2").paused==true){
      document.getElementById("laser2").play();
    }else if(document.getElementById("laser3").paused==true){
      document.getElementById("laser3").play();
    }else if(document.getElementById("laser4").paused==true){
      document.getElementById("laser4").play();
    }else if(document.getElementById("laser5").paused==true){
      document.getElementById("laser5").play();
    }
  }else if(keyCode==81){
    marker.x = ship.pos.x;
    marker.y = ship.pos.y;
  }
  }
}

function keyReleased(){
  if(dead == false){
  if(keyCode==68){
    ship.turning = false;
    ship.turnDirection = 0;
  }else if(keyCode==65){
    ship.turning = false;
    ship.turnDirection = 0;
  }else if(keyCode==83){
    ship.braking = false;
    turnSpeed = 0.1;
  }else if(keyCode==87){
    ship.boosting = false;
    ship.boostForce = 0;
    document.getElementById("rocket").pause();
    document.getElementById("rocket").currentTime = 0;

  }else if(keyCode==32){
    if(onPlanet == true){
      onPlanet = false;
      textShade = 255;
      ship.pos.x = Xcoord;
      ship.pos.y = Ycoord;
      backgroundColor.splice(0,backgroundColor.length);
      backgroundColor.push(0,0,0);
      airFriction = 0.97;
      boostSpeed = 1.5;
    }else{
      for(var i=0;i<planets.length;i++){
        if(abs(planets[i].Xdistance)+abs(planets[i].Ydistance) < planets[i].r/2){
          currentPlanet = i;
          onPlanet = true;  
          backgroundColor.splice(0,backgroundColor.length);
          backgroundColor.push(planets[i].colorR+50,planets[i].colorG+50,planets[i].colorB+50)
          Xcoord = ship.pos.x;
          Ycoord = ship.pos.y;
          ship.pos.x = windowWidth/2;
          ship.pos.y = windowHeight/2; 
          airFriction = 0.95;
          boostSpeed = 0.5;
          console.log(planets[currentPlanet].coalSpawn);
          
        }
      }
    }
  }
}
}

function Explode(x,y){
  if(document.getElementById("explosion").paused==true){
    document.getElementById("explosion").play();  
  }else if(document.getElementById("explosion2").paused==true){
    document.getElementById("explosion2").play();
  }
  fill(255);
  background(255);
}

function townScreen(){
  healCost = 100-health;
  healCost = round(healCost/10);
  refuelCost = 100-fuel;
  refuelCost = round(refuelCost/20);
  refuelCost = refuelCost *planets[currentPlanet].fuelCost;
  fill(100);
  rect(windowWidth/2-300,windowHeight/2-400,600,450);
  fill(125);
  rect(windowWidth/2-125,windowHeight/2-390,250,40);//Repair Button
  fill(textShade);
  textSize(30);
  text("Repair" ,windowWidth/2-50,windowHeight/2-360);
  fill(125);
  rect(windowWidth/2-125,windowHeight/2-340,250,40);//Refuel Button
  fill(textShade);
  textSize(30);
  text("Refuel" ,windowWidth/2-50,windowHeight/2-310);
  fill(125);
  textSize(35);
  fill(255);
  text("Coal x10" ,windowWidth/2-260,windowHeight/2-220);
  fill(125);
  rect(windowWidth/2-125,windowHeight/2-290,250,40);//Refuel Button
  fill(textShade);
  textSize(30);
  text("Talk to Mayor" ,windowWidth/2-87,windowHeight/2-260);
  
  textSize(30);
  text("Iron x10" ,windowWidth/2+60,windowHeight/2-220);
  text("Titanium x10" ,windowWidth/2-260,windowHeight/2-80);
  fill(125);


  var coalValue = round(5-planets[currentPlanet].coal/100);
  planets[currentPlanet].coalValue = coalValue;
  var ironValue = round(8-planets[currentPlanet].iron/75);
  planets[currentPlanet].ironValue = ironValue;
  var titaniumValue = round(10-planets[currentPlanet].titanium/50);
  planets[currentPlanet].titaniumValue = titaniumValue;

  rect(windowWidth/2-255,windowHeight/2-210,200,40);//Buy Coal
  rect(windowWidth/2-255,windowHeight/2-165,200,40);//Sell Coal
  rect(windowWidth/2+60,windowHeight/2-210,200,40);//Buy Iron
  rect(windowWidth/2+60,windowHeight/2-165,200,40);//Sell Iron
  rect(windowWidth/2-255,windowHeight/2-70,200,40);//Buy Titanium
  rect(windowWidth/2-255,windowHeight/2-25,200,40);//Sell Titanium
  fill(255);
  textSize(11);
  text(planets[currentPlanet].coal+" in stock",(windowWidth/2-260) + 150,(windowHeight/2-220));
  text(planets[currentPlanet].iron+" in stock",(windowWidth/2+60) + 150,(windowHeight/2-220));
  text(planets[currentPlanet].titanium+" in stock",(windowWidth/2-240) + 150,(windowHeight/2-80));

  textSize(26);
  fill(255);
  text("buy - "+(coalValue+planets[currentPlanet].profitMargin), windowWidth/2-235,windowHeight/2-181);
  text("sell - "+coalValue, windowWidth/2-235,windowHeight/2-136);
  text("buy - "+(ironValue+planets[currentPlanet].profitMargin), windowWidth/2+85,windowHeight/2-181);
  text("sell - "+ironValue, windowWidth/2+85,windowHeight/2-136);
  text("buy - "+(titaniumValue+planets[currentPlanet].profitMargin), windowWidth/2-235,windowHeight/2-45);
  text("sell - "+titaniumValue, windowWidth/2-235,windowHeight/2+4);
  fill(125);
  textSize(30);

}

function mouseIsContainedIn(x1,y1,x2,y2){
  if(mouseX>=x1&&mouseX<=x2){
    if(mouseY>=y1&&mouseY<=y2){
      return true;
    }
  }
  return false;
}

function mousePressed(){
  console.log(mouseX,mouseY);
  if(onPlanet == true && planets[currentPlanet].civilized == true){
    if(credits > 0){
      if(mouseIsContainedIn(windowWidth/2-125,windowHeight/2-390,windowWidth/2+125,windowHeight/2-350)){//Repair Button
          if(health<91){
            if(document.getElementById("button").paused==true){
              document.getElementById("button").play();  
            }else if(document.getElementById("button2").paused==true){
              document.getElementById("button2").play(); 
            }else{
              document.getElementById("button3").play(); 
            }
            credits--;
            health = health + 10;
          }
      }else if(mouseIsContainedIn(windowWidth/2-125,windowHeight/2-340,windowWidth/2+125,windowHeight/2-300)){//Refuel Button
          if(fuel<81){
            if(document.getElementById("button").paused==true){
              document.getElementById("button").play();  
            }else if(document.getElementById("button2").paused==true){
              document.getElementById("button2").play(); 
            }else{
              document.getElementById("button3").play(); 
            }   
            credits--;
            fuel = fuel + 20;
          }
      }
    }
    if(mouseIsContainedIn(windowWidth/2-255,windowHeight/2-210,windowWidth/2-55,windowHeight/2-170)){//Buy Coal
      if(credits>=planets[currentPlanet].coalValue + planets[currentPlanet].profitMargin){
        if(planets[currentPlanet].coal>=10){
          if(document.getElementById("button").paused==true){
            document.getElementById("button").play();  
          }else if(document.getElementById("button2").paused==true){
            document.getElementById("button2").play(); 
          }else{
            document.getElementById("button3").play(); 
          }
          credits -= (planets[currentPlanet].coalValue+planets[currentPlanet].profitMargin);
          coal+=10;
          planets[currentPlanet].coal-=10;  
        }
        
      }
    }

    if(mouseIsContainedIn(windowWidth/2-255,windowHeight/2-165,windowWidth/2-55,windowHeight/2-125)){//Sell Coal
      if(coal>=10){
        if(document.getElementById("button").paused==true){
          document.getElementById("button").play();  
        }else if(document.getElementById("button2").paused==true){
          document.getElementById("button2").play(); 
        }else{
          document.getElementById("button3").play(); 
        }
        credits+=planets[currentPlanet].coalValue;
        coal-=10;
        planets[currentPlanet].coal+=10;  
      }
    }
   
    if(mouseIsContainedIn(windowWidth/2+60,windowHeight/2-210,windowWidth/2+260,windowHeight/2-170)){//Buy Iron
      if(credits>=planets[currentPlanet].ironValue + planets[currentPlanet].profitMargin){
        if(planets[currentPlanet].iron>=10){
          if(document.getElementById("button").paused==true){
            document.getElementById("button").play();  
          }else if(document.getElementById("button2").paused==true){
            document.getElementById("button2").play(); 
          }else{
            document.getElementById("button3").play(); 
          }
          credits -= (planets[currentPlanet].ironValue+planets[currentPlanet].profitMargin);
          iron+=10;
          planets[currentPlanet].iron-=10;  
        }
        
      }
    }

    if(mouseIsContainedIn(windowWidth/2+60,windowHeight/2-165,windowWidth/2+260,windowHeight/2-125)){//Sell Iron
      if(iron>=10){
        if(document.getElementById("button").paused==true){
          document.getElementById("button").play();  
        }else if(document.getElementById("button2").paused==true){
          document.getElementById("button2").play(); 
        }else{
          document.getElementById("button3").play(); 
        }
        credits+=planets[currentPlanet].ironValue;
        iron-=10;
        planets[currentPlanet].iron+=10;  
      }
    }

    if(mouseIsContainedIn(windowWidth/2-255,windowHeight/2-70,windowWidth/2-55,windowHeight/2-30)){//Buy Titanium
      if(credits>=planets[currentPlanet].titaniumValue + planets[currentPlanet].profitMargin){
        if(planets[currentPlanet].titanium>=10){
          if(document.getElementById("button").paused==true){
            document.getElementById("button").play();  
          }else if(document.getElementById("button2").paused==true){
            document.getElementById("button2").play(); 
          }else{
            document.getElementById("button3").play(); 
          }
          credits -= (planets[currentPlanet].titaniumValue+planets[currentPlanet].profitMargin);
          titanium+=10;
          planets[currentPlanet].titanium-=10;  
        }
        
      }
    }

    if(mouseIsContainedIn(windowWidth/2-255,windowHeight/2-25,windowWidth/2-55,windowHeight/2+15)){//Sell Titanium
      if(titanium>=10){
        if(document.getElementById("button").paused==true){
          document.getElementById("button").play();  
        }else if(document.getElementById("button2").paused==true){
          document.getElementById("button2").play(); 
        }else{
          document.getElementById("button3").play(); 
        }
        credits+=planets[currentPlanet].titaniumValue;
        titanium-=10;
        planets[currentPlanet].titanium+=10;  
      }
    }


  }
}

function Piece (x,y,type){
  this.pos = createVector(x,y);
  this.vel = createVector();
  this.vel = p5.Vector.random2D();
  this.resourceType = type;

  this.vel.y = constrain(0,100);


  this.update = function(){
    this.vel.mult(0.99);
    this.pos.add(this.vel);
  }

  this.render = function(){
    if(type=="coal"){
      fill(0);
    }else if(type=="iron"){
      fill(135,32,32);
    }else if(type=="titanium"){
      fill(180);
    }
    ellipse(this.pos.x,this.pos.y,15,15)
  }
} 



