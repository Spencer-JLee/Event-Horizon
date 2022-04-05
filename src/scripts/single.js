import Projectile from "./projectile";

const RADIUS = 3;
const COLOR = "#32CD32"

class Single extends Projectile{
    constructor(pos, vel, game){
        super(pos, vel, RADIUS, COLOR, game);
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
        ctx.strokeStyle = 'green';
        ctx.fillStyle = this.color;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
    }
}



export default Single;