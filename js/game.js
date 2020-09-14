/* Creates a Canvas with the specifed width and height*/
"use strict";
import { Sprite } from "./sprite.js";

const Game = {
    xSize: 0,
    ySize: 0,
    board: document.createElement("canvas"),
    player: undefined,
    context: undefined,
    refreshFrequency: 10,
    SPRITES: {},
    scoreText: 0,
    positions: {},
    isActive: false,
    LEFT: 65,
    RIGHT: 68,
    UP: 87,
    DOWN: 83,
    SHOOT: 76,

    documentEventListener: document.addEventListener(
        "keydown",
        window.addEventListener("keydown", function () {
            if (Game.player) {
                const player = Game.player;
                if (player.isStopped) return;
                if (event.keyCode === Game.RIGHT) {
                    player.move(Game, "right");
                }
                if (event.keyCode === Game.LEFT) {
                    player.move(Game, "left");
                }
                if (event.keyCode === Game.UP) {
                    player.move(Game, "up");
                }
                if (event.keyCode === Game.DOWN) {
                    player.move(Game, "down");
                }
                if (event.keyCode === Game.SHOOT) {
                    player.shoot();
                }
            } else return;
        })
    ),

    start: function (xSize, ySize) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.board.width = this.xSize;
        this.board.height = this.ySize;
        this.board.id = "Game";
        this.context = this.board.getContext("2d");
        this.isActive = true; // updates should happen after this obj is constructed
    },

    update: function () {
        if (Game.isActive) {
            Game.context.clearRect(0, 0, Game.board.width, Game.board.height);
            Game.reDraw();
        }
    },
    setStyle: function (styleName, modifier) {
        const board = this.board;
        board.style[styleName] = modifier;
    },
    setSize: function (xSize, ySize) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.board.width = Game.xSize;
        this.board.height = Game.ySize;
    },
    reDraw: function () {
        Object.keys(this.SPRITES).forEach((spriteKey) => {
            const sprite = this.SPRITES[spriteKey];
            let img = sprite.sprite;
            let xPos = sprite.xPos;
            let yPos = sprite.yPos;
            this.positions[img.id] = [xPos, yPos];
            this.detectCollision(sprite);
            this.context.font = "20px Times New Roman";
            this.context.fillStyle = "white";
            console.log(this.scoreText.toString());
            this.context.fillText(this.scoreText.toString(), 900, 30);
            this.context.drawImage(img, xPos, yPos, img.width, img.height);
        });
    },
    // Call this to actually make the player not setAsPlayer
    createPlayer: function (path, xPos = 0, yPos = 0, width = 50, height = 50) {
        const player = this.addSprite(
            path,
            "Player",
            xPos,
            yPos,
            width,
            height
        );
        player.score = 0;
        this.player = player;
        return player;
    },

    addSprite: function (
        path,
        id,
        xPos = 0,
        yPos = 0,
        width = 50,
        height = 50
    ) {
        if (this.SPRITES[id] === undefined) {
            const sprite = Object.create(Sprite);
            sprite.start(Game, path, xPos, yPos);
            sprite.sprite.id = id;
            this.SPRITES[id] = sprite;
            return sprite;
        } else {
            console.log(`${id} has already been taken. ids are unique.`);
        }
    },
    detectCollision: function (sprite) {
        const xPos = sprite.xPos;
        const yPos = sprite.yPos;
        Object.keys(Game.positions).forEach((key) => {
            if (key !== sprite.sprite.id) {
                const cl = this.SPRITES[key].collisionDistance;
                let pos = this.positions[key];

                if (
                    pos[0] < xPos + cl &&
                    pos[0] > xPos - cl &&
                    pos[1] - cl < yPos &&
                    pos[1] + cl > yPos
                ) {
                    sprite.collider = key;
                    this.SPRITES[key].collider = sprite.sprite.id;
                    if (this.SPRITES[key].collisionBehavior) {
                        // run only if the user has defined one
                        this.SPRITES[key].collisionBehavior(sprite.sprite.id);
                    }
                } else if (sprite.sprite.id === "Player") {
                    this.SPRITES[key].collider = null;
                }
            }
        });
    },
};

export { Game };
