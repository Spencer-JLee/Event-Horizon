import MovingObject from "./moving_object";

const RADIUS = 10;
const COLOR = "green";


class Player extends MovingObject{
    constructor(){
        super([512, 384], [0, 0], RADIUS, COLOR);
    }
}

export default Player;