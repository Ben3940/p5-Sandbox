const DIM = 500;
const OFFSET = DIM / 10;

function setup() {
  createCanvas(DIM, DIM);
}

function draw() {
  background(0);
  draw_y_axis();
  draw_x_axis();
}

function draw_y_axis() {
  stroke(255);
  line(OFFSET, 0, OFFSET, height);
}

function draw_x_axis() {
  stroke(255);
  line(OFFSET, height / 2, width, height / 2);
  draw_sine(DIM / 100);
}

function compute_curve(n_samples, curve_func) {
  const step_size = (2 * PI) / n_samples;
  let range_sine = [];
  for (let i = 0; i < 2 * PI; i += step_size) {
    const y = curve_func(i);
    const y_map = map(y, -1, 1, height, 0);
    range_sine.push(y_map);
  }
  return range_sine;
}
