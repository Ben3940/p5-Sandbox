class GA {
  best_candidate;
  selection_pool = [];
  population = [];
  constructor(DIM, n_samples, size, max_value, min_value, true_values) {
    this.DIM = DIM;
    this.n_samples = n_samples;
    this.pop_size = size;

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
    let best_score = 1000;
    let total_score = 0;
    this.population.forEach((candidate) => {
      let fitness_score = 0;
      for (let i = 0; i < TRUE_VALUES.length; i++) {
        const diff = Math.abs(TRUE_VALUES[i] ** 2 - candidate[i] ** 2);
        fitness_score += diff;
      }
      if (fitness_score < best_score) {
        this.best_candidate = candidate;
      }
      total_score += fitness_score;
      this.selection_pool.push([fitness_score, candidate]);
    });
    return total_score;
  }

  generate_pool(total_score){
    let marker = 0;
    let pool = [];

    this.selection_pool(candidate => {
      const score = candidate[0];
      const instances = Math.round(score/total_score, 2) * 100;
      pool.push([marker, marker + instances, candidate[1]]);
    })

    for (let n = 0; n < this.pop_size; n++){
      const rand = Math.random() * 100;
      for (let i = 0; i< pool.length; i++){
        const cand = pool[i];
        if (rand >= cand[0] && rand <= cand[1]){
          
        }
      }
    }
  }

  selection() {
    this.selection_pool{}
  }
}
