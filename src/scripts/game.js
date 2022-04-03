import Enemy from "./enemy"
import Player from "./player"
import Projectile from "./projectile"
import Single from "./single"
import Spread from "./spread"
import Ray from "./ray"
import Big from "./big"

const DIM_X = 1024;
const DIM_Y = 768;
const NUM_ENEMIES = 10;
const DECELERATION = 0.95;
const DAMAGE = [3, 2, 4, 5, 1]

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
                        
                        if(objs[i] instanceof Enemy){
                            this.checkEnemy(objs[i], objs[j]);
                        }
                        else{
                            this.remove(objs[i]);
                            this.createExplosion(objs[i]);
                        }

                        if(objs[j] instanceof Enemy){
                            this.checkEnemy(objs[j], objs[i]);
                        }
                        else{
                            this.remove(objs[j]);
                            this.createExplosion(objs[j]);
                        }
                    }

                    else if((objs[i] instanceof Player && objs[j] instanceof Enemy)
                    || (objs[i] instanceof Enemy && objs[j] instanceof Player)){
                        // this.player.health -= 5;
                        // if(this.player.health <= 0){
                        //     alert("GAME OVER");
                        // }
                    }
                    // else if(objs[i] instanceof Enemy && objs[j] instanceof Enemy){

                    // }
                    else{

                    }
                }

            }
        }
    }

    checkEnemy(enemy, projectile){
        if(projectile instanceof Single){
            enemy.health -= DAMAGE[0];
        }

        else if(projectile instanceof Spread){
            enemy.health -= DAMAGE[1];
        }

        else if(projectile instanceof Ray){
            enemy.health -= DAMAGE[2];
        }

        else if(projectile instanceof Big){
            enemy.health -= DAMAGE[3];
        }
        else{
            enemy.health -= DAMAGE[4];
        }

        if(enemy.health <= 0){
            this.remove(enemy);
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
                    this.remove(objs[i])
                    this.createExplosion(objs[i])
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
                if(this.checkTop(objs[i])){
                    objs[i].pos[1] += objs[i].vel[1] + 1;
                    objs[i].vel[1] = 0;
                }
                else if(this.checkDown(objs[i])){
                    objs[i].pos[1] -= objs[i].vel[1] + 1;
                    objs[i].vel[1] = 0;
                }
                else if(this.checkLeft(objs[i])){
                    objs[i].pos[0] += objs[i].vel[0] + 1;
                    objs[i].vel[0] = 0;
                }
                else if(this.checkRight(objs[i])){
                    objs[i].pos[0] -= objs[i].vel[0] + 1;
                    objs[i].vel[0] = 0;
                }
            }
        }
    }

    createExplosion(obj){
        if(obj instanceof Big){
            for(let i = 0; i < 6; i++){
                let proj = new Projectile(obj.pos, 
                    [Math.random() * 2 - 1, Math.random() * 2 - 1],
                    2, "pink", this);
                this.projectiles.push(proj);
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
            if(obj instanceof Player){
                obj.vel[0] *= DECELERATION;
                obj.vel[1] *= DECELERATION;
            }
        })
    }
}

export default Game;