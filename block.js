class Block {

  constructor (x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.entity = new BlockEntity(this)
  }

  // Are 2 blocks touching
  touches(other) {
    return (this.y === other.y && Math.abs(this.x - other.x) === 1) ||
      (this.x === other.x && Math.abs(this.y - other.y) === 1)
  }

  moveDown() {
    this.y ++;
    this.entity.ty = this.y;
  }

}

class BlockEntity {
  constructor (block) {
    this.x = block.x;
    this.y = block.y
    this.ty = block.y;
    this.vy = 0;
    this.g = 0.02;
  }

  update () {
    if(this.y < this.ty) {
      this.vy += this.g;
      this.y += this.vy
    } else {
      this.y = this.ty;
      this.vy = 0;
    }
  }

}
