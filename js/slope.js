'use strict'

class Slope extends Block {
    
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

        if ((Math.abs(x1 - x2) < (sprite.width + this.width) / 2)
            && (Math.abs(y1 - y2) < (sprite.height + this.height) / 2) &&
            Math.abs(y1 + sprite.height/2 - y2 - this.height/2) < Math.abs(x1 + sprite.width/2 - x2 + this.width/2) * this.height / this.width) {
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

        if (x2 + this.width/2 < x1 + sprite.width/2) {
            sprite.y += sprite.height + sprite.vy + Math.abs(y1 - y2) - (sprite.height + this.height) / 2;
        } else {
            sprite.y += sprite.vy + Math.abs(y1 + sprite.height / 2 - y2 - this.height / 2)
                - Math.abs(x1 + sprite.width / 2 - x2 + this.width / 2) * this.height / this.width;
        }
       
        sprite.vy = this.vy;
        if (sprite instanceof SkateBoarder) {
            sprite.onGround = true;
        }
    }
}
