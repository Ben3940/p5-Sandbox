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
    // fill(255 * cells[i]);
    if (cells[i][0]) {
      fill(cells[i][1][0], cells[i][1][1], cells[i][1][2]);
    } else {
      fill(0);
    }
    square(i * w, y, w);
  }
  y += w;
  update_cells();
}

function initialize_canvas() {
  background(0);
  populate_cells();
  y = 0;
}

function populate_cells() {
  total_cells = width / w;
  for (let i = 0; i < total_cells; i++) {
    if (i === floor(total_cells / 2) - 1) {
      cells[i] = [1, [255, 255, 255]];
    } else {
      cells[i] = [0, [0, 0, 0]];
    }
  }
}

function update_cells() {
  const len = cells.length;
  let next_cells = [];
  for (let i = 0; i < len; i++) {
    const left = cells[(i - 1 + len) % len][0];
    const middle = cells[i][0];
    const right = cells[(i + 1 + len) % len][0];
    next_cells.push(apply_rule_set([left, middle, right]));
  }
  cells = next_cells;
}

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  generate_rule_set();
  initialize_canvas();
});

function generate_rule_set() {
  const binary_rule = Number(document.querySelector('#ruleset').value)
    .toString(2)
    .padStart(8, '0');
  console.log(binary_rule);
  let rule = [];
  binary_rule.split('').forEach((elm) => {
    rule.push(Number(elm));
  });
  ruleset = rule;
}

function apply_rule_set(seq) {
  const value = 7 - parseInt(seq.join(''), 2);
  const cell_state = ruleset[value];
  let cell_color;

  if (value >= 0 && value < 2) {
    cell_color = [85, 105, 205];
  } else if (value >= 2 && value < 5) {
    cell_color = [125, 25, 255];
  } else {
    cell_color = [25, 255, 125];
  }

  return [cell_state, cell_color];
}
