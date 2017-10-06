function Enemy(x,y){
	this.pos = createVector(x,y);
	this.vel = createVector();
	this.heading;
	this.Xdistance;
	this.Ydistance;
	this.stage = 3;

	this.update = function(){
		this.vel.mult(0.95);
		this.pos.add(this.vel);
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

		var fullDistance = abs(this.Ydistance) + abs(this.Xdistance);

		if(fullDistance<2000 && fullDistance>900){
			this.heading = Math.atan2(ship.pos.y - this.pos.y, ship.pos.x - this.pos.x);
			var force = p5.Vector.fromAngle(this.heading);
			force.mult(5);
    		this.vel.add(force);
		}

		if(fullDistance<900){
			this.heading = Math.atan2(ship.pos.y - this.pos.y, ship.pos.x - this.pos.x);
			rand = round(random(1,25));
			if(rand == 1){
				enemyMissles.push(new enemyMissle(this.pos.x,this.pos.y,this.heading));
			}
		}
	}

	this.render = function(){
		if(this.stage==1){
			fill(255,0,0);
		}else if(this.stage==2){
			fill(255,165,0);
		}else{
			fill(255,255,0);
		}
		push();
		noStroke();
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
		translate(windowWidth/2+this.Xdistance,windowHeight/2+this.Ydistance);
		rotate(this.heading+1.56);
		endShape();
		pop();
	}
}

function enemyMissle(x,y,h){
	this.pos = createVector(x,y);
	this.vel = createVector();
	this.heading = h;
	this.heading = this.heading + random(-0.1,0.1);
	this.boosting = true;
	this.Xdistance = abs(ship.pos.x-this.pos.x);
	this.Ydistance = abs(ship.pos.y-this.pos.y);
	var adjustment = p5.Vector.fromAngle(this.heading);
	this.pos.add(adjustment.mult(50));

	var force = p5.Vector.fromAngle(this.heading);
	force.mult(15);
    this.vel.add(force);

	this.update = function(){

		this.pos.add(this.vel);

		var fullDistance = abs(this.Ydistance) + abs(this.Xdistance);

		if(fullDistance <ship.r){
			if(health>0){
				health-=5;
				this.pos = createVector(9999999,9999999);
			}else{
			Explode(windowWidth/2,windowHeight/2);
			dead = true;
			ship.r=0;
			ship.vel = createVector(0,0);
			}
		}

		for(var i=0;i<friendlies.length;i++){
			if(abs(friendlies[i].pos.x - this.pos.x) + abs(friendlies[i].pos.y - this.pos.y) < 50){
				Explode(friendlies[i].pos.x,friendlies[i].pos.y);
				friendlies.splice(i,1);
				score-=10;
				gameScore-=10;
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
		fill(255,0,0);
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