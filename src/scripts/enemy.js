import MovingObject from "./moving_object";

const RADIUS = 10;
const COLOR = 'red';

class Enemy extends MovingObject{
    constructor(pos){
        super(pos, [1, 1], RADIUS, COLOR);
        this.health = 10;
    }

    findPlayer(player){
        let playerPos = player.pos;
        let x = playerPos[0] - this.pos[0];
        let y = playerPos[1] - this.pos[1];

        this.vel[0] = (x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
        this.vel[1] = (y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
    }
}

export default Enemy;