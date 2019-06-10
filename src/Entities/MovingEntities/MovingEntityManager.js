import * as Constants from '../../Constants';
import { getAssetBounds, intersectTwoRects, randomInt } from '../../Core/Utils';
import { Skier } from './Skier';
import { Rhino } from './Rhino';

/**
 * The moving entity manager handles all Moving Entities
 */
export class MovingEntityManager {
    // the rhino entity
    rhino;
    // the skier entity
    skier;
    // the distance the skier has traveled (up and down)
    distanceScore = 0;
    // the previous y value from the last frame for the skier
    previousY = 0;
    // the score for the skier's style
    styleScore = 0;

    constructor() {
        this.skier = new Skier(0, 0);
        this.rhino = new Rhino(0, Constants.RHINO_STARTING_DISTANCE);
    }

    /**
     * Moves the moving entities
     * @param {AssetManager} assetManager the asset manager
     */
    moveMovingEntities(assetManager) {
        this.skier.move();

        if(this.getDistanceScore() > Constants.RHINO_WAIT_DISTANCE_TO_MOVE) {
            this.rhino.setPositionToMoveTo(this.skier.getPosition());
            this.rhino.move(this.skier, assetManager);
        }
        else {
            // the rhino will update the x position until the skier reaches the distance threshold
            // this prevents the user from going really far left or right to avoid the rhino before it starts
            this.rhino.x = this.skier.x;
        }
    }

    /**
     * Checks if the moving entities run into an obstacle
     * @param {ObstacleManager} obstacleManager the obstacle manager
     * @param {AssetManager} assetManager the asset manager
     */
    checkMovingEntityCollisions(obstacleManager, assetManager) {
        this.skier.handleObstacleCollision(this.getObstacleIfCollisionWithEntity(this.skier, obstacleManager, assetManager));
        this.rhino.handleObstacleCollision(this.getObstacleIfCollisionWithEntity(this.rhino, obstacleManager, assetManager));
        const rhinoSkierCollision = this.checkIfSkierAndRhinoCollide(assetManager);
        if(rhinoSkierCollision) {
            this.skier.handleSkierRhinoCollision();
            this.rhino.handleSkierRhinoCollision();
        }
    }

    /**
     * Calculates the distance score
     * @returns {number} the distance score
     */
    getDistanceScore() {
        return Math.floor(this.distanceScore / Constants.DISTANCE_DIVIDE);
    }

    /**
     * returns the style score
     * @returns {number} the style score
     */
    getStyleScore() {
        return this.styleScore;
    }

    /**
     * updates the local distance score
     */
    updateDistanceScore() {
        this.distanceScore += Math.ceil(Math.abs(this.skier.getPosition().y - this.previousY));
        this.previousY = this.skier.getPosition().y;
    }

    /**
     * Updates the local style score
     */
    updateStyleScore() {
        if (this.skier.state === Constants.SKIER_STATE.JUMPING &&
            this.skier.jumpMovement !== Constants.SKIER_JUMPING.JUMP1) {
            this.styleScore += Constants.STYLE_FLIP_INCREMENT;
            if (this.skier.jumpMovement === Constants.SKIER_JUMPING.JUMP5) {
                this.styleScore += Constants.STYLE_FLIP_FINISH_BONUS;
            }
        }
        else if (this.skier.state === Constants.SKIER_STATE.CRASHED) {
            this.styleScore -= Constants.STYLE_CRASH_DECREMENT;
        }
    }

    /**
     * Draws all of the moving entities
     * @param {Canvas} canvas the canvas for the game
     * @param {AssetManager} assetManager the asset manager
     */
    drawMovingEntities(canvas, assetManager) {
        this.skier.draw(canvas, assetManager);
        this.rhino.draw(canvas, assetManager);
    }

    /**
     * returns the skier
     * @returns {Skier} the skier
     */
    getSkier() {
        return this.skier;
    }

    /**
     * returns the rhino
     * @returns {Rhino} the rhino
     */
    getRhino() {
        return this.rhino;
    }

    /**
     * Checks all obstacles against the passed-in entity to see if they collide
     * @param {MovingEntity} entity 
     * @param {ObstacleManager} obstacleManager 
     * @param {AssetManager} assetManager 
     * @returns {Obstacle} returns nothing if there was no collision, otherwise returns the colided with obstacle
     */
    getObstacleIfCollisionWithEntity(entity, obstacleManager, assetManager) {
        return obstacleManager.getObstacles().find((obstacle) => {
            return this.checkIfEntitiesCollide(entity, obstacle, assetManager);
        });
    }

    /**
     * Checks if the skier and rhino collide
     * @param {AssetManager} assetManager the asset manager
     * @returns {boolean} true if there was a collision
     */
    checkIfSkierAndRhinoCollide(assetManager) {
        return this.checkIfEntitiesCollide(this.skier, this.rhino, assetManager);
    }

    /**
     * Checks if any two entities collide
     * @param {Entity} entity1 first entity to check
     * @param {Entity} entity2 second entity to check
     * @param {AssetManager} assetManager the asset manager
     * @returns {boolean} true if there was a collision
     */
    checkIfEntitiesCollide(entity1, entity2, assetManager) {
        const entity1Asset = assetManager.getAsset(entity1.assetName);
        const entity2Asset = assetManager.getAsset(entity2.assetName);

        const entity1Bounds = getAssetBounds(entity1Asset, entity1.getPosition());
        const entity2Bounds = getAssetBounds(entity2Asset, entity2.getPosition());

        return intersectTwoRects(entity1Bounds, entity2Bounds);
    }

    handleKeyDown(event) {
        switch (event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                event.preventDefault();
                break;
            case Constants.KEYS.SPACE:
                this.skier.jump(Constants.SKIER_JUMP_FRAMES);
                event.preventDefault();
                break;
        }
    }
}