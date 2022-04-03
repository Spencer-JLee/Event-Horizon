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
        this.player = new Player(this);
        this.addEnemies();  
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
                    if((objs[i] instanceof Projectile && objs[j] instanceof Enemy)
                    || (objs[i] instanceof Enemy && objs[j] instanceof Projectile)){
                        this.remove(objs[i])
                        this.remove(objs[j])
                    }
                    else if([objs[i], objs[i]].some(ele => !(ele instanceof Projectile))){
                        objs[i].vel[0] *= -1;
                        objs[j].vel[0] *= -1;
                        objs[i].vel[1] *= -1;
                        objs[j].vel[1] *= -1;
                    }
                }

            }
        }
    }

    remove(obj){
        if(obj instanceof Enemy){
            this.enemies.splice(this.enemies.indexOf(obj), 1)
        }
        else if(obj instanceof Projectile){
            this.projectiles.splice(this.projectiles.indexOf(obj), 1)
        }
    }

    outOfBounds(){
        let objs = this.allObjects();

        for(let i = 0; i < objs.length; i++){
            if(objs[i] instanceof Projectile){
                if(this.checkTop(objs[i]) || this.checkDown(objs[i])
                || this.checkLeft(objs[i]) || this.checkRight(objs[i])){
                    this.remove(objs[i]);
                }
            }
            else if(objs[i] instanceof Enemy){
                if(this.checkTop(objs[i]) || this.checkDown(objs[i])){
                    objs[i].vel[1] *= -1;
                }
                else if(this.checkLeft(objs[i]) || this.checkRight(objs[i])){
                    objs[i].vel[0] *= -1;
                }
            }
            else if(objs[i] instanceof Player){
                if(this.checkTop(objs[i]) || this.checkDown(objs[i])){
                    objs[i].vel[1] *= -1;
                }
                else if(this.checkLeft(objs[i]) || this.checkRight(objs[i])){
                    objs[i].vel[0] *= -1;
                }
            }
        }
    }

    checkTop(obj){
        if(obj.pos[1] + obj.vel[1] < obj.radius + 2){
            return true;
        }
    }

    checkLeft(obj){
        if(obj.pos[0] + obj.vel[0] < obj.radius + 1){
            return true;
        }
    }

    checkDown(obj){
        if(obj.pos[1] + obj.vel[1] > DIM_Y - obj.radius + 1){
            return true;
        }
    }

    checkRight(obj){
        if(obj.pos[0] + obj.vel[0] > DIM_X - obj.radius + 1){
            return true;
        }
    }

    findPlayer(){
        this.enemies.forEach(enemy =>{
            enemy.findPlayer(this.player);
        })
    }

    step(){
        this.findPlayer();
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