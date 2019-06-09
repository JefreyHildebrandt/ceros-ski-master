import "babel-polyfill";

import { Skier } from '../Entities/MovingEntities/Skier';

import { Obstacle } from '../Entities/Obstacles/Obstacle';
import { AssetManager } from '../Core/AssetManager';
import { ObstacleManager } from '../Entities/Obstacles/ObstacleManager';
import * as Constants from "../Constants";
import { MovingEntityManager } from "../Entities/MovingEntities/MovingEntityManager";

describe('skier asset is correct after a collision', () => {
    let skier;
    let obstacleManager;
    let assetManager;
    let movingEntityManager;

    let handleCollision = () => {
        skier.handleObstacleCollision(
            movingEntityManager.getObstacleIfCollisionWithEntity(skier, obstacleManager, assetManager));
    }

    // Will put the skier in the crash state before each test
    beforeEach(() => {
        const collisionX = 0;
        const collisionY = 0;
        obstacleManager = new ObstacleManager();
        assetManager = new AssetManager();
        movingEntityManager = new MovingEntityManager();
        skier = new Skier(collisionX, collisionY);
        
        // populate with an obstacle that will cause a collision with the skier
        const obstacle = new Obstacle(collisionX, collisionY);
        obstacle.assetName = Constants.TREE; 
        obstacleManager.obstacles.push(obstacle);

        // populate all assets with fake height and width
        for (const [assetName] of Object.entries(Constants.ASSETS)) {
            assetManager.loadedAssets[assetName] = {height: 2, width: 2}; 
        }

        // cause a collision 
        handleCollision();
    })

    test('a collision occured', () => {
        expect(skier.assetName).toBe(Constants.SKIER_CRASH);
    });

    test('the skier faces left after pressing left', () => {
        skier.turnLeft();
        expect(skier.assetName).toBe(Constants.SKIER_LEFT);
        handleCollision();
        expect(skier.assetName).toBe(Constants.SKIER_LEFT);
    });
    
    test('the skier faces right after pressing right', () => {
        skier.turnRight();
        expect(skier.assetName).toBe(Constants.SKIER_RIGHT);
        handleCollision();
        expect(skier.assetName).toBe(Constants.SKIER_RIGHT);
    });
    
    test('the skier does not move after pressing up', () => {
        skier.turnUp();
        expect(skier.assetName).toBe(Constants.SKIER_CRASH);
        handleCollision();
        expect(skier.assetName).toBe(Constants.SKIER_CRASH);
    });
    
    test('the skier faces down after pressing down twice', () => {
        skier.turnDown();
        expect(skier.assetName).toBe(Constants.SKIER_DOWN);
        handleCollision();
        expect(skier.assetName).toBe(Constants.SKIER_CRASH);
        skier.turnDown();
        expect(skier.assetName).toBe(Constants.SKIER_DOWN);
    });
})