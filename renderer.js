class Renderer {

  constructor (options) {
    const canvas = document.getElementById(options.canvasId);
    this.ctx = canvas.getContext('2d');
    this.sprites = options.sprites;
    this.state = options.state;
  }

  spr (spriteX, spriteY, x, y) {
    const spriteImage = this.sprites.getSpriteImageData(spriteX, spriteY);
    this.ctx.putImageData(spriteImage, x, y);
  }





  render () {
    this.drawBg();
    this.drawMinos();
  }

  drawBg () {
    this.ctx.fillStyle = '#eee';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for(let y = 0; y < BOARD_HEIGHT; y++) {
      for(let x = 0; x < BOARD_WIDTH; x++) {
        this.spr(4, 0, x * SPRITE_SIZE, y * SPRITE_SIZE)
      }
    }
  }

  drawMinos () {
    this.state.board.minos.forEach((mino) => {
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



        this.spr(
                     sX ,sY,
                     block.entity.x * SPRITE_SIZE, block.entity.y * SPRITE_SIZE);
      });
    });
  }

}
