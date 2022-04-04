import MovingObject from "./moving_object";
import Projectile from "./projectile";
import Single from "./single";
import Spread from "./spread";
import Ray from "./ray"
import Big from "./big"

const RADIUS = 10;
const COLOR = "blue";
const WEAPONS = ["single", "spread", "ray", "big"]
const SPEEDS = [10, 10, 20, 3];
const MAXSPEED = 7;


class Player extends MovingObject{
    constructor(game){
        super([512, 384], [0, 0], RADIUS, COLOR, game);
        this.weaponIdx = 0;
        this.health = 100;
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
}

export default Player;