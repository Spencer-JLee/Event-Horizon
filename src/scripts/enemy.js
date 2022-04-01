import MovingObject from "./moving_object";

const RADIUS = 10;
const COLOR = 'red';

class Enemy extends MovingObject{
    constructor(pos){
        super(pos, [1, 1], RADIUS, COLOR);
    }
}

export default Enemy;