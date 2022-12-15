'use strict'

class Pylon extends Obstacle {

    /**
     * @param {string} img 画像ファイルまでのパス
     * @param {number} width 幅
     * @param {number} height 高さ 
     * 
     */
    constructor(img, width, height) {
        super(img, width, height);
        this.marginTop = 5;
        this.marginLeft = 5;
        this.marginRight = 5;
    } // constructor()

}