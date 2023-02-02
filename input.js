export class InputHandler {
    constructor(game) {
        this.keys = [];
        this.game = game;

        window.addEventListener('keydown', (e) => {
            if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            } else if (e.key === ' ') {
                this.game.player.shootTop();
                if (this.game.player.powerUp) this.game.player.shootBottom();
            }
            else if (e.key === 'd') {
                this.game.debug = !this.game.debug;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (this.keys.indexOf(e.key) > -1) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}