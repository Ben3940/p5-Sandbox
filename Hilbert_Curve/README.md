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

The **ORDER** global variable specifies the order for the Hilbert curve to render. **N** is the number of points along the length/width of the unit square, and **TOTAL** is the total number of points within the unit square. **PATH** keeps track of the vectors that will be represented as line between points and the order in which the curve passes through them. **COUNTER** is the step-size that the curve is generated at per call to _draw()_. Once **COUNTER** reaches _PATH.length_ then the entire curve has been drawn and the program restarts. **HUE** holds the color values (as an HSB value) for the different stroke colors for the lines that make up the curve.
