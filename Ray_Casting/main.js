const DIM = 500;
const NUM_WALLS = 5;
let walls = [];
let particle;

function setup() {
  createCanvas(DIM, DIM);
  for (let i = 0; i < NUM_WALLS; i++) {
    const x1 = random(width);
    const y1 = random(height);
    const x2 = random(width);
    const y2 = random(height);
    walls.push(new Wall(x1, y1, x2, y2));
  }
  particle = new Particle();
}

function draw() {
  background(0);
  walls.forEach((wall) => {
    wall.show();
  });

  particle.update(mouseX, mouseY);
  particle.cast(walls);
  particle.show();
  // ray.follow_mouse(mouseX, mouseY);
  // ray.show();
  // let intercept = ray.cast(wall);

  // if (intercept) {
  //   fill(255);
  //   ellipse(intercept.x, intercept.y, 8, 8);
  // }
}
