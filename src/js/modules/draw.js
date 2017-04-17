'use strict';
window.GAME.modules.draw = (function(GAME) {
    var canvas = document.getElementById('pong'),
        context = canvas.getContext('2d');

    function draw(gameState) {
        gameState.gameRect.draw();
        // draw game score on field
        context.font = 'bold 72px arial';
        context.textAlign = 'center';
        context.textBaseline = 'top';
        context.fillStyle = '#000';
        context.fillText(gameState.ai.scores, 100, 0);
        context.fillText(gameState.player.scores, gameState.gameRect.width - 100, 0);

        for (var i = 10; i < gameState.gameRect.height; i += 45) {
        // draw central line
            context.fillStyle = '#000';
            context.fillRect(gameState.gameRect.width / 2 - 5, i, 5, 30);
        }

        gameState.ai.draw();
        gameState.player.draw();
        gameState.ball.draw();
        gameState.ball2.draw();

        if (!gameState.start) {
        // draw game statistics
            context.fillStyle = '#000';
            context.fillRect(0, 0, gameState.gameRect.width, gameState.gameRect.height);
            context.font = 'bold 16px courier';
            context.textBaseline = 'top';
            context.fillStyle = '#fff';
            context.fillText('Total: ' + gameState.gameRect.total + ' Win: ' + gameState.gameRect.win + ' Lose: ' + gameState.gameRect.lose, gameState.gameRect.width / 2, 0);
            context.font = 'bold 60px courier';
            context.textBaseline = 'top';
            context.fillStyle = '#fff';
            context.fillText('Ping Pong', gameState.gameRect.width / 2, gameState.gameRect.height / 2 - 50);
            context.font = 'bold 16px courier';
            context.textBaseline = 'top';
            context.fillStyle = '#fff';
            context.fillText('click on me', gameState.gameRect.width / 2, gameState.gameRect.height / 2 + 25);
        }
    }
    return{
        draw: draw,
    };
})(window.GAME);
