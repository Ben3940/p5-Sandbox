const DIM = 500;
const ORDER = 1;
const N = 2 ** ORDER;
const TOTAL = N ** 2;
const PATH = [];
let COUNTER = 0;

function setup() {
  createCanvas(DIM, DIM);
  let vec;
  for (let i = 0; i < TOTAL; i++) {
    vec = hilbert_x_y(i);
    const len = width / N;
    vec.mult(len);
    vec.add(len / 2, len / 2);
    PATH[i] = vec;
  }
}
function draw() {
  background(0);
  stroke(255);
  noFill();
  strokeWeight(4);

  beginShape();
  for (let i = 0; i < PATH.length; i++) {
    vertex(PATH[i].x, PATH[i].y);
  }
  endShape();
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
