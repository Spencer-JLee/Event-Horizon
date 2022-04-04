import MovingObject from "./moving_object";

const RADIUS = 10;
const COLOR = 'orange';

class Enemy extends MovingObject{
    constructor(pos, game){
        super(pos, [1, 1], RADIUS, COLOR, game);
        this.health = 10;
        this.speed = [1, 2, 3];
        this.speedIdx = 0;
        this.doubledHealth = false;
    }

    findPlayer(player){
        let playerPos = player.pos;
        let x = playerPos[0] - this.pos[0];
        let y = playerPos[1] - this.pos[1];

        this.vel[0] = this.speed[this.speedIdx] * (x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
        this.vel[1] = this.speed[this.speedIdx] * (y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
    }
}

export default Enemy;