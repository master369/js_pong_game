'use strict';
window.GAME.constants = (function () {
    var defaultGameState,
        lastGameState,
        canvasWidth = 480,
        canvasHeight = 320,
        playerHeightDefault = 80,
        playerWidth = 20,
        winScore = 10,
        defaultBall2Position = 640,
        defaultBallPosition = 0,
        defaultScoreValue = 0;


    defaultGameState = {
        player: null, //player object
        ai: null, //ai object
        start: false, //flag
        gameRect: null,//field object
        canvas: null,
        bonus: null, //bonus object
        context: null,
        rnd: null, //rnd number for choosing bonus
        interval: 0, //time interval between spawn new bonus on game field
        ball: null,//ball object
        ball2: null,//ball2 object
        i:1, //default value for function witch choosing direction bonus
    };

    return {
        defaultGameState: defaultGameState,
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        playerWidth: playerWidth,
        lastGameState: lastGameState,
        winScore: winScore,
        defaultBall2Position: defaultBall2Position,
        defaultBallPosition: defaultBallPosition,
        playerHeightDefault: playerHeightDefault,
        defaultScoreValue: defaultScoreValue,
    };
})();