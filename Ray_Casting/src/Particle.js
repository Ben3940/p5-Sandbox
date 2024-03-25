/**
 * Particle Class
 *
 *   Emits rays in 360 degrees, every angle_incr degrees.  A wrapper cast() function to call individual ray casts.  Update() called to move particle based on mouse position.  Show() renders the particle class to the canvas.
 */

class Particle {
  // Initializes rays array with a Ray object every angle_incr up to 360 degrees
  constructor(
    angle_incr = 5,
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
    if (keyIsDown(37)) {
      this.rotateLeft();
      this.generate_rays_FOV();
    } else if (keyIsDown(39)) {
      this.rotateRight();
      this.generate_rays_FOV();
    }

    if (keyIsDown(87) && keyIsDown(65)) {
      this.moveUp();
      this.moveLeft();
    } else if (keyIsDown(87) && keyIsDown(68)) {
      this.moveUp();
      this.moveRight();
    } else if (keyIsDown(83) && keyIsDown(65)) {
      this.moveDown();
      this.moveLeft();
    } else if (keyIsDown(83) && keyIsDown(68)) {
      this.moveDown();
      this.moveRight();
    } else if (keyIsDown(65)) {
      this.moveLeft();
    } else if (keyIsDown(68)) {
      this.moveRight();
    } else if (keyIsDown(87)) {
      this.moveUp();
    } else if (keyIsDown(83)) {
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
