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

        // ブロック
        this.blocks = [];
        for (let i = 0; i < 5; i++) {
            let block = new Sprite('img/stone.png', 32, 32);
            block.x = i * 32;
            block.y = 8 * 32;

            this.blocks.push(block);
        }

        // 重力加速度
        this.G_ACCEL = 0.1;
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

        this._update();

        requestAnimationFrame(this._mainLoop.bind(this));
    } // _mainLoop()

    /**
     * 描画処理
     */
    _render() {
        // カメラ座標を更新
        this.cameraX = this.boarder.x + 32 * 2 - (this.canvas.width - this.boarder.width) / 2
        this.cameraY = 0;

        // ブロックを表示
        for (let i in this.blocks) {
            this.blocks[i].render(this.canvas, this.cameraX, this.cameraY);
        }

        // ボーダーを表示
        this.boarder.render(this.canvas, this.cameraX, this.cameraY);
    } // render()

    /**
     * スプライトなどの更新
     */
    _update() {
        // ボーダーの更新
        this.boarder.update();
        
        // ブロックの更新
        for (let i in this.blocks) {
            this.blocks[i].update();
        }

        // 重力加速度を加算
        this.boarder.vy += this.G_ACCEL;

        
        // 衝突判定
        for (let i in this.blocks) {
            // 重なっているか
            const isCollide = (sprite1, sprite2) => {
                // 移動後の中心座標
                const x1 = sprite1.centerX() + sprite1.vx;
                const x2 = sprite2.centerX() + sprite2.vx;
                
                const y1 = sprite1.centerY() + sprite1.vy;
                const y2 = sprite2.centerY() + sprite2.vy;

                if ((Math.abs(x1 - x2) < (sprite1.width + sprite2.width) / 2)
                    && (Math.abs(y1 - y2) < (sprite1.height + sprite2.height) / 2)) {
                    return true;
                }
                return false;
            };
            
            // ブロックとボーダーの衝突判定
            if (isCollide(this.boarder, this.blocks[i])) {
                let dy = (this.boarder.vy - this.blocks[i].vy);
                while (dy > 0) {
                    dy /= 2;
                    // ちょうど衝突しなくなるまで速度を調整
                    if (isCollide(this.boarder, this.blocks[i])) {
                        this.boarder.vy -= dy;
                    } else {
                        this.boarder.vy += dy;
                    }
                }
            }
        }


        // 動かす
        this.boarder.x += this.boarder.vx;
        this.boarder.y += this.boarder.vy;
        
        for (let i in this.blocks) {
            this.blocks[i].x += this.blocks[i].vx;
            this.blocks[i].y += this.blocks[i].vy;
        }
        
    } // update()
}