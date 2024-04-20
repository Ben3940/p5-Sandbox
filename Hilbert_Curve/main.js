const DIM = 900;
const ORDER = 10;
const N = 2 ** ORDER;
const TOTAL = N ** 2;
const PATH = [];
let COUNTER = 0;
let HUE = 0;

function setup() {
  createCanvas(DIM, DIM);
  colorMode(HSB, 360, 255, 255);
  let vec;
  for (let i = 0; i < TOTAL; i++) {
    vec = hilbert_x_y(i);
    const len = width / N;
    vec.mult(len);
    vec.add(len / 2, len / 2);
    PATH[i] = vec;
  }

  background(0);
  stroke(255);
  noFill();

  for (let i = 1; i < PATH.length; i++) {
    // vertex(PATH[i].x, PATH[i].y);
    HUE = map(i, 0, PATH.length, 0, 360);
    stroke(HUE, 255, 255);
    line(PATH[i].x, PATH[i].y, PATH[i - 1].x, PATH[i - 1].y);

    if (ORDER < 6) {
      show_number(i, PATH[i].x, PATH[i].y);
    }
  }

  COUNTER += 40;
  if (COUNTER >= PATH.length) {
    COUNTER = 0;
  }
}
function draw() {}

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

  for (let j = 1; j < ORDER; j++) {
    // Shift bits right by 2 bits
    i = i >>> 2;
    // Focus on newly shifted, right-most 2 bits of i as a binary number
    index = i & 3;

    let temp;
    let len = 2 ** j;

    switch (index) {
      case 0:
        temp = vec.x;
        vec.x = vec.y;
        vec.y = temp;
        break;
      case 1:
        vec.y += len;
        break;
      case 2:
        vec.x += len;
        vec.y += len;
        break;
      case 3:
        temp = len - 1 - vec.y;
        vec.y = len - 1 - vec.x;
        vec.x = temp;
        vec.x += len;
        break;
    }
  }

  return vec;
}
