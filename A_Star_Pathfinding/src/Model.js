class Model {
    constructor(start_x, start_y, end_x, end_y, dim, grid_size){
        this.start_x = start_x;
        this.start_y = start_y;
        this.end_x = end_x;
        this.end_y = end_y;
        this.dim = dim;
        this.open_set = new Priority_Queue();
        this.came_from = new Map();
        this.f_score = new Map();
        this.grid_size = grid_size;
        this.directions = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // up, right, down, left
        this.steps = 0;
    }

    bound_self(){
        this.x = Math.max(0, Math.min(this.x, this.dim - 1));
        this.y = Math.max(0, Math.min(this.y, this.dim - 1));
    }

    bound_x_y(x, y){
        const bound_x = Math.max(0, Math.min(x, this.dim - 1));
        const bound_y = Math.max(0, Math.min(y, this.dim - 1));
        return [bound_x, bound_y];
    }

    cost(x, y, grid){
        const cell = grid[x][y].get_cell();
        const score = cell.get_g() + this.heuristic(x, y)
        const f = cost([x, y], score);
    }

    // Manhattan distance
    heuristic(x, y){
        return Math.abs(x - this.end_x) + Math.abs(y - this.end_y);
    }

    show(cell_width){
        const cell = this.open_set.peek().get_cell();
        
        const [x, y] = cell.get_pos();
        fill(0, 0, 255);
        rect(x * cell_width, y * cell_width, cell_width, cell_width);
    }

    check_neighbors(current, grid){
        const cell = current.get_cell();
        const neighbors = [];
        for(const direction of this.directions){
            const [dx, dy] = direction;
            const [new_x, new_y] = this.bound_x_y(cell.get_x() + dx, cell.get_y() + dy);
            if (new_x === cell.get_x() && new_y === cell.get_y()){
                continue;
            }
            const neighbor = grid[new_x][new_y];
            if(this.steps < neighbor.get_g()){
                neighbor.set_g(this.steps);
                this.open_set.enqueue(neighbor, 0, this.steps);
                // neighbors.push(neighbor);
            }
        }
        return neighbors;
    }

    start(cell, cost, priority){
        // this.set_start_index(index);
        this.open_set.enqueue(cell, cost, priority);
    }

    move(){
        const neighbor = this.open_set.dequeue().get_cell();
        
        if(neighbor.is_end()){
            return;
        }
        neighbor.set_visited(true);
        this.open_set.enqueue(neighbor, 0, neighbor.get_g());
        this.steps++;
        
    }

    update(grid, dim){
        if(this.open_set.is_empty()){
            return;
        }
        const current = this.open_set.dequeue();
        const [x, y] = current.get_cell().get_pos();
        
        grid[x][y].set_visited(true);
        this.check_neighbors(current, grid);
        this.steps++;
    }
}