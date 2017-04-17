'use strict';
window.GAME.helpers.helper = (function(GAME) {
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function extend(firstObject, secondObject) {
        for (var prop in firstObject) {
            if (firstObject.hasOwnProperty(prop) && prop !== {}) {
                secondObject[prop] = firstObject[prop];
            }
        }
    }
    return{
        getRandom: getRandom,
        extend: extend,
    };
})(window.GAME);
