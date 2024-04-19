const DIM = 500;
const ORDER = 2;
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

  beginShape();
  for (let i = 0; i < PATH.length; i++) {
    vertex(PATH[i].x, PATH[i].y);
    show_number(i, PATH[i].x, PATH[i].y);
  }
  endShape();
}

// Displays ith index along hilbert curve at location x, y
function show_number(i, x, y) {
  text(i, x + 5, y - 5);
  point(x, y);
}

function hilbert_x_y(i) {
  const points = [
    createVector(0, 0),
    createVector(0, 1),
    createVector(1, 1),
    createVector(1, 0),
  ];

  // Focus on right-most 2 bits of i as a binary number (i.e. 00, 01, 10, 11);
  let index = i & 3;
  let vec = points[index];

  // Shift bits right by 2 bits
  i = i >>> 2;
  // Focus on newly shifted, right-most 2 bits of i as a binary number
  index = i & 3;

  let temp;
  switch (index) {
    case 0:
      temp = vec.x;
      vec.x = vec.y;
      vec.y = temp;
      break;
    case 1:
      vec.y += ORDER;
      break;
    case 2:
      vec.x += ORDER;
      vec.y += ORDER;
      break;
    case 3:
      temp = 1 - vec.y;
      vec.y = 1 - vec.x;
      vec.x = temp;
      vec.x += ORDER;
      break;
  }

  return vec;
}
