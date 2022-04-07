import Enemy from "./enemy"
import Player from "./player"
import Projectile from "./projectile"
import Single from "./single"
import Spread from "./spread"
import Ray from "./ray"
import Big from "./big"
import Ammunition from "./ammunition"
import Health from "./health"


const background = new Image();
background.src = "../../images/background.png"
const DIM_X = 1024;
const DIM_Y = 768;
const NUM_ENEMIES = 10;
const DECELERATION = 0.95;
const DAMAGE = [3, 2, 4, 5, 1]

class Game{

    constructor(){
        this.enemies = [];
        this.projectiles = [];
        this.pickups = [];
        this.player = new Player(this);
        this.addEnemies();  
        this.score = 0;
        this.gameOver = false;
        this.fast = false;
        this.doubleHealth = false;
        this.doubleDamage = false;
        this.faster = false;
        this.lessPickup = false;
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

    //refactor so that enemies spawn out of bounds
    randomPosition(){
        let x = Math.floor(Math.random() * DIM_X);
        let y = Math.floor(Math.random() * DIM_Y);
        return [x, y];
    }

    allObjects(){
        let arr = this.enemies.concat([this.player], this.projectiles, this.pickups)
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
                        else if(objs[i] instanceof Ray){
                            
                        }
                        else{
                            this.remove(objs[i]);
                            this.createExplosion(objs[i]);
                        }

                        if(objs[j] instanceof Enemy){
                            this.checkEnemy(objs[j], objs[i]);
                        }
                        else if(objs[j] instanceof Ray){
                            
                        }
                        else{
                            this.remove(objs[j]);
                            this.createExplosion(objs[j]);
                        }
                    }
                    else if((objs[i] instanceof Player && objs[j] instanceof Ammunition)
                    || (objs[i] instanceof Ammunition && objs[j] instanceof Player)){
                        if(objs[i] instanceof Ammunition){
                            this.remove(objs[i]);
                        }
                        else if(objs[j] instanceof Ammunition){
                            this.remove(objs[j]);
                        }

                        let maxAmmo = this.player.maxAmmo[this.player.weaponIdx];

                        if(this.lessPickup){
                            this.player.ammo[this.player.weaponIdx] += Math.floor(maxAmmo * 0.1);
                        }
                        else{
                            this.player.ammo[this.player.weaponIdx] += Math.floor(maxAmmo * 0.2);
                        }
                        
                        if(this.player.ammo[this.player.weaponIdx] > maxAmmo){
                            this.player.ammo[this.player.weaponIdx] = maxAmmo;
                        }
                    }
                    else if((objs[i] instanceof Player && objs[j] instanceof Health)
                    || (objs[i] instanceof Health && objs[j] instanceof Player)){
                        if(objs[i] instanceof Health){
                            this.remove(objs[i])
                        }
                        else if(objs[j] instanceof Health){
                            this.remove(objs[j]);
                        }

                        if(this.lessPickup){
                            this.player.health += 5;
                        }
                        else{
                            this.player.health += 10;
                        }
                        

                        if(this.player.health > 100){
                            this.player.health = 100;
                        }

                    }
                    else if((objs[i] instanceof Player && objs[j] instanceof Enemy)
                    || (objs[i] instanceof Enemy && objs[j] instanceof Player)){
                        this.resetPositions(objs[i]);
                        this.resetPositions(objs[j]);

                        if(objs[i] instanceof Enemy){
                            objs[i].hitstun = true;
                            objs[i].vel[0] *= -0.5 / objs[i].speed[objs[i].speedIdx];
                            objs[i].vel[1] *= -0.5 / objs[i].speed[objs[i].speedIdx];
                        }
                        else if(objs[j] instanceof Enemy){
                            objs[j].hitstun = true;
                            objs[j].vel[0] *= -0.5 / objs[j].speed[objs[j].speedIdx];
                            objs[j].vel[1] *= -0.5 / objs[j].speed[objs[j].speedIdx];
                        }

                        if(this.doubleDamage){
                            this.player.health -= 2;
                        }
                        else if(!this.doubleDamage){
                            this.player.health -= 1;
                        }
                        
                        if(this.player.health <= 0){
                            this.gameOver = true;
                        }
                    }
                    // enemies after colliding stick together and fly off screen
                    else if(objs[i] instanceof Enemy && objs[j] instanceof Enemy){
                        let enemy1 = objs[i];
                        let enemy2 = objs[j];
                        this.resetPositions(enemy1);
                        this.resetPositions(enemy2);
                        enemy1.hitstun = true;
                        enemy2.hitstun = true;
                        enemy1.vel[0] *= -0.5 / enemy1.speed[enemy1.speedIdx];
                        enemy2.vel[0] *= 0.5 / enemy2.speed[enemy2.speedIdx];
                        enemy1.vel[1] *= -0.5 / enemy1.speed[enemy1.speedIdx];
                        enemy2.vel[1] *= 0.5 / enemy2.speed[enemy2.speedIdx];
                    }
                    else{

                    }
                }

            }
        }
    }

    resetPositions(obj){
        if(obj.vel[0] < 0){
            obj.pos[0] -= obj.vel[0] - 1;
        }
        else{
            obj.pos[0] -= obj.vel[0] + 1;
        }
        if(obj.vel[1] < 0){
            obj.pos[1] -= obj.vel[1] - 1;
        }
        else{
            obj.pos[1] -= obj.vel[1] + 1;
        }
    }

    checkEnemy(enemy, projectile){
        if(projectile instanceof Single){
            enemy.health -= DAMAGE[0];
            this.score += DAMAGE[0] * 10;
        }

        else if(projectile instanceof Spread){
            enemy.health -= DAMAGE[1];
            this.score += DAMAGE[1] * 10;
        }

        else if(projectile instanceof Ray){
            enemy.health -= DAMAGE[2];
            this.score += DAMAGE[2] * 10;
        }

        else if(projectile instanceof Big){
            enemy.health -= DAMAGE[3];
            this.score += DAMAGE[3] * 10;
        }
        else{
            enemy.health -= DAMAGE[4];
            this.score += DAMAGE[4] * 10;
        }

        if(enemy.health <= 0){
            this.remove(enemy);
            this.score += 100;
            this.createPickup(enemy.pos);
        }
    }

    remove(obj){
        if(obj instanceof Enemy){
            this.enemies.splice(this.enemies.indexOf(obj), 1)
        }
        else if(obj instanceof Projectile){
            this.projectiles.splice(this.projectiles.indexOf(obj), 1)
        }
        else if(obj instanceof Health || obj instanceof Ammunition){
            this.pickups.splice(this.pickups.indexOf(obj), 1)
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
            //refactor so that if enemies spawn out of bounds, they can enter,
            //but not leave
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
                    objs[i].pos[1] -= objs[i].vel[1] - 1;
                    objs[i].vel[1] = 0;
                }
                else if(this.checkDown(objs[i])){
                    objs[i].pos[1] -= objs[i].vel[1] + 1;
                    objs[i].vel[1] = 0;
                }
                else if(this.checkLeft(objs[i])){
                    objs[i].pos[0] -= objs[i].vel[0] - 1;
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
                    [Math.random() * 6 - 3, Math.random() * 6 - 3],
                    2, "white", this);
                this.projectiles.push(proj);
            }
        }
    }

    createPickup(pos){
        let rng = Math.random() * 100;
        if(rng < 10){
            let health = new Health(pos, this);
            this.pickups.push(health);
        }
        else if(rng >= 80){
            let ammunition = new Ammunition(pos, this);
            this.pickups.push(ammunition);
        }
    }

    checkTop(obj){
        if(obj.pos[1] + obj.vel[1] < obj.radius + 1){
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
            if(enemy.hitstun){
                setTimeout(() => enemy.hitstun = false, 100);
            }
            else{
                enemy.findPlayer(this.player, this);
            }
        })
    }

    step(){
        this.findPlayer();
        this.move();
        this.checkCollisions();
        this.outOfBounds();
        this.increaseDifficulty();
        this.changeSpeed();
        this.increaseHealth();
        this.addNewEnemy();
    }

    increaseDifficulty(){
        if(this.score > 10000 && !this.faster){
            this.faster = true;
        }
        else if(this.score < 10000 && this.score > 8000 && !this.doubleDamage){
            this.doubleDamage = true;
        } 
        else if(this.score < 8000 && this.score >= 6000 && !this.lessPickup){
            this.lessPickup = true;
        }
        else if(this.score < 6000 && this.score >= 4000 && !this.doubleHealth){
            this.doubleHealth = true;  
        }
        else if(this.score < 4000 && this.score >= 2000 && !this.fast){
            this.fast = true;
        }
    }

    changeSpeed(){
        this.enemies.forEach(enemy =>{
            if(this.fast && !this.faster){
                enemy.speedIdx = 1;
            }
            else if(this.fast && this.faster){
                enemy.speedIdx = 2;
            }
        });
    }

    increaseHealth(){
        this.enemies.forEach(enemy =>{
            if(this.doubleHealth && !enemy.doubledHealth){
                enemy.health *= 2;
                enemy.doubledHealth = true;
            }
        })
    }

    addNewEnemy(){
        while(this.enemies.length < NUM_ENEMIES){
            let newEnemy = new Enemy(this.randomPosition());
            this.enemies.push(newEnemy);
        }
    }

    draw(ctx){
        ctx.drawImage(background, 0, 0, DIM_X, DIM_Y, 0, 0, DIM_X, DIM_Y);

        this.allObjects().forEach(obj => {
            obj.draw(ctx);
        })

        ctx.font ="18px ArcadeClassic";
        ctx.fillStyle = "white";
        ctx.fillText("Score: " + this.score, 10, 20)
        ctx.fillText("Health: " + this.player.health, 10, DIM_Y - 20)
        ctx.fillText(`${this.player.weapons[this.player.weaponIdx]} Ammo: ${this.player.ammo[this.player.weaponIdx]}`, 
        DIM_X - 200, DIM_Y - 20);

        if(this.fast){
            ctx.fillText("Enemy Speed Up", DIM_X - 200, 20);
        }

        if(this.doubleHealth){
            ctx.fillText("Double Enemy Health", DIM_X - 200, 40);
        }

        if(this.lessPickup){
            ctx.fillText("Less From Pickups", DIM_X - 200, 60);
        }

        if(this.doubleDamage){
            ctx.fillText("Double Enemy Damage", DIM_X - 200, 80);
        }

        if(this.faster){
            ctx.fillText("LUDICROUS SPEED", DIM_X - 200, 100);
        }

        if(this.gameOver){
            ctx.font = "48px ArcadeClassic"
            ctx.fillText("GAME OVER", DIM_X / 2 - 100, DIM_Y / 2);
        }
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