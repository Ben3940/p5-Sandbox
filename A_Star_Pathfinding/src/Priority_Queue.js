class Element {
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
    }

    get_value() {
        return this.value;
    }

    get_priority() {
        return this.priority;
    }

    set_value(value) {
        this.value = value;
    }

    set_priority(priority) {
        this.priority = priority;
    }
}

class Priority_Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(value, priority) {
        const element = new Element(value, priority);
        let contain = false;
        for(let i = 0; i < this.queue.length; i++){
            if(this.queue[i].get_priority() > priority){
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
        this.is_empty() ? null : this.queue.shift().get_value();
    }

    peek() {
        this.is_empty() ? null : this.queue[0].get_value();
    }

    is_empty() {
        return this.queue.length === 0;
    }

    print_queue(){
        this.queue.forEach((element) => {
            console.log(element.get_value());
        });
    }
}