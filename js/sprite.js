'use strict'

class Sprite {
    
    /**
     * @param {string} img 画像ファイルまでのパス
     * @param {number} width 幅
     * @param {number} height 高さ 
     * 
     */
    constructor(img, width, height) {
        // 画像
        this.img = new Image();
        this.img.src = img;
        // 座標
        this.x = this.y = 0;
        // 速度
        this.vx = this.vy = 0;
        // サイズ
        this.width = width || 32;
        this.height = height || 32;
        // 何番目の画像を表示するか
        this.frameNum = 0;
        // 角度
        this.rotate = 0;
        // 衝突判定のマージン
        this.marginLeft = 0;
        this.marginRight = 0;
        this.marginTop = 0;
        this.marginBottom = 0;
    } // constructor()

    /**
     * 画像などを画面に表示する
     * 
     * @param {HTMLCanvasElement} canvas 
     * @param {number} cameraX 表示領域の左端X座標
     * @param {number} cameraY 表示領域の上端Y座標
     */
    render(canvas, cameraX, cameraY) {
        // キャンバスの外にスプライトがあるとき、ここでこのメソッドを終了する
        if (this.x - cameraX < -1 * this.width || this.x - cameraX > canvas.width) return;
        if (this.y - cameraY < -1 * this.height || this.y - cameraY> canvas.height) return;


        // コンテキスト
        const _ctx = canvas.getContext('2d');
        
        // スプライトを回転させるときの中心位置を変更するための、canvasの原点の移動量
        const _translateX = this.centerX() - cameraX;
        const _translateY = this.centerY() - cameraY;
        // 描画状態を保存する
        _ctx.save();
        // canvasの原点の移動
        _ctx.translate(_translateX, _translateY);
        // canvasを回転
        _ctx.rotate(this.rotate);
        // 移動したcanvasの原点を戻す
        _ctx.translate(-1 * _translateX, -1 * _translateY);
        // 描画
        _ctx.drawImage(
            this.img,
            this.frameNum * this.width,
            0,
            this.width,
            this.height,
            this.x - cameraX,
            this.y - cameraY,
            this.width,
            this.height);
        // 保存しておいた描画状態に戻す
        _ctx.restore();
    } // render()

    /**
     * 座標などを更新する
     */
    update() {}

    /**
     * 
     * @returns {number} 中心のX座標
     */
    centerX() {
        return this.x + (this.marginLeft + this.width - this.marginRight) / 2;
    }

    /**
     * 
     * @returns {number} 中心のY座標
     */
    centerY() {
        return this.y + (this.marginTop + this.height - this.marginBottom) / 2;
    }

    /**
     * 
     * @returns {number} 衝突判定に使う幅
     */
    collideWidth() {
        return this.width - this.marginRight - this.marginLeft;
    }
    
    /**
     * 
     * @returns {number} 衝突判定に使う高さ
     */
    collideHeight() {
        return this.height - this.marginTop - this.marginBottom;
    }

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
}