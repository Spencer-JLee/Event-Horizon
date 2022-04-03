import GameView from "./scripts/game_view"

document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementById("game-canvas")
    const ctx = canvasEl.getContext('2d');
    
    canvasEl.width = 1024;
    canvasEl.height = 768;
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    const gameView = new GameView(ctx);
    gameView.start();
})