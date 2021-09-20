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
let food;
let platforms;
let player;

function preload() {
    this.load.image('cat', 'assets/kitty.png');
    this.load.image('food', 'assets/fish.png');
    this.load.image('dog', 'assets/scarydog.png');
    this.load.image('sky', 'assets/sky.jpg');
}

function create() {
    this.add.image(800, 375, 'sky');

    
    food = this.physics.add.staticGroup();

    food.create(800, 600, 'food').setScale(0.05);


    platforms = this.physics.add.staticGroup();

    platforms.create(800, 300, 'dog').setScale(0.2).refreshBody();


    player = this.physics.add.image(800, 450, 'cat').setScale(0.5);

    player.body.setSize(300, 250);
    player.body.setOffset(10, 10);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, food);
}

function update() {
}
