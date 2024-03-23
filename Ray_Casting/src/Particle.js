class Particle {
  constructor(angle_incr = 10) {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];

    for (let angle = 0; angle < 360; angle += angle_incr) {
      this.rays.push(new Ray(this.pos, radians(angle)));
    }
  }

  cast(walls) {
    this.rays.forEach((ray) => {
      let closest = null;
      let min_pnt = Infinity;
      walls.forEach((wall) => {
        const pnt = ray.cast(wall);
        if (pnt) {
          const dist = p5.Vector.dist(this.pos, pnt);
          console.log(dist);
          if (dist < min_pnt) {
            min_pnt = dist;
            closest = pnt;
          }
        }
      });
      if (closest) {
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
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
