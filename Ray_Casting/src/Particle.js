/**
 * Particle Class
 *
 *   Emits rays in 360 degrees, every angle_incr degrees.  A wrapper cast() function to call individual ray casts.  Update() called to move particle based on mouse position.  Show() renders the particle class to the canvas.
 */

class Particle {
  // Initializes rays array with a Ray object every angle_incr up to 360 degrees
  constructor(angle_incr = 10, speed = 5) {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    this.speed = speed;

    for (let angle = 0; angle < 360; angle += angle_incr) {
      this.rays.push(new Ray(this.pos, radians(angle)));
    }
  }

  // Iterate rays, determine which wall is closest to array and cast ray at wall
  cast(walls) {
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
    if (keyIsDown(87) && keyIsDown(65)) {
      particle.moveUp();
      particle.moveLeft();
    } else if (keyIsDown(87) && keyIsDown(68)) {
      particle.moveUp();
      particle.moveRight();
    } else if (keyIsDown(83) && keyIsDown(65)) {
      particle.moveDown();
      particle.moveLeft();
    } else if (keyIsDown(83) && keyIsDown(68)) {
      particle.moveDown();
      particle.moveRight();
    } else if (keyIsDown(65)) {
      particle.moveLeft();
    } else if (keyIsDown(68)) {
      particle.moveRight();
    } else if (keyIsDown(87)) {
      particle.moveUp();
    } else if (keyIsDown(83)) {
      particle.moveDown();
    }
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
}
