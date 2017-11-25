function Star(x,y,r){
	this.pos = createVector(x,y);
	this.vel = createVector(0,0);
	this.starColor = round(random(0,10));
	

	this.update = function(){
		starVelX = ship.vel.x*r*-0.1;
		starVelY = ship.vel.y*r*-0.1;
		this.vel = createVector(starVelX,starVelY);
		this.pos.add(this.vel);
		if(this.pos.y>windowHeight){
			this.pos.y = 0;
			this.pos.x = random(0,windowWidth);
		}else if(this.pos.y<0){
			this.pos.y = windowHeight;
			this.pos.x = random(0,windowWidth);
		}else if(this.pos.x>windowWidth){
			this.pos.x = 0;
			this.pos.y = random(0,windowHeight);
		}else if(this.pos.x<0){
			this.pos.x = windowWidth;
			this.pos.y = random(0,windowHeight);
		}
	}
	

	this.render = function(){
		if(this.starColor<8){
			fill(255);
		}else if(this.starColor==10){
			fill(100,100,255);
		}
		noStroke();
		ellipse(this.pos.x,this.pos.y,r/5,r/5);
	}
}

function Planet(x,y,r,planetNumber){
	this.pos = createVector(x,y);
	this.vel = createVector();
	this.Xdistance = abs(ship.pos.x-this.pos.x);
	this.Ydistance = abs(ship.pos.y-this.pos.y);
	this.colorR = random(0,200);
	this.colorG = random(0,200);
	this.colorB = random(0,200);
	this.mayorColorR = random(0,200);
	this.mayorColorG = random(0,200);
	this.mayorColorB = random(0,200);
	this.mayorEyes = round(random(1,2));
	this.mayorHair = round(random(0,4));
	this.mayorNose = round(random(0,1));
	this.mayorCrown = round(random(0,1));
	this.mayorFacialHair = round(random(0,3));
	this.r = r;
	this.civilized = false;
	this.cargoShips = [];
	this.fuelCost;
	this.ironSpawn = false;
	this.uraniumSpawn = false;
	this.goldSpawn = false;
	this.resources = [];
	this.iron = round(random(0,500));
	this.uranium = round(random(0,500));
	this.gold = round(random(0,500));
	this.credits = round(random(10,1000));
	this.profitMargin = round(random(1,4));
	this.ironValue;
	this.uraniumValue;
	this.goldValue;
	this.parts = [];
	this.trees = round(random(-1,2));
	this.lake = round(random(0,2));
	this.quests = [];
	var lastBlink = start;
	var blink = 1;

	if(this.mayorHair==1){
		this.mayorCrown=0;
	}
	
	rand = round(random(1,5));
	for(var a=0;a<rand;a++){
		this.parts.push(new Part());
	}

	this.planetName = "planet";
	rand = round(random(1,40));
	if(rand==1){
		this.planetName = "gamma capuli 9";
	}else if(rand==2){
		this.planetName = "avalon";
	}else if(rand==3){
		this.planetName = "xandreus";
	}else if(rand==4){
		this.planetName = "gilgamesh";
	}else if(rand==5){
		this.planetName = "hyrokin";
	}else if(rand==6){
		this.planetName = "oberon";
	}else if(rand==7){
		this.planetName = "zephyrus";
	}else if(rand==8){
		this.planetName = "new gaia";
	}else if(rand==9){
		this.planetName = "9413 revati prime";
	}else if(rand==10){
		this.planetName = "triton";
	}else if(rand==11){
		this.planetName = "proverus";
	}else if(rand==12){
		this.planetName = "scelepra";
	}else if(rand==13){
		this.planetName = "cleron zj4";
	}else if(rand==14){
		this.planetName = "gryke";
	}else if(rand==15){
		this.planetName = "brao g8";
	}else if(rand==16){
		this.planetName = "zaporoth";
	}else if(rand==17){
		this.planetName = "coshetan";
	}else if(rand==18){
		this.planetName = "scion";
	}else if(rand==19){
		this.planetName = "gleshan gm22";
	}else if(rand==20){
		this.planetName = "kiotera";
	}else if(rand==21){
		this.planetName = "plorth";
	}else if(rand==22){
		this.planetName = "aotis";
	}else if(rand==23){
		this.planetName = "luchion";
	}else if(rand==24){
		this.planetName = "glurn 13";
	}else if(rand==25){
		this.planetName = "b-60";
	}else if(rand==26){
		this.planetName = "gleshan gm23";
	}else if(rand==27){
		this.planetName = "luchion prime";
	}else if(rand==28){
		this.planetName = "new coshetan";
	}else if(rand==29){
		this.planetName = "glurn 12";
	}else if(rand==30){
		this.planetName = "titan";
	}else if(rand==31){
		this.planetName = "scion alpha";
	}else if(rand==32){
		this.planetName = "creon 87";
	}else if(rand==33){
		this.planetName = "dechiogawa";
	}else if(rand==34){
		this.planetName = "phaeton";
	}else if(rand==35){
		this.planetName = "borga";
	}else if(rand==36){
		this.planetName = "other earth";
	}else if(rand==37){
		this.planetName = "zanzadar 7";
	}else if(rand==38){
		this.planetName = "skerth obi";
	}else if(rand==39){
		this.planetName = "xenu";
	}else if(rand==40){
		this.planetName = "xenu prime";
	}


	this.welcomePhrase = "";

	rand = round(random(1,3));
	if(rand==1){
		this.welcomePhrase = "Hey, how's it goin'?";
	}else if(rand==2){
		this.welcomePhrase = "Hello";
	}else if(rand==3){
		this.welcomePhrase = "Welcome to " + this.planetName;
	}

	var rand = round(random(1,3));
	for(var a=0;a<rand;a++){
		if(planetNumber>5){
			var rand2 = round(random(1,3));	
		}else{
			var rand2 = 0;	
		}
		
		this.quests.push(new Quest(rand2,planetNumber));
		if(rand2==1){
			this.quests[a].focus = round(random(0,enemies.length-1));
			var focus = this.quests[a].focus;
			var distance = abs(this.pos.x-enemies[focus].pos.x)+abs(this.pos.x-enemies[focus].pos.y);
			for(var b=0;b<100;b++){
				if(distance>40000){
					this.quests[a].focus = round(random(0,enemies.length-1));
					var focus = this.quests[a].focus;	
					var distance = round(abs(this.pos.x-enemies[focus].pos.x)+abs(this.pos.x-enemies[focus].pos.y));
				}	
			}
		}else if(rand2==2){
			this.quests[a].focus = round(random(0,planets.length-1));
			var focus = this.quests[a].focus;
			var distance = abs(this.pos.x-planets[focus].pos.x)+abs(this.pos.x-planets[focus].pos.y);
			for(var b=0;b<100;b++){
				if(distance>30000){
					this.quests[a].focus = round(random(0,planets.length-1));
					var focus = this.quests[a].focus;	
					var distance = abs(this.pos.x-planets[focus].pos.x)+abs(this.pos.x-planets[focus].pos.y);
				}	
			}
		}else if(rand2==3){
			this.quests[a].focus = round(random(0,planets.length-1));
			var focus = this.quests[a].focus;
			var distance = abs(this.pos.x-planets[focus].pos.x)+abs(this.pos.x-planets[focus].pos.y);
			for(var b=0;b<100;b++){
				if(distance>30000){
					this.quests[a].focus = round(random(0,planets.length-1));
					var focus = this.quests[a].focus;	
					var distance = abs(this.pos.x-planets[focus].pos.x)+abs(this.pos.x-planets[focus].pos.y);
				}	
			}
			
		}
	}

	var yorn = round(random(1,100));
	if (yorn<61){
		this.civilized = true;
	}else{
		this.civilized = false;
	}

	if(this.civilized == false){
		rand = round(random(1,2));
		if(rand == 1){
			this.ironSpawn = true;
		}
		rand = round(random(1,2));
		if(rand == 1){
			this.uraniumSpawn = true;
		}
		rand = round(random(1,2));
		if(rand == 1){
			this.goldSpawn = true;
		}


		if(this.ironSpawn == true){
			ironNumber = round(random(3,5));
			for(var i=0;i<ironNumber;i++){
				this.resources.push(new Resource(random(0,windowWidth),random(windowHeight-90,windowHeight-10),"iron"));
			}
		}
		if(this.uraniumSpawn == true){
			var uraniumNumber = round(random(2,4));
			for(var i=0;i<uraniumNumber;i++){
				this.resources.push(new Resource(random(0,windowWidth),random(windowHeight-90,windowHeight-10),"uranium"));
			}
		}
		if(this.goldSpawn == true){
			var goldNumber = round(random(1,3));
			for(var i=0;i<goldNumber;i++){
				this.resources.push(new Resource(random(0,windowWidth),random(windowHeight-90,windowHeight-10),"gold"));
			}
		}

	}

	this.update = function(){
		
		this.pos.add(this.vel);

		if(this.civilized == true){
			if(this.cargoShips.length < 1){
				for(var i=0;i<planets.length;i++){
					if(planets[i].civilized == true){
						var d = abs(planets[i].pos.x - this.pos.x) + abs(planets[i].pos.y - this.pos.y);
						if(planets[i].planetName != this.planetName){
							var travelDistance = d;
						}
						if(travelDistance < 5000){
							this.fuelCost = 1;
							this.cargoShips.push(new cargoShip(this.pos.x,this.pos.y,planets[i],planetNumber,false));
						}else{
							this.fuelCost = 2;
						}
					}
				}
			}
		}

		if(ship.pos.x > this.pos.x){
			this.Xdistance = abs(ship.pos.x-this.pos.x);
			this.Xdistance = this.Xdistance*-1;
		}else{
			this.Xdistance = abs(ship.pos.x-this.pos.x);
		}
		if(ship.pos.y > this.pos.y){
			this.Ydistance = abs(ship.pos.y-this.pos.y);
			this.Ydistance = this.Ydistance*-1;
		}else if(ship.pos.y == this.pos.y){
			this.Ydistance = 0;
		}else{
			this.Ydistance = abs(ship.pos.y-this.pos.y);
		}
	}
	this.render = function(){

		for(var i=0;i<this.cargoShips.length;i++){
			this.cargoShips[i].render();
			this.cargoShips[i].update();
		}

		var totalDistance = abs(this.Xdistance) + abs(this.Ydistance);

		if((currentQuest.t==2||currentQuest.t==3)&&currentQuest.focus==planetNumber){
			if(Date.now()-lastBlink>1000){
	        		lastBlink = Date.now();
	        		if(blink==1){
	        			blink = 2;
	        		}else{
	        			blink = 1;
	        		}
	        	}

			if(totalDistance>1400){
				var cx = constrain(windowWidth/2+this.Xdistance,0,windowWidth); 
	        	var cy = constrain(windowHeight/2+this.Ydistance,0,windowHeight);
	        	fill(this.colorR,this.colorG,this.colorB);
	        	strokeWeight(5);

	        	if(blink==1){
	        		stroke(0,255,0);
	        	}else{
	        		stroke(255);
	        	}
				ellipse(cx,cy,r/4,r/4);	
				strokeWeight(1);

			}else{
				strokeWeight(5);
				if(blink==1){
	        		stroke(0,255,0);
	        	}else{
	        		stroke(255);
	        	}
				fill(this.colorR,this.colorG,this.colorB);
				ellipse(windowWidth/2+this.Xdistance,windowHeight/2+this.Ydistance,r/2,r/2);
				strokeWeight(1);
				writeText(this.planetName,windowWidth/2+this.Xdistance-75 -this.planetName.length*5,windowHeight/2+this.Ydistance+r/3);	
			}
			

			
		}else{
			 
			if(totalDistance < 10000&&totalDistance > 1400){
				var cx = constrain(windowWidth/2+this.Xdistance,0,windowWidth); 
	        	var cy = constrain(windowHeight/2+this.Ydistance,0,windowHeight);
	        	fill(this.colorR,this.colorG,this.colorB);
				stroke(this.colorR-50,this.colorG-50,this.colorB-50);
				ellipse(cx,cy,r/4,r/4);
			}else{
				if(this.civilized==true){
					stroke(0,255,0);
				}else{
					stroke(this.colorR-50,this.colorG-50,this.colorB-50);
				}
				fill(this.colorR,this.colorG,this.colorB);
				ellipse(windowWidth/2+this.Xdistance,windowHeight/2+this.Ydistance,r/2,r/2);
				writeText(this.planetName,windowWidth/2+this.Xdistance-75 -this.planetName.length*5,windowHeight/2+this.Ydistance+r/3);
			}	
		}

		
		

	}

}

function Part(){
	this.t = round(random(1,3));

}

function Resource(x,y,type){
	this.pos = createVector(x,y);
	this.vel = createVector();
	this.resourceType = type;

	this.render = function(){
		fill(planets[currentPlanet].colorR-40,planets[currentPlanet].colorG-40,planets[currentPlanet].colorB-40);
		ellipse(x,y,100,100);
		ellipse(x-20,y,80,80);
		ellipse(x+30,y+10,90,90);
		if(type=="iron"){
			fill(67,75,77);
		}else if(type=="uranium"){
			fill(0,255,0);
		}else if(type=="gold"){
			fill(255,215,0);
		}

		ellipse(x-10,y,9,9);
		ellipse(x+10,y+10,11,11);
		ellipse(x-20,y-10,12,12);
		ellipse(x,y-30,11,11);
		ellipse(x-10,y+30,14,14);
		ellipse(x+40,y-10,12,12);
	}
}
