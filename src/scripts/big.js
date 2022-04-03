import Projectile from "./projectile";

const RADIUS = 8;
const COLOR = "pink";

class Big extends Projectile{
    constructor(pos, vel, game){
        super(pos, vel, RADIUS, COLOR, game);
    }
}

export default Big;