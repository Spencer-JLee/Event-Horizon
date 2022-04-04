import Projectile from "./projectile";

const RADIUS = 2;
const COLOR = "red";

class Spread extends Projectile{
    constructor(pos, vel, game){
        super(pos, vel, RADIUS, COLOR, game);
    }
}

export default Spread;