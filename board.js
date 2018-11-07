function arrayUniq(array) {
  return array.reduce((ar, item) => ar.includes(item) ? ar : ar.concat(item), [])
}

function arrayRemove(array, value) {
  if(!array.includes(value)) return;
  array.splice(array.indexOf(value), 1);
  return array;
}


// player controlling falling mino
const BOARD_STATE_INTERACTIVE = 'Interactive'
// line clear animation
const BOARD_STATE_CLEARING = 'Clearing'
// settle animation - falling block entities
const BOARD_STATE_SETTLING = 'Settling'


class Board {

  constructor (minos) {
    this.minos = minos;
    this.grid = []
    this.blocks = []
    this.updateCells()
    this.setState(BOARD_STATE_INTERACTIVE)
    this.rowsToClear = []
  }

  setState(state) {
    console.log("state: " + this.state + '->' + state);
    this.state = state
    this.stateFrame = 0
  }


  // Update minos to the lowest position they can fall to instantly
  // and start updating their entities for settle animation
  drop () {
    let updatedCount = 1
    while(updatedCount > 0) {
      updatedCount = 0;
      this.minos.forEach((mino) => {
        if(this.canFall(mino)) {
          updatedCount ++;
          mino.moveDown();
          board.updateCells();
        }
      })
    }
    this.setState(BOARD_STATE_SETTLING)
  }



  update () {
    this.stateFrame ++;
    this["update" + this.state]()
  }

  updateSettling () {
    this.updateBlockEntities()
    if(this.stateFrame > 45) {
      this.startLineClearing()
    }
  }

  updateClearing () {
    if(this.stateFrame > 10) {
      // removes the filled rows
      this.clearLines();
      // move blocks down and start the falling animation
      this.drop();
    }
  }

  updateInteractive () {
  }

  updateBlockEntities () {
    this.blocks.forEach((block) => block.entity.update())
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

  startLineClearing () {
    // store this.rowsToClear - array of row indeces
    this.rowsToClear = this.filledRows();
    if(this.rowsToClear.length) {
      // starts the clearing animation, at the end of which the rows will be removed
      this.setState(BOARD_STATE_CLEARING)
    }
    else {
      // no rows to clear
      this.setState(BOARD_STATE_INTERACTIVE)
    }
  }

  clearLines () {
    // All blocks that are on one of the rows to be cleared
    const blocks = this.blocks.filter((b) => this.rowsToClear.includes(b.y))

    // unique minos intersecting these blocks
    const minos = arrayUniq(blocks.map((block) => this.minos.find((mino) => mino.blocks.includes(block))))

    // new minos resulting from splitting
    const newMinos = minos.flatMap((mino) => mino.split(blocks))

    // remove the old minos
    minos.forEach((mino) => arrayRemove(this.minos, mino));

    // replace with new ones
    this.minos = this.minos.concat(newMinos)

    // Rebuilt the grid of blocks
    this.updateCells()

    this.rowsToClear = []
  }

  filledRows () {
    const rowIndices = Array.from(this.grid.keys())
    return rowIndices.filter((i) => this.isRowFilled(i))
  }

  isRowFilled (row) {
    return this.grid[row].every((b) => b)
  }

}
