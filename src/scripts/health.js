import MovingObject from "./moving_object";

const RADIUS = 5;
const COLOR = "white";

class Health extends MovingObject{
    constructor(pos, game){
        super(pos, [0, 0], RADIUS, COLOR, game);
    }
}

export default Health;