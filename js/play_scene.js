'use strict'

class PlayScene extends Scene {

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        super(canvas);

        this.TILE_SIZE = 32;

        this.MAP = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 3, 0, 1, 1, 1, 1, 0, 0, 4, 0, 4, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1]
        ];

        // 表示領域の左上の座標
        this.cameraX = 0;
        this.cameraY = 0;

        // スケートボーダー
        this.boarder = new SkateBoarder('img/boarder.png', 32, 32)

        // ブロック
        this.blocks = [];

        // 障害物
        this.obstacles = [];

        // マップデータから生成
        for (let y = 0; y < this.MAP.length; y++) {
            for (let x = 0; x < this.MAP[0].length; x++) {
                switch (this.MAP[y][x]) {
                    case 1:
                        if (y != 0 && this.MAP[y - 1][x] == 3) {
                            const block = new GhostBlock('img/stone.png', 32, 32);
                            block.x = x * this.TILE_SIZE;
                            block.y = y * this.TILE_SIZE;
                            this.blocks.push(block);
                        } else {
                            const block = new Block('img/stone.png', 32, 32);
                            block.x = x * this.TILE_SIZE;
                            block.y = y * this.TILE_SIZE;
                            this.blocks.push(block);
                        }

                        break;
                    case 2:
                        this.boarder.x = x * this.TILE_SIZE;
                        this.boarder.y = x * this.TILE_SIZE;
                        break;
                    case 3:
                        const slope = new Slope('img/slope1.png', 64, 32);
                        slope.x = x * this.TILE_SIZE;
                        slope.y = y * this.TILE_SIZE;
                        this.blocks.push(slope)
                        break;
                    case 4:
                        // 障害物
                        const obstacle = new Pylon('img/pylon.png', 16, 16)
                        obstacle.x = x * this.TILE_SIZE;
                        obstacle.y = y * this.TILE_SIZE + 16;
                        this.obstacles.push(obstacle)
                        break;
                }
            }
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
        this.cameraX = this.boarder.x + this.TILE_SIZE * 2 - (this.canvas.width - this.boarder.width) / 2
        this.cameraY = 0;

        // ブロックを表示
        for (let i in this.blocks) {
            this.blocks[i].render(this.canvas, this.cameraX, this.cameraY);
        }
        
        // 障害物を表示
        for (let i in this.obstacles) {
            this.obstacles[i].render(this.canvas, this.cameraX, this.cameraY);
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

        // 障害物の更新
        for (let i in this.obstacles) {
            this.obstacles[i].update();
        }

        // 重力加速度を加算
        this.boarder.vy += this.G_ACCEL;

        for (let i in this.obstacles) {
            this.obstacles[i].vy += this.G_ACCEL;
        }


        this.boarder.onGround = false;
        this.boarder.rotate = 0;

        // 衝突判定
        for (let i in this.blocks) {
            // ブロックとボーダーの衝突判定
            if (this.blocks[i].isCollide(this.boarder)) {
                this.blocks[i].onCollide(this.boarder);

                // ジャンプ終了
                this.boarder.jumpEnd();
                
                if (this.jumpFlag) {
                    // もしジャンプフラグがたっていたらジャンプ
                    this.boarder.jumpStart();
                }
            }
        }
        for (let i in this.obstacles) {
            // 障害物とボーダーの衝突判定
            if (this.obstacles[i].isCollide(this.boarder)) {
                this.obstacles[i].onCollide(this.boarder);
            }

            // 障害物とブロックの衝突判定
            for (let j in this.blocks) {
                if (this.blocks[j].isCollide(this.obstacles[i])) {
                    this.blocks[j].onCollide(this.obstacles[i])
                }
            }
        }

        // #debug
        if (this.boarder.x > this.MAP[0].length * this.TILE_SIZE) {
            this.boarder.x = 0;
        }

        // 動かす
        this.boarder.x += this.boarder.vx;
        this.boarder.y += this.boarder.vy;

        for (let i in this.blocks) {
            this.blocks[i].x += this.blocks[i].vx;
            this.blocks[i].y += this.blocks[i].vy;
        }
        
        for (let i in this.obstacles) {
            this.obstacles[i].x += this.obstacles[i].vx;
            this.obstacles[i].y += this.obstacles[i].vy;
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