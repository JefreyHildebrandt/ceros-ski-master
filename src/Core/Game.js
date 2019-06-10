import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';
import { MovingEntityManager } from "../Entities/MovingEntities/MovingEntityManager";

export class Game {
    gameWindow = null;

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.obstacleManager = new ObstacleManager();
        this.movingEntityManager = new MovingEntityManager();

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    /**
     * Resets the game
     */
    reset() {
        this.obstacleManager = new ObstacleManager();
        this.movingEntityManager = new MovingEntityManager();
        this.canvas.resetCanvas();
        this.init();
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
        this.canvas.clearCanvas();

        this.updateGameWindow();
        this.drawGameWindow();
        this.updateScores();

        requestAnimationFrame(this.run.bind(this));
    }

    updateGameWindow() {
        this.movingEntityManager.moveMovingEntities(this.assetManager);

        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);
        this.movingEntityManager.checkMovingEntityCollisions(this.obstacleManager, this.assetManager);
    }

    /**
     * Updates the player's score and displays it
     */
    updateScores() {
        this.movingEntityManager.updateDistanceScore();
        this.movingEntityManager.updateStyleScore();
        this.drawDistanceScore();
        this.drawStyleScore();
    }

    /**
     * Draws the score for distance
     */
    drawDistanceScore() {
        this.canvas.drawText((Constants.DISTANCE_CANVAS.BEFORE_SCORE +
            this.movingEntityManager.getDistanceScore() +
            Constants.DISTANCE_CANVAS.AFTER_SCORE),
            Constants.DISTANCE_CANVAS.X, 
            Constants.DISTANCE_CANVAS.Y, 
            Constants.DISTANCE_CANVAS.FONT_STYLE);
    }

    /**
     * Draws the style score
     */
    drawStyleScore() {
        this.canvas.drawText((Constants.STYLE_CANVAS.BEFORE_SCORE + 
            this.movingEntityManager.getStyleScore() + 
            Constants.STYLE_CANVAS.AFTER_SCORE),
            Constants.STYLE_CANVAS.X, 
            Constants.STYLE_CANVAS.Y, 
            Constants.STYLE_CANVAS.FONT_STYLE);
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
        this.movingEntityManager.drawMovingEntities(this.canvas, this.assetManager);
        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
    }

    calculateGameWindow() {
        const skierPosition = this.movingEntityManager.getSkier().getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    /**
     * Handles key events from the user
     * @param {*} event the key press event
     */
    handleKeyDown(event) {
        this.movingEntityManager.handleKeyDown(event);
        switch (event.which) {
            case Constants.KEYS.R:
                this.reset();
                break;
        }
    }
}