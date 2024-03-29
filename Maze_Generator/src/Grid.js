class Grid {
  constructor(rows, cols, cell_width) {
    this.rows = rows;
    this.cols = cols;
    this.cell_width = cell_width;
    this.grid = [];
    this.current;
  }

  initialize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const cell = new Cell(i, j, this.cell_width);
        this.grid.push(cell);
      }
    }
    this.current = this.grid[0];
  }

  show() {
    noFill();
    stroke(255);
    this.current.set_visit(true);
    this.grid.forEach((cell) => {
      cell.create_walls();
    });
  }
}
