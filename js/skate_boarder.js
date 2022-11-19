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

        // ジャンプ中か
        this.jumping = false;

        // アニメーション用のカウンタ
        this.animationCtr = 0;
    } // constructor()

    /**
     * 更新
     */
    update() {
        if (this.vx < this.MAX_SPEED) {
            // 加速
            this.vx += this.ACCEL;
        } 

        // アニメーション
        if (this.jumping) {
            // ジャンプ中
            this.frameNum = 2;
            this.animationCtr = 0;
        } else if (this.animationCtr % 60 < 30) {
            this.frameNum = 1;
        } else {
            this.frameNum = 0;
        }
        this.animationCtr++;

    } // update()

    /**
     * ジャンプ
     */
    jump() {
        this.vy = -1 * this.JUMP_SPEED;
        this.jumping = true;
    } // jump()
}