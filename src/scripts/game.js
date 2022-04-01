import Enemy from "./enemy"
import Player from "./player"

const DIM_X = 1024;
const DIM_Y = 768;
const NUM_ENEMIES = 10;

class Game{

    constructor(){
        this.enemies = [];
        this.addEnemies();  
        this.player = new Player();
        this.upPressed = false;
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
    }

    addEnemies(){
        for(let i = 0; i < NUM_ENEMIES; i++){
            let enemy = new Enemy(this.randomPosition());
            this.enemies.push(enemy);
        }
    }

    randomPosition(){
        let x = Math.floor(Math.random() * DIM_X);
        let y = Math.floor(Math.random() * DIM_Y);
        return [x, y];
    }

    allObjects(){
        let arr = this.enemies.concat([this.player])
        return arr;
    }

    checkCollisions(){
        let objs = this.allObjects();

        for(let i = 0; i < objs.length; i++){
            for(let j = i+1; j < objs.length; j++){
                if(objs[i].isCollidedWith(objs[j])){
                    objs[i].vel[0] = objs[i].vel[0] * -1;
                    objs[i].vel[1] = objs[i].vel[1] * -1;
                    objs[j].vel[0] = objs[j].vel[0] * -1;
                    objs[j].vel[1] = objs[j].vel[1] * -1;
                }
            }
        }
    }

    outOfBounds(){
        let objs = this.allObjects();

        for(let i = 0; i < objs.length; i++){
            if(objs[i].pos[0] + objs[i].vel[0] > DIM_X - objs[i].radius){
                objs[i].vel[0] = -1 * objs[i].vel[0];
            }
            if(objs[i].pos[0] + objs[i].vel[0] < objs[i].radius){
                objs[i].vel[0] = -1 * objs[i].vel[0];
            }
            if(objs[i].pos[1] + objs[i].vel[1] > DIM_Y - objs[i].radius){
                objs[i].vel[1] = -1 * objs[i].vel[1];
            }
            if(objs[i].pos[1] + objs[i].vel[1] < objs[i].radius){
                objs[i].vel[1] = -1 * objs[i].vel[1];
            }
        }
    }

    step(){
        this.move();
        this.checkCollisions();
        this.outOfBounds();
    }

    draw(ctx){
        ctx.clearRect(0, 0, DIM_X, DIM_Y);
        ctx.fillStyle = "grey"
        ctx.fillRect(0, 0, DIM_X, DIM_Y);

        this.allObjects().forEach(obj => {
            obj.draw(ctx);
        })
    }

    move(){
        if(this.rightPressed){
            this.player.pos[0] += 8;
        }
        else if(this.leftPressed){
            this.player.pos[0] -= 8;
        }
        else if(this.upPressed){
            this.player.pos[1] += 8;
        }
        else if(this.downPressed){
            this.player.pos[1] -= 8;
        }

        this.allObjects().forEach(obj => {
            obj.move();
        })
    }

    pressedKeyHandler(e){
        if(e.key == "Right" || e.key == "ArrowRight" || e.key =="d"){
            this.rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a"){
            this.leftPressed = true;
        }
        else if(e.key == "Up" || e.key == "ArrowUp" || e.key == "w"){
            this.upPressed = true;
        }
        else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "s"){
            this.downPressed = true;
        }
    }

    notPressedKeyHandler(e){
        if(e.key == "Right" || e.key == "ArrowRight" || e.key =="d"){
            this.rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a"){
            this.leftPressed = false;
        }
        else if(e.key == "Up" || e.key == "ArrowUp" || e.key == "w"){
            this.upPressed = false;
        }
        else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "s"){
            this.downPressed = false;
        }
    }
}

export default Game;