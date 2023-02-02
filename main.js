import { Player } from './player.js';
import { InputHandler } from './input.js';
import { UI } from './ui.js';
import { Angler1, Angler2, Drone, HiveWhale, LuckyFish } from './enemies.js';
import { Background } from './background.js';
import { Particle } from './particle.js'
import { Fire, Smoke } from './explosion.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.projectiles = [];
            this.particles = [];
            this.explosions = [];
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.background = new Background(this);
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 2000;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.gameOver = false;
            this.score = 0;
            this.winingScore = 100;
            this.gameTime = 0;
            this.timeLimit = 30000;
            this.speed = 1;
            this.debug = false;
        }

        draw(ctx) {
            this.background.draw(ctx);

            this.projectiles.forEach(projectile => {
                projectile.draw(ctx)
            });

            this.explosions.forEach(explosion => {
                explosion.draw(ctx);
            })

            this.player.draw(ctx);

            this.enemies.forEach(enemy => {
                enemy.draw(ctx);
            });

            this.ui.draw(ctx);

            this.particles.forEach(particle => {
                particle.draw(ctx);
            });

            this.background.layer4.draw(ctx);
        }

        update(deltaTime) {
            if (!this.gameOver) this.gameTime += deltaTime;
            if (this.gameTime > this.timeLimit) this.gameOver = true;

            //Background
            this.background.update();
            this.background.layer4.update();

            //Projectiles
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
            this.projectiles.forEach(projectile => {
                projectile.update()
            });

            //Player
            this.player.update(this.input.keys, deltaTime);

            //Enemies
            this.enemies.forEach(enemy => {
                enemy.update();

                if (this.checkCollition(this.player, enemy)) {
                    enemy.markedForDeletion = true;
                    for (let i = 0; i < 10; i++) {
                        this.particles.push(new Particle(this, enemy.x + enemy.width * .5, enemy.y + enemy.height * .5))
                    }
                    this.addExplosion(enemy);
                    if (enemy.type === 'lucky') this.player.setState(1);
                    else this.score--;
                }

                this.projectiles.forEach(projectile => {
                    if (this.checkCollition(projectile, enemy)) {
                        projectile.markedForDeletion = true;
                        this.particles.push(new Particle(this, enemy.x + enemy.width * .5, enemy.y + enemy.height * .5))
                        enemy.lives--;
                        if (enemy.lives <= 0) {
                            enemy.markedForDeletion = true;
                            for (let i = 0; i < enemy.score; i++) {
                                this.particles.push(new Particle(this, enemy.x + enemy.width * .5, enemy.y + enemy.height * .5))
                            }
                            this.addExplosion(enemy);
                            if (enemy.type === 'hivewhale') {
                                for (let i = 0; i < 5; i++) {
                                    this.enemies.push(new Drone(this, enemy.x + Math.random() * enemy.width, enemy.y + Math.random() * enemy.height * .5));
                                }
                            }

                            this.score += enemy.score;
                            if (this.score >= this.winingScore) this.gameOver = true;
                        }
                    }
                })
            })
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
                this.addEnemy();
                this.enemyTimer = 0
            } else {
                this.enemyTimer += deltaTime;
            }

            //Particles
            this.particles.filter(particle => !particle.markedForDeletion);
            this.particles.forEach(particle => {
                particle.update();
            });

            //Explosions
            this.explosions.filter(explosion => !explosion.markedForDeletion);
            this.explosions.forEach(explosion => {
                explosion.update(deltaTime);
            })
        }

        addEnemy() {
            const randomize = Math.random();
            if (randomize < .3) this.enemies.push(new Angler1(this));
            else if (randomize < .6) this.enemies.push(new Angler2(this));
            else if (randomize < .7) this.enemies.push(new HiveWhale(this));
            else this.enemies.push(new LuckyFish(this));
        }

        addExplosion(enemy) {
            const randomize = Math.random();
            if (randomize < .5) this.explosions.push(new Smoke(this, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
            else this.explosions.push(new Fire(this, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
        }

        checkCollition(rect1, rect2) {
            return (rect1.x < rect2.x + rect2.width
                && rect1.x + rect1.width > rect2.x
                && rect1.y < rect2.y + rect2.height
                && rect1.y + rect1.height > rect2.y)
        }
    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;
    const animate = (timeStemp) => {
        let deltaTime = timeStemp - lastTime;
        lastTime = timeStemp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
})