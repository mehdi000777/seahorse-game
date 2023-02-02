export class Projectile {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 3;
        this.speed = 3;
        this.markedForDeletion = false;
        this.image = document.getElementById('projectile');
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }

    update() {
        this.x += this.speed;
        if (this.x > this.game.width * .8) this.markedForDeletion = true;
    }
}