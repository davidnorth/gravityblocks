
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
const J_TRIMINO = 2
const L_TRIMINO = 3


const minos = [

  new Mino([
    new Block(0, 0, I_TRIMINO),
    new Block(1, 0, I_TRIMINO),
    new Block(2, 0, I_TRIMINO)
  ]),

  new Mino([
    new Block(8, 0, L_TRIMINO),
    new Block(8, 1, L_TRIMINO),
    new Block(9, 1, L_TRIMINO)
  ]),




  new Mino([
    new Block(5, 5, I_TRIMINO),
    new Block(5, 6, I_TRIMINO),
    new Block(5, 7, I_TRIMINO)
  ]),

  new Mino([
    new Block(9, 4, I_TRIMINO),
    new Block(9, 5, I_TRIMINO),
    new Block(9, 6, I_TRIMINO)
  ]),


  new Mino([
    new Block(0, 2, I_TRIMINO),
    new Block(0, 3, I_TRIMINO),
    new Block(0, 4, I_TRIMINO)
  ]),

  new Mino([
    new Block(1, 4, I_TRIMINO),
    new Block(1, 5, I_TRIMINO),
    new Block(1, 6, I_TRIMINO)
  ]),

  new Mino([
    new Block(2, 4, I_TRIMINO),
    new Block(2, 5, I_TRIMINO),
    new Block(2, 6, I_TRIMINO)
  ]),


  new Mino([
    new Block(3, 4, I_TRIMINO),
    new Block(3, 5, I_TRIMINO),
    new Block(3, 6, I_TRIMINO)
  ]),

  new Mino([
    new Block(8, 6, J_TRIMINO),
    new Block(8, 7, J_TRIMINO),
    new Block(7, 7, J_TRIMINO)
  ]),

  new Mino([
    new Block(4, 6, J_TRIMINO),
    new Block(4, 7, J_TRIMINO),
    new Block(3, 7, J_TRIMINO)
  ]),

  new Mino([
    new Block(4, 10, L_TRIMINO),
    new Block(4, 11, L_TRIMINO),
    new Block(5, 11, L_TRIMINO)
  ]),


  new Mino([
    new Block(7, 11, L_TRIMINO),
    new Block(7, 12, L_TRIMINO),
    new Block(8, 12, L_TRIMINO)
  ]),

  new Mino([
    new Block(6, 0, L_TRIMINO),
    new Block(6, 1, L_TRIMINO),
    new Block(7, 0, L_TRIMINO)
  ]),

  new Mino([
    new Block(6, 3, L_TRIMINO),
    new Block(6, 4, L_TRIMINO),
    new Block(7, 3, L_TRIMINO)
  ]),
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
spriteMap[J_TRIMINO] = [1, 1]
spriteMap[L_TRIMINO] = [1, 2]



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



