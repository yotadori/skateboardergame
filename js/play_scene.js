'use strict'

class PlayScene extends Scene {

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        super(canvas);

        // 表示領域の左上の座標
        this.cameraX = 0;
        this.cameraY = 0;

        // スケートボーダー
        this.boarder = new SkateBoarder('img/boarder.png', 32, 32)
        this.boarder.y = 6 * 32;

        // ブロック
        this.blocks = [];
        for (let i = 0; i < 50; i++) {
            let block = new Sprite('img/stone.png', 32, 32);
            block.x = i * 32;
            block.y = 7 * 32;

            this.blocks.push(block);
        }

        // ジャンプするフラグ
        this.jumpFlag = false;

        // 重力加速度
        this.G_ACCEL = 0.5;

    } // constructor()

    execute() {

        // キャンバスを塗りつぶす
        const _ctx = this.canvas.getContext('2d');
        _ctx.beginPath();
        _ctx.fillStyle = 'white';
        _ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        _ctx.closePath();

        // 描画
        this._render();

        this._update();
    } // execute()

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

        if (!this.jumpFlag) {
            this.boarder.jumpEnd();
        }

        if (this.boarder.jumpCtr > this.boarder.JUMP_MAX_LENGTH && this.jumpFlag) {
            this.boarder.jumpEnd();
            this.jumpFlag = false;
        }

        // ブロックの更新
        for (let i in this.blocks) {
            this.blocks[i].update();
        }

        // 重力加速度を加算
        this.boarder.vy += this.G_ACCEL;


        this.boarder.onGround = false;

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
                // 衝突するとき

                this.boarder.onGround = true;
                // ジャンプ終了
                this.boarder.jumpEnd();

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
                
                if (this.jumpFlag && this.boarder.vy < 1) {
                    // もしジャンプフラグがたっていたらジャンプ
                    this.boarder.jumpStart();
                }
            }
        }

        // #debug
        if (this.boarder.x > 32 * 30) {
            this.boarder.x = 0;
        }

        // 動かす
        this.boarder.x += this.boarder.vx;
        this.boarder.y += this.boarder.vy;

        for (let i in this.blocks) {
            this.blocks[i].x += this.blocks[i].vx;
            this.blocks[i].y += this.blocks[i].vy;
        }

    } // _update()

    /**
     * キー入力があったとき
     */
    assignKeyEvent(e) {
        // スペースキーのみを判定する
        switch (e.type) {
            case 'keydown':
                if (e.key === ' ') {
                    // ジャンプフラグをたてる
                    this.jumpFlag = true;
                    break;
                }
            case 'keyup':
                if (e.key === ' ') {
                    this.jumpFlag = false;
                    break;
                }
        }
    }

    /**
     * 画面がタッチされたとき
     */
    ontouchstart() {
        // ジャンプフラグをたてる
        this.jumpFlag = true;
    }

    /**
     * 指が離れたとき
     */
    ontouchend() {
        // ジャンプフラグをおろす
        this.jumpFlag = false;
    }
}