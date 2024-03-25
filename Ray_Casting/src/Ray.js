class Ray {
  constructor(pos, angle, x_mag = 1, y_mag = 1) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
    this.mag = createVector(x_mag, y_mag);
  }

  show() {
    stroke(255);
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * this.mag.x, this.dir.y * this.mag.y);
    pop();
  }

  // Ray collision calculated using this equation
  //   https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
  cast(wall) {
    const x1 = wall.get_start_x();
    const y1 = wall.get_start_y();
    const x2 = wall.get_end_x();
    const y2 = wall.get_end_y();

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    // Undefined: divide by zero
    if (den === 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    // check if line segments t & u intercept
    //  see README for details about t & u
    if (t > 0 && t < 1 && u > 0) {
      let pnt = createVector();
      pnt.x = x1 + t * (x2 - x1);
      pnt.y = y1 + t * (y2 - y1);
      return pnt;
    }

    return;
  }
}
