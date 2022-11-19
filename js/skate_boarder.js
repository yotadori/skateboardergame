'use strict'

class SkateBoarder extends Sprite {

    /**
     * @param {string} img 画像ファイルまでのパス
     * @param {number} width 幅
     * @param {number} height 高さ 
     * 
    */
    constructor(img, width, height) {
        super(img, width, height);

        // ジャンプの初期速度
        this.JUMP_SPEED = 8;
    } // constructor()

    /**
     * ジャンプ
     */
    jump() {
        this.vy = -1 * this.JUMP_SPEED;
    } // jump()
}