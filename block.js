class Block {

  constructor (x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
  }

  // Are 2 blocks touching
  touches(other) {
    return (this.y === other.y && Math.abs(this.x - other.x) === 1) ||
      (this.x === other.x && Math.abs(this.y - other.y) === 1)
  }

}
