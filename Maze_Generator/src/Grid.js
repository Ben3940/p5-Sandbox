class Grid {
  constructor(rows, cols, cell_width) {
    this.rows = rows;
    this.cols = cols;
    this.cell_width = cell_width;
    this.grid = [];
  }

  initialize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const cell = new Cell(
          i * this.cell_width,
          j * this.cell_width,
          this.cell_width
        );
        this.grid.push(cell);
      }
    }
  }

  show() {
    noFill();
    stroke(255);
    this.grid.forEach((cell) => {
      cell.show();
    });
  }
}
