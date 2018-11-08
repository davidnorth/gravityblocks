
// Lookup for piece shape and rotation

// .X.
// .X.
// .X.

// ...
// XXX
// ...

// .X..
// .XX.
// ...

// ...
// .XX.
// .x.

// ...
// XX.
// .X.

// .X..
// XX.
// ...


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
    if(shape.map) {
      this.blocks = shape
    } else {
      this.blocks = this.blocksFromShape(shape, x, y);
    }
    this.landed = false;
  }

  blocksFromShape (shape, x, y) {
    const rotation = SHAPE_TABLE[shape][this.rotation]
    console.log(rotation);
    return rotation.map((pair) => new Block(pair[0] + x, pair[1] + y, shape)
    )
  }

  rotateCW () {
  }

  rotateCCW () {
  }

  static getRandom () {
    return new Mino(I_TRIMINO, 5, 0)
  }

  moveDown (instant) {
    this.blocks.forEach((block) => {
      block.moveDown();
      if(instant) {
        block.entity.y = block.y;
      }
    });
  }

  moveLeft () {
    this.blocks.forEach((b) => b.moveLeft());
  }

  moveRight () {
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
