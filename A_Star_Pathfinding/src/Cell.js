class Cell{
    constructor(x, y, cols, start=false, end=false){
        this.x = x;
        this.y = y;
        this.cols = cols;
        this.start = start;
        this.end = end;
        this.visited = false;
        this.g = Infinity;
        this.f = Infinity;
    }

    get_x(){
        return this.x;
    }

    get_y(){
        return this.y;
    }

    get_pos(){
        return [this.x, this.y];
    }

    get_g(){
        return this.g;
    }

    get_f(){
        return this.f;
    }

    set_x(x){
        this.x = x;
    }

    set_y(y){
        this.y = y;
    }

    set_pos(x, y){
        this.x = x;
        this.y = y;
    }

    set_g(g){
        this.g = g;
    }

    set_f(f){
        this.f = f;
    }

    get_visited(){
        return this.visited;
    }

    set_visited(visited){
        this.visited = visited;
    }

    set_as_start(){
        this.start = true;
    }

    set_as_end(){
        this.end = true;
    }

    is_start(){
        return this.start;
    }

    is_end(){
        return this.end;
    }

    show(cell_width){
        if(this.start){
            fill(0, 255, 0);
        } else if(this.end){
            fill(255, 0, 0);  
        } else if(this.visited){
            fill(50, 125, 255);
        } 
        else {
            fill(0);
        }
        rect(this.x * cell_width, this.y * cell_width, cell_width, cell_width);
    }
}