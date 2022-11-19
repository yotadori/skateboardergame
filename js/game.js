class Game {

    constructor() {
        // canvas要素を作成 
        this.canvas = document.createElement('canvas');
        // body タグに追加
        document.body.appendChild(this.canvas);

        // 表示領域の左上の座標
        this.cameraX = 0;
        this.cameraY = 0;
        
        // スケートボーダー
        this.boarder = new Sprite('img/boarder1.jpg', 32, 32)
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


        // メインループへ
        this._mainLoop();
    } // start()

    /**
     * メインループ
     */
    _mainLoop() {
        // キャンバスを黒塗り
        const _ctx = this.canvas.getContext('2d');
        _ctx.beginPath();
        _ctx.fillStyle = 'black';
        _ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        _ctx.closePath();

        // 描画
        this._render();

        requestAnimationFrame(this._mainLoop.bind(this));
    } // _mainLoop()

    /**
     * 描画処理
     */
    _render() {
        // カメラ座標を更新
        this.cameraX = this.boarder.x + 32 * 2 - (this.canvas.width - this.boarder.width) / 2
        this.cameraY = 0;

        // ボーダーを表示
        this.boarder.render(this.canvas, this.cameraX, this.cameraY);
    }

    /**
     * スプライトなどの更新
     */
    _update() {
        // ボーダーの更新
        this.boarder.update();
    }
}