---
layout: post
title: Stress, Strain, and Cold Working
date: 2022-09-05
---

Yet another tangent from a post I've been working on for months. This post is basically a digital notebook for my own future reference. Many thanks to this excellent [lecture video](https://youtu.be/SOuJKinePR0) for solidifying my patchy understanding of true stress / true strain and pointing out that the 11th edition of Shigley has a much expanded discussion on this topic compared to previous editions (like my 9th ed).

## Definitions and Nomenclature
* Engineering Stress - Applied force normalized by test specimen original cross-sectional area
* Engineering Strain - Length changed normalized by specimen original length
* True Stress - Applied force normalized by specimen instantaneous cross-sectional area
* True Strain - Length change normalized by specimen instantaneous length
* Subscript *0* indicates original, undeformed dimension
* Subscript *new* indicates dimension after loading (i.e. after plastic deformation)
* *Cold work factor (aka % cold worked)* - Describes the amount of plastic deformation imparted to the specimen

$$ \Sigma_{eng} $$ - Engineering stress  
$$ \epsilon_{eng} $$ - Engineering strain  
$$ \Sigma_T $$ - True stress  
$$ \epsilon_T $$ - True strain  

## Equations
*Engineering stress*  
$$ \Sigma_{eng} = \frac{F}{A_0} $$

*Engineering strain*
$$ \epsilon_{eng} = \frac{\Delta L}{L_0} \frac{L_{new} - L_0}{L_0} $$

Plus another useful relationship thanks to the power of algebra
$$ \frac{L_{new}}{L_0} = (\epsilon_{eng} + 1) $$

*True stress*
$$ \Sigma_T = \Sigma_{eng} (\epsilon_{eng} + 1) $$

*True strain*
$$ \epsilon_T = \int_L_0^L_{new} \frac{\mathrm{d}L}{L} $$

Thanks to our good friends calculus and algebra, this evaluates and simplifies to
$$ \epsilon_T = \ln{L_{new}} - \ln{L_0} = \ln{\frac{L_{new}}{L_0}} = \ln{\epsilon_{eng} + 1} $$

Assuming the specimen maintains constant volume in the deformed region results in another useful relationship.
$$ L_0 A_0 = L_{new} A_{new} $$
$$ \frac{L_{new}}{L_0} = \frac{A_0}{A_{new}} $$
$$ \epsilon_T = \ln{\frac{A_0}{A_{new}}}

*Cold work factor (and percentage)* - Approximately equal to, ignoring the elastic portion of deformation.
$$ w = \frac{A_0 - A_{new}}{A_0} $$
$$ \%_{cw} = \frac{A_0 - A_{new}}{A_0} \dot 100 $$

The material yield strength after cold working is equal to the true stress.

The new ultimate strength after cold working can be calculated as
$$ (F_{tu})_{cw} = \frac{F_tu}{1-w} $$