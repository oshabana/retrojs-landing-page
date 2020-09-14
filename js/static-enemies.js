const root = document.getElementById("staticEnemies");
const rt = new Retro();
const board = rt.init(root, 1000, 800);
board.setSize(1000, 600);
const player = board.createPlayer("assets/ship.png", 500, 500);
player.projectilePath = "assets/bullet.png";

const enemy = board.addSprite("assets/enemy.png", "Enemy Ship", 500, 200);
