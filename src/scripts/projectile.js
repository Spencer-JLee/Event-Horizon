import MovingObject from "./moving_object";

const RADIUS = 3;
const COLOR = "white"

class Projectile extends MovingObject{
    constructor(pos, vel){
        super(pos, vel, RADIUS, COLOR);
    }
}