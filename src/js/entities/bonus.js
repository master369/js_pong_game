'use strict';
window.GAME.entities.bonus = (function(GAME) {
    var Bonus,
        canvas = document.getElementById('pong'),
        context = canvas.getContext('2d');

    Bonus = function (color, x, y, width, height) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };

    Bonus.prototype.draw = function () {
        context.fillStyle = '#00ff00';
        context.fillRect(this.x, this.y, this.width, this.height);
    };


    Bonus.prototype.stop = function () {
        this.color = '#ffffff';
        this.x = canvas.width/2;
        this.x += 0;
    };
    Bonus.prototype.moveRight = function () {
        this.x += 1;
    };
    Bonus.prototype.moveLeft = function () {
        this.x -= 1;
    };

    return{
        Bonus: Bonus
    };
})(window.GAME);
