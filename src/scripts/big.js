import Projectile from "./projectile";

const RADIUS = 5;
const COLOR = "pink";

class Big extends Projectile{
    constructor(pos, vel, game){
        super(pos, vel, RADIUS, COLOR, game);
    }
}

export default Big;