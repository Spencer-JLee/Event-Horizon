import Game from "./game"

class GameView{
    constructor(ctx){
        this.game = new Game();
        this.ctx = ctx;
        this.player = this.game.player;
    }

    start(){
        this.bindKeyHandlers();
        // debugger;
        setInterval(this.game.step.bind(this.game), 16);
        setInterval(() => {
            this.game.draw.bind(this.game)(this.ctx);
        }, 16);
    }

    bindKeyHandlers(){
        document.addEventListener("keydown", this.keydown.bind(this), false);
    }

    keydown(e){
        switch(e.key){
            case 'w':
                this.player.travel([0, -3]);
                break;
            case 'a':
                this.player.travel([-3, 0]);
                break;
            case 's':
                this.player.travel([0, 3]);
                break;
            case 'd':
                this.player.travel([3, 0]);
                break;
        }
        // console.log(`${e.key}`)
        // console.log(`${this.player.wPressed}`)
    }
}

export default GameView;