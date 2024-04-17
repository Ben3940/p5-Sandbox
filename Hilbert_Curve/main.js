const DIM = 500;
const ORDER = 1;
const N = 2 ^ ORDER;
const TOTAL = N ^ 2;
const PATH = [];

function setup() {
  createCanvas(DIM, DIM);

  for (let i = 0; i < TOTAL; i++) {
    vec = hilbert_x_y(i);
  }
}

function draw() {
  background(0);
}

function hilbert_x_y(i) {
  const points = [
    createVector(0, 0),
    createVector(0, 1),
    createVector(1, 1),
    createVector(1, 0),
  ];
  return points[i];
}
