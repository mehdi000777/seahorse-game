const states = {
    MOVING: 0,
    SHOOT: 1,
    POWERUP: 2,
}

class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class Moving extends State {
    constructor(game) {
        super('MOVING', game);
    }

    enter() {
        this.game.player.frameY = 0;
    }

    inputHandler(inputs) {

    }
}

export class PowerUp extends State {
    constructor(game) {
        super('POWERUP', game);
    }

    enter() {
        this.game.player.powerUp = true;
        this.game.player.powerUpTimer = 0
        this.game.player.frameY = 1;
        if (this.game.player.ammo < this.game.player.maxAmmo) this.game.player.ammo = this.game.player.maxAmmo;
    }

    inputHandler(inputs) {
        if (inputs.includes(' ')) this.game.player.setState(states.SHOOT);
        if (!this.game.player.powerUp) this.game.player.setState(states.MOVING);
    }
}