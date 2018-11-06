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
    for(let y = 0; y < BOARD_HEIGHT; y++) {
      for(let x = 0; x < BOARD_WIDTH; x++) {
        this.spr(4, 0, x * SPRITE_SIZE, y * SPRITE_SIZE)
      }
    }
  }

  drawMinos () {
    this.state.board.minos.forEach((mino) => {
      mino.blocks.forEach((block) => {
        this.spr(
                     spriteMap[block.col][0], spriteMap[block.col][1],
                     block.x * SPRITE_SIZE, block.y * SPRITE_SIZE);
      });
    });
  }

}
