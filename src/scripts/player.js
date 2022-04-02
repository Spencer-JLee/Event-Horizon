import MovingObject from "./moving_object";
import Projectile from "./projectile"

const RADIUS = 10;
const COLOR = "green";


class Player extends MovingObject{
    constructor(game){
        super([512, 384], [0, 0], RADIUS, COLOR, game);
    }

    travel(velocity){
        this.vel[0] += velocity[0];
        this.vel[1] += velocity[1];
    }

    shoot(eventPos){
        let projVel = this.getVel(eventPos, this.pos)
        let proj = new Projectile(this.pos, projVel, this.game);
        this.game.addObject(proj);
    }

    getVel(clickPos, playerPos){
        let x = clickPos[0] - playerPos[0];
        let y = clickPos[1] - playerPos[1];

        let xVel = 15 * (x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
        let yVel = 15 * (y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));

        return [xVel, yVel];
    }
}

export default Player;