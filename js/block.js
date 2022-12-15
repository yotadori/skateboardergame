'use strict'

class Block extends Sprite {
    
    /**
     * @param {string} img 画像ファイルまでのパス
     * @param {number} width 幅
     * @param {number} height 高さ 
     * 
     */
    constructor(img, width, height) {
        super(img, width, height);
        this.marginLeft = 4;
        this.marginRight = 4;
    } // constructor()

    /**
     * スプライトが自身と重なるか判定する関数
     * 
     * @param {Sprite} sprite スプライト
     * @returns {boolean} spriteが自分と重なるか
     */
    isCollide(sprite) {
        // 移動後の中心座標
        const x1 = sprite.centerX() + sprite.vx;
        const x2 = this.centerX() + this.vx;

        const y1 = sprite.centerY() + sprite.vy;
        const y2 = this.centerY() + this.vy;

        if ((Math.abs(x1 - x2) < (sprite.collideWidth() + this.collideWidth()) / 2)
            && (Math.abs(y1 - y2) < (sprite.collideHeight() + this.collideHeight()) / 2)) {
            return true;
        }
        return false;
    } 

    /**
     * 他のスプライトと衝突したときに呼ばれる関数
     * 
     * @param {Sprite} sprite スプライト
     */
    onCollide(sprite) {
        // 移動後の中心座標
        const x1 = sprite.centerX() + sprite.vx;
        const x2 = this.centerX() + this.vx;

        const y1 = sprite.centerY() + sprite.vy;
        const y2 = this.centerY() + this.vy;

        if (sprite.vy - this.vy >= 0) {
            sprite.y += sprite.vy + Math.abs(y1 - y2) - (sprite.collideHeight() + this.collideHeight()) / 2;
        } else {
            sprite.y += sprite.vy - Math.abs(y1 - y2) + (sprite.collideHeight() + this.collideHeight()) / 2;
        }

        sprite.vy = this.vy;
        if (sprite instanceof SkateBoarder) {
            sprite.onGround = true;
        }
    }
}

