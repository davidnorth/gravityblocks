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
