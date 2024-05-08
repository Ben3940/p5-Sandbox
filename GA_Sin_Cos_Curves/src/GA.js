class GA {
  constructor(DIM, n_samples, size, max_value) {
    this.DIM = DIM;
    this.n_samples = n_samples;
    this.pop_size = size;
    this.population = [];
    this.max_value = max_value;
  }

  set_curve(curve) {
    this.curve = curve;
  }

  init_population() {
    for (let i = 0; i < this.pop_size; i++) {
      let candidate_soln = [];
      for (let j = 0; j < this.n_samples; j++) {
        candidate_soln[j] = round(random() * this.max_value, 2);
      }
      this.population.push(candidate_soln);
    }
  }

  print_population() {
    this.population.forEach((candidate) => {
      console.log(candidate);
    });
  }
}
