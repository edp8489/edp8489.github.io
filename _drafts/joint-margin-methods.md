---
title: Tension Joint Analysis - Battle of the Methodologies
layout: post
date: 2022-08-24
tags: [fasteners, joints]
---

*Shigley vs. NASA vs. ...NASA, again*

When working on a different post, I ended up on a tangent where I dove into the intricacies of several different joint analysis methods and compared them all for a contrived example, with the intention of using the most conservative one (i.e. the one that showed the lowest margin of safety) to prove my point. As it turns out, the comparison is worth its own post.

## References
- [NASA-TM-106943](https://ntrs.nasa.gov/citations/19960012183) "Preloaded joint analysis methodology for space flight systems" (1995)
- [NASA-STD-5020](https://standards.nasa.gov/standard/nasa/nasa-std-5020) "Requirements for Threaded Fastening Systems in Spaceflight Hardware"
- Budynas & Nisbett, "Shigley's Mechanical Engineering Design (8th edition)", 2006, McGraw-Hill, ISBN 978-0073312606 
  - Chapter 8

## Assumptions and Limitations
- Primarily focused on tension loads
- Contrived example
- Discussion at end about shear-tension interaction equations

## Terminology
- Standardize terminology, since it varies across each document

$$ P_0 $$ - Bolt preload. Subscripts min, nom, max indicate minimum, nominal, and maximum values, respectively.  
$$ P_ext $$ - External (applied) tension load  
$$ \phi $$ - Joint stiffness ratio. Denoted as *C* in Shigley

### Shigley
- Allows for variation in preload due to various types of lubrication (K values)
- Does not account for min/max variation in preload due to tolerances and application method

### NASA TM 106943
- Provides equations to develop minimum, nominal, and maximimum preload values
- Introduces a "load introduction factor," *n*, based on joint configuration that also affects the portino of the external load carried by the bolt
- Guidance is to only apply safety factors to the portion of the external load carried by the bolt; factors are not applied to the preload since uncertainty is already accounted for when calculating min/max values
- Bolt tension margin calculations (yield/ultimate) use the bolt strength as the allowable

$$ P_bolt = P_{0,max} + (SF)(n)(\phi)(P_ext) $$

*TBD - eq for Pbolt for joints with multiple fasteners*

$$ P_sep = (1-n\phi)P_ext $$

$$ MS_bolt = \frac{P_tu}{P_bolt} - 1 $$

$$ MS_sep = \frac{P_{0,min}}{SF_sep P_sep} - 1 $$

* Separation factor of safety*
- Guidance is to use SFsep = 1.2 for structural applications (i.e. where joint separation does not pose a catastrophic hazard), and SFsep = 1.4 for pressure system applications

### NASA STD 5020 (rev A or newer)
- Complete rewrite of methodology occurred in Rev A
- Equations for developing minimum/nominal/maximimum preload values is largely the same as in TM 106943
- Introduces discussion of a "fitting factor" (FF = 1.15) to account for uncertainties in how load is transferred between components
- Flow chart to determine separation factor of safety
- Margin calculations derive new "allowable" loads based on whether joint separates before rupture or ruptures before separation
- Denominator of margin calculations apply factors directly to external tension load

Eq 11
$$ P'_sep = \frac{P_{0,max}}{1-n\phi} $$

*TBD - criteria to check sep before rupture*

*Separation before rupture*
Bolt margin (yield or ultimate) (eq 6)

$$ MS_bolt = \frac{(P_{t,allow})_{yld or ult}}{(FF)(SF_{yld or ult})P_ext} - 1 $$

Separation margin (eq 19)
$$ MS_sep = \frac{P_{0,min}}{(FF)(SF_sep)P_ext} - 1 $$

*Rupture before sep*
First, calculate the load at which the bolt will rupture (based on preload and load share due to joint geometry).

Eq 10
$$ P'_tu = (\frac{1}{n \phi})(P_{tu,allow} - P_{0,max}) $$

Eq 7 - Bolt tension margin (yield or ultimate)
$$ MS = \frac{P'_tu}{(FF)(SF)P_ext} - 1 $$

## Comparison
- DIA .250-28 fastener, NAS6404, 1500 lbf external load, 85 +/- 5 in-lbf

## Shear-Tension interaction
- Eqs from TM 106943
- EQs from STD 5020
- Discussion of omitting preload from equation from 5020 appendix