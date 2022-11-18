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
        // サイズ
        this.width = width || 32;
        this.height = height || 32;
    } // constructor()

    /**
     * 更新する
     * 
     * @param {canvas} canvas キャンバス
     */
    execute(canvas) {
        // 画像などを表示
        this.render(canvas);
        
        // 座標などを更新
        this.update();
    } // execute()

    /**
     * 画像などを画面に表示する
     * 
     * @param {canvas} canvas 
     */
    render(canvas) {
        // コンテキスト
        const _ctx = canvas.getContext('2d');

        // 描画
        _ctx.drawImage(
            this.img,
            0,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height);
    } // render()

    /**
     * 座標などを更新する
     */
    update() {}
}