class Model extends Entity{
    constructor(x, y, cols) {
        super(x, y, cols);
    }

    bound_x_y(){
        this.x = Math.max(0, Math.min(this.x, this.cols - 1));
        this.y = Math.max(0, Math.min(this.y, this.cols - 1));
    }

    show(cell_width){
        fill(0, 0, 255);
        rect(this.x * cell_width, this.y * cell_width, cell_width, cell_width);
    }

    move(direction){
        switch(direction){
            case 'u':
                this.y -= 1;
                break;
            case 'd':
                this.y += 1;
                break;
            case 'l':
                this.x -= 1;
                break;
            case 'r':
                this.x += 1;
                break;
        }

        this.bound_x_y();
    }
}