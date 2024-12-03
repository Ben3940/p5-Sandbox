class Grid {
    constructor(dim, cell_width) {
        this.dim = dim;
        this.grid = [];
        this.grid_size = dim * dim;
        this.cell_width = cell_width;
        this.start_pos = null;
        this.end_pos = null;
        this.model = null;
    }

    initialize(){
        for (let x = 0; x < this.dim; x++) {
            const row = [];
            for (let y = 0; y < this.dim; y++) {
                const cell = new Cell(x, y, this.dim);
                row.push(cell);
            }
            this.grid.push(row);
        }

        this.set_start_end();
    }

    set_start_end(){
        const x = Math.floor(Math.random() * this.dim)
        const y = Math.floor(Math.random() * this.dim)
        const start_pos = [x, y];
        const end_pos = [this.dim - x, this.dim - y];
        this.start_pos = start_pos;
        this.end_pos = end_pos;
        this.model = new Model(x, y, end_pos[0], end_pos[1], this.dim, this.grid_size);
        this.model.start(this.grid[x][y], 0, 100);
        this.model.add_g_score(start_pos, 0);
        this.grid[x][y].set_as_start(true);
        this.grid[end_pos[0]][end_pos[1]].set_as_end(true);
    }

    visit_cell(x, y){
        this.grid[x][y].set_visited(true);
    }

    show() {
        for (let x = 0; x < this.dim; x++) {
            for (let y = 0; y < this.dim; y++) {
                this.grid[x][y].show(this.cell_width);
            }
        }
        this.model.show(this.cell_width);   
    }

    update(){
        
        this.model.update(this.grid, this.dim);
        // this.visit_cell(this.model.get_index());
    }
}