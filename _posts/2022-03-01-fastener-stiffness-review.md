---
layout: post
title: "Modeling Fastener Flexibility, pt 1: Theory"
tags: [featured]
---

A lot of my work revolves around analyzing bolted joints. Every time I dig into a problem, I'm floored by the amount of research that has gone into characterizing every aspect of their behavior over the last 70+ years. After spending the better part of a day chasing down the original reference and *correct* equation for something (and finding two different incorrect versions in the process), I realized documenting everything in one place would be a great post topic for my fledgling blog! 

This post aims to summarize the various empirically-derived equations used to represent the shear stiffness of bolted joints, link to the original source material when possible, and summarize derived works and any errors noticed.

(It's optimistically titled "part 1" because I plan to write a series of future posts where I use open-source finite element programs to model test coupons and compare the load distribution results against the results published in some of the modern studies referenced here.)

## Stiffness Formulations
### Nomenclature
First, some nomenclature. I standardized the subscript terms for each equation.

**Subscripts**
- 1: First joint member. If double-shear configuration, represents the single inner member.
- 2: Second joint member. If double-shear configuration, represents the two outer members surrounding (1).
- 3: Bolt

**Parameters**
- E: Young's Modulus [psi or Pa]
- t: Joint member thickness [in or m]
- d: Bolt diameter (in or m)

#### Tate & Rosenfeld (1946)
[NACA TN 1051](https://ntrs.nasa.gov/citations/19930081668) - "Preliminary investigation of the loads carried by individual bolts in bolted joints"
- Used as the basis of derivation for the Boeing and Nelson methods.
- Is reproduced in Huth, de Rijck, Massera, Martins, Eremin, and Chandregowda papers.

#### Swift (Douglas Aircraft Co.) (1971)
"Development of the Fail-safe Design Features of the DC-10". Published in [ASTM STP 486 (paywall)](https://www.astm.org/stp26678s.html)

$$ \frac{1}{K_{shear}}  = \frac{5}{d \cdot E_3 } + 0.8\cdot\left(\frac{1}{t_1 \cdot E_1} + \frac{1}{t_2 \cdot E_2}\right) $$

Presented similarly in Huth, citing original source. Also presented in Massera, de Rijck, Martins, and Chandregowda. Massera allows for a double-shear configuration by substituting $$ ^1/(2 t_2 E_2) $$ as the final term. (Personal comment: this seems wrong. If you're adding 1/A + 1/B + 1/B, the result is 1/A + 2/B).

Gunbring and Eremin present a simplified version that assumes all components (rivet, member 1, member 2) are made from the same material. This matches the original form of Swift's equation, but doesn't explicitly state that assumption.

#### Grumman
Originally presented in Huth, citing an unpublished report from the Grumman Aerospace Corporation. It's presented similarly in de Rijck (citing an internal Fokker report), Chandregowda and Martins (no direct citation), except with the final term as $$ ^1/{(t_2 E_2)} $$. (Personal comment: the 1 vs 2 factor difference in the final term is likely related to single- vs double-shear configurations).

$$ \frac{1}{K_{shear}} = \frac{(t_1 + t_2)^2}{E_3 \cdot d^3} + 3.7 \cdot \left(\frac{1}{t_1 \cdot E_1} + \frac{2}{t_2 \cdot E_2}\right) $$

A second form, as presented in Gunbring (citing Jarfall) and Eremin (citing Jarfall and Soderberg -- who in turn cites Jarfall), varies from what is shown in Huth. I don't feel like paying for a copy of the Jarfall report to trace their source(s), so implement either equation at your own discretion.

$$ \frac{1}{K_{shear}} = \frac{(t_1 + t_2)^2}{E_3 \cdot d} + 3.72 \cdot \left(\frac{1}{t_1 \cdot E_1} + \frac{1}{t_2 \cdot E_2}\right) $$
    

#### Boeing
Two versions are presented in Huth, citing an unpublished Boeing report. The first, used until 1968, is a modified version of Tate & Rosenfeld. 

$$ \begin{multline}
\frac{1}{K_{shear}} = \frac{1}{t_1 E_1} + \frac{1}{t_2 E_2} + \frac{1}{t_1 E_3} + \frac{1}{t_2 E_3} + \\
\frac{32(t_1+t_2)(1+\nu_3)}{9 \pi {E_3} d^2} +
 \frac{8({t_2}^3 + 5 t_1 {t_2}^2 + 5 t_2 {t_1}^2 + {t_1}^3)}{5 \pi {E_3} d^4} 
\end{multline}$$

The second, from 1969, is shown below. This is also presented in Massera, citing Huth; and in Eremin, citing Chandregowda and Martins.

$$ \frac{1}{K_{shear}} = \frac{2^{(t_1/d)^{0.85}}}{t_1} \left(\frac{1}{E_1} + \frac{3}{8E_3} \right) +
\frac{2^{(t_2/d)^{0.85}}}{t_2} \left(\frac{1}{E_2} + \frac{3}{8E_3} \right) $$

Massera also presents an equation for a double-shear configuration:

$$ \frac{1}{K_{shear}} = \frac{1.25^{(t_1/d)}}{t_1} \left(\frac{1}{E_1} + \frac{3}{8E_3} \right) +
\frac{1.25^{(t_2/d)}}{t_2} \left(\frac{1}{E_2} + \frac{3}{8E_3} \right) $$

Two equations are also presented in Gunbring, citing Jarfall. The first varies wildly from the "1968" version presented in Huth. The second equation matches the "1969" version presented in Huth.

#### Nelson, Bunin & Hart-Smith (1983)
[NASA CR 3710](https://ntrs.nasa.gov/citations/19870001540) - "Critical Joints in Large Composite Aircraft Structure"

Nelson et al used the Tate & Rosenfeld formulation to derive equations for the shear stiffness of both single- and double-shear configurations of composite bolted joints. They account for the possibility of unbalanced laminates with different in-plane stiffness values parallel to ("L") and perpendicular to ("LT") the loading direction. These formulas were also presented by Massera, citing the original source.

For simplicity, I substitute an "equivalent Modulus" E_eq, as defined below, into my reproduction of the equations.

$$ E_{eq} = \sqrt{E_L E_{LT}} $$

The following quantities are also required: 
- Shear modulus of bolt: $$ G_3 $$
- Cross-sectional area of bolt:   $$ A_3 = \frac{\pi d^2}{4} $$
- Section modulus of bolt:        $$ I_3 = \frac{\pi d^4}{64} $$ 

**Single Shear:**

$$ 
\frac{1}{K_{shear}} = \frac{2(t_1 + t_2)}{3 G_3 A_3} +
 \frac{2(t_1 + t_2)}{t_1 t_2 E_3} + 
 \frac{1}{t_1 (E_{eq})_1} +
  \frac{1 + 3 \beta}{t_2 (E_{eq})_2}
$$

The term $$ \beta $$ represents the fraction of the bending moment on the bolt that is reacted by nonuniform bearing stresses across the thickness.
- $$ \beta $$ = 0.15 for protruding head bolts
- $$ \beta $$ = 0.5 for countersunk bolts

**Double Shear:**

$$ 
\frac{1}{K_{shear}} = 
 \frac{8 {t_2}^3 + 16 {t_2}^2 t_1 + 8 t_2 {t_1}^2 + {t_1}^3}{192 E_3 I_3} +
 \frac{2t_2 + t_1}{3 G_3 A_3} +
\frac{2 t_2 + t_1}{t_1 t_2 E_3} + \frac{1}{t_2 {(E_{eq}})_2} + \frac{2}{t_1 ({E_{eq}})_1}
$$

#### Huth (1984)
"Influence of Fastener Flexibility on Load Transfer and Fatigue Life Predictions for Multirow Bolted and Riveted Joints". (German) LBF Report No. FB-172, Dissertation, Technische Universitat Munchen, 1984. [Library record](https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/N8516219.xhtml)

$$ \frac{1}{K_{shear}} = \left(\frac{t_1 + t_2}{2d}\right)^a \cdot \left(\frac{b}{n} \right) \left(\frac{1}{t_1 E_1} + \frac{1}{n t_2 E_2} + \frac{1}{2 t_1 E_3} + \frac{1}{2 n t_2 E_3} \right) $$

The configuration-specific parameters are as follows:
- Single shear: n =1
- Double shear: n = 2
- Bolted metallic joint: a = 2/3 ; b = 3
- Bolted composite (GrEp) joint: a = 2/3; b = 4.2
- Riveted metallic joint: a = 2/5 ; b = 2.2

Errata
- The English translation presented in [ASTM STP 927 (paywall)](https://www.astm.org/stp927-eb.html) supposedly has a typo in the equation (see analyst64's comment in this [forum discussion](https://www.eng-tips.com/viewthread.cfm?qid=192705)).
- Gunbring's reproduction incorrectly uses E1 and E2 instead of fastener modulus (E3 or Ef) in final two terms of the equation.  

#### Morris (2004)
Original source not available. This formulations allows for multiple columns and rows of fasteners. No distinction seems to be made between single- vs double-shear configurations. Reproduced in de Rijck and Martins as:

$$ \begin{multline}
 \frac{1}{K_{shear}} = \left[ 
    \left(\frac{2845}{E_1 t_1} + \frac{2845}{E_2 t_2} \right) +
     c_f \left( \left(\frac{500}{E_3 t_1} + \frac{1000}{E_{ST, 1} t_1} \right) \left(\frac{t_1}{d} \right)^2 +
      \left(\frac{500}{E_3 t_2} + \frac{1000}{E_{ST, 2} t_2} \right) \left(\frac{t_2}{d} \right)^2 \right)
    \right]
    \cdot  \\
    \left(\frac{d_{head}}{d} \right)^{-0.34}
    \left(\frac{s}{d} \right)^{-0.5} \left(\frac{p}{d} \right)^{0.34} e^{0.3r} 
    \end{multline} $$

The additional parameters for this equation are:
- E1, E2: In-plane modulus of elasticity of joint members
- E3: Bolt modulus of elasticity
- E_ST: Through-thickness modulus of elasticity of joint members
- d_head: Fastener head diameter
- p: Row pitch (spacing between fasteners in multi-row joint)
- r: Number of rows
- s: Fastener pitch (personal comment: assuming this means column spacing in multi-fastener joint)
- cf: Fastener type correction factor
    - cf = 1 for aluminum rivets
    - cf = 8.2 for countersunk aluminum rivets
    - cf = 13.1 for titanium Hi-Loks

(Personal comment: No guidance is given for values of *p* or *s* to use if the joint contains a single row or single column of fasteners. Based on engineering judgment I'd use a value of 4*d in these situations.)

## References (& Modern Research)
- Jarfall (1983) "Shear loaded fastener installations"
    - Saab Aircraft Division, Report SAAB KH R-3360
    - Published in International Journal of Vehicle Design, 1986 Vol 7 Issue 3-4 [(paywall)](https://www.inderscienceonline.com/doi/abs/10.1504/IJVD.1986.061155)
- Postupka (1998) "Determination of the bolt flexibility of CFRP joints"
    - Published in ECCM-8: European Conference on Composite Materials; Science, Technologies and Applications, vol 1, Issue 3-6
    - [Google Books record](https://www.google.com/books/edition/ECCM_8/9Eu4fTQPP8sC?hl=en&gbpv=1&dq=Determination+of+the+bolt+flexibility+of+CFRP+joints&pg=PA61&printsec=frontcover). Pages 65-66 containing referenced equation are redacted. Hard copy out of print.
- Morris (2004) "Defining a standard formula and test-method for fastener flexibility in lap-joints"
    - PhD Thesis, TU Delft
    - No library record
- de Rijck (2005) "Stress analysis of fatigue cracks in mechanically fastened joints: An analytical and experimental investigation"
    - PhD Thesis, TU Delft
    - [Library record](http://resolver.tudelft.nl/uuid:c6253348-532d-4159-bb4c-00cb8a1f5c2b)
- Gunbring (2008) "Prediction and Modelling of Prediction and Modelling of Fastener Flexibility Using FE"
    - Master's thesis, Linköping University with support form Saab Aerostructures
    - [Library record](http://urn.kb.se/resolve?urn=urn:nbn:se:liu:diva-11428)
- Soderberg (2012) "A finite Element Method for Calculating Load Distributions in Bolted Joint Assemblies" 
    - Master's thesis, Linkoping University 
    - [Library record](http://urn.kb.se/resolve?urn=urn:nbn:se:liu:diva-81739)
- Martins (2017) "Influence of types of discrete modelling of fasteners in FEM models"
    - Proc. Int. Conf. on NAFEMS World Congress
    - [Library record](https://www.researchgate.net/publication/321058719_Influence_of_Types_of_Discrete_Modelling_of_Fasteners_in_FEM_Models)
- Chandregowda (2018) "Evaluation of fastener stiffness modelling methods for aircraft structural joints"
    - American Institute of Physics, Proceedings of the First International Conference on Design, Materials and Manufacture (ICDEM 2018)
    - [Library record](https://doi.org/10.1063/1.5029577)
- Massera (2019) "Analytical and Numerical Investigation of Multi-Fastener Joints in Composite Structures" 
    - Master's thesis, partnership with German Aerospace Center (DLR)
    - [Library record](https://elib.dlr.de/128454/)
- Eremin (2021) "Methods for flexibility determination of bolted joints: empirical formula review"
    - Journal of Physics Conference Series, 19th International Conference "Aviation and Cosmonautics" (AviaSpace-2020)
    - [Library record](https://iopscience.iop.org/article/10.1088/1742-6596/1925/1/012058)

(to be discussed in future "part 2" post)
- Rutman (2009) "Fastener Modeling for Joining Composite Parts"
    - Americas Virtual Product Development Conference
    - Provides formula for rotational stiffness
    - [Library record](https://api.semanticscholar.org/CorpusID:138009598)