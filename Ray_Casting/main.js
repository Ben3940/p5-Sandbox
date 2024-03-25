const DIM = 800;
const NUM_WALLS = 10;
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
  // top wall
  walls.push(new Wall(0, 0, width, 0));

  // right wall
  walls.push(new Wall(width, 0, width, height));

  // left wall
  walls.push(new Wall(0, 0, 0, height));

  // bottom wall
  walls.push(new Wall(0, height, width, height));

  particle = new Particle(5);
}

function draw() {
  background(0);
  walls.forEach((wall) => {
    wall.show();
  });

  // particle.update(mouseX, mouseY);
  particle.move();
  particle.cast(walls);
  particle.show();
}
