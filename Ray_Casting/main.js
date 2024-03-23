const DIM = 500;
let wall;
let ray;

function setup() {
  createCanvas(DIM, DIM);
}

function draw() {
  background(0);
  wall = new Wall(100, 250, 400, 250);
  wall.show();

  ray = new Ray(200, 100, 0, 1, 10, 10);
  ray.follow_mouse(mouseX, mouseY);
  ray.show();
  let intercept = ray.cast(wall);

  if (intercept) {
    fill(255);
    ellipse(intercept.x, intercept.y, 8, 8);
  }
}
