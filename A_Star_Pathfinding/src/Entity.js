class Entity {
    constructor(x, y, cols){
        this.x = x;
        this.y = y;
        this.cols = cols;
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

    get_index(){
        return this.x * this.cols + this.y;
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

    set_pos_from_index(index){
        this.x = Math.floor(index / this.cols);
        this.y = index % this.cols;
    }
}