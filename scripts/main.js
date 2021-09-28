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
let dogs;
let player;
let cursors;
let score = 0;
let scoreText = '';
let endText;
let winText;

let playerGravity = 500;


function preload() {
    this.load.image('cat', 'assets/kitty.png');
    this.load.image('food', 'assets/fish.png');
    this.load.image('dogs', 'assets/scarydog.png');
    this.load.image('sky', 'assets/sky.jpg');
    this.load.image('grass', 'assets/grass.png');
    this.load.image('stick', 'assets/leaf.png');
}


function create() {
    //add background
    this.add.image(800, 375, 'sky');

    //add grass and sticks
    grass = this.physics.add.staticGroup();

    grass.create(800, 400, 'grass').setScale(4);
    grass.create(200, 400, 'stick').setScale(0.2);
    grass.create(1400, 600, 'stick').setScale(0.2).setAngle(160);


    //add kitty
    player = this.physics.add.image(800, 450, 'cat').setScale(0.5);
    //kitty physics
    player.body.setSize(300, 250);
    player.body.setOffset(100, 100);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //add doggies
    //dogs = this.physics.add.group();
    var dogs = this.physics.add.image(100, 500, 'dogs').setScale(0.2)
     .setImmovable(true)
     .setVelocity(100, -100);

    dogs.body.setAllowGravity(false);

    this.tweens.timeline({
     targets: dogs.body.velocity,
     loop: -1,
     tweens: [
       { x:    0, y:    0, duration: 1000, ease: 'stepped' },
       { x:    0, y:    0, duration:    0, ease: 'stepped' },
       { x:  800, y:    0, duration:  500, ease: 'stepped' }
     ]
    });

    this.physics.add.collider(player, dogs, hitDogs, null, this);


    //add controls
    cursors = this.input.keyboard.createCursorKeys();
   
    //add fishies 
    var food = this.physics.add.image(100, 500, 'food').setScale(0.05)
     .setImmovable(true)
     .setVelocity(100, -100);

    food.body.setAllowGravity(false);

    this.tweens.timeline({
     targets: food.body.velocity,
     loop: -1,
     tweens: [
       { x:    0, y:    0, duration: 1000, ease: 'linear' },
       { x:    0, y:    0, duration:    0, ease: 'linear' },
       { x:  800, y:    0, duration:  500, ease: 'linear' }
     ]
    });
    //make fishies disapear when kitty eats them
    this.physics.add.overlap(player, food, collectFood, null, this)


    //shows score
    scoreText = this.add.text(16, 16, "score: 0", { fontSize: '32px', fill: '#000'});
    endText = this.add.text(500, 300, "game over lol ", { fontSize: '100px', fill: '#000'});
    endText.alpha = 0;
    winText = this.add.text(250, 200, "yayyyyyyyyyyyyyyyyyyy you win ", { fontSize: '70px', fill: '#000'});
    winText.alpha = 0;

}


function collectFood (player, food) {

    food.disableBody(true, true);

    //score math
    score += 1;
    scoreText.setText("score: " + score);
    if (score = 1) {

        this.physics.pause()
        gameOver = true;
        winText.alpha = 1;

    }
}



function update() {

    //controlls for the kitty
    if (cursors.left.isDown) {
        player.setVelocityX(-450);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(450);
    }
    else {
        player.setVelocityX(0);
    }
    //jump
    if(cursors.up.isDown) {
        player.setVelocityY(-250);
    }

}

//ends game
function hitDogs() {

    this.physics.pause();
    endText.setText("game over lol");
    gameOver = true;
    endText.alpha = 1;
}
