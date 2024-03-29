class Cell {
  constructor(i, j, w) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  set_visit(visit_state) {
    this.visited = visit_state;
  }

  create_walls() {
    // rect(this.i, this.j, this.w);
    const x = this.i * this.w;
    const y = this.j * this.w;

    // Top wall
    if (this.walls[0]) {
      line(x, y, x + this.w, y);
    }

    // Right wall
    if (this.walls[1]) {
      line(x + this.w, y, x + this.w, y + this.w);
    }

    // Bottom wall
    if (this.walls[2]) {
      line(x, y + this.w, x + this.w, y + this.w);
    }

    // Left wall
    if (this.walls[3]) {
      line(x, y, x, y + this.w);
    }

    if (this.visited) {
      fill(0, 180, 230);
      rect(this.i * this.w, this.j * this.w, this.w);
    }
  }
}
