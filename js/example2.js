const root = document.getElementById("killenemies");
const rt = new Retro();
const board = rt.init(root, 1000, 800);

const player = board.createPlayer("assets/ship.png", 500, 500);
player.projectilePath = "assets/bullet.png";

const enemy = board.addSprite("assets/enemy.png", "Enemy Ship", 10, 200);
const enemy2 = board.addSprite("assets/enemy.png", "Enemy Ship2", 100, 200);
const enemy3 = board.addSprite("assets/enemy.png", "Enemy Ship3", 200, 200);
const enemy4 = board.addSprite("assets/enemy.png", "Enemy Ship4", 300, 200);
const enemy5 = board.addSprite("assets/enemy.png", "Enemy Ship5", 400, 200);
const enemy6 = board.addSprite("assets/enemy.png", "Enemy Ship6", 500, 200);
const enemy7 = board.addSprite("assets/enemy.png", "Enemy Ship7", 600, 200);
const enemy8 = board.addSprite("assets/enemy.png", "Enemy Ship8", 700, 200);
const enemy9 = board.addSprite("assets/enemy.png", "Enemy Ship9", 800, 200);
const enemy10 = board.addSprite("assets/enemy.png", "Enemy Ship10", 900, 200);

const death = function (intruderID) {
    const me = this;
    if (intruderID === "Player") {
        board.player.destroy();
    } else if (intruderID.substring(0, 4) === "proj") {
        this.destroy();
        board.scoreText += 10;
    }
};

enemy.collisionBehavior = death;
enemy2.collisionBehavior = death;
enemy3.collisionBehavior = death;
enemy4.collisionBehavior = death;
enemy5.collisionBehavior = death;
enemy6.collisionBehavior = death;
enemy7.collisionBehavior = death;
enemy8.collisionBehavior = death;
enemy9.collisionBehavior = death;
enemy10.collisionBehavior = death;
