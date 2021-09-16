let config = {
    type: Meow.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Meow.Game(config);

function preload() {
    this.load.image('cat', 'assets/cat.png');
    this.load.image('food', 'assets/cutefood.png');
}

function create() {
    this.add.image(400, 300, 'cat');
}

function update() {
}
