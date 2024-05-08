class GA {
  best_candidate;
  constructor(DIM, n_samples, size, max_value, min_value, true_values) {
    this.DIM = DIM;
    this.n_samples = n_samples;
    this.pop_size = size;
    this.population = [];
    this.max_value = max_value;
    this.min_value = min_value;
    this.true_values = true_values;
  }

  init_population() {
    for (let i = 0; i < this.pop_size; i++) {
      let candidate_soln = [];
      for (let j = 0; j < this.n_samples; j++) {
        candidate_soln[j] = random(this.min_value, this.max_value);
      }
      this.population.push(candidate_soln);
    }
  }

  print_population() {
    this.population.forEach((candidate) => {
      console.log(candidate);
    });
  }

  get_ith_candidate(i) {
    return this.population[i];
  }

  get_best_candidate() {
    return this.best_candidate;
  }

  fitness() {
    let fitness_scores = [];
    let best_score = 10000000;

    this.population.forEach((candidate) => {
      let count = 0;
      let fitness_score = 0;
      for (let i = 0; i < TRUE_VALUES.length; i++) {
        const diff = Math.abs(TRUE_VALUES[i] - candidate[i]);
        fitness_score += diff;
      }
      if (fitness_score < best_score) {
        this.best_candidate = candidate;
      }
      fitness_scores.push(fitness_score);
    });
    return fitness_scores;
  }
}
