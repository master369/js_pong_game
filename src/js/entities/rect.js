'use strict';
window.GAME.entities.rect = (function(GAME) {
    var Rect,
        canvas = document.getElementById('pong'),
        context = canvas.getContext('2d');

    Rect = function (color, x, y, width, height) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };

    Rect.prototype.draw = function () {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };

    return{
        Rect: Rect
    };
})(window.GAME);
