import GameView from "./scripts/game_view"
const background = new Image();
background.src = "../../images/background.png"

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-canvas")
    const ctx = canvas.getContext('2d');
    let startGame = true;
    
    canvas.width = 1024;
    canvas.height = 768;
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    ctx.font = "48px ArcadeClassic"
    ctx.fillStyle = "white";
    ctx.fillText("Press any key to start game", canvas.width / 2 - 275, canvas.height / 2);

    const gameView = new GameView(ctx);
    document.addEventListener("keydown", (e) => {
        if(startGame){
            startGame = false;
            gameView.start();
        }
    }, false)
    
});
