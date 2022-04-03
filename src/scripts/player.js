import MovingObject from "./moving_object";
import Projectile from "./projectile";
import Single from "./single";
import Spread from "./spread";
import Ray from "./ray"
import Big from "./big"

const RADIUS = 10;
const COLOR = "green";
const WEAPONS = ["single", "spread", "ray", "big"]
const SPEEDS = [15, 15, 100, 3];


class Player extends MovingObject{
    constructor(game){
        super([512, 384], [0, 0], RADIUS, COLOR, game);
        this.weaponIdx = 0;
    }

    travel(velocity){
        this.vel[0] += velocity[0];
        this.vel[1] += velocity[1];
    }

    shoot(eventPos){
        let projVel = this.getVel(eventPos, this.pos)
        let proj;
        
        if(this.weaponIdx === 1){
            proj = new Spread(this.pos, projVel, this.game);
            let vel1 = this.calcVel1(projVel);
            let vel2 = this.calcVel2(projVel);
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

    calcVel1(projVel){
        let unitSpeedX = projVel[0] / SPEEDS[this.weaponIdx];
        let theta = Math.asin(unitSpeedX);
        let newVelX = SPEEDS[this.weaponIdx] * Math.sin(theta + (Math.PI / 12));
        let newVelY = SPEEDS[this.weaponIdx] * Math.cos(theta + (Math.PI / 12));
        
        return [newVelX, newVelY];
    }

    calcVel2(projVel){
        let unitSpeedX = projVel[0] / SPEEDS[this.weaponIdx];
        let theta = Math.asin(unitSpeedX);
        let newVelX = SPEEDS[this.weaponIdx] * Math.sin(theta - (Math.PI / 12));
        let newVelY = SPEEDS[this.weaponIdx] * Math.cos(theta - (Math.PI / 12));

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