class Layer {
    constructor(game, image, speedModifier) {
        this.game = game;
        this.image = image;
        this.speedModifier = speedModifier;
        this.x = 0;
        this.y = 0;
        this.width = 1768;
        this.height = 500;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.game.speed * this.speedModifier;
        if (this.x <= -this.width) this.x = 0;
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.layerImg1 = document.getElementById('layer1');
        this.layerImg2 = document.getElementById('layer2');
        this.layerImg3 = document.getElementById('layer3');
        this.layerImg4 = document.getElementById('layer4');
        this.layer1 = new Layer(this.game, this.layerImg1, .2);
        this.layer2 = new Layer(this.game, this.layerImg2, .4);
        this.layer3 = new Layer(this.game, this.layerImg3, 1);
        this.layer4 = new Layer(this.game, this.layerImg4, 1.5);
        this.layers = [this.layer1, this.layer2, this.layer3];
    }

    draw(ctx) {
        this.layers.forEach(layer => {
            layer.draw(ctx);
        })
    }

    update() {
        this.layers.forEach(layer => {
            layer.update();
        })
    }
}