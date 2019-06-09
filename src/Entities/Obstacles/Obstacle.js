import * as Constants from "../../Constants";
import { Entity } from "../Entity";
import { randomInt } from '../../Core/Utils';

const assetTypes = [
    Constants.TREE,
    Constants.TREE_CLUSTER,
    Constants.ROCK1,
    Constants.ROCK2,
    Constants.JUMP_RAMP
];

export class Obstacle extends Entity {
    jumpable = true;

    constructor(x, y) {
        super(x, y);

        const assetIdx = randomInt(0, assetTypes.length - 1);
        this.assetName = assetTypes[assetIdx];
        if(this.assetName === Constants.TREE || this.assetName === Constants.TREE_CLUSTER) {
            this.jumpable = false;
        }
    }

    /**
     * Changes the obstacle to its destroyed asset
     */
    destroyObstacle() {
        this.assetName = Constants.DESTROY_OBSTACLE[this.assetName];
        this.jumpable = true;
    }
}