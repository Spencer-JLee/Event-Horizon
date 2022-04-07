import MovingObject from "./moving_object";

const enemyRight = new Image();
enemyRight.src = "../images/enemyRight.png"
const enemyLeft = new Image();
enemyLeft.src = "../images/enemyLeft.png"
const RADIUS = 10;
const COLOR = 'orange';

class Enemy extends MovingObject{
    constructor(pos, game){
        super(pos, [1, 1], RADIUS, COLOR, game);
        this.health = 10;
        this.speed = [2, 3.5, 5];
        this.speedIdx = 0;
        this.doubledHealth = false;
        this.hitstun = false;
        this.enemyLeft = enemyLeft;
        this.enemyRight = enemyRight;
        this.isMoving = false;
        this.currentFrameIdx = 3;
        this.frameCount = 0;
    }

    findPlayer(player){
        let playerPos = player.pos;
        let x = playerPos[0] - this.pos[0];
        let y = playerPos[1] - this.pos[1];

        this.vel[0] = this.speed[this.speedIdx] * (x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
        this.vel[1] = this.speed[this.speedIdx] * (y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
    }

    draw(ctx){
        if(this.vel[0] !== 0 || this.vel[1] !== 0){
            this.frameCount++;
            if(this.frameCount >= 10){
                this.frameCount = 0;
                this.currentFrameIdx = (this.currentFrameIdx + 1) % 8;
            }
        }
        else{
            this.currentFrameIdx = 3;
        }

        if(this.vel[0] >= 0){
            //83
            ctx.drawImage(this.enemyRight, 43, 4 + this.currentFrameIdx * 39, 39, 39, this.pos[0] - 23, 
                this.pos[1] - 15, 39, 39);
            
        }
        else if(this.vel[0] < 0){
            //80
            ctx.drawImage(this.enemyLeft, 40, 4 + this.currentFrameIdx * 39, 39, 39, this.pos[0] - 23, 
                this.pos[1] - 15, 39, 39);
        }
    }
}

export default Enemy;