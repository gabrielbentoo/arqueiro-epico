class PlayerArcher {
    constructor(x,y,w,h) {
        let options = {
            isStatic: true
        }
        this.body = Matter.Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        this.collapse = false;
        this.image = loadImage("./assets/player-Archer.png");
        World.add(world, this.body);
        Matter.Body.setAngle(this.body, -PI /2);

    }
    display() {
        let pos = this.body.position;
        let angle = this.body.position;
        if(keyIsDown(DOWN_ARROW) && angle < -1.2) {
            angle += 0.01;
            Matter.Body.setAngle(this.body, angle);

        }
        if(keyIsDown(UP_ARROW) && angle > -1.6) {
            angle -= 0.01;
            Matter.body.setAngle(this.body, angle);

        }
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.w, this.h);
        pop();
    }
}