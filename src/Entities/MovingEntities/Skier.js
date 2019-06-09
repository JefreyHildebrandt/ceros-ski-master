import * as Constants from "../../Constants";
import { MovingEntity } from "./MovingEntity";

/**
 * The player controlled skier
 */
export class Skier extends MovingEntity {
    // the current asset for the skier
    assetName = Constants.SKIER_DOWN;

    // the current direction the skier is heading
    direction = Constants.SKIER_DIRECTIONS.DOWN;
    // the jump animation the skier is currently in
    jumpMovement = Constants.SKIER_JUMPING.JUMP1;
    // denotes how long the jump is for (plain jump or ramp jump)
    jumpFramesRemaining = 0;
    // the skier's current state based on the constant Constants.SKIER_STATE
    state = Constants.SKIER_STATE.SKIING;

    constructor(x, y) {
        super(x, y);

        this.speed = Constants.SKIER_STARTING_SPEED;
    }

    /**
     * Sets the skier's direction
     * @param {number} direction the skier's direction based on a constant
     */
    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    /**
     * Sets the skier's state
     * @param {number} state 
     */
    setState(state) {
        this.state = state;
        this.updateAsset();
    }

    /**
     * Updates the asset for the skier
     */
    updateAsset() {
        switch(this.state) {
            case Constants.SKIER_STATE.CRASHED:
                this.assetName = Constants.SKIER_CRASH;
                break;
            case Constants.SKIER_STATE.JUMPING:
                this.assetName = Constants.SKIER_JUMPING_ASSET[this.jumpMovement];
                break;
            case Constants.SKIER_STATE.SKIING:
                this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
                break;
            case Constants.SKIER_STATE.EATEN:
                this.assetName = Constants.SKIER_EATEN;
        }
    }

    /**
     * Moves the skier
     */
    move() {
        switch(this.state) {
            case Constants.SKIER_STATE.JUMPING:
                if(this.jumpFramesRemaining <= 0) {
                    if(this.jumpMovement === Constants.SKIER_JUMPING.JUMP1) {
                        this.landFromJump();
                    }
                    else {
                        this.crash()
                        break;
                    }
                }
                this.jumpFramesRemaining--;
            case Constants.SKIER_STATE.SKIING:
                switch(this.direction) {
                    case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                        this.moveMovingEntityLeftDown();
                        break;
                    case Constants.SKIER_DIRECTIONS.DOWN:
                        this.moveMovingEntityDown();
                        break;
                    case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                        this.moveMovingEntityRightDown();
                        break;
                }
                break;
        }
    }

    /**
     * turns the skier left
     */
    turnLeft() {
        switch(this.state) {
            case Constants.SKIER_STATE.CRASHED:
                this.setState(Constants.SKIER_STATE.SKIING);
                this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
                this.moveMovingEntityLeft();
                break;
            case Constants.SKIER_STATE.SKIING:
                if(this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
                    this.moveMovingEntityLeft();
                }
                else {
                    this.setDirection(this.direction - 1);
                }
                break;
        }
    }

    /**
     * Turns the skier right
     */
    turnRight() {
        switch(this.state) {
            case Constants.SKIER_STATE.CRASHED:
                this.setState(Constants.SKIER_STATE.SKIING);
                this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
                this.moveMovingEntityRight();
                break;
            case Constants.SKIER_STATE.SKIING:
                if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
                    this.moveMovingEntityRight();
                }
                else {
                    this.setDirection(this.direction + 1);
                }
                break;
        }
    }

    /**
     * Turns the skier up
     */
    turnUp() {
        switch(this.state) {
            case Constants.SKIER_STATE.SKIING:
                if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
                    this.moveMovingEntityUp();
                }
                break;
        }
    }

    /**
     * Turns the skier down
     */
    turnDown() {
        switch(this.state) {
            case Constants.SKIER_STATE.CRASHED:
                this.setState(Constants.SKIER_STATE.SKIING);
                this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
                break;
            case Constants.SKIER_STATE.SKIING:
                this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        }
    }

    /**
     * Makes the skier jump
     * @param {number} jumpFrames the amount of frames the jump will last for
     */
    jump(jumpFrames) {
        switch(this.state) {
            case Constants.SKIER_STATE.JUMPING:
                this.updateJumpMovement()
                break;
            case Constants.SKIER_STATE.SKIING:
                this.jumpMovement = 0;
                this.jumpFramesRemaining = jumpFrames;
                this.setState(Constants.SKIER_STATE.JUMPING);
                break;
        }
    }

    /**
     * A jump when the skier hits a ramp
     */
    rampJump() {
        if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT || this.direction === Constants.SKIER_DIRECTIONS.LEFT)
        {
            return;
        }
        this.speed = Constants.SKIER_RAMP_JUMP_SPEED;
        this.jump(Constants.SKIER_JUMP_RAMP_FRAMES);
    }

    /**
     * causes the skier to land from the jump
     */
    landFromJump() {
        this.speed = Constants.SKIER_STARTING_SPEED;
        this.setState(Constants.SKIER_STATE.SKIING);
    }

    /**
     * causes the skier to crash
     */
    crash() {
        this.speed = Constants.SKIER_STARTING_SPEED;
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        this.setState(Constants.SKIER_STATE.CRASHED);
    }

    /**
     * Changes the animation for the skier's jump
     */
    updateJumpMovement() {
        this.jumpMovement += 1
        if (this.jumpMovement > Constants.SKIER_JUMPING.JUMP5) {
            this.jumpMovement = Constants.SKIER_JUMPING.JUMP1;
        }
        this.updateAsset();
    }

    /**
     * The obstacle the skier collided with
     * @param {Obstacle} collisionObstacle the collided with obstacle or null if no collision
     */
    handleObstacleCollision(collisionObstacle) {
        if(collisionObstacle) {
            if(!this.checkIfSkierJumpsObstacle(collisionObstacle)) {
                if(collisionObstacle.assetName === Constants.JUMP_RAMP) {
                    this.rampJump();
                }
                else {
                    this.crash();
                }
            }
            
        }
    }

    /**
     * The skier gets eaten
     */
    handleSkierRhinoCollision() {
        this.setState(Constants.SKIER_STATE.EATEN);
    }

    /**
     * Checks if the skier jumped the obstacle it collided with
     * @param {Obstacle} obstacle the obstacle the skier collided with
     */
    checkIfSkierJumpsObstacle(obstacle) {
        return this.state === Constants.SKIER_STATE.JUMPING && obstacle.jumpable;
    }
}