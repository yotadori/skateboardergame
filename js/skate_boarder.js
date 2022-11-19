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
        // 最高速度
        this.MAX_SPEED = 2;
        // 加速度
        this.ACCEL = 0.05;
    } // constructor()

    /**
     * 更新
     */
    update() {
        if (this.vx < this.MAX_SPEED) {
            this.vx += this.ACCEL;
        } 

    } // update()

    /**
     * ジャンプ
     */
    jump() {
        this.vy = -1 * this.JUMP_SPEED;
    } // jump()
}