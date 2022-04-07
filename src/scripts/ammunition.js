import MovingObject from "./moving_object";


const consumable = new Image();
consumable.src = "../images/consumables.png"
const RADIUS = 5;
const COLOR = "purple";

class Ammunition extends MovingObject{
    constructor(pos, game){
        super(pos, [0, 0], RADIUS, COLOR, game);
    }

    draw(ctx){
        ctx.drawImage(consumable, 80, 5, 10, 10, this.pos[0] - 5, this.pos[1] - 5,
            20, 20)
    }
}

export default Ammunition;