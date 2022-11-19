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
    } // constructor()

    /**
     * 画像などを画面に表示する
     * 
     * @param {HTMLCanvasElement} canvas 
     * @param {number} cameraX 表示領域の左端X座標
     * @param {number} cameraY 表示領域の上端Y座標
     */
    render(canvas, cameraX, cameraY) {
        // コンテキスト
        const _ctx = canvas.getContext('2d');

        // 描画
        _ctx.drawImage(
            this.img,
            0,
            0,
            this.width,
            this.height,
            this.x - cameraX,
            this.y - cameraY,
            this.width,
            this.height);
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
        return this.x + this.width / 2;
    }

    /**
     * 
     * @returns {number} 中心のY座標
     */
    centerY() {
        return this.y + this.height / 2;
    }
}