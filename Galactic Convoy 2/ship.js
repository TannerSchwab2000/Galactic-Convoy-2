function Ship(){
	this.pos = createVector(0 ,0);
	this.vel = createVector(0,0);
	this.boosting = false;
	this.boostForce = 0;
	this.shield = false;
	this.r = 60
	this.heading = 0;
	this.warping = false;
	this.braking = false;


	this.update = function(){

		if(this.boosting == true){
			if(fuel > 0){
			document.getElementById("rocket").play();
			var force = p5.Vector.fromAngle(this.heading);
     		force.mult(boostSpeed);
     		this.vel.add(force);
     		fuel-=0.03;
     		}
		}
		if(this.braking == true){
			this.vel.mult(0.93);
		}
		if(this.warping == true){
			if(fuel > 0){
			var force = p5.Vector.fromAngle(this.heading);
     		force.mult(warpSpeed);
     		this.vel.add(force);
     		fuel-=0.1;
     		}
		}
		if(this.turning == true){
			this.heading += this.turnDirection;
		}
		var pieceDistance;
		for(var i=0;i<pieces.length;i++){
			pieceDistance = abs(this.pos.x - pieces[i].pos.x)+abs(this.pos.y - pieces[i].pos.y);
			if(pieceDistance<ship.r){

				if(pieces[i].resourceType == "coal"){
					coal++;
				}else if(pieces[i].resourceType == "iron"){
					iron++;
				}else if(pieces[i].resourceType == "titanium"){
					titanium++;
				}

			pieces.splice(i,1);
			}
		}


		this.pos.add(this.vel);
		this.vel.mult(airFriction);


	}



	this.render = function(){
		push();
		fill(255);
		stroke(255);
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
		fill(255);
		stroke(255);
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
		translate(this.pos.x,this.pos.y);
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

function Missle(){
	this.pos = createVector(ship.pos.x ,ship.pos.y);
	this.vel = createVector(ship.vel.x,ship.vel.y);
	this.heading = ship.heading;
	this.boosting = true;
	this.Xdistance = abs(ship.pos.x-this.pos.x);
	this.Ydistance = abs(ship.pos.y-this.pos.y);
	var adjustment = p5.Vector.fromAngle(this.heading);
	this.pos.add(adjustment.mult(50));

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
		for(var i=0;i<enemies.length;i++){
			if(abs(enemies[i].pos.x - this.pos.x) + abs(enemies[i].pos.y - this.pos.y) < 60){
				if(enemies[i].stage==1){
					Explode(enemies[i].pos.x,enemies[i].pos.y);
					enemies.splice(i,1);
					score++;
					credits+=5;
					gameScore++;
					kills++;	
				}else{
					score++;
					this.pos.y=-100;
					console.log(enemies[i].stage);
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

function cargoShip(x,y,target,homeworld){
	this.pos = createVector(x,y);
	this.vel = createVector();
	this.Xdistance = abs(ship.pos.x-this.pos.x);
	this.Ydistance = abs(ship.pos.y-this.pos.y);
	this.heading = Math.atan2(target.pos.y - this.pos.y, target.pos.x - this.pos.x);
	this.coal = 0;
	this.iron = 0;
	this.titanium = 0;
	this.originalTarget = target;

	this.update = function(){
		this.pos.add(this.vel);
		this.vel.mult(0.95);

		var targetDistance = abs(target.pos.x - this.pos.x)+abs(target.pos.y - this.pos.y);

		if(targetDistance<target.r/3){
			if(target == planets[homeworld]){
				target = this.originalTarget;
				this.heading = Math.atan2(target.pos.y - this.pos.y, target.pos.x - this.pos.x);
				
			}else{
				target = planets[homeworld];
				this.heading = Math.atan2(target.pos.y - this.pos.y, target.pos.x - this.pos.x);
				

			}
		}else{
		var force = p5.Vector.fromAngle(this.heading);
     	force.mult(0.2);
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