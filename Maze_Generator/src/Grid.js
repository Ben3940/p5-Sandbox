class Grid {
  constructor(rows, cols, cell_width) {
    this.rows = rows;
    this.cols = cols;
    this.cell_width = cell_width;
    this.grid = [];
    this.current;
    this.stack = [];
  }

  initialize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const cell = new Cell(i, j, this.cell_width, this.cols);
        this.grid.push(cell);
      }
    }
    this.current = this.grid[0];
    this.current.set_visited(true);
  }

  show() {
    noFill();
    stroke(255);

    const next = this.current.check_neighbors(this.grid);
    if (next) {
      next.set_visited(true);
      this.stack.push(this.current);
      this.current.remove_walls(next);
      this.current = next;

      // If next is not defined and items are on the stack,
      //   pop from stack to back track to cell with neighbors to visit
    } else if (this.stack.length > 0) {
      this.current = this.stack.pop();
      this.current.increase_occurance_color();
    }

    this.grid.forEach((cell) => {
      cell.create_walls();
      cell.show_if_visited();
      if (cell.get_visited()) {
        cell.decrease_occurance_color();
      }

      if (this.stack.length <= 0) {
        cell.occurance_color_drain();
      }
    });
    this.current.show_current();
  }
}
