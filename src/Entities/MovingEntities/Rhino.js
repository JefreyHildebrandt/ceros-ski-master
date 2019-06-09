import * as Constants from "../../Constants";
import { MovingEntity } from './MovingEntity';
import { getAssetBounds, intersectTwoRects, Rect } from "../../Core/Utils";

/**
 * The rhino that chases and eats the skier
 */
export class Rhino extends MovingEntity {
    // default rhino asset
    assetName = Constants.RHINO_DEFAULT;
    // the rhino will change its animation once this reaches zero
    rhinoRedrawFramesRemaining = Constants.RHINO_FRAMES_TO_REDRAW;
    // switches between run animations
    toggleRun = 0;
    // switches between eat animations
    eatAnimation = 0;
    // the rhino tries to move towards the skier
    positionToMoveTo = {
        x: 0,
        y: 0
    };
    

    constructor(x, y) {
        super(x, y);
        this.speed = Constants.RHINO_SPEED
    }

    /**
     * sets the position the rhino will move to
     * @param {x: number, y: number} position the position to move to
     */
    setPositionToMoveTo(position) {
        this.positionToMoveTo = position;
    }

    /**
     * Changes the run asset
     * @param {*} runAssetConstant the map for the run asset for a movement
     */
    updateRunAsset(runAssetConstant) {
        if(this.checkForAnimationUpdate()) {
            if(this.toggleRun === 0) {
                this.toggleRun = 1;
            }
            else {
                this.toggleRun = 0;
            }
            this.assetName = runAssetConstant[this.toggleRun];
        }
    }

    /**
     * Updates the eat asset
     */
    updateEatAsset() {
        if(this.checkForAnimationUpdate()) {
            this.assetName = Constants.RHINO_EAT_ASSET[this.eatAnimation];
            if(this.eatAnimation === Constants.RHINO_EAT.DEFAULT) {
                this.eatAnimation = Constants.RHINO_EAT.EAT3;
            }
            else {
                this.eatAnimation++;
            }
        }
    }

    /**
     * Moves the rhino based on the skier's position
     * @param {Skier} skier the skier the rhino chases
     * @param {AssetManager} assetManager the asset manager
     */
    move(skier, assetManager) {
        const skierAsset = assetManager.getAsset(skier.assetName);
        const rhinoAsset = assetManager.getAsset(this.assetName);
        const skierBounds = getAssetBounds(skierAsset, this.positionToMoveTo);
        const rhinoBounds = getAssetBounds(rhinoAsset, this.getPosition());

        if(intersectTwoRects(skierBounds, rhinoBounds)) {
            return;
        }

        // checks if the skier is within direct line of sight to the rhino
        const alignedUp = intersectTwoRects(skierBounds, new Rect(rhinoBounds.left, skierBounds.top, rhinoBounds.right, rhinoBounds.bottom));
        const alignedRight = intersectTwoRects(skierBounds, new Rect(rhinoBounds.left, rhinoBounds.top, skierBounds.right, rhinoBounds.bottom));
        const alignedDown = intersectTwoRects(skierBounds, new Rect(rhinoBounds.left, rhinoBounds.top, rhinoBounds.right, skierBounds.bottom));
        const alignedLeft = intersectTwoRects(skierBounds, new Rect(skierBounds.left, rhinoBounds.top, rhinoBounds.right, rhinoBounds.bottom));

        const left = this.x > this.positionToMoveTo.x;
        const up = this.y > this.positionToMoveTo.y;

        if(alignedUp) {
            this.moveMovingEntityUp();
            this.updateRunAsset(Constants.RHINO_RUN_UP_OR_DOWN_OR_LEFTMOTION_ASSET);
        }
        else if(alignedRight) {
            this.moveMovingEntityRight();
            this.updateRunAsset(Constants.RHINO_RUN_RIGHT_MOTION_ASSET);
        }
        else if(alignedDown) {
            this.moveMovingEntityDown();
            this.updateRunAsset(Constants.RHINO_RUN_UP_OR_DOWN_OR_LEFTMOTION_ASSET);
        }
        else if(alignedLeft) {
            this.moveMovingEntityLeft();
            this.updateRunAsset(Constants.RHINO_RUN_UP_OR_DOWN_OR_LEFTMOTION_ASSET);
        }
        else if(left && up) {
            this.moveMovingEntityLeftUp();
            this.updateRunAsset(Constants.RHINO_RUN_UP_OR_DOWN_OR_LEFTMOTION_ASSET);
        }
        else if(!left && up) {
            this.moveMovingEntityRightUp();
            this.updateRunAsset(Constants.RHINO_RUN_RIGHT_MOTION_ASSET);
        }
        else if(left && !up) {
            this.moveMovingEntityLeftDown();
            this.updateRunAsset(Constants.RHINO_RUN_UP_OR_DOWN_OR_LEFTMOTION_ASSET);
        }
        else if(!left && !up) {
            this.moveMovingEntityRightDown();
            this.updateRunAsset(Constants.RHINO_RUN_RIGHT_MOTION_ASSET);
        }
    }

    /**
     * Limits the amount that the rhino updates its animation
     */
    checkForAnimationUpdate() {
        if(this.rhinoRedrawFramesRemaining < 0) {
            this.rhinoRedrawFramesRemaining = Constants.RHINO_FRAMES_TO_REDRAW;
            return true;
        }
        this.rhinoRedrawFramesRemaining--;
        return false;
    }

    /**
     * Destroys an obstacle if the rhino touches it
     * @param {Obstacle} collisionObstacle the obstacle the rhino touched
     */
    handleObstacleCollision(collisionObstacle) {
        if(collisionObstacle) {
            collisionObstacle.destroyObstacle();
        }
    }

    /**
     * The rhino eats the skier when they come into contact
     */
    handleSkierRhinoCollision() {
        this.updateEatAsset();
    }
}