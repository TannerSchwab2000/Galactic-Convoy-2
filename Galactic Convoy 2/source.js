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
var boostDirection = 2;
var forwardBoosting = false;
var healCost;
var refuelCost;
var menu = 1;
var questType;
var fuel = 100;
var iron=0;
var uranium=0;
var gold=0;
var pieces;
var renderDistance = 70000;
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
var planetNumber = 110;
var currentQuest;
var start;
var message;
var messageDisplayed;
var messageTime;
var displayStart;



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

  start = Date.now();

  currentQuest = new Quest(0,0);

  for(var i=0;i<100;i++){
    backgroundStars.push(new Star(round(random(0,windowWidth)),round(random(0,windowHeight)),random(0.2,6)));
  }
  for(var i=0;i<40;i++){
    stars.push(new Star(round(random(0,windowWidth)),round(random(0,windowHeight)),random(7,20)));
  }
  for(var i=0;i<50;i++){
    var squadX = random(-renderDistance,renderDistance);
    var squadY = random(-renderDistance,renderDistance);
    for(var m=0;m<3;m++){
      var offsetX = random(-300,300);
      var offsetY = random(-300,300);
      enemies.push(new Enemy(squadX+offsetX,squadY+offsetY,enemies.length-1));
    }
  }
  for(var i=0;i<planetNumber;i++){
    planets.push(new Planet(round(random(-renderDistance,windowWidth+renderDistance)),round(random(-renderDistance,windowHeight+renderDistance)),random(300,600),i));
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

    if(ship.engine==1){
      boostSpeed = 1.1;  
    }else{
      boostSpeed = 1.5;  
    }

    stroke(255);
    if(credits<0.1){
      credits = 0;
    }



    background(backgroundColor[0],backgroundColor[1],backgroundColor[2]);

    if(messageDisplayed==true){
      if(Date.now()-displayStart<messageTime*1000){
        fill(255);
        stroke(255);
        strokeWeight(1);
        textSize(60);
        text(message,windowWidth/2-message.length*15,windowHeight/2-100);
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

    fill(67,75,77);
    ellipse(250,windowHeight-35,40,40);
    textSize(23);
    fill(255);
    text(iron.toString(), 250,windowHeight-20);

    fill(0,255,0);
    ellipse(305,windowHeight-35,40,40);
    var textShade = 255;
    fill(255);
    text(uranium.toString(),305,windowHeight-20);

    fill(255,215,0);
    ellipse(360,windowHeight-35,40,40);
    var textShade = 255;
    fill(255);
    text(gold.toString(),360,windowHeight-20);

  
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





  if(planets[currentPlanet].trees == 1){
    
    fill(130,60,10);
    rect(windowWidth/2-50,windowHeight-300,30,200);
    fill(backgroundColor[0]+50,backgroundColor[1]+50,backgroundColor[2]+50)
    ellipse(windowWidth/2,windowHeight-300,130,120);
    ellipse(windowWidth/2-60,windowHeight-280,80,70);
    ellipse(windowWidth/2-30,windowHeight-320,95,110);
    fill(120,50,0);
    rect(windowWidth/2-50+550,windowHeight-300,30,200);
    fill(backgroundColor[0]+40,backgroundColor[1]+40,backgroundColor[2]+40)
    ellipse(windowWidth/2-60+550,windowHeight-260,130,120);
    ellipse(windowWidth/2+550,windowHeight-240,100,90);
    ellipse(windowWidth/2-30+550,windowHeight-280,95,110);
    fill(130,60,10);
    rect(windowWidth/2-50-550,windowHeight-300,30,200);
    fill(backgroundColor[0]+50,backgroundColor[1]+50,backgroundColor[2]+50)
    ellipse(windowWidth/2-60-550,windowHeight-280,130,120);
    ellipse(windowWidth/2-530,windowHeight-300,100,90);
    ellipse(windowWidth/2-30-550,windowHeight-320,90,100);
    fill(130,60,10);
    rect(windowWidth/2-50-275,windowHeight-300,30,200);
    fill(backgroundColor[0]+30,backgroundColor[1]+30,backgroundColor[2]+30)
    ellipse(windowWidth/2-60-275,windowHeight-260,130,120);
    ellipse(windowWidth/2-275,windowHeight-240,100,90);
    ellipse(windowWidth/2-30-275,windowHeight-280,95,110);
    fill(120,50,0);
    rect(windowWidth/2-50+275,windowHeight-300,30,200);
    fill(backgroundColor[0]+60,backgroundColor[1]+60,backgroundColor[2]+60)
    ellipse(windowWidth/2-60+275,windowHeight-280,130,120);
    ellipse(windowWidth/2+255,windowHeight-300,100,90);
    ellipse(windowWidth/2-30+275,windowHeight-320,90,100);
    
      

  }else if(planets[currentPlanet].trees == 2){
    
    fill(130,60,10);
    rect(windowWidth/2-50,windowHeight-300,30,200);
    fill(backgroundColor[0]+50,backgroundColor[1]+50,backgroundColor[2]+50)
    ellipse(windowWidth/2-35,windowHeight-300+30,120,120);
    ellipse(windowWidth/2-35,windowHeight-350+30,90,100);
    ellipse(windowWidth/2-35,windowHeight-410+30,60,80);
    fill(120,50,0);
    rect(windowWidth/2-50+550,windowHeight-300,30,200);
    fill(backgroundColor[0]+40,backgroundColor[1]+40,backgroundColor[2]+40)
    ellipse(windowWidth/2-35+550,windowHeight-300,120,120);
    ellipse(windowWidth/2-35+550,windowHeight-350,90,100);
    ellipse(windowWidth/2-35+550,windowHeight-410,60,80);
    fill(130,60,10);
    rect(windowWidth/2-50-550,windowHeight-300,30,200);
    fill(backgroundColor[0]+50,backgroundColor[1]+50,backgroundColor[2]+50)
    ellipse(windowWidth/2-35-550,windowHeight-300,120,120);
    ellipse(windowWidth/2-35-550,windowHeight-350,90,100);
    ellipse(windowWidth/2-35-550,windowHeight-410,60,80);
    fill(130,60,10);
    rect(windowWidth/2-50-275,windowHeight-300,30,200);
    fill(backgroundColor[0]+30,backgroundColor[1]+30,backgroundColor[2]+30)
    ellipse(windowWidth/2-35-275,windowHeight-300+10,120,120);
    ellipse(windowWidth/2-35-275,windowHeight-350+10,90,100);
    ellipse(windowWidth/2-35-275,windowHeight-410+10,60,80);
    fill(120,50,0);
    rect(windowWidth/2-50+275,windowHeight-300,30,200);
    fill(backgroundColor[0]+60,backgroundColor[1]+60,backgroundColor[2]+60)
    ellipse(windowWidth/2-35+275,windowHeight-300+30,120,120);
    ellipse(windowWidth/2-35+275,windowHeight-350+30,90,100);
    ellipse(windowWidth/2-35+275,windowHeight-410+30,60,80);
    
      

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

  if(planets[currentPlanet].lake == 1){
      fill(100,100,255);
      ellipse(windowWidth-400,windowHeight-50,200,60);
      ellipse(windowWidth-300,windowHeight-40,250,80);
  }else if(planets[currentPlanet].lake == 2){
      fill(100,100,255);
      ellipse(windowWidth-900,windowHeight-40,200,60);
      ellipse(windowWidth-800,windowHeight-30,250,80);
  }

  var roundCredits = round(credits);

  if((planets[currentPlanet].colorR + planets[currentPlanet].colorG + planets[currentPlanet].colorB)/3 > 120){
    textShade = 0;
  }else{
    textShade = 255;
  }

  if(planets[currentPlanet].civilized == true){
    townScreen();
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

    fill(67,75,77);
    ellipse(250,windowHeight-35,40,40);
    textSize(23);
    fill(255);
    text(iron.toString(), 250,windowHeight-20);

    fill(0,255,0);
    ellipse(305,windowHeight-35,40,40);
    var textShade = 255;
    fill(255);
    text(uranium.toString(),305,windowHeight-20);

    fill(255,215,0);
    ellipse(360,windowHeight-35,40,40);
    var textShade = 255;
    fill(255);
    text(gold.toString(),360,windowHeight-20);

    if(messageDisplayed==true){
      if(Date.now()-displayStart<messageTime*1000){
        fill(255);
        stroke(100);
        strokeWeight(1);
        textSize(60);
        text(message,windowWidth/2-message.length*15,windowHeight/2-100);
      }
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
    ship.boosting = true;
    forwardBoosting = true;
    boostDirection = 2;
    ship.boostForce = boostSpeed;
    if(menu==3){
      menu=2;
    }
  }else if(keyCode==69){
    ship.boosting = true;
    boostDirection = 1;
    ship.boostForce = boostSpeed;
    if(menu==3){
      menu=2;
    }
  }else if(keyCode==81){
    ship.boosting = true;
    boostDirection = 3;
    ship.boostForce = boostSpeed;
    if(menu==3){
      menu=2;
    }
  }else if(keyCode==83){
    ship.braking = true;
  }else if(keyCode==186){
    if(ship.laser==1){
      missles.push(new Missle());
    }else if(ship.laser==2){
      missles.push(new Missle(1)); 
      missles.push(new Missle(2)); 
    }
    
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
  }else if(keyCode==77){
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
  }else if(keyCode==87){
    ship.boosting = false;
    forwardBoosting = false;
    ship.boostForce = 0;
    document.getElementById("rocket").pause();
    document.getElementById("rocket").currentTime = 0;

  }else if(keyCode==81){
    if(forwardBoosting==false){
      ship.boosting = false;
      ship.boostForce = 0;
      document.getElementById("rocket").pause();
      document.getElementById("rocket").currentTime = 0;  
    }else{
      boostDirection = 2;
    }
    

  }else if(keyCode==69){
    if(forwardBoosting==false){
      ship.boosting = false;
      ship.boostForce = 0;
      document.getElementById("rocket").pause();
      document.getElementById("rocket").currentTime = 0;  
    }else{
      boostDirection = 2;
    }

  }else if(keyCode==32){
    if(onPlanet == true){
      menu=1;
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
          if(currentQuest.t==2&&currentQuest.focus==currentPlanet){
            displayMessage("Package Delivered",2);
            currentQuest = new Quest(0,0);
            credits+=10;
          }
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
  if(menu==1){
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
    text("Iron x10" ,windowWidth/2-260,windowHeight/2-220);
    fill(125);
    rect(windowWidth/2-125,windowHeight/2-290,250,40);//Refuel Button
    fill(textShade);
    textSize(30);
    text("Talk to Mayor" ,windowWidth/2-87,windowHeight/2-260);
    
    textSize(30);
    text("Uranium x10" ,windowWidth/2+55,windowHeight/2-220);
    text("Gold x10" ,windowWidth/2-260,windowHeight/2-80);
    fill(125);


    var ironValue = round(5-planets[currentPlanet].iron/100);
    planets[currentPlanet].ironValue = ironValue;
    var uraniumValue = round(8-planets[currentPlanet].uranium/75);
    planets[currentPlanet].uraniumValue = uraniumValue;
    var goldValue = round(10-planets[currentPlanet].gold/50);
    planets[currentPlanet].goldValue = goldValue;

    rect(windowWidth/2-255,windowHeight/2-210,200,40);//Buy iron
    rect(windowWidth/2-255,windowHeight/2-165,200,40);//Sell iron
    rect(windowWidth/2+60,windowHeight/2-210,200,40);//Buy uranium
    rect(windowWidth/2+60,windowHeight/2-165,200,40);//Sell uranium
    rect(windowWidth/2-255,windowHeight/2-70,200,40);//Buy gold
    rect(windowWidth/2-255,windowHeight/2-25,200,40);//Sell gold
    fill(255);
    textSize(11);
    text(planets[currentPlanet].iron+" in stock",(windowWidth/2-240) + 150,(windowHeight/2-220));
    text(planets[currentPlanet].uranium+" in stock",(windowWidth/2+75) + 150,(windowHeight/2-220));
    text(planets[currentPlanet].gold+" in stock",(windowWidth/2-240) + 150,(windowHeight/2-80));

    textSize(26);
    fill(255);
    text("buy - "+(ironValue+planets[currentPlanet].profitMargin), windowWidth/2-235,windowHeight/2-181);
    text("sell - "+ironValue, windowWidth/2-235,windowHeight/2-136);
    text("buy - "+(uraniumValue+planets[currentPlanet].profitMargin), windowWidth/2+85,windowHeight/2-181);
    text("sell - "+uraniumValue, windowWidth/2+85,windowHeight/2-136);
    text("buy - "+(goldValue+planets[currentPlanet].profitMargin), windowWidth/2-235,windowHeight/2-45);
    text("sell - "+goldValue, windowWidth/2-235,windowHeight/2+4);
    fill(125);
    textSize(30);  
  }else if(menu==2){
    fill(100);
    rect(windowWidth/2-300,windowHeight/2-400,600,450);
    fill(80);
    rect(windowWidth/2-265,windowHeight/2-390,530,330);
    fill(139,0,139);
    ellipse(windowWidth/2,windowHeight/2-130,300,130);
    fill(128,0,128);
    ellipse(windowWidth/2,windowHeight/2-190,230,100);
    fill(planets[currentPlanet].mayorColorR,planets[currentPlanet].mayorColorG,planets[currentPlanet].mayorColorB);
    ellipse(windowWidth/2,windowHeight/2-240,170,250);

    if(planets[currentPlanet].mayorEyes==1){
      fill(255);
      ellipse(windowWidth/2,windowHeight/2-270,20,10); 
      fill(0);
      ellipse(windowWidth/2,windowHeight/2-270,10,5); 
    }else{
      fill(255);
      ellipse(windowWidth/2-20,windowHeight/2-270,20,10);
      ellipse(windowWidth/2+20,windowHeight/2-270,20,10);
      fill(0);
      ellipse(windowWidth/2-20,windowHeight/2-270,10,5);
      ellipse(windowWidth/2+20,windowHeight/2-270,10,5);
    }

    if(planets[currentPlanet].mayorHair==1){
      ellipse(windowWidth/2,windowHeight/2-350,120,90); 
    }else if(planets[currentPlanet].mayorHair==2){
      ellipse(windowWidth/2,windowHeight/2-330,120,70); 
      ellipse(windowWidth/2-67,windowHeight/2-280,40,100); 
      ellipse(windowWidth/2+67,windowHeight/2-280,40,100); 
    }else if(planets[currentPlanet].mayorHair==3){
      ellipse(windowWidth/2,windowHeight/2-330,120,70); 
      fill(planets[currentPlanet].mayorColorR,planets[currentPlanet].mayorColorG,planets[currentPlanet].mayorColorB);
      ellipse(windowWidth/2,windowHeight/2-345,80,30); 
    }

    if(planets[currentPlanet].mayorCrown==1){
      fill(255,255,0);
      rect(windowWidth/2-60,windowHeight/2-355,120,35);
      rect(windowWidth/2-60,windowHeight/2-375,20,20);
      rect(windowWidth/2-10,windowHeight/2-375,20,20);
      rect(windowWidth/2+40,windowHeight/2-375,20,20);
    }

    if(planets[currentPlanet].mayorFacialHair==1){
      fill(0);
      ellipse(windowWidth/2,windowHeight/2-230,35,7); 
    }else if(planets[currentPlanet].mayorFacialHair==2){
      fill(0);
      ellipse(windowWidth/2,windowHeight/2-230,35,7); 
      ellipse(windowWidth/2-15,windowHeight/2-220,7,22); 
      ellipse(windowWidth/2+15,windowHeight/2-220,7,22); 
      ellipse(windowWidth/2,windowHeight/2-205,35,20); 
    }else if(planets[currentPlanet].mayorFacialHair==3){
      fill(0);
      ellipse(windowWidth/2,windowHeight/2-230,35,7); 
      ellipse(windowWidth/2-15,windowHeight/2-220,7,22); 
      ellipse(windowWidth/2-20,windowHeight/2-210,15,15); 
      ellipse(windowWidth/2-30,windowHeight/2-220,25,25);
      ellipse(windowWidth/2-50,windowHeight/2-230,30,30);
      ellipse(windowWidth/2+15,windowHeight/2-220,7,22); 
      ellipse(windowWidth/2+20,windowHeight/2-210,15,15); 
      ellipse(windowWidth/2+30,windowHeight/2-220,25,25);
      ellipse(windowWidth/2+50,windowHeight/2-230,30,30);
      ellipse(windowWidth/2,windowHeight/2-205,35,20); 
    }


    if(planets[currentPlanet].mayorNose==1){
      fill(planets[currentPlanet].mayorColorR-20,planets[currentPlanet].mayorColorG-20,planets[currentPlanet].mayorColorB-20);
      ellipse(windowWidth/2,windowHeight/2-240,20,10); 
      ellipse(windowWidth/2,windowHeight/2-250,10,20); 
    }

    fill(255,0,0);
    ellipse(windowWidth/2,windowHeight/2-220,20,10); 
    stroke(0);
    line(windowWidth/2-10,windowHeight/2-220,windowWidth/2+10,windowHeight/2-220);
    noFill();
    arc(windowWidth/2,windowHeight/2-180, 50, 50, 0, PI);

    noStroke();
    fill(120);
    rect(windowWidth/2-150,windowHeight/2-55,300,30);
    rect(windowWidth/2-150,windowHeight/2-20,300,30);
    rect(windowWidth/2-150,windowHeight/2+15,300,30);
    noStroke();
    fill(255);
    strokeWeight(1);
    text("Dock",windowWidth/2-55,windowHeight/2-32);
    text("Quests",windowWidth/2-55,windowHeight/2+3);
    text("Goodbye",windowWidth/2-55,windowHeight/2+38);

    stroke(0);
    fill(0);
    text(planets[currentPlanet].welcomePhrase,windowWidth/2-130,windowHeight/2-80);
    noStroke();
  }else if(menu==3){
    fill(100);
    rect(windowWidth/2-300,windowHeight/2-400,600,450);
    fill(90);
    rect(windowWidth/2-140,windowHeight/2-375,80,80);
    rect(windowWidth/2-40,windowHeight/2-375,80,80);
    rect(windowWidth/2+60,windowHeight/2-375,80,80);
    fill(125);
    rect(windowWidth/2-80,windowHeight/2-30,160,50);
    rect(windowWidth/2-80,windowHeight/2-90,160,50);
    noStroke();
    fill(255);
    if(ship.laser==1){
      textSize(16);
      text("Basic Laser",windowWidth/2-150,windowHeight/2-275); 
      textSize(23);
    }if(ship.laser==2){
      textSize(15);
      text("Double Laser",windowWidth/2-150,windowHeight/2-275); 
      textSize(23);
    }
    if(ship.engine==1){
      textSize(16);
      text("Basic Engine",windowWidth/2-50,windowHeight/2-275);
      textSize(23);
    }else if(ship.engine==2){
      textSize(14);
      text("Powerful Engine",windowWidth/2-50,windowHeight/2-275);
      textSize(23);
    }
    if(ship.shieldMax==255){
      textSize(16);
      text("Energy Shield",windowWidth/2+58,windowHeight/2-275);
      textSize(23);
    }else{
      textSize(16);
      text("No Shield",windowWidth/2+63,windowHeight/2-275);
      textSize(23);
    }
    text("Back",windowWidth/2-30,windowHeight/2);
    text("Buy Parts",windowWidth/2-47,windowHeight/2-55);

    if(ship.shieldMax==255){
      stroke(0,255,0);
      strokeWeight(7);
      noFill();
      ellipse(windowWidth/2+100,windowHeight/2-335,60,60);
      strokeWeight(1);
    }
    if(ship.laser==1){
      fill(130);
      noStroke();
      rect(windowWidth/2-115,windowHeight/2-365,30,10);
      fill(100,100,255);
      rect(windowWidth/2-110,windowHeight/2-355,20,45);
      fill(190,190,255);
      rect(windowWidth/2-105,windowHeight/2-355,10,45);
      fill(130);
      rect(windowWidth/2-115,windowHeight/2-310,30,10);

    }else if(ship.laser==2){
      fill(130);
      noStroke();
      rect(windowWidth/2-130,windowHeight/2-365,30,10);
      fill(100,100,255);
      rect(windowWidth/2-125,windowHeight/2-355,20,45);
      fill(190,190,255);
      rect(windowWidth/2-120,windowHeight/2-355,10,45);
      fill(130);
      rect(windowWidth/2-130,windowHeight/2-310,30,10);

      fill(130);
      rect(windowWidth/2-100,windowHeight/2-365,30,10);
      fill(100,100,255);
      rect(windowWidth/2-95,windowHeight/2-355,20,45);
      fill(190,190,255);
      rect(windowWidth/2-90,windowHeight/2-355,10,45);
      fill(130);
      rect(windowWidth/2-100,windowHeight/2-310,30,10);

    }
    if(ship.engine==1){
      push();
      beginShape();
      fill(110);
      noStroke();
      vertex(-20,0);
      vertex(20,0);
      vertex(20,-20);
      vertex(25,-30);
      vertex(15,-40);
      vertex(0,-30);
      vertex(-15,-40);
      vertex(-25,-30);
      vertex(-20,-20);
      translate(windowWidth/2+4,windowHeight/2-315);
      endShape();
      pop();
      push();
      beginShape();
      fill(120);
      noStroke();
      vertex(-20,0);
      vertex(20,0);
      vertex(20,-20);
      vertex(25,-30);
      vertex(15,-40);
      vertex(0,-30);
      vertex(-15,-40);
      vertex(-25,-30);
      vertex(-20,-20);
      translate(windowWidth/2,windowHeight/2-315);
      endShape();
      pop();
    }else if(ship.engine==2){
      push();
      beginShape();
      fill(110);
      noStroke();
      vertex(-25,0);
      vertex(25,0);
      vertex(25,-25);
      vertex(30,-35);
      vertex(20,-45);
      vertex(0,-35);
      vertex(-20,-45);
      vertex(-30,-35);
      vertex(-25,-25);
      translate(windowWidth/2+6,windowHeight/2-315);
      endShape();
      pop();
      push();
      beginShape();
      fill(120);
      noStroke();
      vertex(-25,0);
      vertex(25,0);
      vertex(25,-25);
      vertex(30,-35);
      vertex(20,-45);
      vertex(0,-35);
      vertex(-20,-45);
      vertex(-30,-35);
      vertex(-25,-25);
      translate(windowWidth/2,windowHeight/2-315);
      endShape();
      pop();
    }
  noStroke();
  }else if(menu==4){
    fill(100);
    rect(windowWidth/2-300,windowHeight/2-400,600,450);
    fill(110);
    rect(windowWidth/2-125,windowHeight/2-390,250,320);
    for(var a=0;a<planets[currentPlanet].parts.length;a++){
      if(planets[currentPlanet].parts[a].t==1){
        fill(120);
        rect(windowWidth/2-110,windowHeight/2-380+60*a,220,50);
        fill(115);
        rect(windowWidth/2-105,windowHeight/2-375+60*a,40,40);
        fill(135);
        rect(windowWidth/2+50,windowHeight/2-370+60*a,50,30);
        stroke(0,255,0);
        strokeWeight(5);
        noFill();
        ellipse(windowWidth/2-85,windowHeight/2-355+60*a,35,35);
        strokeWeight(1);
        noStroke();  
        fill(255);
        textSize(18);
        text("Shield - 20",windowWidth/2-60,windowHeight/2-348+60*a);
        textSize(16);
        text("Buy",windowWidth/2+60,windowHeight/2-348+60*a);
        textSize(23);
      }  
      if(planets[currentPlanet].parts[a].t==2){
        fill(120);
        rect(windowWidth/2-110,windowHeight/2-380+60*a,220,50);
        fill(115);
        rect(windowWidth/2-105,windowHeight/2-375+60*a,40,40);
        fill(135);
        rect(windowWidth/2+50,windowHeight/2-370+60*a,50,30);
        push();
        beginShape();
        fill(140);
        noStroke();
        vertex(-14,0);
        vertex(14,0);
        vertex(14,-14);
        vertex(19,-24);
        vertex(9,-34);
        vertex(0,-24);
        vertex(-9,-34);
        vertex(-19,-24);
        vertex(-14,-14);
        translate(windowWidth/2-85,windowHeight/2-337+60*a);
        endShape();
        pop();
        noStroke();  
        fill(255);
        textSize(11);
        text("Powerful Engine - 30",windowWidth/2-60,windowHeight/2-348+60*a);
        textSize(16);
        text("Buy",windowWidth/2+60,windowHeight/2-348+60*a);
        textSize(23);
      }  
      if(planets[currentPlanet].parts[a].t==3){
        fill(120);
        rect(windowWidth/2-110,windowHeight/2-380+60*a,220,50);
        fill(115);
        rect(windowWidth/2-105,windowHeight/2-375+60*a,40,40);
        fill(135);
        rect(windowWidth/2+50,windowHeight/2-370+60*a,50,30);

        noStroke();
        fill(100,100,255);
        rect(windowWidth/2-97,windowHeight/2-372+60*a,12,30);
        fill(190,190,255);
        rect(windowWidth/2-94,windowHeight/2-367+60*a,7,25);
        fill(100,100,255);
        rect(windowWidth/2-84,windowHeight/2-372+60*a,12,30);
        fill(190,190,255);
        rect(windowWidth/2-81,windowHeight/2-367+60*a,7,25);
        fill(130);
        rect(windowWidth/2-98,windowHeight/2-372+60*a,28,8);
        fill(130);
        rect(windowWidth/2-98,windowHeight/2-347+60*a,28,8);
        noStroke();  
        fill(255);
        textSize(11);
        text("Double Laser - 20",windowWidth/2-60,windowHeight/2-348+60*a);
        textSize(16);
        text("Buy",windowWidth/2+60,windowHeight/2-348+60*a);
        textSize(23);
      } 
    }
    fill(125);
    rect(windowWidth/2-80,windowHeight/2-30,160,50);
    fill(255);
    text("Back",windowWidth/2-30,windowHeight/2);
    text("Credits:"+credits,windowWidth/2-50,windowHeight/2-45);
  }else if(menu==5){
    fill(100);
    rect(windowWidth/2-300,windowHeight/2-400,600,450);
    fill(80);
    rect(windowWidth/2-265,windowHeight/2-390,530,330);
    fill(139,0,139);
    ellipse(windowWidth/2,windowHeight/2-130,300,130);
    fill(128,0,128);
    ellipse(windowWidth/2,windowHeight/2-190,230,100);
    fill(planets[currentPlanet].mayorColorR,planets[currentPlanet].mayorColorG,planets[currentPlanet].mayorColorB);
    ellipse(windowWidth/2,windowHeight/2-240,170,250);

    if(planets[currentPlanet].mayorEyes==1){
      fill(255);
      ellipse(windowWidth/2,windowHeight/2-270,20,10); 
      fill(0);
      ellipse(windowWidth/2,windowHeight/2-270,10,5); 
    }else{
      fill(255);
      ellipse(windowWidth/2-20,windowHeight/2-270,20,10);
      ellipse(windowWidth/2+20,windowHeight/2-270,20,10);
      fill(0);
      ellipse(windowWidth/2-20,windowHeight/2-270,10,5);
      ellipse(windowWidth/2+20,windowHeight/2-270,10,5);
    }

    if(planets[currentPlanet].mayorHair==1){
      ellipse(windowWidth/2,windowHeight/2-350,120,90); 
    }else if(planets[currentPlanet].mayorHair==2){
      ellipse(windowWidth/2,windowHeight/2-330,120,70); 
      ellipse(windowWidth/2-67,windowHeight/2-280,40,100); 
      ellipse(windowWidth/2+67,windowHeight/2-280,40,100); 
    }else if(planets[currentPlanet].mayorHair==3){
      ellipse(windowWidth/2,windowHeight/2-330,120,70); 
      fill(planets[currentPlanet].mayorColorR,planets[currentPlanet].mayorColorG,planets[currentPlanet].mayorColorB);
      ellipse(windowWidth/2,windowHeight/2-345,80,30); 
    }

    if(planets[currentPlanet].mayorCrown==1){
      fill(255,255,0);
      rect(windowWidth/2-60,windowHeight/2-355,120,35);
      rect(windowWidth/2-60,windowHeight/2-375,20,20);
      rect(windowWidth/2-10,windowHeight/2-375,20,20);
      rect(windowWidth/2+40,windowHeight/2-375,20,20);
    }

    if(planets[currentPlanet].mayorFacialHair==1){
      fill(0);
      ellipse(windowWidth/2,windowHeight/2-230,35,7); 
    }else if(planets[currentPlanet].mayorFacialHair==2){
      fill(0);
      ellipse(windowWidth/2,windowHeight/2-230,35,7); 
      ellipse(windowWidth/2-15,windowHeight/2-220,7,22); 
      ellipse(windowWidth/2+15,windowHeight/2-220,7,22); 
      ellipse(windowWidth/2,windowHeight/2-205,35,20); 
    }else if(planets[currentPlanet].mayorFacialHair==3){
      fill(0);
      ellipse(windowWidth/2,windowHeight/2-230,35,7); 
      ellipse(windowWidth/2-15,windowHeight/2-220,7,22); 
      ellipse(windowWidth/2-20,windowHeight/2-210,15,15); 
      ellipse(windowWidth/2-30,windowHeight/2-220,25,25);
      ellipse(windowWidth/2-50,windowHeight/2-230,30,30);
      ellipse(windowWidth/2+15,windowHeight/2-220,7,22); 
      ellipse(windowWidth/2+20,windowHeight/2-210,15,15); 
      ellipse(windowWidth/2+30,windowHeight/2-220,25,25);
      ellipse(windowWidth/2+50,windowHeight/2-230,30,30);
      ellipse(windowWidth/2,windowHeight/2-205,35,20); 
    }


    if(planets[currentPlanet].mayorNose==1){
      fill(planets[currentPlanet].mayorColorR-20,planets[currentPlanet].mayorColorG-20,planets[currentPlanet].mayorColorB-20);
      ellipse(windowWidth/2,windowHeight/2-240,20,10); 
      ellipse(windowWidth/2,windowHeight/2-250,10,20); 
    }

    fill(255,0,0);
    ellipse(windowWidth/2,windowHeight/2-220,20,10); 
    stroke(0);
    line(windowWidth/2-10,windowHeight/2-220,windowWidth/2+10,windowHeight/2-220);
    noFill();
    arc(windowWidth/2,windowHeight/2-180, 50, 50, 0, PI);

    noStroke();
    fill(120);
    rect(windowWidth/2-150,windowHeight/2-55,300,30);
    rect(windowWidth/2-150,windowHeight/2-20,300,30);
    rect(windowWidth/2-150,windowHeight/2+15,300,30);
    noStroke();
    fill(255);
    strokeWeight(1);
    for(var a=0;a<planets[currentPlanet].quests.length;a++){
      if(planets[currentPlanet].quests[a].t==1){
        text("Bounty",windowWidth/2-55,windowHeight/2-32 +a*35);
      }else if(planets[currentPlanet].quests[a].t==2){
        text("Delivery",windowWidth/2-55,windowHeight/2-32 +a*35);
      }
    }


    stroke(0);
    fill(0);
    text(planets[currentPlanet].welcomePhrase,windowWidth/2-130,windowHeight/2-80);
    noStroke();
  }else if(menu==6){
    fill(100);
    rect(windowWidth/2-300,windowHeight/2-400,600,450);
    fill(80);
    rect(windowWidth/2-265,windowHeight/2-390,530,330);
    fill(139,0,139);
    ellipse(windowWidth/2,windowHeight/2-130,300,130);
    fill(128,0,128);
    ellipse(windowWidth/2,windowHeight/2-190,230,100);
    fill(planets[currentPlanet].mayorColorR,planets[currentPlanet].mayorColorG,planets[currentPlanet].mayorColorB);
    ellipse(windowWidth/2,windowHeight/2-240,170,250);

    if(planets[currentPlanet].mayorEyes==1){
      fill(255);
      ellipse(windowWidth/2,windowHeight/2-270,20,10); 
      fill(0);
      ellipse(windowWidth/2,windowHeight/2-270,10,5); 
    }else{
      fill(255);
      ellipse(windowWidth/2-20,windowHeight/2-270,20,10);
      ellipse(windowWidth/2+20,windowHeight/2-270,20,10);
      fill(0);
      ellipse(windowWidth/2-20,windowHeight/2-270,10,5);
      ellipse(windowWidth/2+20,windowHeight/2-270,10,5);
    }

    if(planets[currentPlanet].mayorHair==1){
      ellipse(windowWidth/2,windowHeight/2-350,120,90); 
    }else if(planets[currentPlanet].mayorHair==2){
      ellipse(windowWidth/2,windowHeight/2-330,120,70); 
      ellipse(windowWidth/2-67,windowHeight/2-280,40,100); 
      ellipse(windowWidth/2+67,windowHeight/2-280,40,100); 
    }else if(planets[currentPlanet].mayorHair==3){
      ellipse(windowWidth/2,windowHeight/2-330,120,70); 
      fill(planets[currentPlanet].mayorColorR,planets[currentPlanet].mayorColorG,planets[currentPlanet].mayorColorB);
      ellipse(windowWidth/2,windowHeight/2-345,80,30); 
    }

    if(planets[currentPlanet].mayorCrown==1){
      fill(255,255,0);
      rect(windowWidth/2-60,windowHeight/2-355,120,35);
      rect(windowWidth/2-60,windowHeight/2-375,20,20);
      rect(windowWidth/2-10,windowHeight/2-375,20,20);
      rect(windowWidth/2+40,windowHeight/2-375,20,20);
    }

    if(planets[currentPlanet].mayorFacialHair==1){
      fill(0);
      ellipse(windowWidth/2,windowHeight/2-230,35,7); 
    }else if(planets[currentPlanet].mayorFacialHair==2){
      fill(0);
      ellipse(windowWidth/2,windowHeight/2-230,35,7); 
      ellipse(windowWidth/2-15,windowHeight/2-220,7,22); 
      ellipse(windowWidth/2+15,windowHeight/2-220,7,22); 
      ellipse(windowWidth/2,windowHeight/2-205,35,20); 
    }else if(planets[currentPlanet].mayorFacialHair==3){
      fill(0);
      ellipse(windowWidth/2,windowHeight/2-230,35,7); 
      ellipse(windowWidth/2-15,windowHeight/2-220,7,22); 
      ellipse(windowWidth/2-20,windowHeight/2-210,15,15); 
      ellipse(windowWidth/2-30,windowHeight/2-220,25,25);
      ellipse(windowWidth/2-50,windowHeight/2-230,30,30);
      ellipse(windowWidth/2+15,windowHeight/2-220,7,22); 
      ellipse(windowWidth/2+20,windowHeight/2-210,15,15); 
      ellipse(windowWidth/2+30,windowHeight/2-220,25,25);
      ellipse(windowWidth/2+50,windowHeight/2-230,30,30);
      ellipse(windowWidth/2,windowHeight/2-205,35,20); 
    }


    if(planets[currentPlanet].mayorNose==1){
      fill(planets[currentPlanet].mayorColorR-20,planets[currentPlanet].mayorColorG-20,planets[currentPlanet].mayorColorB-20);
      ellipse(windowWidth/2,windowHeight/2-240,20,10); 
      ellipse(windowWidth/2,windowHeight/2-250,10,20); 
    }

    fill(255,0,0);
    ellipse(windowWidth/2,windowHeight/2-220,20,10); 
    stroke(0);
    line(windowWidth/2-10,windowHeight/2-220,windowWidth/2+10,windowHeight/2-220);
    noFill();
    arc(windowWidth/2,windowHeight/2-180, 50, 50, 0, PI);

    noStroke();
    fill(120);
    rect(windowWidth/2-150,windowHeight/2-55,300,30);
    rect(windowWidth/2-150,windowHeight/2-20,300,30);
    rect(windowWidth/2-150,windowHeight/2+15,300,30);
    noStroke();
    fill(255);
    strokeWeight(1);
    text("Accept",windowWidth/2-50,windowHeight/2-32);
    text("Decline",windowWidth/2-55,windowHeight/2+3);


    stroke(0);
    fill(0);
    if(planets[currentPlanet].quests[questNumber].t==1){
      text("I need you to kill this space pirate.",windowWidth/2-160,windowHeight/2-80);
    }else if(planets[currentPlanet].quests[questNumber].t==2){
      text("I need you to deliver this message to " + planets[planets[currentPlanet].quests[questNumber].focus].planetName + ".",windowWidth/2-250,windowHeight/2-80);
    }
    noStroke();
  }
  

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
    if(menu==1){
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
        }else if(mouseIsContainedIn(windowWidth/2-125,windowHeight/2-290,windowWidth/2+125,windowHeight/2-250)){//Talk to Mayor Button
            menu = 2;
            document.getElementById("button").play();  
        }



      }
      if(mouseIsContainedIn(windowWidth/2-255,windowHeight/2-210,windowWidth/2-55,windowHeight/2-170)){//Buy iron
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

      if(mouseIsContainedIn(windowWidth/2-255,windowHeight/2-165,windowWidth/2-55,windowHeight/2-125)){//Sell iron
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
     
      if(mouseIsContainedIn(windowWidth/2+60,windowHeight/2-210,windowWidth/2+260,windowHeight/2-170)){//Buy uranium
        if(credits>=planets[currentPlanet].uraniumValue + planets[currentPlanet].profitMargin){
          if(planets[currentPlanet].uranium>=10){
            if(document.getElementById("button").paused==true){
              document.getElementById("button").play();  
            }else if(document.getElementById("button2").paused==true){
              document.getElementById("button2").play(); 
            }else{
              document.getElementById("button3").play(); 
            }
            credits -= (planets[currentPlanet].uraniumValue+planets[currentPlanet].profitMargin);
            uranium+=10;
            planets[currentPlanet].uranium-=10;  
          }
          
        }
      }

      if(mouseIsContainedIn(windowWidth/2+60,windowHeight/2-165,windowWidth/2+260,windowHeight/2-125)){//Sell uranium
        if(uranium>=10){
          if(document.getElementById("button").paused==true){
            document.getElementById("button").play();  
          }else if(document.getElementById("button2").paused==true){
            document.getElementById("button2").play(); 
          }else{
            document.getElementById("button3").play(); 
          }
          credits+=planets[currentPlanet].uraniumValue;
          uranium-=10;
          planets[currentPlanet].uranium+=10;  
        }
      }

      if(mouseIsContainedIn(windowWidth/2-255,windowHeight/2-70,windowWidth/2-55,windowHeight/2-30)){//Buy gold
        if(credits>=planets[currentPlanet].goldValue + planets[currentPlanet].profitMargin){
          if(planets[currentPlanet].gold>=10){
            if(document.getElementById("button").paused==true){
              document.getElementById("button").play();  
            }else if(document.getElementById("button2").paused==true){
              document.getElementById("button2").play(); 
            }else{
              document.getElementById("button3").play(); 
            }
            credits -= (planets[currentPlanet].goldValue+planets[currentPlanet].profitMargin);
            gold+=10;
            planets[currentPlanet].gold-=10;  
          }
          
        }
      }

      if(mouseIsContainedIn(windowWidth/2-255,windowHeight/2-25,windowWidth/2-55,windowHeight/2+15)){//Sell gold
        if(gold>=10){
          if(document.getElementById("button").paused==true){
            document.getElementById("button").play();  
          }else if(document.getElementById("button2").paused==true){
            document.getElementById("button2").play(); 
          }else{
            document.getElementById("button3").play(); 
          }
          credits+=planets[currentPlanet].goldValue;
          gold-=10;
          planets[currentPlanet].gold+=10;  
        }
      }

  
    }else if(menu==2){
      if(mouseIsContainedIn(windowWidth/2-150,windowHeight/2+15,windowWidth/2+150,windowHeight/2+45)){//Goodbye Button
        menu=1;
        if(document.getElementById("button").paused==true){
            document.getElementById("button").play();  
          }else if(document.getElementById("button2").paused==true){
            document.getElementById("button2").play(); 
          }else{
            document.getElementById("button3").play(); 
          }
      }
      if(mouseIsContainedIn(windowWidth/2-150,windowHeight/2-55,windowWidth/2+150,windowHeight/2-25)){//Dock Button
        ship.pos = createVector(windowWidth/2,windowHeight/2-190);
        ship.vel = createVector(0,0);
        menu=3;
        if(document.getElementById("button").paused==true){
            document.getElementById("button").play();  
          }else if(document.getElementById("button2").paused==true){
            document.getElementById("button2").play(); 
          }else{
            document.getElementById("button3").play(); 
          }
      }else if(mouseIsContainedIn(windowWidth/2-150,windowHeight/2-20,windowWidth/2+150,windowHeight/2+10)){//Quests Button
            menu = 5;
            document.getElementById("button").play();  
        }
    }else if(menu==3){
      if(mouseIsContainedIn(windowWidth/2-80,windowHeight/2-30,windowWidth/2+80,windowHeight/2+20)){//Back Button
        menu=2;
        if(document.getElementById("button").paused==true){
            document.getElementById("button").play();  
          }else if(document.getElementById("button2").paused==true){
            document.getElementById("button2").play(); 
          }else{
            document.getElementById("button3").play(); 
          }
      }
      if(mouseIsContainedIn(windowWidth/2-80,windowHeight/2-90,windowWidth/2+80,windowHeight/2-30)){//Buy Parts Button
        menu=4;
        ship.pos = createVector(windowWidth/2-200,windowHeight/2-190);
        if(document.getElementById("button").paused==true){
            document.getElementById("button").play();  
          }else if(document.getElementById("button2").paused==true){
            document.getElementById("button2").play(); 
          }else{
            document.getElementById("button3").play(); 
          }
      }
    }else if(menu==4){
      if(mouseIsContainedIn(windowWidth/2-80,windowHeight/2-30,windowWidth/2+80,windowHeight/2+20)){//Back Button
        menu=3;
        ship.pos = createVector(windowWidth/2,windowHeight/2-190);
        ship.vel = createVector(0,0);
        if(document.getElementById("button").paused==true){
            document.getElementById("button").play();  
          }else if(document.getElementById("button2").paused==true){
            document.getElementById("button2").play(); 
          }else{
            document.getElementById("button3").play(); 
          }
      }
      for(var a=0;a<planets[currentPlanet].parts.length;a++){
        if(mouseIsContainedIn(windowWidth/2+50,windowHeight/2-370+60*a,windowWidth/2+100,windowHeight/2-340+60*a)){//Buy Button
          if(planets[currentPlanet].parts[a].t==1){
            if(credits>=20){
              credits-=20;
              planets[currentPlanet].parts.splice(a,1);
              ship.shieldMax=255;
              ship.shield=255;
            }
          }else if(planets[currentPlanet].parts[a].t==2){
            if(credits>=30){
              credits-=30;
              planets[currentPlanet].parts.splice(a,1);
              ship.engine=2;
            }
          }else if(planets[currentPlanet].parts[a].t==3){
            if(credits>=20){
              credits-=20;
              planets[currentPlanet].parts.splice(a,1);
              ship.laser=2;
            }
          }
          if(document.getElementById("button").paused==true){
            document.getElementById("button").play();  
          }else if(document.getElementById("button2").paused==true){
            document.getElementById("button2").play(); 
          }else{
            document.getElementById("button3").play(); 
          }
        }  
      } 
    }else if(menu==5){
      for(var a=0;a<planets[currentPlanet].quests.length;a++){
        if(mouseIsContainedIn(windowWidth/2-150,windowHeight/2-55+a*35,windowWidth/2-150+300,windowHeight/2-25+a*35)){//Quest Button
          menu=6;
          questNumber=a;
        }
      }
    }else if(menu==6){
      if(mouseIsContainedIn(windowWidth/2-150,windowHeight/2-55,windowWidth/2+150,windowHeight/2-25)){//Accept Button
        currentQuest = new Quest(planets[currentPlanet].quests[questNumber].t,currentPlanet);
        currentQuest.focus = planets[currentPlanet].quests[questNumber].focus;
        planets[currentPlanet].quests.splice(questNumber,1);
        menu=2;
      }else if(mouseIsContainedIn(windowWidth/2-150,windowHeight/2-20,windowWidth/2+150,windowHeight/2+10)){//Decline Button
        menu=5;
      }
    }
  }
}

function Quest(t,p){
  this.t = t;
  this.p = p;
  this.focus;
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
    if(type=="iron"){
      fill(67,75,77);
    }else if(type=="uranium"){
      fill(0,255,0);
    }else if(type=="gold"){
      fill(255,215,0);
    }
    ellipse(this.pos.x,this.pos.y,15,15);
  }
} 

function displayMessage(m,t){
  displayStart = Date.now();
  messageDisplayed = true;
  message = m;
  messageTime = t;
}

