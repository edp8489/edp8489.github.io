---
layout: post
title: Timoshenko Bending-Compression Buckling
date: 2023-07-15
---

Another month<sup>*</sup>, another softball blog post. Honestly, this one is just as much for future me as it is for anyone else. I've written out these equations enough times over the years that I never want to have to do it again. Hopefully this post saves you a few pages of math, too. (<sup>*</sup> except I started this in May and it's now July... Oh well.)

Our good friend Dr. Timoshenko provides a method for calculating the buckling coefficient for simply-supported rectangular plates subject to in-plane bending superimposed with uniaxial compression/tension. Unfortunately, it's presented in the form of this monstrosity:

$$ a_{1n} \left[ \left(1 + n^2 \frac{a^2}{b^2} \right )^2 - 
\sigma_{cr} \frac{a^2 h}{\pi^2 D}\left(1 - \frac{\alpha}{2} \right) \right] -
8 \alpha \sigma_{cr} \frac{a^2 h}{\pi^4 D}  \sum_{i}^{\infty} \frac{(a_{1i}) n i}{(n^2 - i^2)^2 }   = 0 $$

<i>(note: this is already a simplified version for m = 1 half-waves. As the plate aspect ratio increases, other forms of this equation with m = 2, 3... would have to be solved as well in order to determine the minimum value.)</i>

For those of you who'd rather skip the math and dive straight into the action, a Python script containing all functions and two verification problems and a Jupyter notebook that generates an interactive plot using the Bokeh library are available on my [Github](https://github.com/edp8489/stability_tools/tree/main/timoshenko){:target="_blank"}.

Click the legend entries to hide/show individual curves. You can also pan, zoom, and hover to inspect (x, y) coordinates.

{% include timoshenko_bcb.html %}

## Verification & Validation
<i>How do you know it works?</i>

Let's explore a few examples using some of the published coefficients for comparison. This should ensure confidence in the code's functionality.

### Example 1: Matrix Equation for Pure Bending
Timoshenko provides the terms for a system of three equations assuming $ \alpha $ = 2  (pure bending), which we can use to verify the function that assembles the C matrix is correct.

```python
# script
symA, symB = sym.symbols('a,b')
cMatrix(symA, symB, 2)
```
Output (LaTeX copied directly from Jupyter notebook):

$$ \displaystyle \left[\begin{matrix}\left(\frac{a^{2}}{b^{2}} + 1\right)^{2} & - \frac{3.556 S a^{2}}{\pi^{2}} & 0\\- \frac{3.556 S a^{2}}{\pi^{2}} & \left(\frac{4 a^{2}}{b^{2}} + 1\right)^{2} & - \frac{3.84 S a^{2}}{\pi^{2}}\\0 & - \frac{3.84 S a^{2}}{\pi^{2}} & \left(\frac{9 a^{2}}{b^{2}} + 1\right)^{2}\end{matrix}\right] $$

<i>S</i> is a constant I defined so I didn't have to write out *quite* as much:

$$ S = \frac{\sigma_{cr} h}{\pi^2 D} $$

In C2 and C4, 3.556 = 16 * 2/9  
In C6 and C8, 3.84 = 16 * 6/25

The result matches the published terms.

### Example 2: Square Plate Subject to Pure Bending
a/b = 1, alpha = 2

```python
# script
ab_v1 = 1
k_v1 = sym.solve(cMatrix(ab_v1,1,2).det())
k_v1 = minGreaterZero(k_v1)
error_v1 = (k_v1 - 25.6)/25.6

print("Validation Problem 1\n(a/b = 1, alpha = 2)")
print("computed k = {:.2f}".format(k_v1))
print("expected k = 25.6")
print("error: {:.1f}%".format(error_v1*100))

# console output
> Validation Problem 1
> (a/b = 1, alpha = 2)
> computed k = 27.13
> expected k = 25.6
> error: 6.0%
```


### Example 3: Rectangular Plate Subject to Bending + Compression
a/b = 1.5, alpha = 1

```python
# script
ab_v2 = 1.5
k_v2 = sym.solve(cMatrix(ab_v2,1,1).det())
k_v2 = minGreaterZero(k_v2)
error_v2 = (k_v2 - 8.4)/8.4

print("Validation Problem 2\n(a/b = 1.5, alpha = 1)")
print("computed k = {:.2f}".format(k_v2))
print("expected k = 8.4")
print("error: {:.1f}%".format(error_v2*100))

# console output
> Validation Problem 2
> (a/b = 1.5, alpha = 1)
> computed k = 9.25
> expected k = 8.4
> error: 10.1%
```

## Full Mathematical Derivation and Other Implementation Details
For the morbidly curious, I'll now step through the core equations, algorithms, and techniques employed to streamline the calculations. 

First, start by expanding this lovely series into as many terms as you see fit. I'm going to stop at three, as a footnote in the text states the accuracy difference between third and fourth approximations is only 0.33%.

$$ a_{1n} \left[ \left(1 + n^2 \frac{a^2}{b^2} \right )^2 - 
\sigma_{cr} \frac{a^2 h}{\pi^2 D}\left(1 - \frac{\alpha}{2} \right) \right] -
8 \alpha \sigma_{cr} \frac{a^2 h}{\pi^4 D}  \sum_{i}^{\infty} \frac{(a_{1i}) n i}{(n^2 - i^2)^2 }   = 0 $$

where <i>n</i> = 1, 2, 3... and the summation is taken over all <i>i</i> such that <i>n &pm; i</i> = odd.

Next, rearrange the terms of each equation so the system can be represented in matrix form based on the unknown coefficients *a<sub>ni</sub>* :

$$ \begin{bmatrix}
c_1 & c_2 & c_3\\
c_4 & c_5 & c_6\\
c_7 & c_8 & c_9
\end{bmatrix} \times \begin{bmatrix} a_{11} \\ a_{12} \\ a_{13} \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}  $$

For convenience, define the following term so we don't have to write out *quite* as much:

$$ S = \frac{\sigma_{cr} h}{\pi^2 D} $$

*D* is, of course, the flexural rigidity of the plate:

$$ D = \frac{Eh^3}{12(1-\nu^2)} $$

The matrix elements are:

$$ c_1 = \left[ \left(1 + \frac{a^2}{b^2} \right)^2 \right] - a^2 S\left(1 - \frac{\alpha}{2}\right) $$

$$ c_2 = c_4 = -\frac{8 \alpha a^2 S}{\pi^2} \left( \frac{2}{9} \right) $$

$$ c_3 = c_7 = 0 $$

$$ c_5 = \left[ \left(1 + 4 \frac{a^2}{b^2} \right)^2 \right] - a^2 S\left(1 - \frac{\alpha}{2}\right) $$

$$ c_6 = c_8 = -\frac{8 \alpha a^2 S}{\pi^2} \left( \frac{6}{25} \right) $$

$$ c_9 = \left[ \left(1 + 9 \frac{a^2}{b^2} \right)^2 \right] - a^2 S\left(1 - \frac{\alpha}{2}\right) $$

With the system of equations in matrix form, the buckling coefficient(s) can be obtained by:  
1. Plugging in *a*, *b* and $$ \alpha $$  
2. Solving $$ \det(C) = 0 $$  
3. Taking *k* = the minimum result (that's also > 0). 

## References
Timoshenko and Gere, <i>Theory of Elastic Stability (2nd ed.)</i>, Article 9.6