class Model {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    set_x(x){
        this.x = x;
    }

    set_y(y){
        this.y = y;
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

    set_pos(x, y){
        this.x = x;
        this.y = y;
    }

    show(cell_width){
        fill(0, 0, 255);
        rect(this.x * cell_width, this.y * cell_width, cell_width, cell_width);
    }
}