'use strict'

class Scene {

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        this.canvas = canvas;
    } // constructor()

    /**
     * 実行
     */
    execute() {}

    /**
     * タッチイベントを割り当てるためのメソッド
     * 
     * 引数
     * eventType : イベントのタイプ
     * fingerPosition : 指の位置
     */
    assignTouchEvent(eventType, fingerPosition) {

        // イベントのタイプによって呼びだすメソッドを変える
        switch (eventType) {
            case 'touchstart':
                // 現在のシーンのtouchstartイベントを呼び出す
                this.ontouchstart(fingerPosition.x, fingerPosition.y);
                break;
            case 'touchmove':
                // 現在のシーンのtouchmoveメソッドを呼び出す
                this.ontouchmove(fingerPosition.x, fingerPosition.y);
                break;
            case 'touchend':
                // 現在のシーンのtouchendメソッドを呼び出す
                this.ontouchend(fingerPosition.x, fingerPosition.y);
                break;
        }
    } // assignTouchEvent()

    /**
     * キー入力があったときに呼ばれる
     */
    assignKeyEvent() { }
    
    /**
     * タッチされたときに呼び出さる
     */
    ontouchstart() {}

    /**
     * 指が動かされたときに呼び出される
     */
    ontouchmove() {}

    /**
     * 指が離されたときに呼び出される
     */
    ontouchend() {}

}