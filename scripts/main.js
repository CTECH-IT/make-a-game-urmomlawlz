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
let pipes;
let player;
let cursors;

let playerGravity = 1000;
let pipesInterval = 2000;
let pipesGroup;
let playerFlapPower = 300;


function preload() {
    this.load.image('cat', 'assets/kitty.png');
    this.load.image('food', 'assets/fish.png');
    this.load.image('dog', 'assets/scarydog.png');
    this.load.image('sky', 'assets/sky.jpg');
}


function create() {
    this.add.image(800, 375, 'sky');
    
   // food = this.physics.add.staticGroup();
   // food.create(800, 600, 'food').setScale(0.05);

    pipes = this.physics.add.staticGroup();

    pipes.create(800, 300, 'dog').setScale(0.2).refreshBody();

    //add kitty
    player = this.physics.add.image(800, 450, 'cat').setScale(0.5);
    //kitty physics
    player.body.setSize(300, 250);
    player.body.setOffset(100, 100);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.gravity.y = playerGravity;
    player.body.velocity.y = -playerFlapPower;

    game.time.events.loop(pipesInterval, addPipes); 
			addPipes();

    this.physics.add.collider(player, pipes);
    // this.physics.add.collider(player, food);

    cursors = this.input.keyboard.createCursorKeys();
   
}



function update() {

    if (cursors.up.isDown) {
        player.setVelocityY(-350);
    }
}
