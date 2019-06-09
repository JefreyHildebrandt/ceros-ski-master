export function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function intersectTwoRects(rect1, rect2) {
    return !(rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top);
}

export class Rect {
    left = 0;
    top = 0;
    right = 0;
    bottom = 0;

    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
}

/**
 * Creates a rectangle based off of asset size and position
 * @param {width: number, height: number} asset the asset from Asset Manager
 * @param {*} position the position of the asset
 */
export function getAssetBounds(asset, position) {
    return new Rect(position.x - asset.width / 2,
        position.y - asset.height / 2,
        position.x + asset.width / 2,
        position.y);
}