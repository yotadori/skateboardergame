'use strict'

class Obstacle extends Sprite {
    
    /**
     * @param {string} img 画像ファイルまでのパス
     * @param {number} width 幅
     * @param {number} height 高さ 
     * 
     */
    constructor(img, width, height) {
        super(img, width, height);
    } // constructor()

    /**
     * 他のスプライトと衝突したときに呼ばれる関数
     * 
     * @param {Sprite} sprite スプライト
     */
    onCollide(sprite) {
        if (sprite instanceof SkateBoarder) {
            sprite.vx = -3;
            sprite.vy = -5;
        }
    }
}

