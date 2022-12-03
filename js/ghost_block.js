'use strict'

class GhostBlock extends Block {
    
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
        return false;
    } 

}
