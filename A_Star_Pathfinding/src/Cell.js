class Cell {
    constructor(x, y, cell_width, start=false, end=false){
        this.x = x;
        this.y = y;
        this.cell_width = cell_width;
        this.visited = false;
        this.start = start;
        this.end = end;
    }

    get_coordinates(){
        return [this.x, this.y];
    }

    set_x(x){
        this.x = x;
    }

    set_y(y){
        this.y = y;
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

    show(){
        if(this.start){
            fill(0, 255, 0);
        } else if(this.end){
            fill(255, 0, 0);  
        } else if(this.visited){
            fill(255);
        } 
        else {
            fill(0);
        }
        rect(this.x * this.cell_width, this.y * this.cell_width, this.cell_width, this.cell_width);
    }
}