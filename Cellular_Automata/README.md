# 1-Dimensional Cellular Automata

# Description

This demo is based on Wolfram MathWorld's _Elementary Cellular Automaton_

https://mathworld.wolfram.com/ElementaryCellularAutomaton.html

This is a 1-dimensional cellular automaton, visualized in a 2-dimensional plane. Each row of the 2D plane is a different generation of `cells` whose state values are determined by the 3 cells above (upper left, above, upper right). A `ruleset` considers the state of these 3 cells, states being either 0 or 1 (off or on), and sets the next cells value as either 0 or 1 (i.e. 000 = 0, 001 = 1, 010 = 0, etc.).

The facination with these Automatas is that the rulesets can seem random/chaotic, yet patterns/order can be generated based on them. Some notable rules are **30**, **60**, **110**, **126**, and **150**

### How is a Ruleset Generated

Rulesets revolve around the idea of base 2 (binary) numbers. They also consider a sequence of 3 consecutive cell states (0 or 1) to determine the new cell state. Since a cell can only have a state of either 0 or 1, that means there are 2 _ 2 _ 2 = 8 different sequences (i.e. 000, 001, 010, etc.). This works well with binary numbers, where each bit can be either 0 or 1, meaning we only need 8 bits to map all 8 different sequences to a state of either 0 or 1.

A 8-bit binary number caps at 256 (in base 10) different binary numbers. Therefore, converting any base 10 number from 0 to 255 will result in a ruleset that is just the base 2 representation of that base 10 number.
