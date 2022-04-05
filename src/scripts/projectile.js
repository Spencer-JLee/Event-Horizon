import MovingObject from "./moving_object";

class Projectile extends MovingObject{
    constructor(pos, vel, radius, color, game){
        super(pos, vel, radius, color, game);
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
        ctx.strokeStyle = 'purple';
        ctx.fillStyle = this.color;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
    }
}

export default Projectile;