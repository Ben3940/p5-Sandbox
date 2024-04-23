# Hilbert Curve

## Description

This demo explores the topic of **Hilbert curves** and is based on these web pages:

    1) https://en.wikipedia.org/wiki/Space-filling_curve

    2) https://en.wikipedia.org/wiki/Hilbert_curve

The idea behind **space-filling-curves** is that given a unit of space, say a _unit square_, the technique will produce a curve with a _range_ (the _set_ of the curve's output values) that includes every point within the unit square. The Hilbert curve is an example of such a technique. The number of points within the unit square that the curve will pass through is denoted by the **order** of the Hilbert curve. A 2nd-order hilbert curve will have more points than the 1st-order, while the 3rd-order will have more than the 2nd-order hilbert curve, and so on. As the order size increases, the perception of individual points becomes difficult, until the curve appears to "fill" the entire unit square. Adding color to the curve as it progreses through the space gives the "illusion" of a continuous, colorized space.

With the Hilbert curve, there is also the notion of _fractal_ generation. The
1st-order curve is the base pattern of the fractal, in this demo it involves 4 points: points 0, 1, 2, and 3. The curve starts at point 0 and ends at point 3, creating a "U" shape path. The 2nd-order curve creates 4 copies of the 1st order curve and connect the 3rd point of the current 1st-order curve to the 0th point of the next 1st-order curve. Some copies are rotated to avoid connections between points from crossing over each other.

# File Description

## Main.js

#### Gloabal Variables

The **ORDER** global variable specifies the order for the Hilbert curve to render. **N** is the number of points along the length/width of the unit square, and **TOTAL** is the total number of points within the unit square. **PATH** keeps track of the vectors that will be represented as line between points and the order in which the curve passes through them. **COUNTER** is the step-size that the curve is generated at per call to _draw()_. Once **COUNTER** reaches _PATH.length_ then the entire curve has been drawn and the program restarts. **HUE** holds the color values (as an HSB value) for the different stroke colors for the lines that make up the curve.

#### Functions

In setup() the canvas is created and the PATH array is populated with vectors (or lines, in other words) whose (x, y) coordinates are generated based on the value of _i_. The vectors are then transformed by multiplying by _len_ (the length of one row in the unit square) and adding half the length to push the vector's tail to the center, instead of the tail being in the top-left corner.

In draw() vectors from _i_ to _i_ = COUNTER - 1 are rendered at once. The HUE for the vectors are calculated based on the _ith_ positioning mapped to the range [0, 360]. With each successive call to draw(), COUNTER is incremented so that more lines are drawn at once. Until counter is equal or greater than PATH.length (the total number of vectors), in which case, COUNTER is reset to 0.

In hilbert*x_y(i), an index, \_i*, is given as a decimal number. Using "i & 3" converts i to a binary number and bit masks it with the number 3, converted to binary as well (so 0111, using only 4 bits). By doing so we focus on only the 2 right-most bits of i as a binary number. This results in either 00, 01, 10, 11 which is 0, 1, 2, and 3 as decimal values. From this we can grab the fundamental vector from _points_ to determine which vector to render at this _ith_ index along the Hilbert curve. Note, these fundamental vectors (4 of them in total) constitute the 1st-order Hilbert curve. A _len_ variable is used to offset the vector tails to their associated quadrants. Starting from the top-left and moving bottom-left, bottom-right, and finally top-right the quadrant numbers are 0, 1, 2, and 3, respectifully. For the top-left (index = 0) and top-right (index = 3) quadrants, the 1st-order Hilbert curve is rotated. This allows the successive quadrants to connect without overlapping.
