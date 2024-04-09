const DIM = 1800;
let cells = [];
const w = 5;
let y;
let ruleset;
function setup() {
  createCanvas(DIM, DIM * 2);
  initialize_canvas();
  generate_rule_set();
}

function draw() {
  for (let i = 0; i < cells.length; i++) {
    stroke(0);

    // If cell exists, render colored cell. otherwise cell is black
    if (cells[i][0]) {
      fill(cells[i][1]['R'], cells[i][1]['G'], cells[i][1]['B']);
    } else {
      fill(0);
    }
    square(i * w, y, w);
  }
  // Move to next row and update cell array
  y += w;
  update_cells();
}

// Clear background, re-populate cells array, start at first row
function initialize_canvas() {
  background(0);
  populate_cells();
  y = 0;
}

// Iterate across row of cells, setting middle middle as only active cell
function populate_cells() {
  total_cells = width / w;
  for (let i = 0; i < total_cells; i++) {
    if (i === floor(total_cells / 2) - 1) {
      cells[i] = [1, { R: 255, G: 255, B: 255 }];
    } else {
      cells[i] = [0, { R: 0, G: 0, B: 0 }];
    }
  }
}

// Determine new cell state based on 3 consecutive cells from row above
function update_cells() {
  const len = cells.length;
  let next_cells = [];
  for (let i = 0; i < len; i++) {
    // Modulo allows for wrapping around on edge cells (i.e. i = 0 & i = len - 1)
    const left = cells[(i - 1 + len) % len][0];
    const middle = cells[i][0];
    const right = cells[(i + 1 + len) % len][0];
    next_cells.push(apply_rule_set([left, middle, right]));
  }
  // New cell states are set to cells as next generation (row) of cells
  cells = next_cells;
}

// Submission of form lets user define ruleset number and re-initializes canvas with new ruleset
document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  generate_rule_set();
  initialize_canvas();
});

// Grab integer value from HTML input ("#ruleset") and generate ruleset based on this value
function generate_rule_set() {
  // Convert value as Number, then to string as base-2 number, add '0' padding incase first
  //   few bits are 0 (i.e. 30 => 00011110  JS will drop first 3 '0' from left side)
  const binary_rule = Number(document.querySelector('#ruleset').value)
    .toString(2)
    .padStart(8, '0');

  let rule = [];
  // Split binary_rule string into individual bits, convert them to Numbers and add to array
  binary_rule.split('').forEach((elm) => {
    rule.push(Number(elm));
  });

  ruleset = rule;
}

// Consider sequence of 3 cells and generate new state based on these cells' states
function apply_rule_set(seq) {
  // Interpret sequence array as binary number and parse the decimal value of that number
  //  Subtract from 7 to invert ordering (see README)
  const value = 7 - parseInt(seq.join(''), 2);
  const cell_state = ruleset[value];

  let cell_color = assign_color(value);

  // New cell has a state (0 or 1) and color based on what rule determined this state
  return [cell_state, cell_color];
}

// Given ruleset index value, assign a color for cell
function assign_color(value) {
  let cell_color = {
    R: 0,
    G: 0,
    B: 0,
  };

  switch (value) {
    case 0:
    case 1:
      cell_color['R'] = 242;
      cell_color['G'] = 95;
      cell_color['B'] = 93;

      break;
    case 2:
    case 3:
    case 4:
      cell_color['R'] = 45;
      cell_color['G'] = 105;
      cell_color['B'] = 225;
      break;
    case 5:
      cell_color['R'] = 167;
      cell_color['G'] = 176;
      cell_color['B'] = 202;
      break;
    default:
      cell_color['R'] = 98;
      cell_color['G'] = 60;
      cell_color['B'] = 234;
      break;
  }
  return cell_color;
}
