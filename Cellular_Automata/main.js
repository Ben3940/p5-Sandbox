const DIM = 400;
const cells = [0, 1, 0, 1, 1, 0, 0, 1];
const w = DIM / 10;
function setup() {
  createCanvas(DIM, DIM);
}

function draw() {
  background(0);
  for (let i = 0; i < cells.length; i++) {
    stroke(255);
    fill(255 * cells[i]);
    rect(i * w, 0, i * w, w);
  }
}
