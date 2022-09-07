---
layout: post
title: Stress, Strain, and Cold Working
date: 2022-09-05
---

Yet another tangent from a post I've been working on for months. This post is basically a digital notebook for my own future reference to clarify the differences between engineering and true stress/strain, provide equations to convert between the two, and provide references for two methods of approximating stress-strain curves using published data points. 

## Definitions and Nomenclature
* Engineering Stress - Applied force normalized by test specimen original cross-sectional area
* Engineering Strain - Length changed normalized by specimen original length
  * Subscript *eng* indicates engineering stress or strain
  * $$ \sigma_{eng} $$ - Engineering stress
  * $$ \epsilon_{eng} $$ - Engineering strain
* True Stress - Applied force normalized by specimen instantaneous cross-sectional area
* True Strain - Length change normalized by specimen instantaneous length
  * Subscript *T* indicates true stress or strain
  * $$ \sigma_T $$ - True stress  
  * $$ \epsilon_T $$ - True strain
* Material Properties
  * *Fty* - Material tensile yield stress at 0.002 plastic strain (engineering stress)
  * *Ftu* - Material ultimate stress (engineering stress)
  * *E* - Material elastic modulus
  * *elongation (e)* - Plastic strain at fracture. Also stated as total elongation, is defined as the permanent increase in gage length, measured after fracture of a tensile specimen. It is commonly expressed as a percentage of the original gage length, which is typically 2 inches for rectangular tensile test specimens and 4D (inches) for round test specimens. This property can be significantly affected by testing variables, such as thickness, strain rate, and gage length of test specimens.
  * *Cold work factor (aka % cold worked)* - Describes the amount of plastic deformation imparted to the specimen

## Equations
* Subscript *0* indicates original, undeformed dimension
* Subscript *new* indicates instantaneous dimension under load
* Superscripts *tot*, *e*, and *p* refer to the total (sum of elastic and plastic), elastic, and plastic component of strain. These can be combined with subscripts *eng* or *T* to indicate engineering or true stress-strain relationships. To avoid confusion with single-letter exponents used in some equations, these will always be directly applied to the strain variable. That term will be surrounded by ( ) prior to any mathematical operations.
  * Example: $$ \left( \epsilon^{tot}_{eng} \right) $$

*Engineering stress*

$$ \sigma_{eng} = \frac{F}{A_0} $$

*Engineering strain*

$$ \epsilon_{eng} = \frac{\Delta L}{L_0} = \frac{L_{new} - L_0}{L_0} $$

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

$$ \epsilon_T = \ln{\frac{A_0}{A_{new}}} $$

*Cold work factor (and percentage)* - Approximately equal to, ignoring the elastic portion of deformation.

$$ w = \frac{A_0 - A_{new}}{A_0} $$

$$ \%_{cw} = \frac{A_0 - A_{new}}{A_0} \times 100 $$

The material yield strength after cold working is equal to the true stress.

The new ultimate strength after cold working can be calculated as

$$ (F_{tu})_{cw} = \frac{F_{tu}}{1-w} $$

## Draft content

**MMPDS 1.3.9, "Inelastic Stress-Strain response"**  
The definition of this relationship does not specify whether the quantities used are *engineering* or *true* stress/strain, which has frustrated me to no end. The definition of Tensile Ultimate Stress (sec 1.4.4.4) provides the distinction that all values presented in the document are *engineering* stress and strain.

> ... all stresses are based on the original cross-sectional dimensions of a test specimen,
without regard to the lateral contraction due to Poisson’s ratio effects. That is, all strains used herein are
termed engineering strains as opposed to true strains which take into account actual cross sectional
dimensions.

$$ \left( \epsilon_{eng}^{tot} \right) = \frac{\sigma_{eng}}{E} + \left( \epsilon_{eng}^p \right) $$ 

$$ \left(\epsilon_{eng}^{tot} \right) = \frac{\sigma_{eng}}{E} + 0.002 \left( \frac{\sigma_{eng}}{F_{ty}} \right)^n $$

where the exponent *n* is the Ramberg-Osgood shape parameter.

Per NACA-TN-902, The shape parameter can be calculated using the stress values at the intersection of the stress-strain curve and the 0.7E secant modulus (chosen such that the corresponding stress is ~Fty) and the 0.85E secant modulus.

$$ n = 1 + \frac{0.3853}{\log_{10}{\left( \frac{\sigma_{0.7E}}{\sigma_{0.85E}} \right)}} \approx  1 + \frac{0.3853}{\log_{10}{\left( \frac{F_{ty}}{\sigma_{0.85E}} \right)}} $$

This method was extended by Hill in NACA-TN-927 to use two modulus lines offset by 0.1% and 0.2%, the latter corresponding with the more widely accepted approach for determining Fty.

$$ n = \frac{0.301}{\log_{10}{\left( \frac{F_{ty}}{\sigma_{0.1}} \right)}} $$

A graphical approach to determining *n* is provided in MIL-HDBK-5J / MMPDS-01, Section 9.8.4.1.2 by plotting the two or more pairs of (engineering plastic strain, engineering stress) on log-log axes. An approximate value of *n* is the inverse of the slope of the straight line connecting the points.

![MIL-HDBK-5J, Fig 9.8.4.1.2](/assets/stress-strain/mmpds_ro_slope_method.png)

$$ n \approx \left( \frac{\log_{10}{\epsilon^p_2} - \log_{10}{\epsilon^p_1}}
{\log_{10}{\sigma_2} - \log_{10}{\sigma_1}} \right)^{-1} $$

This method can be used to approximate the shape of the (engineering) stress-strain curve from yield through ultimate using Fty, Ftu, and the engineering plastic strain at ultimate stress.

<em>Note that engineering plastic strain at ultimate stress is **not** the same as the elongation value reported in MMPDS, which per the definition is the true plastic strain at <u>fracture</u>.</em>

**Holloman / Halford / Datsko**  
An equation for modeling the **plastic portion** of the true stress / true strain diagram is referenced by Shigley (Section 2-3) and concisely summarized by the front matter of a material test report prepared for the US Department of Energy (Mulkey, pgs 13-18). It is based on a modified Ramberg-Osgood relationship and can be used to represent material behavior in the full plastic region beyond the yield stress.

$$ \sigma_T = \sigma_0 \left( \epsilon_T^p \right)^m $$

$$ \sigma_0 $$ =  Proportionality constant 

*m* = strain-hardening exponent

$$ m = \frac{\ln{\left( \frac{\sigma_T}{\sigma_0} \right)}}{\ln{\epsilon_T}} $$

If the load vs displacement curve for a test specimen is known and converted to load vs true strain, the true strain value at ultimate load is equal to the exponent *m*.

*Note: Though denoted by m in the referenced report, the strain-hardening exponent is typically denoted by n. This exponent is **not** the same as the Ramberg-Osgood exponent. Per a footnote in MIL-HDBK-5J Section 9.8.4.1.2, the two exponents are the reciprocal of each other.*

The proportionality constant $$ \sigma_0 $$ is defined as the true stress at a true strain value of 1.0. It can be determined graphically in a similar manner as described in the previous section.

![Mukley log(true stress) / log(true strain) plot](/assets/stress-strain/mulkey_m_slope.png)

Also note the following distinction between true strain and engineering strain values:

> True strain equal to 1.0 is not 100 percent elongation as in the classical (engineering) definition of strain, but actually corresponds to an engineering strain of 271.8 percent elongation or 63.2 percent reduction in area.


## References
- MIL-HDBK-5J / MMPDS-01
- Ramberg, W. and Osgood, W., "Description Of Stress-Strain Curves By Three Parameters", 1943. [NACA-TN-902](https://ntrs.nasa.gov/citations/19930081614)
- Hill, "Determination Of Stress-Strain Relations From "Offset" Yield Strength Values". 1944. [NACA-TN-927](https://ntrs.nasa.gov/citations/19930081673)
- Mulkey, "Strain-hardening exponent for 17-4 PH stainless steel", 1971. [link](https://www.osti.gov/servlets/purl/4703707)
- Michael Swanbom, "Increasing Material Strength w/ Cold Work/Plastic Deformation; True vs. Engineering Stress & Strain", 2019. [Lecture video](https://youtu.be/SOuJKinePR0)
- Budynas & Nisbett, "Shigley's Mechanical Engineering Design (9th edition)", 2011, McGraw-Hill.