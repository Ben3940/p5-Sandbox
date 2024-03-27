# Ray Casting

## Description (Math Involved)

This demo explores the topic of **ray casting**. There is a single `Particle` class that emits `Rays` towards bounding `Walls`. The calculations associated with casting `Rays` is based on this wikipedia page:

https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

Mainly focusing on the section: _Given two points on each line segment_, where _L1_ and _L2_ represent line segment 1 and 2, respectively. A bounding `Wall` is one line segment while a `Ray` is the other line segment. Mathematically, the line segments are defined by adding two _vectors_.

$L_1 = \left[ \begin{array}{c} x_1 \\ y_1 \end{array} \right] + t\left[ \begin{array}{c} x_2 - x_1 \\ y_2 - y_1 \end{array} \right]$

$L_2 = \left[ \begin{array}{c} x_3 \\ y_3 \end{array} \right] + u\left[ \begin{array}{c} x_4 - x_3 \\ y_4 - y_3 \end{array} \right]$

The variables _t_ and _u_ are **first degree Bézier parameters**. In other words, the line segments can be thought of as Bézier curves that are just linear (i.e. a line). _t_ and _u_ are fractional progressions along the line segements, where 0 is at the beginning and 1 is at the end of the line.

The wiki page constrains _t_ and _u_ to:

$0 < t < 1 $  
$0 < u < 1 $

However, for this application, _u_ is associated with line segment representing a `Ray`. This means that _u_ is actually constrained to:

$0 < u$

Since a `Ray` emits forward infinitly, _u_ must be positive in value for this to be true.
