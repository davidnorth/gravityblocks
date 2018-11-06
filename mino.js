class Mino {

  constructor (blocks) {
    this.blocks = blocks;
    this.landed = false;
  }

  moveDown () {
    this.blocks.forEach((block) => {
      block.y++;
    });
  }

  cellsBelow () {
    return this.blocks
      // all cells below a block's position
      .map((block) => [block.x, block.y + 1])
      // no occupied by another block in this mino
      .filter((cell) => !this.blocks.some((block) => block.x === cell[0] && block.y === cell[1])
      )
  }

  onBottom () {
    return this.blocks.some((block) => block.y === BOARD_HEIGHT -1)
  }

}
