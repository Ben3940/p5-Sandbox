/**
 * Particle Class
 *
 *   Emits rays in 360 degrees, every angle_incr degrees.  Has a wrapper cast() function to call individual Ray casts.  move() called to move Particle based on WASD key presses.  Show() renders the Particle class to the canvas.
 */

// Variables to make movement control code more readable
const W = 87;
const A = 65;
const S = 83;
const D = 68;
const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;

class Particle {
  // Initializes rays array with a Ray object every angle_incr up to 360 degrees
  constructor(
    angle_incr = 0.1,
    speed = 5,
    FOV = 0,
    angle_offset = 0,
    rotate_speed = 4
  ) {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    this.angle_incr = angle_incr;
    this.speed = speed;
    this.FOV = FOV;
    this.angle_offset = angle_offset;
    this.rotate_speed = rotate_speed;

    // Rays generated differently based on if FOV is specified
    if (this.FOV) {
      this.generate_rays_FOV();
    } else {
      this.generate_rays();
    }
  }

  // Iterate rays, determine which wall is closest to array and cast ray at wall
  cast(walls) {
    stroke(0, 255, 0);
    this.rays.forEach((ray) => {
      let closest = null;
      let min_pnt = Infinity;

      // Determine closest wall to current ray
      walls.forEach((wall) => {
        const pnt = ray.cast(wall);
        if (pnt) {
          const dist = p5.Vector.dist(this.pos, pnt);
          if (dist < min_pnt) {
            min_pnt = dist;
            closest = pnt;
          }
        }
      });

      // found closest wall, emit ray towards wall
      if (closest) {
        this.render(closest.x, closest.y);
      }
    });
  }

  // Check key(s) pressed and move particle
  move() {
    // If FOV, then allow particle to rotate
    if (this.FOV) {
      if (keyIsDown(ARROW_LEFT)) {
        this.rotateLeft();
        this.generate_rays_FOV();
      } else if (keyIsDown(ARROW_RIGHT)) {
        this.rotateRight();
        this.generate_rays_FOV();
      }
    }

    // Diagonal up left
    if (keyIsDown(W) && keyIsDown(A)) {
      this.moveUp();
      this.moveLeft();

      // Diagonal up right
    } else if (keyIsDown(W) && keyIsDown(D)) {
      this.moveUp();
      this.moveRight();

      // Diagonal down left
    } else if (keyIsDown(S) && keyIsDown(A)) {
      this.moveDown();
      this.moveLeft();

      // Diagonal down right
    } else if (keyIsDown(S) && keyIsDown(D)) {
      this.moveDown();
      this.moveRight();

      // left
    } else if (keyIsDown(A)) {
      this.moveLeft();

      // right
    } else if (keyIsDown(D)) {
      this.moveRight();

      // up
    } else if (keyIsDown(W)) {
      this.moveUp();

      // down
    } else if (keyIsDown(S)) {
      this.moveDown();
    }
  }

  rotateLeft() {
    this.angle_offset -= this.rotate_speed;
  }

  rotateRight() {
    this.angle_offset += this.rotate_speed;
  }

  // Move particle in specified direction.  max/min are used to bound particle to canvas
  moveLeft() {
    this.pos.x = max(this.pos.x - this.speed, 0);
  }

  moveRight() {
    this.pos.x = min(this.pos.x + this.speed, width);
  }

  moveUp() {
    this.pos.y = max(this.pos.y - this.speed, 0);
  }

  moveDown() {
    this.pos.y = min(this.pos.y + this.speed, height);
  }

  // Render ray from current (x, y) to (x2, y2)
  render(x2, y2) {
    line(this.pos.x, this.pos.y, x2, y2);
  }

  generate_rays() {
    for (let angle = 0; angle <= 360; angle += this.angle_incr) {
      this.rays.push(new Ray(this.pos, radians(angle)));
    }
  }

  generate_rays_FOV() {
    this.rays = [];
    for (
      let angle = -this.FOV + this.angle_offset;
      angle < this.FOV + this.angle_offset;
      angle += this.angle_incr
    ) {
      this.rays.push(new Ray(this.pos, radians(angle)));
    }
  }
}
