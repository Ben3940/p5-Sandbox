class Model {
    constructor(start_x, start_y, end_x, end_y, dim, grid_size){
        this.start_x = start_x;
        this.start_y = start_y;
        this.end_x = end_x;
        this.end_y = end_y;
        this.dim = dim;
        this.open_set = new Priority_Queue();
        this.came_from = new Map();
        this.g_score = new Map();
        this.f_score = new Map();
        this.grid_size = grid_size;
        this.directions = [-dim, 1, dim, -1]; // up, right, down, left
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

    add_g_score(coordinates, score){
        this.g_score.set(coordinates, score);
    } 

    get_g_score(coordinates){
        return this.g_score.get(coordinates);
    }

    cost(x, y){
        const index = this.convert_x_y_to_index(x, y);
        const score = this.get_g_score(index) + this.heuristic(x, y)
        this.f_score.set(index, score);
    }

    heuristic(x, y){
        const [end_x, end_y] = this.convert_index_to_x_y(this.end_index);
        return Math.sqrt((end_x - x)^2 + (end_y - y)^2);
    }

    show(cell_width){
        const cell = this.open_set.peek().get_cell();
        
        const [x, y] = cell.get_pos();
        fill(0, 0, 255);
        rect(x * cell_width, y * cell_width, cell_width, cell_width);
    }

    check_neighbors(current_index, grid){
        
        for(const direction of this.directions){
            let neighbor_index = current_index + direction;
            if(neighbor_index === this.open_set.peek().get_index()){
                continue;
            }
            const neighbor = grid[neighbor_index];
            this.cost();
        }
    }

    start(cell, cost, priority){
        // this.set_start_index(index);
        this.open_set.enqueue(cell, cost, priority);
    }

    bound_index(index, step, dim, up_down){
        const new_index = index + step;
        if (up_down){
            if(new_index < 0 || new_index >= this.grid_size){
                return index;
            }
        } else {
            const col_min = Math.floor(index / dim) * dim;
            const col_max = col_min + dim;
            console.log("Col min", col_min);
            console.log("Col max", col_max);
            if(new_index < col_min || new_index >= col_max){
                return index;
            }   
        }
        return new_index;
    }

    move(current, grid){
        const next_x = current.get_cell().get_x();
        const next_y = current.get_cell().get_y() + 1;
        const [x, y] = this.bound_x_y(next_x, next_y);
        if(x === this.end_x && y === this.end_y){
            return;
        }
        this.open_set.enqueue(grid[x][y], 0, current.get_priority() - 1);
        
    }

    update(grid, dim){
        if(this.open_set.is_empty()){
            return;
        }
        const current = this.open_set.dequeue();
        this.move(current, grid, dim, dim);
    }
}