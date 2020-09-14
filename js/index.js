//import * as retro from "./retro.js";

const root = document.getElementById("root");
const rt = new Retro();
const board = rt.init(root, 1000, 600);

const player = board.createPlayer("assets/ship.png", 500, 400);
player.projectilePath = "assets/bullet.png";
const enemy = board.addSprite("assets/enemy.png", "Enemy Ship", 700, 200);

const mushroom = board.addSprite("assets/mushroom.png", "Mushroom", 300, 200);
const alien = board.addSprite("assets/alien.png", "Alien", 900, 200);
const star = board.addSprite("assets/star.png", "Star", 100, 200);
const fire = board.addSprite("assets/fire.png", "Fire", 500, 200);

const determineEnemyCollision = function (intruderID) {
    const me = this;
    if (intruderID === "Player") {
        board.player.destroy();
    } else if (intruderID.substring(0, 4) === "proj") {
        this.destroy();
        board.scoreText += 10;
    }
};
enemy.collisionBehavior = determineEnemyCollision;

board.scoreText = function () {
    return board.player.score;
};
fire.collisionBehavior = cb;
mushroom.collisionBehavior = cb;
alien.collisionBehavior = cb;
star.collisionBehavior = cb;
setInterval(() => fire.move(board, "left"), 100);
