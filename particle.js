export class Particle {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.spriteSize = 50;
        this.sizeModifire = (Math.random() * .5 + .5).toFixed(1);
        this.size = this.spriteSize * this.sizeModifire;
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.image = document.getElementById('gears');
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * -15;
        this.gravity = .5;
        this.markedForDeletion = false;
        this.angle = 0;
        this.va = Math.random() * .2 - .1;
        this.bounced = 0;
        this.bottomBouncedBoundary = Math.random() * 80 + 60;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }

    update() {
        this.angle += this.va;
        this.speedY += this.gravity;
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;

        if (this.y > this.game.height + this.size || this.x < -this.size) this.markedForDeletion = true;
        if (this.y > this.game.height - this.bottomBouncedBoundary && this.bounced < 2) {
            this.bounced++;
            this.speedY *= -.5
        }

    }
}