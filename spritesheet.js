
class SpriteSheet {

  constructor (src, spriteSize, loadedHandler) {
    this.img = new Image();
    this.spriteSize = spriteSize;
    this.img.src = src;
    this.img.addEventListener('load', this.loaded.bind(this));
    this.loadedHandler = loadedHandler;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.cache = new Map();
  }

  loaded () {
    console.log("sprite sheet loaded: " + this.img.src);
    this.ctx.drawImage(this.img, 0, 0);
    this.loadedHandler(this);
  }

  getSpriteImageData (spriteX, spriteY) {
    const key = spriteX + '-' + spriteY;
    if(this.cache.has(key)) {
      return this.cache.get(key);
    } else {
      const data = this.ctx.getImageData(spriteX * this.spriteSize, spriteY * this.spriteSize, this.spriteSize, this.spriteSize);
      this.cache.set(key, data);
      return data;
    }
  }

}
