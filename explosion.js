class Explosion {
    constructor(game, x, y) {
        this.game = game;
        this.spriteHeight = 200;
        this.spriteWidth = 200;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
        this.frameX = 0;
        this.maxFrame = 7;
        this.timer = 0;
        this.fps = 30;
        this.timerInterval = 1000 / this.fps;
        this.markedForDeletion = false;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

    update(deltaTime) {
        this.x -= this.game.speed;

        if (this.timer > this.timerInterval) {
            this.frameX++;
            if (this.frameX > this.maxFrame) this.markedForDeletion = true;
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }
    }
}

export class Smoke extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);
        this.image = document.getElementById('smoke');
    }
}

export class Fire extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);
        this.image = document.getElementById('fire');
    }
}
