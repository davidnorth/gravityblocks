
// Render settings
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;
const BUFFER_WIDTH = 160;
const BUFFER_HEIGHT = 120;
const SPRITE_SIZE = 8;

// Game settings
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;


// mino type identifiers
const I_TRIMINO = 1
const L_TRIMINO = 2


const minos = [
  new Mino(I_TRIMINO, 0, 0)
]

const board = new Board(minos);


document.getElementById('testButton1')
  .addEventListener('click', board.drop.bind(board))
document.getElementById('testButton2')
  .addEventListener('click', board.clearLines.bind(board))


const spriteMap = {
  0: [4, 0],
}
spriteMap[I_TRIMINO] = [1, 0]
spriteMap[L_TRIMINO] = [1, 1]



function update() {
  board.update()

}

const state = { board }

const sprites = new SpriteSheet('sprites.png', SPRITE_SIZE, () => {

  const renderer = new Renderer({
    canvasId: 'canvas',
    sprites,
    state
  });

  const game = new Game(state, update, renderer.render.bind(renderer));

  game.start();

})



