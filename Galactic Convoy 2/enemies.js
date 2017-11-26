function Enemy(x,y,n){
	this.pos = createVector(x,y);
	this.vel = createVector();
	this.heading;
	this.Xdistance;
	this.Ydistance;
	this.stage = 3;
	this.spreadDirection = round(random(1,3));
	this.enemyNumber = n;

	var rand = round(random(1,5));
	if(rand==1){
		this.pirateName = "Bill";
	}else if(rand==2){
		this.pirateName = "Jim";
	}else if(rand==3){
		this.pirateName = "Tim";
	}else if(rand==4){
		this.pirateName = "Jack";
	}else if(rand==5){
		this.pirateName = "John";
	}

	this.update = function(){
		this.vel.mult(0.95);
		this.pos.add(this.vel);

		for(var a=0;a<enemies.length;a++){
			if(a!=n){
				var d=abs(this.pos.x-enemies[a].pos.x)+abs(this.pos.y-enemies[a].pos.y);
				if(d<300){
					if(this.spreadDirection==1){
						var adjustment = p5.Vector.fromAngle(this.heading-HALF_PI);
						this.pos.add(adjustment.mult(1));	
					}else if(this.spreadDirection==3){
						var adjustment = p5.Vector.fromAngle(this.heading+HALF_PI);
						this.pos.add(adjustment.mult(1));	
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

		var fullDistance = abs(this.Ydistance) + abs(this.Xdistance);

		if(fullDistance<2000 && fullDistance>700){
			this.heading = Math.atan2(ship.pos.y - this.pos.y, ship.pos.x - this.pos.x);
			var force = p5.Vector.fromAngle(this.heading);
			force.mult(5);
    		this.vel.add(force);
		}

		if(fullDistance<900){
			this.heading = Math.atan2(ship.pos.y - this.pos.y, ship.pos.x - this.pos.x);
			rand = round(random(1,25));
			if(rand == 1){
				enemyMissles.push(new enemyMissle(this.pos.x,this.pos.y,this.heading,this.vel));
			}
		}

	}

	this.render = function(){
		if(currentQuest.t==1&&currentQuest.focus==n){
			if(this.stage==1){
				fill(255,0,0);
			}else if(this.stage==2){
				fill(255,165,0);
			}else{
				fill(255,255,0);
			}
			push();
            stroke(0,255,0);
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
			var cx = constrain(this.Xdistance,-windowWidth/2+10,windowWidth/2-10);
			var cy = constrain(this.Ydistance,-windowHeight/2+10,windowHeight/2-10);
			translate(windowWidth/2+cx,windowHeight/2+cy);
			rotate(this.heading+1.56);
			endShape();
			pop();	
		}else{
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
}

function enemyMissle(x,y,h,v){
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
    this.vel.add(v);

	this.update = function(){

		this.pos.add(this.vel);

		var fullDistance = abs(this.Ydistance) + abs(this.Xdistance);

		if(fullDistance <ship.r){
			if(ship.shield>0){
				ship.shield -= 40;
				this.pos = createVector(9999999,9999999);
				if(document.getElementById("shield2").paused==true){
			      document.getElementById("shield2").play();
			    }else if(document.getElementById("shield2A").paused==true){
			      document.getElementById("shield2A").play();
			    }else if(document.getElementById("shield2B").paused==true){
			      document.getElementById("shield2B").play();
			    }
			}else{
				if(health>0){
					health-=10;
					this.pos = createVector(9999999,9999999);
					document.getElementById("hit").play();
				}else{
					Explode(windowWidth/2,windowHeight/2);
					dead = true;
					ship.r=0;
					ship.vel = createVector(0,0);
				}
			}
			
		}

        for (var a = 0; a < planets.length; a++) {
            for (var b = 0; b < planets[a].cargoShips.length; b++) {
                var distance = abs(this.pos.x - planets[a].cargoShips[b].pos.x) + abs(this.pos.y - planets[a].cargoShips[b].pos.y)
                if (distance < 60) {
                    if (planets[a].cargoShips[b].questShip == true) {
                        displayMessage("Cargo Ship Destroyed", 2);
                        currentQuest = new Quest(0, 0);
                    }
                    planets[a].cargoShips.splice(b, 1);
                    Explode(0, 0);
                }
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