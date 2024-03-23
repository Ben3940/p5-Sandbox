class Ray {
  constructor(x, y, x_dir, y_dir, x_mag, y_mag) {
    this.pos = createVector(x, y);
    this.dir = createVector(x_dir, y_dir);
    this.mag = createVector(x_mag, y_mag);
  }

  show() {
    stroke(255);
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * this.mag.x, this.dir.y * this.mag.y);
    pop();
  }
}
