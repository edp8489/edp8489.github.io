---
layout: post
---

Statistics class, random variables, Central Limit Theorem implying that suffcieint samples of a random variable approximates a Gaussian distribution. Small sample sizes use Student's T-distribition
### MIL-HDBK-5/MMPDS Methods
*Sec 9.1.5, Summary*
> Brief descriptions of procedures that [are] used most frequently ... are given in Section 9.5, 9.6, and 9.7. More detailed descriptions of these and other statistical techniques and tables in their various forms can be found in a number of workbooks and texts; Reference 9.1.5 is a particularly useful one.

Ref 9.1.5: Natrella, M.G., *Experimental Statistics*, National Bureau of Standards Handbook 91
(August 1, 1963)

Highlights:
- A T99 value is a statistically computed, one-sided lower tolerance limit, representing a 95 percent confidence lower limit on the first percentile of the distribution. 
- A T90 value is a statistically computed, one-sided lower tolerance limit, representing a 95 percent lower confidence limit on the tenth percentile of the distribution.
- *B-basis* (P90/95) indicates that at least 90 percent of the population of values is expected
to equal or exceed the statistically calculated mechanical property value, with a confidence of 95 percent.
This statistically calculated number is computed using the procedures specified in Section 9.5.
- *A-basis* (P99/95) indicates that at least 99 percent of the population
is expected to equal or exceed the statistically calculated mechanical property value with a confidence of
95 percent. This statistically calculated number is computed using the procedures specified in Section 9.5.
- The direct calculation of statistical minimum properties (T99 and T90 values) requires a substantial quantity of data to determine (1) the form of distribution and (2) reliable estimates of the population parameters describing the distribution.
- Statistical computation
  - If the data can be characterized by Pearson Type III or three-parameter Weibull distributions, the minimum sample size required for the direct computation of T99 and T90 values is 100. These 100 observations must include data from at least 10 heats and lots.
  - If the data cannot be described by a Pearson or Weibull distribution, the T99 and T90 values must be computed by nonparametric (distribution free) means. A minimum sample size of 299 observations is required.
  - The requirement of 299 samples for non-parametric T99 calculation represents the smallest sample size  for which the **lowest observation** is a 95 percent confidence, 99 percent exceedance tolerance bound.
    - For smaller sample sizes, the T99 value falls **below** the lowest observation and thus cannot be determined without knowledge of the form of the distribution. 
    - The lowest of 29 observations corresponds to a 95 percent confidence, 90 percent exceedance tolerance bound, or T90 value.

Procedures for joint strength reduction in section 9.7
- Prior to 2003, ULT strength was TYP/1.15

Some fastener types will not develop the full bearing strength of the parent material. Examples include:
- Flush-head fasteners in countersunk sheet
- Fasteners with hollow shanks
- Protruding head fasteners with shear type heads
- Protruding head fasteners in joints with thickness-to-diameter ratios less than 0.18



## References
- NIAR ASAP spreadsheet [Direct download](https://agate.niar.wichita.edu/Materials/ASAP_2004_v1.xls)
  - AGATE Statistical Analysis Program
  - Dig into methods they use
- Small data sets: Modified Hanson-Koopman (MHK) method
  - MHK(A) and MHK(B) more precise, less conservative for P99/95 and P90/95 calcs
- MMPDS references 3-parameter Weibull and Pearson Type III methods
  - Section 9.5?
- NASA-STD-6016
- CMH-17 ([MIL-HDBK-17](http://everyspec.com/MIL-HDBK/MIL-HDBK-0001-0099/MIL_HDBK_17_1F_237/)) 2-parameter Weibull
  - CH 8.2 - Statistical Methods
- Excel T99 function _bad_
  - Unsure what this is. Might be unsupported at this point. Student T-test w/ 99% confidence interval?
- NASA-STD-5020, Appendix A.2, Table 5 (Two-Sided 90/95
Tolerance Limit Factors for a Normal Distribution, Odeh and Owen, 1980)