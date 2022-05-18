import GameView from "./scripts/game_view"

const imageURL = [
    "../../images/background.png",
    "../../images/consumables.png",
    "../../images/enemyLeft.png",
    "../../images/enemyRight.png",
    "../../images/playerLeft.png",
    "../../images/playerRight.png"
]
const images = []

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-canvas")
    const ctx = canvas.getContext('2d');
    let startGame = true;
    let imageCount = 0;
    
    canvas.width = 1024;
    canvas.height = 768;
    ctx.font = "48px ArcadeClassic"
    ctx.fillStyle = "white";
    ctx.fillText("Press any key to start game", canvas.width / 2 - 275, canvas.height / 2);

    let gameView;

    imageURL.forEach(src => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
            imageCount += 1;
            if(imageCount === imageURL.length){
                gameView = new GameView(ctx, images);
            }
        }
        images.push(image);
    })

    document.addEventListener("keydown", (e) => {
        if(startGame){
            startGame = false;
            gameView.start();
        }
    }, false)
    
});
