# Maze Generation

## Concept Description

This demo showcases a randomized depth-first approach to carving out a maze within a grid of cells. The algorithm is based on this wikipedia page:

    https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_depth-first_search

This is one of the simplest algorithms listed on this page and both a recursive and iterative approach can be made, this demo performs the latter.

## Class Descriptions

### Grid Class

For this demo, a `Grid` class is defined which contains information such as width, height, and individual cell widths of the grid. It also holds an array (called _grid_) which contains all the cells of the grid. NOTE: this array is one dimensional, yet the grid is visualized as two dimensional. This is why each `Cell` class has a _convert_coordinates_to_index_ function (see **Cell Class** below).

The `Grid` class calls each `Cell's` constructor and stores the cell in the _grid_ array. It also has a _show_ function that calls each individual `Cell's` _show_ function

### Cell Class

The `Cell` class is the main workhorse of this demo. Each `Cell` tracks its position in the grid (_ith_ row, _jth_ column), the states of each surrounding wall, and if the `Cell` has been visited. Since the `Cells` are in a one dimensional array, the _convert_coordinates_to_index_ function takes the row and column position and converts it to an index value for the array. A helper function (_check_coordinate_bounds_) ensures that the row and column pair are within the bounds of the array.

Each `Cell` handles rendering its surrounding walls, and changing its background color to indicate if it has been visited. When a `Cell` is visited, it checks its neighbors to see if any of them have not been visited yet. The algorithm then moves from the current `Cell` to a random, unvisited neighbor.

## Algorithm Description

The algorithm used for this demo is a _randomized depth first_ implementation of maze generation. _Randomized_ in the sense that the next cell to move to is selected randomly from a list of available cells. _Depth first_ in the sense that the algorithm moves forward until there are no neighbor cells to move to in the current path. It then backtracks to a previous cell and traverses from there if any neighboring cells exist.

This algorithm is relatively simplistic compared to other approaches discussed on the Wiki page. These alternative approaches use other techniques, such as _random walk_, modified _Prim's algorithm_, and _cellular automaton_. Each approach has it's pros and cons, with this algorithm being fast but biased to generating mazes with many long corridors.

To start, the algorithm considers all neighboring cells surrounding the current cell. Those that have not been visited yet are added to the list of neighboring cells to move to next. When the algorithm moves from the current cell to the next neighboring cell, the walls between the two cells are removed, creating a path from the current cell to the next cell. The algorithm also pushes the current cell to a stack that is used later to backtrack to previous cells and visit any unvisited cells. This repeats until all cells have been visited. In which case, cells are popped from the stack continuously until the algorithm is back at the initial cell. This was the first cell to be pushed to the stack.
