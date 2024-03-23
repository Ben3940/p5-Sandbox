const DIM = 500;

function setup() {
  createCanvas(DIM, DIM);
}

function draw() {
  background(0);
  w1 = new Wall(100, 250, 250, 100);
  w1.show();
}
