class Grid {
    constructor(rows, cols, cell_width) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.cell_width = cell_width;
        this.start_pos = null;
        this.end_pos = null;
        this.model = new Model(0, 0, cols);
    }

    initialize(){
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {
                const cell = new Cell(x, y, this.cols);
                this.grid.push(cell);
            }
        }

        this.set_start_end();
    }

    set_start_end(){
        const x = Math.floor(Math.random() * this.rows)
        const y = Math.floor(Math.random() * this.cols)
        const start_pos = this.model.convert_x_y_to_index(x, y);
        const end_pos = this.grid.length - start_pos;
        this.start_pos = start_pos;
        this.end_pos = end_pos;
        this.model.start(this.grid[start_pos], 0, this.grid.length + 1);
        this.model.set_pos(x, y);
        this.model.add_g_score(start_pos, 0);
        this.grid[start_pos].set_as_start(true);
        this.grid[end_pos].set_as_end(true);
    }

    visit_cell(index){
        this.grid[index].set_visited(true);
    }

    show() {
        this.grid.forEach((cell) => {
            cell.show(this.cell_width);
        });
        this.model.show(this.cell_width);   
    }

    update(){
        
        this.model.update(this.grid, this.cols);
        // this.visit_cell(this.model.get_index());
    }
}