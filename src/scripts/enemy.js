import MovingObject from "./moving_object";

const RADIUS = 10;
const COLOR = 'orange';

class Enemy extends MovingObject{
    constructor(pos, game){
        super(pos, [1, 1], RADIUS, COLOR, game);
        this.health = 10;
    }

    findPlayer(player){
        let playerPos = player.pos;
        let x = playerPos[0] - this.pos[0];
        let y = playerPos[1] - this.pos[1];

        this.vel[0] = 1 * (x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
        this.vel[1] = 1 * (y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
    }
}

export default Enemy;