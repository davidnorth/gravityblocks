const BOARD_OFFSET_X = 16
const BOARD_OFFSET_Y = 16

class Renderer {

  constructor (options) {
    const canvas = document.getElementById(options.canvasId);
    this.ctx = canvas.getContext('2d');
    this.sprites = options.sprites;
    this.state = options.state;
    this.onReady = options.onReady;
    this.prepare();
  }


  prepare () {

    this.bgCanvas = document.createElement('canvas')
    this.bgCanvas.width = 192
    this.bgCanvas.height = 192
    this.bgCtx = this.bgCanvas.getContext('2d');
    this.drawBg();

    this.bgImage = this.bgCtx.getImageData(0, 0, 192, 192)

    this.onReady(this)
  }

  drawBg () {
    this.bgCtx.fillStyle = '#eee';
    this.bgCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


    for(let y = 0; y < CANVAS_HEIGHT / SPRITE_SIZE; y++) {
      for(let x = 0; x < CANVAS_WIDTH / SPRITE_SIZE; x++) {
        this.spr(this.bgCtx, 10, 0, x * SPRITE_SIZE, y * SPRITE_SIZE)
      }
    }

    for(let y = 0; y < BOARD_HEIGHT; y++) {
      for(let x = 0; x < BOARD_WIDTH; x++) {
        this.spr(this.bgCtx, 4, 0, x * SPRITE_SIZE + BOARD_OFFSET_X, y * SPRITE_SIZE + BOARD_OFFSET_Y)
      }
    }
  }



  spr (ctx, spriteX, spriteY, x, y) {
    const spriteImage = this.sprites.getSpriteImageData(spriteX, spriteY);
    ctx.putImageData(spriteImage, x, y);
  }





  render () {
    this.ctx.putImageData(this.bgImage, 0, 0);
    this.drawMinos();
  }

  drawMino (mino) {
      mino.blocks.forEach((block) => {
        let sX, sY
        if(this.state.board.rowsToClear.includes(block.y) && (this.state.board.stateFrame) % 2 === 0) {
          console.log("block in row to clear");
          sX = 2
          sY = 0
        } else {
          sX = spriteMap[block.col][0]
          sY = spriteMap[block.col][1]
        }
        this.spr(this.ctx,
                     sX ,sY,
                     block.entity.x * SPRITE_SIZE + BOARD_OFFSET_X, block.entity.y * SPRITE_SIZE + BOARD_OFFSET_Y);
      });
  }

  drawMinos () {
    this.state.board.minos.forEach(this.drawMino.bind(this));
    if(this.state.board.newMino) {
      this.drawMino(this.state.board.newMino)
    }
  }

}
