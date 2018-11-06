function arrayRemove(array, value) {
  if(!array.includes(value)) return;
  array.splice(array.indexOf(value), 1);
  return array;
}

class Board {

  constructor (minos) {
    this.minos = minos;
    this.grid = []
    this.updateCells()
  }

  updateCells () {
    this.blocks = this.minos.flatMap((mino) => mino.blocks)
    // Populate array of rows of cells for fast lookup of block at location
    for(let y = 0; y < BOARD_HEIGHT; y++) {
      for(let x = 0; x < BOARD_WIDTH; x++) {
        let val = this.blocks.find((block) => block.x === x && block.y === y)
        this.grid[y] = this.grid[y] || []
        this.grid[y][x] = val
      }
    }
  }

  canFall (mino) {
    return !mino.onBottom() && !this.touchingMinoBelow(mino)
  }

  touchingMinoBelow (mino) {
    return mino.cellsBelow().some((cell) => !! this.getCell(cell[0], cell[1]))
  }

  getCell (x, y) {
    return this.grid[y][x]
  }

  clearLines () {
    const rows = this.filledRows();
    rows.forEach((row) => {
      row.forEach((block) => {
        this.deleteBlock(block);
      })
    })
    this.updateCells()
  }

  deleteBlock (block) {
    this.minos.forEach((mino) => {
      arrayRemove(mino.blocks, block)
    })
  }

  filledRows () {
    return this.grid.filter((row) => this.isRowFilled(row))
  }

  isRowFilled (row) {
    return row.every((cell) => cell)
  }

}
