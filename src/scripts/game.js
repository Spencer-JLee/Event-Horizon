import Enemy from "./enemy"
import Player from "./player"
import Projectile from "./projectile"

const DIM_X = 1024;
const DIM_Y = 768;
const NUM_ENEMIES = 10;

class Game{

    constructor(){
        this.enemies = [];
        this.projectiles = [];
        this.addEnemies();  
        this.player = new Player(this);
    }

    addObject(obj){
        if(obj instanceof Projectile){
            this.projectiles.push(obj);
        }
    }

    addEnemies(){
        for(let i = 0; i < NUM_ENEMIES; i++){
            let enemy = new Enemy(this.randomPosition(), this);
            this.enemies.push(enemy);
        }
    }

    randomPosition(){
        let x = Math.floor(Math.random() * DIM_X);
        let y = Math.floor(Math.random() * DIM_Y);
        return [x, y];
    }

    allObjects(){
        let arr = this.enemies.concat([this.player], this.projectiles)
        return arr;
    }

    checkCollisions(){
        let objs = this.allObjects();

        for(let i = 0; i < objs.length; i++){
            for(let j = i+1; j < objs.length; j++){
                if(objs[i].isCollidedWith(objs[j])){
                    objs[i].vel[0] *= -1;
                    objs[i].vel[1] *= -1;
                    objs[j].vel[0] *= -1;
                    objs[j].vel[1] *= -1;
                }

            }
        }
    }

    outOfBounds(){
        let objs = this.allObjects();

        for(let i = 0; i < objs.length; i++){
            if(objs[i].pos[0] + objs[i].vel[0] > DIM_X - objs[i].radius + 2){
                objs[i].vel[0] *= -1;
            }
            if(objs[i].pos[0] + objs[i].vel[0] < objs[i].radius + 2){
                objs[i].vel[0] *= -1;
            }
            if(objs[i].pos[1] + objs[i].vel[1] > DIM_Y - objs[i].radius + 2){
                objs[i].vel[1] *= -1;
            }
            if(objs[i].pos[1] + objs[i].vel[1] < objs[i].radius + 2){
                objs[i].vel[1] *= -1;
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
        this.allObjects().forEach(obj => {
            obj.move();
        })
    }
}

export default Game;