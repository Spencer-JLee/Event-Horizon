import Game from "./game"

class GameView{
    constructor(ctx){
        this.game = new Game();
        this.ctx = ctx;
    }

    start(){
        let moveInterval = setInterval(this.game.move.bind(this.game), 16);
        let drawInterval = setInterval(() => {
            this.game.draw.bind(this.game)(this.ctx);
        }, 16);
    }
}

export default GameView;