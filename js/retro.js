"use strict";

import * as Game from "./game.js";
//import { Sprite } from "./sprite.js";

(function (global) {
    // hence no const
    function Retro() {
        this.GAME = null; // need it to be available globally in this file
    }
    Retro.prototype = {
        init: function (parent, width, height) {
            this.GAME = Game.Game;
            this.GAME.start(width, height);
            parent.appendChild(this.GAME.board);
            setInterval(this.GAME.update, this.GAME.refreshFrequency);
            return this.GAME;
        },
    };
    /*
    
    */
    global.Retro = global.Retro || Retro;
})(window);