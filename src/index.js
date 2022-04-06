import GameView from "./scripts/game_view"

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-canvas")
    const ctx = canvas.getContext('2d');
    
    canvas.width = 1024;
    canvas.height = 768;
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // debugger;

    const gameView = new GameView(ctx);
    gameView.start();
})
