class Game {

    constructor() {
        // canvas要素を作成 
        this.canvas = document.createElement('canvas');
        // body タグに追加
        document.body.appendChild(this.canvas);
        // canvasのサイズを指定
        this.canvas.width = 300;
        this.canvas.height = 400;

        
        // スケートボーダー
        this.boarder = new Sprite('img/boarder1.jpg', 32, 32)
    } // constructor

    /**
     * ゲームを開始する
     */
    start() {
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