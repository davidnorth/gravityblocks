class Game {

  constructor (state, updateFn, renderFn) {
    this.state = state;
    this.updateFn = updateFn;
    this.renderFn = renderFn;
  }

  start () {
    this.frame();
  }


  frame () {
    this.updateFn()
    this.renderFn()
    setTimeout(() => {
      requestAnimationFrame(this.frame.bind(this));
    }, 200)
  }

}
