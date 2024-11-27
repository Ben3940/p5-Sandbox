const DIM = 900;
const GRID = new Grid(30, 30, DIM / 30);
function setup() {
  createCanvas(DIM, DIM);
  stroke(255);
  GRID.initialize();
}
function draw() {
  background(0);
  GRID.show();
}
