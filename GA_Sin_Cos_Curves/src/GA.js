class GA {
  DIM;
  n_samples;
  pop_size;
  max_value;
  min_value;
  true_values;
  best_candidate;
  fitness_pool;
  selection_pool;
  population;
  generation_score;
  mutation_rate;

  constructor(
    DIM,
    n_samples,
    size,
    max_value,
    min_value,
    true_values,
    mutation_rate
  ) {
    this.DIM = DIM;
    this.n_samples = n_samples;
    this.pop_size = size;
    this.max_value = max_value;
    this.min_value = min_value;
    this.true_values = true_values;
    this.mutation_rate = mutation_rate;
    this.best_candidate = null;
    this.fitness_pool = [];
    this.selection_pool = {};
    this.population = [];
    this.generation_score = 0;
  }

  init_population() {
    for (let i = 0; i < this.pop_size; i++) {
      const candidate = new Candidate();
      candidate.initialize_genes(
        this.n_samples,
        this.min_value,
        this.max_value
      );
      this.population.push(candidate);
    }
  }

  print_population() {
    this.population.forEach((candidate) => {
      console.log(candidate.get_genes());
    });
  }

  get_ith_candidate_genes(i) {
    return this.population[i].get_genes();
  }

  get_best_candidate_genes() {
    return this.best_candidate.get_genes();
  }

  fitness() {
    let best_score = -1000;
    let total_score = 0;
    this.fitness_pool = [];
    this.population.forEach((candidate) => {
      const fitness_score = candidate.calculate_fitness(this.true_values);

      if (fitness_score > best_score) {
        this.best_candidate = candidate;
      }
      total_score += fitness_score;
      this.fitness_pool.push(candidate);
    });
    this.generate_score = total_score;
  }

  generate_pool() {
    let offset = 0;
    this.selection_pool = {};
    for (let i = 0; i < this.fitness_pool.length - 1; i++) {
      const upper_bound = Math.floor(
        (this.fitness_pool[i].get_fitness_score() / this.generate_score) * 100
      );
      this.selection_pool[i] = upper_bound + offset;
      offset += upper_bound;
    }
    // Last candidate gets remainding percentage of pool for selection
    this.selection_pool[this.fitness_pool.length - 1] = 100;
  }

  selection() {
    this.population = [];

    for (let j = 0; j < this.pop_size; j++) {
      const parent_1_rand = Math.random() * 101;
      const parent_2_rand = Math.random() * 101;

      let parent_1 = null;
      let parent_2 = null;

      for (const i in this.selection_pool) {
        if (parent_1 === null && parent_1_rand < this.selection_pool[i]) {
          parent_1 = this.fitness_pool[i].get_genes();
        }
        if (parent_2 === null && parent_2_rand < this.selection_pool[i]) {
          parent_2 = this.fitness_pool[i].get_genes();
        }
        if (parent_1 !== null && parent_2 !== null) {
          break;
        }
      }

      const split = Math.floor(this.n_samples / 2);
      let child = new Candidate();
      let genes = parent_1.slice(0, split).concat(parent_2.slice(split));
      genes = this.mutation(genes);
      console.log(genes);
      child.set_genes(genes);
      this.population.push(child);
    }
  }

  mutation(genes) {
    for (let i = 0; i < genes.length; i++) {
      const rand = Math.random();
      if (rand < this.mutation_rate) {
        const mutated_value = genes[i] + Math.random() * 0.25;
        genes[i] = Math.round(Math.min(this.max_value, mutated_value, 2));
      }
    }
    return genes;
  }

  // fitness() {
  //   let best_score = 1000;
  //   let total_score = 0;
  //   this.population.forEach((candidate) => {
  //     let fitness_score = 0;
  //     for (let i = 0; i < TRUE_VALUES.length; i++) {
  //       const diff = Math.max(
  //         0,
  //         1 - Math.abs(TRUE_VALUES[i] ** 2 - candidate[i] ** 2)
  //       );
  //       fitness_score += diff;
  //     }

  //     if (fitness_score < best_score) {
  //       this.best_candidate = candidate;
  //     }
  //     total_score += fitness_score;
  //     this.selection_pool.push([fitness_score, candidate]);
  //   });
  //   return total_score;
  // }

  // generate_pool(total_score) {
  //   let marker = 0;
  //   let pool = [];

  //   this.selection_pool((candidate) => {
  //     const score = candidate[0];
  //     const instances = Math.round(score / total_score, 2) * 100;
  //     pool.push([marker, marker + instances, candidate[1]]);
  //   });

  //   for (let n = 0; n < this.pop_size; n++) {
  //     const rand = Math.random() * 100;
  //     for (let i = 0; i < pool.length; i++) {
  //       const cand = pool[i];
  //       if (rand >= cand[0] && rand <= cand[1]) {
  //       }
  //     }
  //   }
  // }

  // selection() {
  //   this.selection_pool{}
  // }
}
