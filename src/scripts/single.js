import Projectile from "./projectile";

const RADIUS = 3;
const COLOR = "blue"

class Single extends Projectile{
    constructor(pos, vel, game){
        super(pos, vel, RADIUS, COLOR, game);
    }
}

export default Single;