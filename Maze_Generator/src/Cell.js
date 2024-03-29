class Cell {
  constructor(i, j, w) {
    this.i = i;
    this.j = j;
    this.w = w;
  }

  show() {
    rect(this.i, this.j, this.w);
  }
}
