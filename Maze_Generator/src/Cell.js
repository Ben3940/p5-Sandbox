class Cell {
  constructor(i, j, w, cols, rows) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.walls = {
      top: true,
      right: true,
      bottom: true,
      left: true,
    };
    this.cols = cols;
    this.rows = rows;
    this.visited = false;
    this.occurance_color = 20;
    this.color_increase = 25;
  }

  get_i() {
    return this.i;
  }

  get_j() {
    return this.j;
  }

  get_visited() {
    return this.visited;
  }

  set_visited(visit_bool) {
    this.visited = visit_bool;
  }

  set_wall(pos, state) {
    this.walls[pos] = state;
  }

  // Check neighboring cells to see which ones are not visited yet, move to one of them next
  check_neighbors(grid) {
    let neighbors = [];

    // Get surrounding cells' 1D indicies
    const top = grid[this.convert_coordinates_to_index(this.i, this.j - 1)];
    const right = grid[this.convert_coordinates_to_index(this.i + 1, this.j)];
    const bottom = grid[this.convert_coordinates_to_index(this.i, this.j + 1)];
    const left = grid[this.convert_coordinates_to_index(this.i - 1, this.j)];

    // If neighbor exists and not yet visited, push to neighbors array
    if (top && !top.get_visited()) {
      neighbors.push(top);
    }
    if (right && !right.get_visited()) {
      neighbors.push(right);
    }
    if (bottom && !bottom.get_visited()) {
      neighbors.push(bottom);
    }
    if (left && !left.get_visited()) {
      neighbors.push(left);
    }

    return this.select_neighbor(neighbors);
  }

  // Convert (x,y) coordinates to 1D-array index
  convert_coordinates_to_index(i, j) {
    if (this.check_coordinate_bounds(i, j)) {
      return j + i * this.cols;
    }
    return -1;
  }

  // Confirms if row index (i) and column index (j) are within grid bounds
  check_coordinate_bounds(i, j) {
    if (i < 0 || j < 0 || i > this.rows - 1 || j > this.cols - 1) {
      return 0;
    }
    return 1;
  }

  // Given array of neighboring cells, select one to move to
  select_neighbor(neighbors) {
    if (neighbors.length > 0) {
      let rand_idx = floor(random(0, neighbors.length));
      return neighbors[rand_idx];
    }
  }

  // Remove appropriate walls between this cell and neighbor
  remove_walls(neighbor) {
    const x = this.i - neighbor.get_i();

    // Neighbor is to the right, remove neighbor's left wall and this cell's right wall
    if (x === -1) {
      this.walls['right'] = false;
      neighbor.set_wall('left', false);

      // Neighbor is to the left, remove neighbor's right wall and this cell's left wall
    } else if (x === 1) {
      this.walls['left'] = false;
      neighbor.set_wall('right', false);
    }

    const y = this.j - neighbor.get_j();

    // Neighbor below, remove neighbor's top wall and this cell's bottom wall
    if (y === -1) {
      this.walls['bottom'] = false;
      neighbor.set_wall('top', false);

      // Neighbor above, remove neighbor's bottom wall and this cell's top wall
    } else if (y === 1) {
      this.walls['top'] = false;
      neighbor.set_wall('bottom', false);
    }
  }

  // Render walls of cell
  create_walls() {
    stroke(255);
    const x = this.i * this.w;
    const y = this.j * this.w;

    // Top wall
    if (this.walls['top']) {
      line(x, y, x + this.w, y);
    }

    // Right wall
    if (this.walls['right']) {
      line(x + this.w, y, x + this.w, y + this.w);
    }

    // Bottom wall
    if (this.walls['bottom']) {
      line(x, y + this.w, x + this.w, y + this.w);
    }

    // Left wall
    if (this.walls['left']) {
      line(x, y, x, y + this.w);
    }
  }

  // Methods for controling intensity of color to indicate visit occurances
  increase_occurance_color() {
    this.occurance_color += this.color_increase;
  }
  decrease_occurance_color() {
    this.occurance_color = max(0, this.occurance_color - 0.3);
  }

  occurance_color_drain() {
    this.occurance_color -= 1;
  }

  // Called every frame, update's occurance_color and gives 'heat-map' of cells being visited
  show_if_visited() {
    // Show without 'heat-map'
    // if (this.visited) {
    //   noStroke();
    //   fill(0, 180, 230);
    //   rect(this.i * this.w, this.j * this.w, this.w);
    // }

    if (this.visited) {
      noStroke();
      fill(
        2.5 * this.occurance_color,
        1.9 * this.occurance_color,
        0.5 * this.occurance_color
      );
      rect(this.i * this.w, this.j * this.w, this.w);
    }
  }

  // Render current cell of algorithm a different color
  show_current() {
    noStroke();
    fill(230, 180, 0);
    rect(this.i * this.w, this.j * this.w, this.w);
  }
}
