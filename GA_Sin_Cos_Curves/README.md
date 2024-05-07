# Genetic Algorithm (GA) for Sine and Cosine Curves

## Description

The demo explores using a genetic algorithm to simulate an ML model's evolutionary discovery of computing sine and cosine curves. The general idea is, given the _domain_ (input values), 0 to 2pi, for sine or cosine, the GA will generate a list of predictions that correctly models a sine or cosine curve. The _population_ of the GA is comprised of various _candidate solutions_, where each _solution_ is a list of predictions for what the _range_ (output values) should be. Each prediction is a _gene_ of the solution, _mutation_ will occasionally change one of these genes to help push the algorithm closer to a correct solution. The solutions closest to modeling the curve accuratley will be used to create the next generation of solutions.
