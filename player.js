import { Moving, PowerUp } from "./states.js";
import { Projectile } from "./projectiles.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 120;
        this.height = 190;
        this.x = 20;
        this.y = 100;
        this.frameX = 0;
        this.maxFrame = 38;
        this.frameY = 0;
        this.speedY = 3;
        this.image = document.getElementById('player');
        this.states = [new Moving(this.game), new PowerUp(this.game)];
        this.currentState = null;
        this.ammo = 20;
        this.maxAmmo = 50;
        this.ammoTimer = 0;
        this.ammoInterval = 350;
        this.powerUp = false;
        this.powerUpTimer = 0;
        this.powerUpLimit = 5000;
    }

    draw(ctx) {
        if (this.game.debug) ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(inputs, deltaTime) {
        this.currentState.inputHandler(inputs);

        if (this.frameX >= this.maxFrame) this.frameX = 0;
        else this.frameX++;

        if (this.y < -this.height * .5) this.y = -this.height * .5;
        if (this.y > this.game.height - this.height * .5) this.y = this.game.height - this.height * .5;

        if (inputs.includes('ArrowUp')) this.y -= this.speedY;
        else if (inputs.includes('ArrowDown')) this.y += this.speedY


        if (this.ammoTimer > this.ammoInterval) {
            if (this.ammo < this.maxAmmo) this.ammo++;
            this.ammoTimer = 0;
        } else {
            this.ammoTimer += deltaTime;
        }

        if (this.powerUp) {
            if (this.powerUpTimer > this.powerUpLimit) {
                this.powerUpTimer = 0;
                this.powerUp = false;
            } else {
                this.powerUpTimer += deltaTime;
                this.ammo += .1;
            }
        }
    }

    shootTop() {
        if (this.ammo > 0) {
            this.game.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
            this.ammo--;
        }
    }

    shootBottom() {
        if (this.ammo > 0) {
            this.game.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 175));
        }
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}