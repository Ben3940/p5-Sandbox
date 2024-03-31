const DIM = 500;
const COLS = 10;
const ROWS = 10;
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
  frameRate(5);
}
