'use strict';
window.GAME.modules.main = (function (GAME) {
    var helper = GAME.helpers.helper,
        collisionWatcher = GAME.helpers.collisionWatcher,
        constants = GAME.constants,
        rect = GAME.entities.rect,
        Ball = GAME.entities.ball,
        Bonus = GAME.entities.bonus,
        modules = GAME.modules,
        gameState = {};

    return {
        init: init,
    };

    function startGame() {
        if (!gameState.start) {
            gameState.ball.vX = -2;
            gameState.ball.vY = 2;
            gameState.interval = 0;
            gameState.start = true;
        }
    }

    function playerMove(e) {
        gameState.y = e.pageY;
        if (gameState.player.height / 2 < gameState.y && gameState.y < gameState.gameRect.height - gameState.player.height / 2) {
            gameState.player.y = gameState.y - gameState.player.height / 2;
        }
    }
//function calculating ai moving
    function aiMove(gameState) {
         // make speed ai is dependent on the speed of the ball
        gameState.ballvY = gameState.ball.vY;
        if (gameState.ballvY === 0) {
            gameState.vY = gameState.ballvY;
        }
        else if (gameState.ballvY >= 2 && gameState.ballvY <= 5) {
            gameState.vY = gameState.ballvY;
        }
        else if (gameState.ballvY === 6) {
            gameState.vY = 5;
        }
        else if (gameState.ballvY >= 7 && gameState.ballvY <= 10) {
            gameState.vY = 6;
        }

        if (gameState.ball.y < gameState.ai.y + gameState.ai.height / 2) {
            gameState.y = gameState.ai.y - gameState.vY;
        }
        if (gameState.ball.y > gameState.ai.y + gameState.ai.height / 2) {
            gameState.y = gameState.ai.y + gameState.vY;
        }
        if (0 < gameState.y && gameState.y < gameState.gameRect.height - gameState.ai.height) {
            gameState.ai.y = gameState.y;
        }
    }
//func which returns bonus effects
    function chooseBonus(gameState) {
        switch (gameState.rnd) {
            case 1:
                if (gameState.i % 2) {
                    gameState.player.height = gameState.player.height + 75;
                }
                else {
                    gameState.ai.height = gameState.ai.height + 75;
                }
                break;
            case 2:
                if (gameState.i % 2) {
                    gameState.player.height = gameState.player.height - 40;
                }
                else {
                    gameState.ai.height = gameState.ai.height - 40;
                }
                break;
            case 3:
                gameState.ball2.x = gameState.ball.x;
                gameState.ball2.y = gameState.ball.y;
                gameState.ball2.vY = gameState.ball.vY - 3;
                gameState.ball2.vX = gameState.ball.vX - 3;
                break;
            case 4:
                gameState.ball.radius = gameState.ball.radius * 1.5;
                gameState.ball2.radius = gameState.ball2.radius * 1.5;
                break;
            case 5:
                gameState.ball.radius = gameState.ball.radius / 2;
                gameState.ball2.radius = gameState.ball2.radius / 2;
                break;
            case 6:
                gameState.ball.vX = gameState.ball.vX - 2;
                gameState.ball.vY = gameState.ball.vY - 2;
                if (gameState.ball2.x < gameState.canvas.width) {
                    gameState.ball2.vX = gameState.ball2.vX - 2;
                    gameState.ball2.vY = gameState.ball2.vY - 2;
                }
                break;
            default: break;
        }
    }
//func which watching for contact ball and field walls
    function checkBallWall(gameState) {
        if (gameState.ball.y < 0 || gameState.ball.y +gameState.ball.radius * 2 > gameState.canvas.height) {
            // contact with the flooar and ceiling of the game field
            gameState.ball.vY = -gameState.ball.vY;
        }
        if (gameState.ball.x < 0) {
            // contact with left wall
            gameState.ball.vX = -gameState.ball.vX;
            gameState.player.scores++;
        }
        if (gameState.ball.x + gameState.ball.radius * 2 > gameState.canvas.width) {
            // contact with right wall
            gameState.ball.vX = -gameState.ball.vX;
            gameState.ai.scores++;
        }
        if (gameState.ball2.x < gameState.canvas.width) {
            if (gameState.ball2.y < 0 || gameState.ball2.y + gameState.ball2.radius * 2 > gameState.canvas.height) {
            // contact with the flooar and ceiling of the game field
                gameState.ball2.vY = -gameState.ball2.vY;
            }
            if (gameState.ball2.x < 0) {
            // contact with left wall
                gameState.ball2.vX = -gameState.ball2.vX;
                gameState.player.scores++;
            }
            if (gameState.ball2.x + gameState.ball2.radius * 2 > gameState.canvas.width) {
            // contact with right wall
                gameState.ball2.vX = -gameState.ball2.vX;
                gameState.ai.scores++;
            }
        }
    }
//func which watching for contact bonus and field walls
    function checkBonusWall(gameState) {
        if (gameState.bonus.x < 0) {
            // contact with left wall
            gameState.bonus.stop();
            gameState.interval = 0;
        }
        if (gameState.bonus.x + gameState.bonus.width > gameState.canvas.width) {
            // contact with right wall
            gameState.bonus.stop();
            gameState.interval = 0;
        }
    }
//func which watching for contact ball and players
    function checkBallPlayer(gameState) {
        // calc collision players and ball
        if (collisionWatcher.rectCircleColliding(gameState.ball, gameState.ai) && gameState.ball.vX < 0 || collisionWatcher.rectCircleColliding(gameState.ball, gameState.player) && gameState.ball.vX > 0) {
            if (gameState.ball.vX < 9 && -9 < gameState.ball.vX) {
                if (gameState.ball.vX < 0) {
                    gameState.ball.vX--;
                }
                else {
                    gameState.ball.vX++;
                }
                if (gameState.ball.vY < 0) {
                    gameState.ball.vY--;
                }
                else {
                    gameState.ball.vY++;
                }
            }
            gameState.ball.vX = -gameState.ball.vX;
        }
        if (collisionWatcher.rectCircleColliding(gameState.ball2, gameState.ai) && gameState.ball2.vX < 0 || collisionWatcher.rectCircleColliding(gameState.ball2, gameState.player) && gameState.ball2.vX > 0) {
            if (gameState.ball2.vX < 9 && -9 < gameState.ball2.vX) {
                if (gameState.ball2.vX < 0) {
                    gameState.ball2.vX--;
                }
                else {
                    gameState.ball2.vX++;
                }
                if (gameState.ball2.vY < 0) {
                    gameState.ball2.vY--;
                }
                else {
                    gameState.ball2.vY++;
                }
            }
            gameState.ball2.vX = -gameState.ball2.vX;
        }
    }
//func which watching for contact ball and players
    function checkBonusPlayer(gameState) {
        if (collisionWatcher.rectsColliding(gameState.ai, gameState.bonus)) {
            gameState.rnd = helper.getRandom(1, 6);
            chooseBonus(gameState);
            gameState.bonus.stop();
            gameState.interval = 0;
            gameState.i = helper.getRandom(1, 2);
        }
        if (collisionWatcher.rectsColliding(gameState.player, gameState.bonus)) {
            gameState.rnd = helper.getRandom(1, 6);
            chooseBonus(gameState);
            gameState.bonus.stop();
            gameState.interval = 0;
            gameState.i = helper.getRandom(1, 2);
        }
    }
//func which watching for playes height is normal
    function checkPlayerHeight(gameState) {
        if (gameState.player.height > constants.playerHeightDefault) {
            gameState.player.height -= 0.1;
        }
        if (gameState.player.height < constants.playerHeightDefault) {
            gameState.player.height += 0.1;
        }

        if (gameState.ai.height > constants.playerHeightDefault) {
            gameState.ai.height -= 0.1;
        }
        if (gameState.ai.height < constants.playerHeightDefault) {
            gameState.ai.height += 0.1;
        }
    }

//func which sets default setting after game over
    function defaultSettings(gameState) {
        gameState.start = false;

        gameState.ball.x = 40;
        gameState.ball.y = gameState.gameRect.height / 2 - 10;
        gameState.ball.vX = 0;
        gameState.ball.vY = 0;
        gameState.ball.radius = 10;

        gameState.ball2.x = constants.defaultBall2Position;
        gameState.ball2.y = constants.defaultBall2Position;
        gameState.ball2.vX = 0;
        gameState.ball2.vY = 0;
        gameState.ball2.radius = 10;

        gameState.ai.y = gameState.gameRect.height / 2 - gameState.ai.height / 2;
        gameState.ai.scores = 0;

        gameState.player.y = gameState.gameRect.height / 2 - gameState.ai.height / 2;
        gameState.player.scores = 0;
    }
//func which get bonus and random direction for him
    function getBonus(gameState) {
        gameState.bonus.draw();
        if (gameState.i % 2) {
            gameState.bonus.moveRight();
        }
        else {
            gameState.bonus.moveLeft();
        }
        checkBonusWall(gameState);
    }
    // function who make changes
    function update(gameState) {
        gameState.interval += 1;
        aiMove(gameState);
        checkBallWall(gameState);


        if (gameState.interval > 750 && gameState.start === true) {
            getBonus(gameState);
        }

        checkBonusPlayer(gameState);

        if (gameState.ai.scores === constants.winScore || gameState.player.scores === constants.winScore) {
            if (gameState.ai.scores === constants.winScore) { // win ai
                defaultSettings(gameState);
                gameState.gameRect.lose++;
            }
            else { // win player
                defaultSettings(gameState);
                gameState.gameRect.win++;
            }
            gameState.gameRect.total++;
        }
        checkPlayerHeight(gameState);
        checkBallPlayer(gameState);

        gameState.ball.x += gameState.ball.vX;
        gameState.ball.y += gameState.ball.vY;
        gameState.ball2.x += gameState.ball2.vX;
        gameState.ball2.y += gameState.ball2.vY;
    }

    function play() {
        modules.draw.draw(gameState);
        update(gameState);
    }

    function init() {
        helper.extend(constants.defaultGameState, gameState);

        gameState.gameRect = new rect.Rect('#fff', 0, 0, constants.canvasWidth, constants.canvasHeight);
        gameState.gameRect.total = constants.defaultScoreValue;
        gameState.gameRect.win = constants.defaultScoreValue;
        gameState.gameRect.lose = constants.defaultScoreValue;

        gameState.ai = new rect.Rect('#000', 10, gameState.gameRect.height / 2 - 40, constants.playerWidth, constants.playerHeightDefault);
        gameState.player = new rect.Rect('#000', gameState.gameRect.width - 30, gameState.gameRect.height / 2 - 40, constants.playerWidth, constants.playerHeightDefault);
        gameState.ball = new Ball.Ball('#000', 40, gameState.gameRect.height / 2 - 10, 10, 0, Math.PI * 2, false);
        gameState.ball2 = new Ball.Ball('#000', constants.defaultBall2Position, constants.defaultBall2Position, 10, 0, Math.PI * 2, false);
        gameState.bonus = new Bonus.Bonus('#ff0000', gameState.gameRect.width / 2, gameState.gameRect.height / 2, 20, 20);

        gameState.canvas = document.getElementById('pong');
        gameState.canvas.width = constants.canvasWidth;
        gameState.canvas.height = constants.canvasHeight;
        gameState.context = gameState.canvas.getContext('2d');

        gameState.player.scores = constants.defaultScoreValue;
        gameState.ai.scores = constants.defaultScoreValue;

        gameState.ball.vX = 0;
        gameState.ball.vY = 0;

        window.onmousemove = playerMove;
        gameState.canvas.onclick = startGame;
        setInterval(play, 1000 / 50);
    }
})(window.GAME);