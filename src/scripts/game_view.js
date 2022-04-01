import Game from "./game"

class GameView{
    constructor(ctx){
        this.game = new Game();
        this.ctx = ctx;
    }

    start(){
        setInterval(this.game.step.bind(this.game), 16);
        setInterval(() => {
            this.game.draw.bind(this.game)(this.ctx);
        }, 16);
    }
}

export default GameView;