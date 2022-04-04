import MovingObject from "./moving_object";

const RADIUS = 5;
const COLOR = "purple";

class Ammunition extends MovingObject{
    constructor(pos, game){
        super(pos, [0, 0], RADIUS, COLOR, game);
    }
}

export default Ammunition;