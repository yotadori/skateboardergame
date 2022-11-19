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
        this.JUMP_SPEED = 5;
        // ジャンプの長さ最大値
        this.JUMP_MAX_LENGTH = 30;
        // 最高速度
        this.MAX_SPEED = 2;
        // 加速度
        this.ACCEL = 0.05;

        // ジャンプ中か
        this.jumping = false;

        // ジャンプ用のカウンタ
        this.jumpCtr = 0;

        // 地面についているか
        this.onGround = true;

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

        // ジャンプ
        if (this.jumping) {
            this.vy = -1 * this.JUMP_SPEED + this.JUMP_SPEED * (this.jumpCtr / this.JUMP_MAX_LENGTH);

            if (this.jumpCtr > this.JUMP_MAX_LENGTH) {
                this.jumpEnd();
            }
            this.jumpCtr++;
        }

        // アニメーション
        if (this.onGround == false) {
            // 空中
            this.frameNum = 2;
            // 高く飛んだとき
            if (this.JUMP_MAX_LENGTH - 10 < this.jumpCtr && this.jumpCtr < this.JUMP_MAX_LENGTH) {
                this.frameNum = 3;
            }
        } else if (this.animationCtr % 60 < 30) {
            this.frameNum = 1;
        } else {
            this.frameNum = 0;
        }
        this.animationCtr++;

    } // update()

    /**
     * ジャンプ始め
     */
    jumpStart() {
        this.jumping = true;
        this.animationCtr = 0;
    } // jump()

    /**
     * ジャンプ終わり
     */
    jumpEnd() {
        this.jumpCtr = 0;
        this.jumping = false;
    }
}