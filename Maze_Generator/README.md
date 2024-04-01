# Maze Generation

## Description

This demo showcases a randomized depth-first approach to carving out a maze within a grid of cells. The algorithm is based on this wikipedia page:

    https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_depth-first_search

This is one of the simplest algorithms listed on this page and both a recursive and iterative approach can be made, this demo performs the latter.

### Grid Class

For this demo, a `Grid` class is defined which contains information such as width, height, and individual cell widths of the grid. It also holds an array (called `grid`) which contains all the cells of the grid. NOTE: this array is one dimensional, yet the grid is visualized as two dimensional. This is why each `Cell` class has a _convert_coordinates_to_index_ function (see **Cell Class** below).

The `Grid` class calls each `Cell's` constructor and stores the cell in the `grid` array. It also has a _show_ function that calls each individual `Cell's` _show_ function

### Cell Class

The `Cell` class is the main workhorse of this demo.
