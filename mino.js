
// Lookup for piece shape and rotation

// values are arrays of rotated shapes
// each of these is an array of block x/y pairs
const SHAPE_TABLE = {
  1: [
    [[1,0], [1,1], [1,2]],
    [[0,1], [1,1], [2,1]]
  ],
  2: [
    [[1,0],[1,1],[2,1]],
    [[1,1],[2,1],[2,2]],
    [[0,1],[1,1],[2,1]],
    [[1,0],[0,1],[1,1]]
  ]
}

class Mino {


  constructor (shape, x, y) {
    this.rotation = 0;
    // is first arg an array (presumably of blocks)
    if(shape.map) {
      this.blocks = shape
    } else {
      // or its a shape identifier
      // we need to store an origin position
      this.x = x
      this.y = y
      this.shape = shape;
      this.rebuildBlocks()
    }
    this.landed = false;
  }

  blocksFromShape (shape, x, y) {
    console.log(y);
    const rotation = SHAPE_TABLE[shape][this.rotation]
    return rotation.map((pair) => new Block(pair[0] + x, pair[1] + y, shape))
  }

  rebuildBlocks () {
    this.blocks = this.blocksFromShape(this.shape, this.x, this.y)
  }

  rotateCW () {
    this.rotation = this.rotation + 1 === SHAPE_TABLE[this.shape].length ? 0 : this.rotation + 1;
    this.rebuildBlocks()
  }

  // rotateCCW () {
  //   this.rotation = (this.rotation === 0) ? SHAPE_TABLE[this.shape].length - 1 ? 0
  //   this.blocks = this.blocksFromShape(this.shape);
  // }

  static getRandom () {
    return new Mino(I_TRIMINO, 5, 3)
  }

  moveDown (instant) {
    if(this.y) {
      this.y ++;
    }
    this.blocks.forEach((block) => {
      block.moveDown();
      if(instant) {
        block.entity.y = block.y;
      }
    });
  }

  moveLeft () {
    if(this.x) this.x--;
    this.blocks.forEach((b) => b.moveLeft());
  }

  moveRight () {
    if(this.x) this.x++;
    this.blocks.forEach((b) => b.moveRight());
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

  // Evaluate the result of clearing one or more blocks from this mino
  // Return array of 0 or more mino
  // Remaining blocks are divided into contigious groups
  split (removedBlocks) {
    const groups = []
    // for each existing block
    this.blocks.forEach((block) => {
    // is this a block we're discarding
      if(removedBlocks.includes(block)) {
        // do nothing. block not added to any group
        return
      }

      if(!this.blocks.includes(block)) {
        // its not one of this mino's blocks
        return
      }


      // is this block touching a block in any other group?
      const groupTouchingBlock = groups.find((group) => {
        return !! group.find((groupBlock) => block.touches(groupBlock))
      })

      if(groupTouchingBlock) {
        // add to the group that included a block touching the block in question
        groupTouchingBlock.push(block)
      } else {
        // start a new group
        groups.push([block])
      }

    })

    return groups.map((group) => new Mino(group))
  }

}
