class Enemy {
    constructor(game) {
        this.game = game;
        this.x = this.game.width;
        this.speedX = Math.random() * -1.5 - .5;
        this.markedForDeletion = false;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 37;
        this.lives = 5;
        this.score = this.lives;
    }

    draw(ctx) {
        if (this.game.debug) ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        if (this.game.debug) {
            ctx.font = '20px Helvetica';
            ctx.fillStyle = 'black';
            ctx.fillText(this.lives, this.x, this.y);
        }
    }

    update() {
        if (this.frameX >= this.maxFrame) this.frameX = 0;
        else this.frameX++;

        this.x += this.speedX - this.game.speed;
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
}

export class Angler1 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 228;
        this.height = 169;
        this.y = Math.random() * (this.game.height * .95 - this.height);
        this.image = document.getElementById('angler1');
        this.frameY = Math.floor(Math.random() * 3);
        this.lives = 5;
        this.score = this.lives;
    }
}

export class Angler2 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 213;
        this.height = 165;
        this.y = Math.random() * (this.game.height * .95 - this.height);
        this.image = document.getElementById('angler2');
        this.frameY = Math.floor(Math.random() * 2);
        this.lives = 6;
        this.score = this.lives;
    }
}

export class LuckyFish extends Enemy {
    constructor(game) {
        super(game);
        this.width = 99;
        this.height = 95;
        this.y = Math.random() * (this.game.height * .95 - this.height);
        this.image = document.getElementById('lucky');
        this.lives = 5;
        this.score = 15;
        this.type = 'lucky';
    }
}

export class HiveWhale extends Enemy {
    constructor(game) {
        super(game);
        this.width = 400;
        this.height = 227;
        this.y = Math.random() * (this.game.height * .95 - this.height);
        this.image = document.getElementById('hivewhale');
        this.lives = 15;
        this.score = this.lives;
        this.type = 'hivewhale';
        this.speedX = Math.random() * -1.2 - .2;
    }
}

export class Drone extends Enemy {
    constructor(game, x, y) {
        super(game);
        this.width = 115;
        this.height = 95;
        this.x = x
        this.y = y;
        this.image = document.getElementById('drone');
        this.lives = 3;
        this.score = this.lives;
        this.frameY = Math.floor(Math.random() * 2);
        this.type = 'drone';
        this.speedX = Math.random() * -4.2 - .5;
    }
}