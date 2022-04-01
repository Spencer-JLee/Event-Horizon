import Example from "./scripts/functionality"
import MovingObject from "./scripts/moving_object"
import Enemy from "./scripts/enemy"
import GameView from "./scripts/game_view"

document.addEventListener("DOMContentLoaded", () => {
    // const main = document.getElementById("main")
    // new Example(main)
    const canvasEl = document.getElementById("game-canvas")
    const ctx = canvasEl.getContext('2d');

    canvasEl.width = 1024;
    canvasEl.height = 768;
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    
    // movObj.draw(ctx);
    // enemy.draw(ctx);
    const gameView = new GameView(ctx);
    gameView.start();
})

const movObj = new MovingObject([512, 384], [0, 0], 20, 'pink');
const enemy = new Enemy([300, 200]);