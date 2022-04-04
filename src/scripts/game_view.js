import Game from "./game"

class GameView{
    constructor(ctx){
        this.game = new Game();
        this.ctx = ctx;
        this.player = this.game.player;
    }
    
    start(){
        this.bindKeyHandlers();
        requestAnimationFrame(this.render.bind(this));
    }

    bindKeyHandlers(){
        document.addEventListener("keydown", this.keydown.bind(this), false);
        document.addEventListener("click", this.fire.bind(this), false)
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
            case 'q':
                this.player.backWeapon();
                break;
            case 'e':
                this.player.forwardWeapon();
                break;
        }
    }

    fire(e){
        this.player.shoot([e.clientX, e.clientY]);
    }

    render(){
        this.game.step();
        this.game.draw(this.ctx);
        requestAnimationFrame(this.render.bind(this));
    }
}

export default GameView;