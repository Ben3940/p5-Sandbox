class Element {
    constructor(cell, cost, priority) {
        this.cell = cell;
        this.cost = cost;
        this.priority = priority;
    }

    get_cell() {
        return this.cell;
    }

    get_cost() {
        return this.cost;
    }

    get_priority() {
        return this.priority;
    }

    set_cost(cost) {
        this.cost = cost;
    }

    set_cost(cost) {
        this.cost = cost;
    }

    set_priority(priority) {
        this.priority = priority;
    }
}

class Priority_Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(cell, cost, priority) {
        const element = new Element(cell, cost, priority);
        let contain = false;
        for(let i = 0; i < this.queue.length; i++){
            if(this.queue[i].get_priority() >= priority){
                this.queue.splice(i, 0, element);
                contain = true;
                break;
            }
        }

        if(!contain){
            this.queue.push(element);
        }
    }

    dequeue() {
        return this.is_empty() ? null : this.queue.shift();
    }

    peek() {
        return this.is_empty() ? null : this.queue[0];
    }

    is_empty() {
        return this.queue.length === 0;
    }

    print_queue(){
        this.queue.forEach((element) => {
            console.log(element);
        });
    }
}