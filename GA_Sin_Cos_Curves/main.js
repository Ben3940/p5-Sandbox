const DIM = 700;
const OFFSET = DIM / 10;

function setup() {
  createCanvas(DIM, DIM);
}

function draw() {
  background(0);
  draw_y_axis();
  draw_x_axis();
}

function draw_y_axis() {
  stroke(255);
  line(OFFSET, 0, OFFSET, height);
}

function draw_x_axis() {
  stroke(255);
  line(OFFSET, height / 2, width, height / 2);
}

function draw_sine() {}
