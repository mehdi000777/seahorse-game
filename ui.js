export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 25;
        this.fontFamily = 'Bangers';
        this.color = 'white';
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = 'black';
        ctx.font = this.fontSize + 'px ' + this.fontFamily;

        //score
        ctx.fillText('Score: ' + this.game.score, 20, 40)

        //timer
        ctx.fillText('Timer: ' + (this.game.gameTime * .001).toFixed(1), 20, 100)

        //gameOver
        ctx.textAlign = 'center';
        if (this.game.gameOver) {
            let message1;
            let message2;
            if (this.game.score >= this.game.winingScore) {
                message1 = 'You Win!';
                message2 = 'Well done!';
            } else {
                message1 = 'You Lose!';
                message2 = 'Try again next time!';
            }
            ctx.font = '100px ' + this.fontFamily;
            ctx.fillText(message1, this.game.width / 2, this.game.height / 2);
            ctx.font = '25px ' + this.fontFamily;
            ctx.fillText(message2, this.game.width / 2, this.game.height / 2 + 50)
        }

        //ammo
        if (this.game.player.powerUp) ctx.fillStyle = '#ffffbd'
        for (let i = 0; i < this.game.player.ammo; i++) {
            ctx.fillRect(20 + 5 * i, 50, 3, 20);
        }

        ctx.restore();
    }
}