function Ship(){
	this.pos = createVector(0 ,0);
	this.vel = createVector(0,0);
	this.boosting = false;
	this.boostForce = 0;
	this.shield = 0;
	this.shieldMax = 0;
	this.r = 60
	this.heading = 0;
	this.braking = false;
	this.laser = 1;
    this.engine = 1;
    this.cargoSize = 1;
    this.justLeft = false;


	this.update = function(){

		if(this.shield<this.shieldMax){
			this.shield+=0.25;
		}

		if(this.boosting == true){
			if(fuel > 0){
				document.getElementById("rocket").play();
				var force = p5.Vector.fromAngle(this.heading);
				if(boostDirection==1){
					force.rotate(HALF_PI);
				}else if(boostDirection==3){
					force.rotate(PI);
					force.rotate(HALF_PI);
				}
     			force.mult(boostSpeed);
     			this.vel.add(force);
     			if(this.engine==1||this.engine==2){
     				fuel-=0.03;
     			}else{
     				fuel-=0.015;
     			}
     		}
		}
		if(this.braking == true){
			this.vel.mult(0.93);
		}
		if(this.turning == true){
			this.heading += this.turnDirection;
		}
		var pieceDistance;
		for(var i=0;i<pieces.length;i++){
			pieceDistance = abs(this.pos.x - pieces[i].pos.x)+abs(this.pos.y - pieces[i].pos.y);
            if (pieceDistance < ship.r) {
                if (this.cargoSize == 1) {
                    var weight = iron + uranium + gold;
                    if (weight < 30) {
                        if(pieces[i].resourceType == "iron"){
					        iron++;
				        }else if(pieces[i].resourceType == "uranium"){
					        uranium++;
				        }else if(pieces[i].resourceType == "gold"){
					        gold++;
                        }
                        pieces.splice(i, 1);
                    }
                }else if (this.cargoSize == 2) {
                    var weight = iron + uranium + gold;
                    if (weight < 60) {
                        if (pieces[i].resourceType == "iron") {
                            iron++;
                        } else if (pieces[i].resourceType == "uranium") {
                            uranium++;
                        } else if (pieces[i].resourceType == "gold") {
                            gold++;
                        }
                        pieces.splice(i, 1);
                    }
                }
			}
		}


		this.pos.add(this.vel);
		this.vel.mult(airFriction);

		if(onPlanet==true){
			this.pos.x = constrain(this.pos.x,0,1400);
			this.pos.y = constrain(this.pos.y,0,930);

		}
	}



	this.render = function(){
		push();
		fill(255-ship.shield,255,255-ship.shield);
		stroke(255-ship.shield,255,255-ship.shield);
		beginShape();
		vertex(48.0,30);
		vertex(48.0,-12.0);
		vertex(40.0,-12.0);
		vertex(40.0,11.0);
		vertex(20,11.0);
		vertex(20,-20.0);
		vertex(8.0,-20.0);
		vertex(8.0,-44.0);
		vertex(-8.0,-44.0);
		vertex(-8.0,-20.0);
		vertex(-20,-20.0);
		vertex(-20,11.0);
		vertex(-40.0,11.0);
		vertex(-40.0,-12.0);
		vertex(-48.0,-12.0);
		vertex(-48.0,30)
		translate(windowWidth/2,windowHeight/2);
		rotate(this.heading+1.56);
		endShape();
		pop();
		if(this.boosting==true){	

			if(fuel>0){
			push();
			fill(255,140,0);
			stroke(255,0,0);
			beginShape();

			vertex(-18.0,31);
			vertex(-12.0,51);
			vertex(-6.0,41);
			vertex(-0,61);
			vertex(6,41);
			vertex(12,51);
			vertex(18,31);

			translate(windowWidth/2,windowHeight/2);
			rotate(this.heading+1.56);
			endShape(CLOSE);
			pop();
			}
		}
		
	}

	this.planetRender = function(){
		push();
		fill(255-ship.shield,255,255-ship.shield);
		stroke(255-ship.shield,255,255-ship.shield);
		beginShape();
		vertex(48.0,30);
		vertex(48.0,-12.0);
		vertex(40.0,-12.0);
		vertex(40.0,11.0);
		vertex(20,11.0);
		vertex(20,-20.0);
		vertex(8.0,-20.0);
		vertex(8.0,-44.0);
		vertex(-8.0,-44.0);
		vertex(-8.0,-20.0);
		vertex(-20,-20.0);
		vertex(-20,11.0);
		vertex(-40.0,11.0);
		vertex(-40.0,-12.0);
		vertex(-48.0,-12.0);
		vertex(-48.0,30)
		var cx = constrain(this.pos.x,0,1400)
		var cy = constrain(this.pos.y,0,930)
		translate(cx,cy);
		rotate(this.heading+1.56);
		endShape();
		pop();
		if(this.boosting==true){
			if(fuel>0){
			push();
			fill(255,140,0);
			stroke(255,0,0);
			beginShape();

			vertex(-18.0,31);
			vertex(-12.0,51);
			vertex(-6.0,41);
			vertex(-0,61);
			vertex(6,41);
			vertex(12,51);
			vertex(18,31);

			translate(this.pos.x,this.pos.y);
			rotate(this.heading+1.56);
			endShape(CLOSE);
			pop();
			}
		}
	}

}

function Missle(n){
	if(ship.laser==1){
		this.pos = createVector(ship.pos.x ,ship.pos.y);
		this.vel = createVector(ship.vel.x,ship.vel.y);
		this.heading = ship.heading;
		this.boosting = true;
		this.Xdistance = abs(ship.pos.x-this.pos.x);
		this.Ydistance = abs(ship.pos.y-this.pos.y);
		var adjustment = p5.Vector.fromAngle(this.heading);
		this.pos.add(adjustment.mult(50));
	}else if(ship.laser==2){
		if(n==1){
			this.pos = createVector(ship.pos.x ,ship.pos.y);
			this.vel = createVector(ship.vel.x,ship.vel.y);
			this.heading = ship.heading;
			this.boosting = true;
			this.Xdistance = abs(ship.pos.x-this.pos.x);
			this.Ydistance = abs(ship.pos.y-this.pos.y);
			var adjustment = p5.Vector.fromAngle(this.heading-HALF_PI);
			this.pos.add(adjustment.mult(45));
			var adjustment = p5.Vector.fromAngle(this.heading);
			this.pos.add(adjustment.mult(40));	
		}else{
			this.pos = createVector(ship.pos.x ,ship.pos.y);
			this.vel = createVector(ship.vel.x,ship.vel.y);
			this.heading = ship.heading;
			this.boosting = true;
			this.Xdistance = abs(ship.pos.x-this.pos.x);
			this.Ydistance = abs(ship.pos.y-this.pos.y);
			var adjustment = p5.Vector.fromAngle(this.heading+HALF_PI);
			this.pos.add(adjustment.mult(45));
			var adjustment = p5.Vector.fromAngle(this.heading);
			this.pos.add(adjustment.mult(40));
		}
		
	}else if(ship.laser==3){
		if(n==1){
			this.pos = createVector(ship.pos.x ,ship.pos.y);
			this.vel = createVector(ship.vel.x,ship.vel.y);
			this.heading = ship.heading;
			this.boosting = true;
			this.Xdistance = abs(ship.pos.x-this.pos.x);
			this.Ydistance = abs(ship.pos.y-this.pos.y);
			var adjustment = p5.Vector.fromAngle(this.heading-HALF_PI);
			this.pos.add(adjustment.mult(10));
			var adjustment = p5.Vector.fromAngle(this.heading);
			this.pos.add(adjustment.mult(40));	
			this.heading-=0.1;
		}else if(n==2){
			this.pos = createVector(ship.pos.x ,ship.pos.y);
			this.vel = createVector(ship.vel.x,ship.vel.y);
			this.heading = ship.heading;
			this.boosting = true;
			this.Xdistance = abs(ship.pos.x-this.pos.x);
			this.Ydistance = abs(ship.pos.y-this.pos.y);
			var adjustment = p5.Vector.fromAngle(this.heading);
			this.pos.add(adjustment.mult(40));
		}else{
			this.pos = createVector(ship.pos.x ,ship.pos.y);
			this.vel = createVector(ship.vel.x,ship.vel.y);
			this.heading = ship.heading;
			this.boosting = true;
			this.Xdistance = abs(ship.pos.x-this.pos.x);
			this.Ydistance = abs(ship.pos.y-this.pos.y);
			var adjustment = p5.Vector.fromAngle(this.heading+HALF_PI);
			this.pos.add(adjustment.mult(10));
			var adjustment = p5.Vector.fromAngle(this.heading);
			this.pos.add(adjustment.mult(40));
			this.heading+=0.1;
		}
	}
	var force = p5.Vector.fromAngle(this.heading);
	force.mult(30);
    this.vel.add(force);

	this.update = function(){
		this.Xdistance = abs(ship.pos.x-this.pos.x);
		this.Ydistance = abs(ship.pos.y-this.pos.y);
		if(round(this.Xdistance) + round(this.Ydistance) > 1250){
			for(var a=0;a<missles.length;a++){
				if(missles[a] == this){
					missles.splice(a,1);
				}
			}
		}
		

        this.pos.add(this.vel);


        for (var a = 0; a < planets.length; a++) {
            for (var b = 0; b < planets[a].cargoShips.length; b++) {
                var distance = abs(this.pos.x - planets[a].cargoShips[b].pos.x) + abs(this.pos.y - planets[a].cargoShips[b].pos.y)
                if (distance < 60) {
                    if (planets[a].cargoShips[b].questShip == true) {
                        displayMessage("Cargo Ship Destroyed", 2);
                        document.getElementById("win").play();  
                        currentQuest = new Quest(0, 0);
                    }
                    var type;
                    if (planets[a].cargoShips[b].iron > 0) {
                        var type = "iron";
                    } else if (planets[a].cargoShips[b].uranium > 0) {
                        var type = "uranium";
                    } else if (planets[a].cargoShips[b].gold > 0) {
                        var type = "gold";
                    }
                    console.log(type);
                    for (var c = 0; c < 10; c++) {
                        pieces.push(new Piece(planets[a].cargoShips[b].pos.x, planets[a].cargoShips[b].pos.y,type));
                    }
                    Explode(planets[a].cargoShips[b].pos.x, planets[a].cargoShips[b].pos.y);
                    planets[a].cargoShips.splice(b, 1);
                    planets[a].relation -= 10;
                }
            } for (var b = 0; b < planets[a].guards.length; b++) {
                var distance = abs(this.pos.x - planets[a].guards[b].pos.x) + abs(this.pos.y - planets[a].guards[b].pos.y)
                if (distance < 60) {
                    if (planets[a].guards[b].stage == 1) {
                        Explode(planets[a].guards[b].pos.x, planets[a].guards[b].pos.y);
                        planets[a].guards.splice(b, 1);
                        planets[a].relation -= 10;
                        planets[a].guardKillTime = Date.now();
                    } else {
                        this.pos.x = -90000;
                        planets[a].guards[b].stage -= 1;
                        if (document.getElementById("shield2").paused == true) {
                            document.getElementById("shield2").play();
                        } else if (document.getElementById("shield2A").paused == true) {
                            document.getElementById("shield2A").play();
                        } else {
                            document.getElementById("shield2B").play();
                        }
                    }
                    
                }
            }
        }

		for(var i=0;i<enemies.length;i++){
			if(abs(enemies[i].pos.x - this.pos.x) + abs(enemies[i].pos.y - this.pos.y) < 60){
				if(enemies[i].stage==1){
					if(enemies[i].enemyNumber==currentQuest.focus&&currentQuest.t==1){
                        displayMessage("Target Eliminated", 2);
                        document.getElementById("win").play();  
                        planets[currentQuest.p].relation += 5;
						currentQuest = new Quest(0,0);
						credits+=25;
					}else{
						credits+=5;	
					}
					Explode(enemies[i].pos.x,enemies[i].pos.y);
					enemies.splice(i,1);
					score++;
					gameScore++;
					kills++;	

				}else{
					score++;
					this.pos.y=-100;
					enemies[i].stage--;
					if(document.getElementById("shield2").paused==true){
		    			document.getElementById("shield2").play();	
		    		}else if(document.getElementById("shield2A").paused==true){
		    			document.getElementById("shield2A").play();	
		    		}else{
		    			document.getElementById("shield2B").play();	
		    		}
				}

			}
		}
		for(var i=0;i<planets[currentPlanet].resources.length;i++){
			if(abs(planets[currentPlanet].resources[i].pos.x - this.pos.x) + abs(planets[currentPlanet].resources[i].pos.y - this.pos.y) < 70){
				Explode(planets[currentPlanet].resources[i].pos.x,planets[currentPlanet].resources[i].pos.y);
				var pieceNumber = round(random(4,12));
				for(var n=0;n<pieceNumber;n++){
					
					pieces.push(new Piece(planets[currentPlanet].resources[i].pos.x+random(-10,10),planets[currentPlanet].resources[i].pos.y+random(-10,10),planets[currentPlanet].resources[i].resourceType));
				}
				planets[currentPlanet].resources.splice(i,1);

			}
		}
	}

	this.render = function(){
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
		fill(255);
		noStroke();
		push();
		if(onPlanet == false){
			translate(windowWidth/2+this.Xdistance,windowHeight/2+this.Ydistance);
		}else{
			translate(this.pos.x,this.pos.y);
		}
		rotate(this.heading+1.56);
		rect(-5,0,10,30);
		pop();
	}

}

function cargoShip(x,y,target,homeworld,questShip,shipNumber){
	this.pos = createVector(x,y);
	this.vel = createVector();
	this.Xdistance = abs(ship.pos.x-this.pos.x);
	this.Ydistance = abs(ship.pos.y-this.pos.y);
	this.heading = Math.atan2(target.pos.y - this.pos.y, target.pos.x - this.pos.x);
    this.iron = 0;
    this.uranium = 0;
    this.gold = 0;
    this.originalTarget = target;
    this.questShip = questShip;

    var rand = round(random(1, 3));
    if (rand == 1) {
        this.iron = 60;
        if (planets[homeworld].iron > 59) {
            planets[homeworld].iron -= 60;
        }    
    } else if (rand == 2) {
        this.uranium = 60;
        if (planets[homeworld].uranium > 59) {
            planets[homeworld].uranium -= 60;
        }    

    } if (rand == 3) {
        this.gold = 60;
        if (planets[homeworld].gold > 59) {
            planets[homeworld].gold -= 60;
        }    
    }


	this.update = function(){
		this.pos.add(this.vel);
		this.vel.mult(0.95);

		var targetDistance = abs(target.pos.x - this.pos.x)+abs(target.pos.y - this.pos.y);

        if (targetDistance < target.r / 3) {
            if (questShip == true) {
                planets[currentQuest.p].cargoShips.splice(shipNumber, 1);
                displayMessage("Ship Escorted", 2);
                document.getElementById("win").play();  
                credits += 30;
                currentQuest = new Quest(0,0);
            } else {
                if (target == planets[homeworld]) {
                    planets[homeworld].iron += this.iron;
                    planets[homeworld].uranium += this.uranium;
                    planets[homeworld].gold += this.gold;
                    this.iron = 0;
                    this.uranium = 0;
                    this.gold = 0;

                    var rand = round(random(1, 3));
                    if (rand == 1) {
                        if (planets[homeworld].iron >= 60) {
                            planets[homeworld].iron -= 60;
                            this.iron = 60;
                        }
                    }else if (rand == 2) {
                        if (planets[homeworld].uranium >= 60) {
                            planets[homeworld].uranium -= 60;
                            this.uranium = 60;
                        }
                    }else if (rand == 3) {
                        if (planets[homeworld].gold >= 60) {
                            planets[homeworld].gold -= 60;
                            this.gold = 60;
                        }
                    }

                    target = this.originalTarget;
                    this.heading = Math.atan2(target.pos.y - this.pos.y, target.pos.x - this.pos.x);


			    }else{
                    target.iron += this.iron;
                    target.uranium += this.uranium;
                    target.gold += this.gold;
                    this.iron = 0;
                    this.uranium = 0;
                    this.gold = 0;

               

                    var rand = round(random(1, 3));
                    if (rand == 1) {
                        if (target.iron >= 60) {
                            target.iron -= 60;
                            this.iron = 60;
                        }
                    }else if (rand == 2) {
                        if (target.uranium >= 60) {
                            target.uranium -= 60;
                            this.uranium = 60;
                        }
                    }else if (rand == 3) {
                        if (target.gold >= 60) {
                            target.gold -= 60;
                            this.gold = 60;
                        }
                    }
                    target = planets[homeworld];
                    this.heading = Math.atan2(target.pos.y - this.pos.y, target.pos.x - this.pos.x);

			    }
            }
			
		}else{
		var force = p5.Vector.fromAngle(this.heading);
		
		force.mult(0.4);	
		
     	this.vel.add(force);	
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
		if(questShip==true){
			push();
			beginShape();
			fill(0,255,0);
			noStroke();
			vertex(-7.5,-22.5);
			vertex(7.5,-22.5);
			vertex(7.5,-7.5);
			vertex(22.5,-7.5);
			vertex(22.5,-22.5);
			vertex(37.5,-22.5);
			vertex(37.5,22.5);
			vertex(22.5,22.5);
			vertex(22.5,7.5);
			vertex(7.5,7.5);
			vertex(7.5,37.7);
			vertex(22.5,37.5);
			vertex(22.5,67.5);
			vertex(-22.5,67.5);
			vertex(-22.5,37.5);
			vertex(-7.5,37.5);
			vertex(-5.7,7.5);
			vertex(-22.5,7.5);
			vertex(-22.5,22.5);
			vertex(-37.5,22.5);
			vertex(-37.5,-22.5);
			vertex(-22.5,-22.5);
			vertex(-22.5,-7.5);
			vertex(-7.5,-7.5);
			var cx = constrain(windowWidth/2+this.Xdistance,0,windowWidth); 
	        var cy = constrain(windowHeight/2+this.Ydistance,0,windowHeight);
			translate(cx,cy);
			rotate(this.heading-1.56);
			endShape();
			pop();	
		}else{
			push();
			beginShape();
			fill(0,255,0);
			noStroke();
			vertex(-7.5,-22.5);
			vertex(7.5,-22.5);
			vertex(7.5,-7.5);
			vertex(22.5,-7.5);
			vertex(22.5,-22.5);
			vertex(37.5,-22.5);
			vertex(37.5,22.5);
			vertex(22.5,22.5);
			vertex(22.5,7.5);
			vertex(7.5,7.5);
			vertex(7.5,37.7);
			vertex(22.5,37.5);
			vertex(22.5,67.5);
			vertex(-22.5,67.5);
			vertex(-22.5,37.5);
			vertex(-7.5,37.5);
			vertex(-5.7,7.5);
			vertex(-22.5,7.5);
			vertex(-22.5,22.5);
			vertex(-37.5,22.5);
			vertex(-37.5,-22.5);
			vertex(-22.5,-22.5);
			vertex(-22.5,-7.5);
			vertex(-7.5,-7.5);
			translate(windowWidth/2+this.Xdistance,windowHeight/2+this.Ydistance);
			rotate(this.heading-1.56);
			endShape();
			pop();	
		}
		
	}
}