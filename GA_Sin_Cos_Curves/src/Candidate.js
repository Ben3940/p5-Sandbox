class Candidate {
  fitness_score = 0;
  genes = [];

  set_fitness_score(score) {
    this.fitness_score = score;
  }

  get_fitness_score() {
    return this.fitness_score;
  }

  set_genes(genes) {
    this.genes = genes;
  }

  get_genes() {
    return this.genes;
  }
  set_ith_gene(i, value) {
    this.genes[i] = value;
  }

  get_ith_gene(i) {
    return this.genes[i];
  }

  initialize_genes(n_genes, min_value, max_value) {
    for (let i = 0; i < n_genes; i++) {
      this.genes[i] =
        Math.round(
          (Math.random() * (max_value - min_value) + min_value) * 100
        ) / 100;
    }
  }

  calculate_fitness(true_y_labels) {
    let fitness_score = 0;
    for (let i = 0; i < true_y_labels.length; i++) {
      const inter_value =
        Math.round(Math.abs(true_y_labels[i] ** 2 - this.genes[i] ** 2) * 100) /
        100;
      const diff = Math.max(0, 1 - inter_value);
      fitness_score += diff;
    }
    this.fitness_score = fitness_score;
    return fitness_score;
  }
}
