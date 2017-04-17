'use strict';
window.GAME.entities.ball = (function(GAME) {
    var Ball,
        canvas = document.getElementById('pong'),
        context = canvas.getContext('2d');

    Ball = function (color, x, y, radius, startAngle, endAngle, anticlockwise) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.anticlockwise = anticlockwise;
    };

    Ball.prototype.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
        context.closePath();
        context.fill();
    };

    return{
        Ball: Ball
    };
})(window.GAME);
