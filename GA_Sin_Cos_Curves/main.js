const DIM = 500;
const OFFSET = DIM / 10;
const STEP_SIZE = DIM / 100;
const DOMAIN_MAX = 2 * Math.PI;
const POP_SIZE = 50;
let TRUE_VALUES;
let N_SAMPLES;
let ga;

function setup() {
  createCanvas(DIM, DIM);
  N_SAMPLES = Math.floor((width - OFFSET) / STEP_SIZE);
  TRUE_VALUES = compute_curve(Math.sin);
  ga = new GA(DIM, N_SAMPLES, POP_SIZE, 1, -1, TRUE_VALUES, 0.05);
  ga.init_population();
}

function draw() {
  background(0);
  draw_y_axis();
  draw_x_axis();
  draw_curve(TRUE_VALUES);

  if (ga.should_continue()) {
    ga.fitness();
    ga.generate_pool();
    ga.selection();
  }
  draw_curve(ga.get_best_candidate_genes(), 'green');
  frameRate(60);
  //ga.fitness();
}

function draw_y_axis() {
  stroke(255);
  line(OFFSET, 0, OFFSET, height);
}

function draw_x_axis() {
  stroke(255);
  line(OFFSET, height / 2, width, height / 2);
}

function draw_curve(y_values, color = 'purple') {
  strokeWeight(5);
  stroke(color);
  for (let i = 0; i < y_values.length; i++) {
    const x = i * STEP_SIZE + OFFSET;
    const y = map(y_values[i], -1, 1, height, 0);
    point(x, y);
  }
  stroke(255);
  strokeWeight(1);
}

function compute_curve(curve_func) {
  const step_size = DOMAIN_MAX / N_SAMPLES;
  let range_sine = [];
  for (let i = 0; i < DOMAIN_MAX; i += step_size) {
    const y = Math.round(curve_func(i) * 100) / 100;
    range_sine.push(y);
  }
  return range_sine;
}
