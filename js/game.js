'use strict'

class Game {

    constructor() {
        // canvas要素を作成 
        this.canvas = document.createElement('canvas');
        // body タグに追加
        document.body.appendChild(this.canvas);

        // 現在のシーン
        this.currentScene = new PlayScene(this.canvas);

       } // constructor

    /**
     * ゲームを開始する
     */
    start() {

        // ゲームが始まったときと、ブラウザのサイズが変わったときに呼ばれる 
        const _resizeEvent = () => {
            // canvasのサイズを指定
            if (innerWidth > innerHeight) {
                this.canvas.height = 320;
                this.canvas.width = 320 * innerWidth / innerHeight;
            } else {
                this.canvas.width = 320;
                this.canvas.height = 320 * innerHeight / innerWidth;
            }

            const _ratio = Math.min(innerWidth / this.canvas.width, innerHeight / this.canvas.height);
            // canvasのサイズを、ブラウザに合わせて変更する
            this.canvas.style.width = this.canvas.width * _ratio + 'px';
            this.canvas.style.height = this.canvas.height * _ratio + 'px';
        } // _resizeEvent()

        // ブラウザのサイズが変更されたとき
        addEventListener('resize', _resizeEvent, {passive: true});
        // 画面のリサイズ
        _resizeEvent();

        // 入力イベントの設定
        this._setInput();

        // メインループへ
        this._mainLoop();
    } // start()

    /**
     * メインループ
     */
    _mainLoop() {
        this.currentScene.execute();

        // 繰り返す
        requestAnimationFrame(this._mainLoop.bind(this));
    } // _mainLoop()

    /**
     * 入力イベントの設定
     */
    _setInput() {
        // キーボードが押されたときと、離されたときに呼ばれる
        const _keyEvent = e => {
            // デフォルトのイベントを発生させない
            e.preventDefault();

            // 現在のシーンの、キーイベントを割り当てるメソッドを呼び出す
            this.currentScene.assignKeyEvent(e);
        } // keyEvent()
        
        // 何かキーが押されたとき
        addEventListener('keydown', _keyEvent, {
            passive: false
        }
        );
        // キーが離されたとき
        addEventListener('keyup', _keyEvent, {
            passive: false
        });

        // 画面がタッチされたり、指が動いたりしたときなどに呼ばれる
        const _touchEvent = e => {
            // デフォルトのイベントを察性させない
            e.preventDefault();
            // タッチされた場所などの情報を取得
            const _touches = e.changedTouches[0];
            // 表示領域の左上から見てどこにあるか
            const _rect = _touches.target.getBoundingClientRect();
            // タッチされた場所を計算
            const _fingerPosition = {
                x: (_touches.clientX - _rect.left) / _rect.width * this.canvas.width,
                y: (_touches.clientY - _rect.top) / _rect.height * this.canvas.height
            };
            // イベントのタイプ
            const _eventType = e.type;
            // タッチイベントを割り当てるためのメソッドを呼び出す
            this.currentScene.assignTouchEvent(_eventType, _fingerPosition);
        } // _touchEvent()

        // タッチされたとき
        this.canvas.addEventListener('touchstart', _touchEvent, {passive: false});
        // 指が動かされたとき
        this.canvas.addEventListener('touchmove', _touchEvent, {passive: false});
        // 指が離されたとき
        this.canvas.addEventListener('touchend', _touchEvent, {passive: false});
    } // _setInput()

    
}