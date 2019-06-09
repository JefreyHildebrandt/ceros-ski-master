import * as Constants from "../../Constants";
import { Entity } from "../Entity";

/**
 * Extends base Entity.  These are entities that move around on the screen.  Either automatically or by user input.
 */
export class MovingEntity extends Entity {
    direction;
    speed;

    constructor(x, y) {
        super(x, y);
    }

    /**
     *  move is called every frame and is in charge of moving the entity
     */
    move() {
        throw new Error('Abstract function move() must be implemented by extending class');
    }

    /**
     *  a blank obstacle is passed if there is no collision, otherwise it will pass the obstacle the moving entity collided with
     *  @param {Obstacle} collisionObstacle
     */ 
    handleObstacleCollision(collisionObstacle) {
        throw new Error('Abstract function handleObstacleCollision() must be implemented by extending class');
    }

    /**
     * Handler for when the rhino and skier collide
     */
    handleSkierRhinoCollision() {
        throw new Error('Abstract function handleOtherMovingEntityCollision() must be implemented by extending class')
    }

    /**
     * Moves the entity left on the canvas
     */
    moveMovingEntityLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    /**
     * Moves the entity left and up on the canvas
     */
    moveMovingEntityLeftUp() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    /**
     * Moves the entity left and down on the canvas
     */
    moveMovingEntityLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    /**
     * Moves the entity down on the canvas
     */
    moveMovingEntityDown() {
        this.y += this.speed;
    }

    /**
     * Moves the entity right and up on the canvas
     */
    moveMovingEntityRightUp() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    /**
     * Moves the entity right and down on the canvas
     */
    moveMovingEntityRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    /**
     * Moves the entity right on the canvas
     */
    moveMovingEntityRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    /**
     * Moves the entity up on the canvas
     */
    moveMovingEntityUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }    
}