import MovingObject from "./moving_object";
import Projectile from "./projectile";
import Single from "./single";
import Spread from "./spread";
import Ray from "./ray"
import Big from "./big"

const playerRight = new Image();
playerRight.src = "../images/playerRight.png"
const playerLeft = new Image();
playerLeft.src = "../images/playerLeft.png"
const RADIUS = 10;
const COLOR = "blue";
const WEAPONS = ["Peashooter", "Tri-Shot", "Blaster", "Splitter"];
const SPEEDS = [10, 10, 20, 3];
const AMMO = [200, 100, 50, 25];
const MAXSPEED = 6;


class Player extends MovingObject{
    constructor(game){
        super([512, 384], [0, 0], RADIUS, COLOR, game);
        this.weaponIdx = 0;
        this.health = 100;
        this.weapons = WEAPONS;
        this.ammo = [200, 100, 50, 25];
        this.maxAmmo = AMMO;
        this.playerLeft = playerLeft;
        this.playerRight = playerRight;
        this.isMoving = false;
        this.currentFrameIdx = 3;
        this.frameCount = 0;
    }

    travel(velocity){
        if(this.vel[0] + velocity[0] <= MAXSPEED && 
            this.vel[0] + velocity[0] >= MAXSPEED * -1){
            this.vel[0] += velocity[0];
        }
        if(this.vel[1] + velocity[1] <= MAXSPEED &&
            this.vel[1] + velocity[1] >= MAXSPEED * -1){
            this.vel[1] += velocity[1];
        }
    }

    shoot(eventPos){
        if(this.ammo[this.weaponIdx] > 0){
            let projVel = this.getVel(eventPos, this.pos);
            let proj;
            
            if(this.weaponIdx === 1){
                proj = new Spread(this.pos, projVel, this.game);
                let vel1 = this.calcVel(projVel, "left");
                let vel2 = this.calcVel(projVel, "right");
                let proj1 = new Spread(this.pos, vel1, this.game);
                let proj2 = new Spread(this.pos, vel2, this.game);
                this.game.addObject(proj1);
                this.game.addObject(proj2);
            }
            else if(this.weaponIdx === 2){
                proj = new Ray(this.pos, projVel, this.game);
            }
            else if(this.weaponIdx === 3){
                proj = new Big(this.pos, projVel, this.game);
            }
            else{
                proj = new Single(this.pos, projVel, this.game);
            }
            this.game.addObject(proj);
            this.ammo[this.weaponIdx] -= 1;
        }
    }

    getVel(clickPos, playerPos){
        let x = clickPos[0] - playerPos[0];
        let y = clickPos[1] - playerPos[1];

        let xVel = SPEEDS[this.weaponIdx] * (x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
        let yVel = SPEEDS[this.weaponIdx] * (y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));

        return [xVel, yVel];
    }
    
    calcVel(projVel, direction){
        let unitSpeedX = projVel[0] / SPEEDS[this.weaponIdx];
        let unitSpeedY = projVel[1] / SPEEDS[this.weaponIdx];
        let thetaX = Math.asin(unitSpeedX);
        let thetaY = Math.acos(unitSpeedY);
        let newVelX, newVelY;
        if(direction === "right"){
            newVelX = SPEEDS[this.weaponIdx] * Math.sin(thetaX + (Math.PI / 12));
            newVelY = SPEEDS[this.weaponIdx] * Math.cos(thetaY + (Math.PI / 12));
        }
        else if(direction === "left"){
            newVelX = SPEEDS[this.weaponIdx] * Math.sin(thetaX - (Math.PI / 12));
            newVelY = SPEEDS[this.weaponIdx] * Math.cos(thetaY - (Math.PI / 12));
        }
        
        
        return [newVelX, newVelY];
    }

    forwardWeapon(){
        this.weaponIdx = (this.weaponIdx + 1) % WEAPONS.length;
    }

    backWeapon(){
        if(this.weaponIdx - 1 < 0){
            this.weaponIdx = (WEAPONS.length - 1) % WEAPONS.length;
        }
        else{
            this.weaponIdx = (this.weaponIdx - 1) % WEAPONS.length;
        }
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
            ctx.drawImage(this.playerRight, 13, 0 + 26 * this.currentFrameIdx, 26, 26, this.pos[0] - 13, 
                this.pos[1] - 13, 26, 26);
            
        }
        else if(this.vel[0] < 0){
            ctx.drawImage(this.playerLeft, 80, 0 + 26 * this.currentFrameIdx, 26, 26, this.pos[0] - 13, 
                this.pos[1] - 13, 26, 26);
        }
    }
}

export default Player;