const DIM = 500;
const OFFSET = DIM / 10;
const STEP_SIZE = DIM / 100;
const MAX_VALUE = 2 * Math.PI;
let N_SAMPLES;
let ga;

function setup() {
  createCanvas(DIM, DIM);
  N_SAMPLES = Math.floor((width - OFFSET) / STEP_SIZE);
  ga = new GA(DIM, N_SAMPLES, 10, MAX_VALUE);
  ga.set_curve(sin);
  ga.init_population();
}

function draw() {
  background(0);
  draw_y_axis();
  draw_x_axis();
  draw_curve();
  ga.print_population();
}

function draw_y_axis() {
  stroke(255);
  line(OFFSET, 0, OFFSET, height);
}

function draw_x_axis() {
  stroke(255);
  line(OFFSET, height / 2, width, height / 2);
}

function draw_curve() {
  strokeWeight(5);
  stroke('purple');
  const range = compute_curve(sin);
  for (let i = 0; i < range.length; i++) {
    const x = i * STEP_SIZE + OFFSET;
    const y = range[i];
    point(x, y);
  }
  stroke(255);
  strokeWeight(1);
}

function compute_curve(curve_func) {
  const step_size = MAX_VALUE / N_SAMPLES;
  let range_sine = [];
  for (let i = 0; i < MAX_VALUE; i += step_size) {
    const y = curve_func(i);
    const y_map = map(y, -1, 1, height, 0);
    range_sine.push(y_map);
  }
  return range_sine;
}
