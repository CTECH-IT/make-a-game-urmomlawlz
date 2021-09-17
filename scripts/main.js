let config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 750,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let platforms;

function preload() {
    this.load.image('cat', 'assets/cat.png');
    this.load.image('food', 'assets/cutefood.png');
    this.load.image('dog', 'assets/images.png');
}

function create() {
    this.add.image(800, 375, 'cat');

    platforms = this.physics.add.staticgroup();

    platforms.create(600, 400, 'dog');
    platforms.create(50, 250, 'dog');
    platforms.create(750, 220, 'dog');
}

function update() {
}
