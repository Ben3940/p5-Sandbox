class Particle {
  constructor(angle_incr = 10) {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];

    for (let angle = 0; angle < 360; angle += angle_incr) {
      this.rays.push(new Ray(this.pos, radians(angle)));
    }
  }

  cast(walls) {
    walls.forEach((wall) => {
      this.rays.forEach((ray) => {
        const pnt = ray.cast(wall);
        if (pnt) {
          line(this.pos.x, this.pos.y, pnt.x, pnt.y);
        }
      });
    });
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 16);
    this.rays.forEach((ray) => {
      ray.show();
    });
  }
}
