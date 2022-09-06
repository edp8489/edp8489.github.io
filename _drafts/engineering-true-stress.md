---
layout: post
title: Stress, Strain, and Cold Working
date: 2022-09-05
---

Yet another tangent from a post I've been working on for months. This post is basically a digital notebook for my own future reference. Many thanks to this excellent [lecture video](https://youtu.be/SOuJKinePR0) for solidifying my patchy understanding of true stress / true strain and pointing out that the 11th edition of Shigley has a much expanded discussion on this topic compared to previous editions (like my 9th ed). The same material is better summarized in pages 13-18 of the publicly-accessible 

## Definitions and Nomenclature
* Engineering Stress - Applied force normalized by test specimen original cross-sectional area
* Engineering Strain - Length changed normalized by specimen original length
* Subscript *eng* indicates engineering stress or strain
* True Stress - Applied force normalized by specimen instantaneous cross-sectional area
* True Strain - Length change normalized by specimen instantaneous length
* Subscript *T* indicates true stress or strain
* Subscript *0* indicates original, undeformed dimension
* Subscript *new* indicates instantaneous dimension under load
* Superscripts *tot*, *e*, and *p* refer to the total (sum of elastic and plastic), elastic, and plastic component of strain. These can be combined with subscripts *eng* or *T* to indicate engineering or true stress-strain relationships. To avoid confusion with single-letter exponents used in some equations, these will always be directly applied to the strain variable. That term will be surrounded by ( ) prior to any mathematical operations.
  * Example: $$ \left( \epsilon^{tot}_{eng} \right) $$
* *Cold work factor (aka % cold worked)* - Describes the amount of plastic deformation imparted to the specimen
* *Fty* - Material tensile yield stress (at 0.002 plastic strain)
* *E* - Material elastic modulus
* *elongation (e)* - Plastic strain at fracture. Also stated as total elongation, is defined as the permanent increase in gage length, measured after fracture of a tensile specimen. It is commonly expressed as a percentage of the original gage length, which is typically 2 inches for rectangular tensile test specimens and 4D (inches) for round test specimens. This property can be significantly affected by testing variables, such as thickness, strain rate, and gage length of test specimens.
* $$ \sigma_{eng} $$ - Engineering stress  
* $$ \epsilon_{eng} $$ - Engineering strain  
* $$ \sigma_T $$ - True stress  
* $$ \epsilon_T $$ - True strain  

## Equations
*Engineering stress*

$$ \sigma_{eng} = \frac{F}{A_0} $$

*Engineering strain*

$$ \epsilon_{eng} = \frac{\Delta L}{L_0} \frac{L_{new} - L_0}{L_0} $$

Plus another useful relationship thanks to the power of algebra

$$ \frac{L_{new}}{L_0} = (\epsilon_{eng} + 1) $$

*True stress*

$$ \sigma_T = \sigma_{eng} (\epsilon_{eng} + 1) $$

*True strain*

$$ \epsilon_T = \int_{L_0}^{L_{new}} \frac{dL}{L} $$

Thanks to our good friends calculus and algebra, this evaluates and simplifies to

$$ \epsilon_T = \ln{L_{new}} - \ln{L_0} = \ln{\left(\frac{L_{new}}{L_0}\right)} = \ln{\left(\epsilon_{eng} + 1\right)} $$

Assuming the specimen maintains constant volume in the deformed region results in another useful relationship.

$$ L_0 A_0 = L_{new} A_{new} $$

$$ \frac{L_{new}}{L_0} = \frac{A_0}{A_{new}} $$

$$ \epsilon_T = \ln{\frac{A_0}{A_{new}}}

*Cold work factor (and percentage)* - Approximately equal to, ignoring the elastic portion of deformation.

$$ w = \frac{A_0 - A_{new}}{A_0} $$

$$ \%_{cw} = \frac{A_0 - A_{new}}{A_0} \times 100 $$

The material yield strength after cold working is equal to the true stress.

The new ultimate strength after cold working can be calculated as

$$ (F_{tu})_{cw} = \frac{F_{tu}}{1-w} $$

## Draft content
Front matter from MMPDS re: stress-strain curves and Ramberg-Osgood Model

**MMPDS 1.3.9, "Inelastic Stress-Strain response"**  
The definition of this relationship does not specify whether the quantities used are *engineering* or *true* stress/strain, which has frustrated me to no end. The definition of Tensile Ultimate Stress (sec 1.4.4.4) provides the distinction that all values presented in the document are *engineering* stress and strain.

> ... all stresses are based on the original cross-sectional dimensions of a test specimen,
without regard to the lateral contraction due to Poisson’s ratio effects. That is, all strains used herein are
termed engineering strains as opposed to true strains which take into account actual cross sectional
dimensions.

$$ (\epsilon_{eng}^{total}) = \frac{\sigma_{eng}}{E} + \left( \epsilon_{eng}^p \right) $$ 

$$ (\epsilon_{eng}^{total}) = \frac{\sigma_{eng}}{E} + 0.002 \left( \frac{\sigma_{eng}}{F_{ty}} \right)^n $$

where the exponent *n* is the Ramberg-Osgood shape parameter.

Per NACA-TN-902, The shape parameter can be calculated using the stress values at the intersection of the stress-strain curve and the 0.7E secant modulus (chosen such that the corresponding stress is ~Fty) and the 0.85E secant modulus.

**Datsko**  
Equation for **plastic portion** of true stress / true strain diagram (ref Shigley sec 2-3 and OSTI)

$$ \sigma_T = \sigma_0 \left( \epsilon_T^p \right)^m $$

$$ \sigma_0 $$ =  strain-strengthening coefficient

*m* = strain-strengthening exponent

## References
- MIL-HDBK-5J / MMPDS-01
- Ramberg, W. and Osgood, W., "Description Of Stress-Strain Curves By Three Parameters", 1943. [NACA-TN-902](https://ntrs.nasa.gov/citations/19930081614)
- "Strain-hardening exponent for 17-4 PH stainless steel", 1971. [link](https://www.osti.gov/servlets/purl/4703707)
- Michael Swanbom, "Increasing Material Strength w/ Cold Work/Plastic Deformation; True vs. Engineering Stress & Strain", 2019. [Lecture video](https://youtu.be/SOuJKinePR0)
- Shigley