const DIM_X = 1024;
const DIM_Y = 768;

class MovingObject{
    constructor(pos, vel, radius, color, game){
        this.pos = pos;
        this.vel = vel;
        this.radius = radius;
        this.color = color;
        this.game = game;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(
            this.pos[0],
            this.pos[1],
            this.radius,
            0,
            2 * Math.PI
        );
        ctx.strokeStyle = 'black';
        ctx.fillStyle = this.color;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
    }

    move(){
        let x = this.pos[0] + this.vel[0]
        let y = this.pos[1] + this.vel[1];

        this.pos = [x, y]
    }

    isCollidedWith(otherObject){
        let x_diff = otherObject.pos[0] - this.pos[0];
        let y_diff = otherObject.pos[1] - this.pos[1];

        let dist = Math.sqrt(Math.pow(x_diff, 2) + Math.pow(y_diff, 2));
        let radiiSum = this.radius + otherObject.radius;

        return dist <= radiiSum;
    }
}

export default MovingObject;