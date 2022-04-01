import MovingObject from "./moving_object";

const RADIUS = 10;
const COLOR = 'red';

class Enemy extends MovingObject{
    constructor(pos){
        super(pos, [0, 0], RADIUS, COLOR);
    }
}

export default Enemy;