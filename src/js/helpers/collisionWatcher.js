'use strict';
window.GAME.helpers.collisionWatcher = (function(GAME) {
    //function calculating collision between rect and circle
    function rectCircleColliding(circle, rect) {
        var distX = Math.abs(circle.x - rect.x - rect.width / 2),
            distY = Math.abs(circle.y - rect.y - rect.height / 2),
            dx,
            dy;

        if (distX > rect.width / 2 + circle.radius) {
            return false;
        }
        if (distY > rect.height / 2 + circle.radius) {
            return false;
        }

        if (distX <= rect.width / 2) {
            return true;
        }
        if (distY <= rect.height / 2) {
            return true;
        }

        dx = distX - rect.width / 2;
        dy = distY - rect.height / 2;
        return dx * dx + dy * dy <= circle.radius * circle.radius;
    }

    //function calculating collision between rect and rect
    function rectsColliding(r1, r2) {
        return !(r1.x > r2.x + r2.width || r1.x + r1.width < r2.x || r1.y > r2.y + r2.height || r1.y + r1.height < r2.y);
    }

    return{
        rectCircleColliding: rectCircleColliding,
        rectsColliding: rectsColliding,
    };
})(window.GAME);
