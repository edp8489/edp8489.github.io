---
layout: post
title: Timoshenko Bending-Compression Buckling
date: 2023-06-11
---

Another month, another softball blog post. Honestly, this one is just as much for future me as it is for anyone else. I've derived this equation enough times over the years that I never want to have to do it again. Hopefully this post saves you a few pages of math, too.

Our good friend Dr. Timoshenko provides a method for calculating the buckling coefficient for rectangular plates subject to in-plane bending and combinations of bending + compression/tension. 

A python script containing all functions and two verification problems is available on my [Github]().

I also created an interactive Jupyter notebook that you can run in [Google Colab]()  
<em>(disclaimer: all of my web tools to date have performed all math using client-side JavaScript. This breaks that trend and <b>will</b> send your data to an external server. I'm mostly using this as an excuse to play around with Colab).</em>

## Validation
text...

## Full Derivation
First, start by expanding this lovely series into as many terms as you see fit. I'm going to stop at three, as a footnote in the text states the accuracy difference between third and fourth approximations is only 0.33%.

$$ a_{1n} \left[ \left(1 + n^2 \frac{a^2}{b^2} \right )^2 - 
\sigma_{cr} \frac{a^2 h}{\pi^2 D}\left(1 - \frac{\alpha}{2} \right) \right] -
8 \alpha \sigma_{cr} \frac{a^2 h}{\pi^4 D}  \sum_{i}^{\infty} \frac{a_{1i} n i}{(n^2 - i^2)^2 }   = 0 $$

where <i>n</i> = 1, 2, 3... and the summation is taken over all <i>i</i> such that <i>n &pm; i</i> = odd.

The three equations can be rearranged and represented in matrix form based on the unknown coefficients *a_* :

$$ \begin{bmatrix}
c_1 & c_2 & c_3\\
c_4 & c_5 & c_6\\
c_7 & c_8 & c_9
\end{bmatrix} \times \begin{bmatrix} a_{11} \\ a_{12} \\ a_{13} \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}  $$

For convenience, define the following term so we don't have to write out *quite* as much:

$$ S = \frac{\sigma_{cr} a^2 h}{\pi^2 D} $$

and *D* is, of course, the flexural rigidity of the plate: 
$$ D = \frac{Eh^3}{12(1-\nu^2)} $$

The matrix elements are

$$ c_1 = \left[ \left(1 + \frac{a^2}{b^2} \right)^2 \right] - S\left(1 - \frac{\alpha}{2}\right) $$

$$ c_2 = c_4 = -\frac{8 \alpha S}{\pi^2} \left( \frac{2}{9} \right) $$

$$ c_3 = c_7 = 0 $$

$$ c_5 = $$

$$ c_6 = c_8 = $$

$$ c_9 = $$

## References
Timoshenko and Gere, <i>Theory of Elastic Stability (2nd ed.)</i>, Article 9.6