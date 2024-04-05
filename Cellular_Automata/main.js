const DIM = 600;
let cells = [];
const w = 10;
let y = 0;
const rulesets = {
  178: [1, 0, 1, 1, 0, 1, 1, 0],
};
function setup() {
  createCanvas(DIM, DIM);
  background(0);
  populate_cells();
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

function populate_cells() {
  total_cells = width / w;
  for (let i = 0; i < total_cells; i++) {
    if (i === floor(total_cells / 2)) {
      cells[i] = 1;
    } else {
      cells[i] = 0;
    }
  }
}

function update_cells() {
  let next_cells = [cells[0]];
  for (let i = 1; i < cells.length - 1; i++) {
    // const left = cells[i - 1];
    // const middle = cells[i];
    // const right = cells[i + 1];

    const seq = cells.slice(i - 1, i + 2);
    next_cells.push(rule_set(178, seq));
  }
  next_cells.push(cells[-1]);
  cells = next_cells;
}

function rule_set(rule, seq) {
  if (seq.join('') === '010') {
    console.log('Hit');
  }
  let value = 7 - parseInt(seq.join(''), 2);
  console.log(rulesets[rule][value]);
  return rulesets[rule][value];
}
