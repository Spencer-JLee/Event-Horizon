import MovingObject from "./moving_object";

class Projectile extends MovingObject{
    constructor(pos, vel, radius, color, game){
        super(pos, vel, radius, color, game);
    }
}

export default Projectile;