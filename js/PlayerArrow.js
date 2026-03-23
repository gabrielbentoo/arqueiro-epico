class PlayerArrow {
    constructor(x, y, w, h, archerAngle) {
        let options = {
            isStatic: true,
            density: 0.1
        }
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle(x, y, this.w, this.h, options);
        this.image = loadImage("./assets/arrow.png");
        this.archerAngle = archerAngle;
        this.velocity = p5.Vector.fromAngle(archerAngle);
        World.add(world, this.body);
    }
    remove(index) {
        this.isRemoved = true;
        Matter.World.remove(world, this.body);
        delete playerArrow[index];
    }
    shoot(archerAngle) {
        this.velocity = p5.Vector.fromAngle(archerAngle + PI /2);
        this.velocity.mult(55);
        Matter.Body.setVelocity(this.body, {
            x: this.velocity.x,
            y: this.velocity.y
        });
        Matter.Body.setStatic(this.body, false);
    }
    display() {
        let tmpAngle;
        if(this.body.velocity.y === 0) {
            tmpAngle = this.archerAngle + PI /2;
        }
        else {
            tmpAngle = Math.atan(this.body.velocity.y / this.body.velocity.x);
        }
        Matter.Body.setAngle(this.body, tmpAngle);
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.w, this.h);
        pop();
        if(this.body.velocity.x > 0 && this.body.position > 400) {
            let position = [this.body.position.x, this.body.position.y];
            this.trajectory.push(position);
        }
        for(let i = 0; i < this.trajectory.length; i++) {
            fill("white");
            ellipse(this.trajectory[i][0], this.trajectory[i][1], 5, 5);
        }
    }
}