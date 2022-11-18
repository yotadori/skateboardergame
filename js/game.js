class Game {

    constructor() {
        // canvas要素を作成 
        this.canvas = document.createElement('canvas');
        // body タグに追加
        document.body.appendChild(this.canvas);
        // canvasのサイズを指定
        this.canvas.width = 400;
        this.canvas.height = 320;

        
        // スケートボーダー
        this.boarder = new Sprite('img/boarder1.jpg', 32, 32)
        this.boarder.x = this.canvas.width / 2 - 16;
        this.boarder.y = this.canvas.height/ 2 - 16;
    } // constructor

    /**
     * ゲームを開始する
     */
    start() {

        // ゲームが始まったときと、ブラウザのサイズが変わったときに呼ばれる 
        const _resizeEvent = () => {
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

        this.boarder.execute(this.canvas);

        requestAnimationFrame(this._mainLoop.bind(this));
    } // _mainLoop()
}