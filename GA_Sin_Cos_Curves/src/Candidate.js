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
      this.genes[i] = random(min_value, max_value);
    }
  }
}
