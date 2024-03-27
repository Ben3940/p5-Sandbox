class Wall {
  constructor(x1, y1, x2, y2) {
    this.start = createVector(x1, y1);
    this.end = createVector(x2, y2);
  }

  show() {
    stroke(255);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  get_start_x() {
    return this.start.x;
  }

  get_start_y() {
    return this.start.y;
  }

  get_end_x() {
    return this.end.x;
  }

  get_end_y() {
    return this.end.y;
  }
}
