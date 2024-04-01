const DIM = 800;
const COLS = 25;
const ROWS = 25;
const CELL_WIDTH = DIM / COLS;
let grid;

function setup() {
  createCanvas(DIM, DIM);
  grid = new Grid(ROWS, COLS, CELL_WIDTH);
  grid.initialize();
}

function draw() {
  stroke(255);
  background(0);
  grid.show();
}
