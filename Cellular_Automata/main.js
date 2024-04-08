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
      fill(cells[i][1]['R'], cells[i][1]['G'], cells[i][1]['B']);
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
      cells[i] = [1, { R: 255, G: 255, B: 255 }];
    } else {
      cells[i] = [0, { R: 0, G: 0, B: 0 }];
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
  let cell_color = assign_color(value);

  return [cell_state, cell_color];
}

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
