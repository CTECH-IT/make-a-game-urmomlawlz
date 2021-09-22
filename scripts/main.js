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
let grass;
let dog;
let player;
let cursors;

let playerGravity = 500;


function preload() {
    this.load.image('cat', 'assets/kitty.png');
    this.load.image('food', 'assets/fish.png');
    this.load.image('dog', 'assets/scarydog.png');
    this.load.image('sky', 'assets/sky.jpg');
    this.load.image('grass', 'assets/grass.png');
    this.load.image('stick', 'assets/leaf.png');
}


function create() {
    this.add.image(800, 375, 'sky');


    grass = this.physics.add.staticGroup();

    grass.create(800, 400, 'grass').setScale(4);
    grass.create(200, 400, 'stick').setScale(0.2);
    grass.create(1400, 600, 'stick').setScale(0.2).setAngle(160);


    dog = this.physics.add.staticGroup();

    dog.create(800, 600, 'dog').setScale(0.2).refreshBody();

    
    //add kitty
    player = this.physics.add.image(800, 450, 'cat').setScale(0.5);
    //kitty physics
    player.body.setSize(300, 250);
    player.body.setOffset(100, 100);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, grass);

    cursors = this.input.keyboard.createCursorKeys();
   
}



function update() {
    
    if (cursors.up.isDown) {
        player.body.velocity.y = -2000;
    }

}
