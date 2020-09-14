export const Sprite = {
    sprite: null,
    xPos: null,
    yPos: null,
    isStopped: false,
    speed: 9,
    collider: null,
    game: null,
    projectilePath: null, // can be reassigned to a path containing a projectile
    firedTotal: 0, // a way to keep track of all the shots and to generate unique ids
    creator: null, // this field is used for keeping tabs on who made the projectile
    projectileSpeed: 10,
    projectileDirection: "up",
    collisionDistance: 45,

    start: function (game, spritePath, xPos, yPos, width = 50, height = 50) {
        this.sprite = new Image(width, height);
        this.sprite.src = spritePath;
        this.sprite.left = `${xPos}px`;
        this.sprite.top = `${yPos}px;`;
        this.sprite.width = width;
        this.sprite.height = height;
        this.xPos = xPos;
        this.yPos = yPos;
        this.isStopped = false;
        this.game = game;
        this.collider = null;
        return Sprite;
    },

    setStyle: function (styleName, modifier) {
        const sprite = this.sprite;
        sprite.style[styleName] = modifier;
    },
    move: function (board, direction) {
        if (!this.isStopped) {
            const character = this.sprite;

            const maxX = board.xSize;
            const maxY = board.ySize;
            const width = this.sprite.width;
            const height = this.sprite.height;
            const speed = this.speed;
            if (direction === "right") {
                let xStr = character.left.replace("px", "");
                xStr = parseInt(xStr) + speed;
                if (xStr <= maxX - width) {
                    character.left = `${xStr}px`;
                    this.xPos = xStr;
                }
            }
            if (direction === "left") {
                let xStr = character.left.replace("px", "");
                xStr = parseInt(xStr) - speed;
                if (0 < xStr) {
                    character.left = `${xStr}px`;
                    this.xPos = xStr;
                }
            }
            if (direction === "up") {
                let yStr = character.top.replace("px", "");
                yStr = parseInt(yStr) - speed;
                if (yStr > 0) {
                    character.top = `${yStr}px`;
                    this.yPos = yStr;
                }
            }
            if (direction === "down") {
                let yStr = character.top.replace("px", "");
                yStr = parseInt(yStr) + speed;
                if (maxY - height > yStr) {
                    character.top = `${yStr}px`;
                    this.yPos = yStr;
                }
            }
        }
    },

    shoot: function (
        speed = this.projectileSpeed,
        direction = this.projectileDirection
    ) {
        if (this.projectilePath) {
            const sprites = this.game.SPRITES;
            const positions = this.game.positions;
            const projectile = Object.create(Sprite);
            projectile.start(
                this.game,
                this.projectilePath,
                this.xPos + 15,
                this.yPos - 30,
                20,
                20
            );

            projectile.speed = speed;
            projectile.collisionDistance = projectile.sprite.id = `proj${
                this.sprite.id
            }${this.firedTotal++}`;
            sprites[projectile.sprite.id] = projectile;
            positions[projectile.sprite.id] = [
                projectile.sprite.left,
                projectile.sprite.top,
            ];
            projectile.creator = this.sprite.id;
            projectile.owner = this.sprite.id;
            projectile.collisionDistance = 15;
            setInterval(
                () => this.handleProjectile(projectile),
                this.game.refreshFrequency
            );
        } else {
            console.log("A projectile is not set for ", this.sprite.id);
        }
    },
    handleProjectile: function (
        projectile,
        direction = this.projectileDirection
    ) {
        projectile.move(this.game, this.projectileDirection);

        if (projectile.collider) {
            const sprites = this.game.SPRITES;
            const collidedWith = sprites[projectile.collider];
            if (collidedWith && collidedWith.collisionBehavior) {
                collidedWith.collisionBehavior(projectile);
            }
        }
        if (
            projectile.yPos < 50 ||
            projectile.yPos > this.game.height - 50 ||
            projectile.xPos < 10 ||
            projectile.xPos > this.game.width
        ) {
            projectile.destroy();
        }
    },
    destroy: function () {
        const sprite = this;
        const spriteID = sprite.sprite.id;
        const positions = this.game.positions;
        const spriteList = this.game.SPRITES;
        delete positions[spriteID];
        delete spriteList[spriteID];
        if (spriteID === "Player") {
            this.game.player = null;
        }
    },
    collisionBehavior: function (intruderID) {
        // intruder is something that enters another collision space dictated by collision distance
        //to be implemented by the user to fufil a specified task
    },
};
