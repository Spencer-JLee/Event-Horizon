import MovingObject from "./moving_object";

const consumable = new Image();
consumable.src = "../images/consumables.png"
const RADIUS = 5;
const COLOR = "white";

class Health extends MovingObject{
    constructor(pos, game){
        super(pos, [0, 0], RADIUS, COLOR, game);
        consumable.addEventListener("load", this.draw, false);
    }

    draw(ctx){
        ctx.drawImage(consumable, 5, 5, 45, 30, this.pos[0] - 5, this.pos[1] - 5,
            20, 20)
    }
}

export default Health;