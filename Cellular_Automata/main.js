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
    fill(255 * cells[i]);
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
      cells[i] = 1;
    } else {
      cells[i] = 0;
    }
  }
}

function update_cells() {
  const len = cells.length;
  let next_cells = [];
  for (let i = 0; i < len; i++) {
    const left = cells[(i - 1 + len) % len];
    const middle = cells[i];
    const right = cells[(i + 1 + len) % len];
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
  let value = 7 - parseInt(seq.join(''), 2);
  return ruleset[value];
}
