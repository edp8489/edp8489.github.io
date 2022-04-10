---
layout: post
---

### MIL-HDBK-5/MMPDS Methods
*Sec 9.1.5, Summary*
> Brief descriptions of procedures that [are] used most frequently ... are given in Section 9.5, 9.6, and 9.7. More detailed descriptions of these and other statistical techniques and tables in their various forms can be found in a number of workbooks and texts; Reference 9.1.5 is a particularly useful one.

Ref 9.1.5: 

Highlights:
- A T99 value is a statistically computed, one-sided lower tolerance limit, representing a 95 percent confidence lower limit on the first percentile of the distribution. 
- A T90 value is a statistically computed, one-sided lower tolerance limit, representing a 95 percent lower confidence limit on the tenth percentile of the distribution.
- The minimum sample size required for the direct computation of T99 and T90 values (from which A and B-basis design properties are established) is 100. These 100 observations must include data from at least 10 heats and lots.
- If the sample cannot be described by a Pearson1 or Weibull distribution, the T99 and T90 values must be computed by nonparametric (distribution free) means, which can only be done if there are at least 299 observations.

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