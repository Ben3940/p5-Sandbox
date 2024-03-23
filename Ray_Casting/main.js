const DIM = 500;
let wall;
let ray;

function setup() {
  createCanvas(DIM, DIM);
}

function draw() {
  background(0);
  wall = new Wall(100, 250, 250, 100);
  wall.show();

  ray = new Ray(200, 300, 1, 0, 10, 10);
  ray.show();
}
