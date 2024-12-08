const DIM = 900;
const ROWS = 30;
const COLS = 30;
const GRID = new Grid(COLS, DIM / ROWS);
let iters = 0;
function setup() {
  createCanvas(DIM, DIM);
  stroke(255);
  GRID.initialize();
}
function draw() {
    background(0);
    GRID.show();
    GRID.update();
    // frameRate(30); 
}
