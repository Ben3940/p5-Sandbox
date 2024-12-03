class Model extends Entity{
    constructor(x, y, cols){
        super(x, y, cols);
        this.start_index = 0;
        this.end_index = 0;
        this.open_set = new Priority_Queue();
        this.came_from = new Map();
        this.g_score = new Map();
        this.f_score = new Map();
        this.grid_size = cols * cols;
        this.directions = [-cols, 1, cols, -1]; // up, right, down, left
    }

    bound_self(){
        this.x = Math.max(0, Math.min(this.x, this.cols - 1));
        this.y = Math.max(0, Math.min(this.y, this.cols - 1));
    }

    bound_x_y(x, y){
        x = Math.max(0, Math.min(x, this.cols - 1));
        y = Math.max(0, Math.min(y, this.cols - 1));
        return [x, y];
    }

    add_g_score(index, score){
        this.g_score.set(index, score);
    }

    set_start_index(index){
        this.start_index = index;
    }

    set_end_index(index){
        this.end_index = index;
    }  

    get_g_score(index){
        return this.g_score.get(index);
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
        
        const [x, y] = cell.convert_index_to_x_y(cell.get_index());
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

    bound_index(index, step, cols, up_down){
        const new_index = index + step;
        if (up_down){
            if(new_index < 0 || new_index >= this.grid_size){
                return index;
            }
        } else {
            const col_min = Math.floor(index / cols) * cols;
            const col_max = col_min + cols;
            console.log("Col min", col_min);
            console.log("Col max", col_max);
            if(new_index < col_min || new_index >= col_max){
                return index;
            }   
        }
        return new_index;
    }

    move(current, grid, cols, step){
        const index = this.bound_index(current.get_cell().get_index(), step, cols, step % cols === 0);
        console.log("Bounded index", index);
        if(index === this.end_index){
            return;
        }

        
        
        this.open_set.enqueue(grid[index], 0, current.get_priority() - 1);
        
    }

    update(grid, cols){
        if(this.open_set.is_empty()){
            return;
        }
        const current = this.open_set.dequeue();
        console.log("Current", current);
        console.log("Current index", current.get_cell().get_index());
        this.move(current, grid, cols, cols);
    }
}