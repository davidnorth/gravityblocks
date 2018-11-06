
// Render settings
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;
const BUFFER_WIDTH = 160;
const BUFFER_HEIGHT = 120;
const SPRITE_SIZE = 8;

// Game settings
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;


// Onscreen canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Offscreen buffer - "native" resolution
const bufferCanvas = document.createElement('canvas');
bufferCanvas.width = BUFFER_WIDTH;
bufferCanvas.height = BUFFER_HEIGHT;
const bufferCtx = bufferCanvas.getContext('2d');






const I_TRIMINO = 1
const J_TRIMINO = 2
const L_TRIMINO = 3

const minos = [

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
    new Block(0, 0, I_TRIMINO),
    new Block(0, 1, I_TRIMINO),
    new Block(0, 2, I_TRIMINO)
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
    new Block(6, 1, L_TRIMINO),
    new Block(6, 2, L_TRIMINO),
    new Block(7, 1, L_TRIMINO)
  ]),




]

const board = new Board(minos);


document.getElementById('testButton')
  .addEventListener('click', board.clearLines.bind(board))


ctx.fillStyle = 'grey';
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const spriteMap = {
    0: [4, 0],
  }
  spriteMap[I_TRIMINO] = [1, 0]
  spriteMap[J_TRIMINO] = [1, 1]
  spriteMap[L_TRIMINO] = [1, 2]


const state = {}


function update() {

  board.minos.forEach((mino) => {
    if(board.canFall(mino)) {
        mino.moveDown()
        board.updateCells()
    }
  })


}


function renderSprite(sheet, spriteX, spriteY, x, y) {
  let spriteImage = sheet.getSpriteImageData(spriteX, spriteY);
  ctx.putImageData(spriteImage, x, y);
}

function render() {

  for(let y = 0; y < BOARD_HEIGHT; y++) {
    for(let x = 0; x < BOARD_WIDTH; x++) {
      renderSprite(sheet, 4, 0, x * SPRITE_SIZE, y * SPRITE_SIZE)
    }
  }

  board.minos.forEach((mino) => {
    mino.blocks.forEach((block) => {
      renderSprite(sheet,
                   spriteMap[block.col][0], spriteMap[block.col][1],
                   block.x * SPRITE_SIZE, block.y * SPRITE_SIZE);
    });
  });

}

const game = new Game(state, update, render);
const sheet = new SpriteSheet('sprites.png', SPRITE_SIZE, game.start.bind(game));

