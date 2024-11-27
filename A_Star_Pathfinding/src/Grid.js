class Grid {
    constructor(rows, cols, cell_width) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.cell_width = cell_width;
    }

    initialize(){
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const cell = new Cell(x * this.cell_width, y * this.cell_width, this.cell_width);
                this.grid.push(cell);
            }
        }

        this.set_start_end();
    }

    set_start_end(){
        const x = Math.floor(Math.random() * this.rows);
        const y = Math.floor(Math.random() * this.cols);
        const start_pos = x * this.cols + y;
        const end_pos = Math.max(this.grid.length - start_pos, 0);
        this.grid[start_pos].set_as_start(true);
        this.grid[end_pos].set_as_end(true);
    }

    show() {
        this.grid.forEach((cell) => {
            cell.show();
        });
    }
}