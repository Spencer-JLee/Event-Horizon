import Game from "./game"

class GameView{
    constructor(ctx){
        this.game = new Game();
        this.ctx = ctx;
        this.player = this.game.player;
        this.bindKeyHandlers();
    }

    start(){
        
        setInterval(this.game.step.bind(this.game), 16);
        setInterval(() => {
            this.game.draw.bind(this.game)(this.ctx);
        }, 16);
    }

    bindKeyHandlers(){
        document.addEventListener("keydown", this.keydown.bind(this), false);
    }

    keydown(e){
        if(e.key === "W"){
            this.player.pos[1] -= 7
        }
        else if(e.key === "A"){
            this.player.pos[0] -= 7
        }
        else if(e.key === "S"){
            this.player.pos[1] += 7
        }
        else if(e.key === "D"){
            this.player.pos[0] += 7;
        }
        console.log("hello");
    }
}

export default GameView;