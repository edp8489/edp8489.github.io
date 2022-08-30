---
title: Tension Joint Analysis - Battle of the Methodologies
layout: post
date: 2022-08-24
tags: [fasteners, joints]
---

*Shigley vs. 1990s NASA vs. 2010s NASA*

When working on a different post, I ended up on a tangent where I dove into the intricacies of several different joint analysis methods and compared them all for a contrived example, with the intention of using the most conservative one (i.e. the one that showed the lowest margin of safety) to prove my point. As it turns out, the comparison is worth its own post.

## References
- [NASA-TM-106943](https://ntrs.nasa.gov/citations/19960012183) "Preloaded joint analysis methodology for space flight systems" (1995)
- [NASA-STD-5020](https://standards.nasa.gov/standard/nasa/nasa-std-5020) "Requirements for Threaded Fastening Systems in Spaceflight Hardware"
- Budynas & Nisbett, "Shigley's Mechanical Engineering Design (8th edition)", 2006, McGraw-Hill, ISBN 978-0073312606 
  - Chapter 8

## Assumptions and Limitations (in work)
- Primarily focused on tension loads
- Contrived example
- Discussion at end about shear-tension interaction equations

## Terminology (in work)
- Standardize terminology, since it varies across each document

$$ P_0 $$ - Bolt preload. Subscripts *min*, *nom*, *max* indicate minimum, nominal, and maximum values, respectively.  
$$ P_{ext} $$ - External (applied) tension load  
$$ P_{bolt} $$ or $$ P_b $$ - Tension load seen by bolt  
$$ \phi $$ - Joint stiffness ratio. Denoted as *C* in Shigley

## Factors of Safety (in work)
- TM 106943 vs 5020
- Fitting factor discussion (5020 only)
- Separation factor of safety
  - TM 106943 1.2 vs 1.4
  - 5020 flow chart

## Joint Member Stiffness  
### Shigley eqs (in work)
Shigley provides stiffness equations for joint members clamped between a protruding head bolt + nut combination. A simplified equation is provided for symmetric joints where the two clamped members are of the same thickness and material.

### NASA TM 106943 configurations  
**Configuration 1** - Nut and bolt; protruding head bolt  
**Configuration 2** - Nut and bolt; flat head countersunk into first joint member  
**Configuration 3** - Protruding head bolt threaded into bottom member  
**Configuration 4** - Flat head bolt countersunk into first member and threaded into bottom member

### NASA STD 5020
(in work)

## Torque-Preload relationship (in work)
- Shigley
- TM 106943 and 5020
- Extra discussion of uncertainty values in 5020

### Shigley (in work)
- Allows for variation in preload due to various types of lubrication (K values)
- Does not account for min/max variation in preload due to tolerances and application method

### NASA TM 106943 (in work)
- Provides equations to develop minimum, nominal, and maximimum preload values
- Introduces a "load introduction factor," *n*, based on joint configuration that also affects the portino of the external load carried by the bolt. (See NSTS 08307, NASA TM-108377, or VDI 2230 for additional details)
- Guidance is to only apply safety factors to the portion of the external load carried by the bolt; factors are not applied to the preload since uncertainty is already accounted for when calculating min/max values
- Bolt tension margin calculations (yield/ultimate) use the bolt strength as the allowable

$$ P_{bolt} = P_{0,max} + (SF)(n)(\phi)(P_{ext}) $$

*TBD - eq for Pbolt for joints with multiple fasteners*

$$ P_{sep} = (1-n\phi)P_{ext} $$

$$ MS_{bolt} = \frac{P_{tu}}{P_{bolt}} - 1 $$

$$ MS_{sep} = \frac{P_{0,min}}{SF_{sep} P_{sep}} - 1 $$

* Separation factor of safety*
- Guidance is to use SFsep = 1.2 for structural applications (i.e. where joint separation does not pose a catastrophic hazard), and SFsep = 1.4 for pressure system applications

### NASA STD 5020 (rev A or newer) (in work)
- Complete rewrite of methodology occurred in Rev A
- Equations for developing minimum/nominal/maximimum preload values is largely the same as in TM 106943
- Introduces discussion of a "fitting factor" (FF = 1.15) to account for uncertainties in how load is transferred between components
- Flow chart to determine separation factor of safety
- Margin calculations derive new "allowable" loads based on whether joint separates before rupture or ruptures before separation
- Denominator of margin calculations apply factors directly to external tension load

First, calculate the load at which the bolt will rupture (based on max preload and load share due to joint geometry). (Eq 10)

$$ P'_{tu} = \frac{(P_{tu,allow} - P_{0,max})}{n \phi} $$

Then, calculate the load at which the joint will separate, also assuming maximum preload. (Eq 11)

$$ P'_{sep} = \frac{P_{0,max}}{1-n\phi} $$

If $$ P'_{sep} < P'_{tu} $$ the joint will separate before the bolt ruptures, and the bolt carries the entire external load. 

*Separation before rupture*  
Bolt margin (Applicable to both yield and ultimate checks, using appropriate factors and allowables) (eq 6)

$$ {MS}_{bolt} = \frac{(P_{t,allow})}{(FF)(SF)P_{ext}} - 1 $$

Separation margin (eq 19)

$$ {MS}_{sep} = \frac{P_{0,min}}{(FF)(SF_{sep})P_{ext}} - 1 $$

*Rupture before sep*  
Conversely, if $$ P'_{sep} > P'_{tu} $$ the bolt will rupture before the joint separates. 

Bolt tension margin (yield or ultimate) (Eq 7)

$$ {MS} = \frac{P'_{tu}}{(FF)(SF)P_{ext}} - 1 $$

## Example - Margin Comparison (in work)
- DIA .250-28 fastener, NAS6404, 1500 lbf external load, 85 +/- 5 in-lbf

## Shear-Tension interactions (in work)
### NASA TM 106943
Interaction equations are given for combined shear + tension loading and for shear + tension + bending (e.g. double-shear lug-clevis joints or single-shear joints with large shims). A footnote provides the caveat that the interaction equations are intended for joints with minimal shear loads compared to the axial loads (preload included).

*Shear-Tension* (Eqs 56 - 59)

$$ R_t^2 + R_s^3 \le 1.0 $$

$$ R_t = \frac{P_b}{Bolt Tension Allowable} $$

$$ R_s = \frac{SF*P_s}{Bolt Shear Allowable} $$  

*Shear-Tension-Bending* (Eqs 60 - 62)

$$ (R_t + R_b)^2 + R_s^3 \le 1.0 $$

The bolt bending allowable is either an allowable moment - if that data exists for the specific fastener - or a stress based on the modulus of rupture of the bolt material. In the text, NSTS-08307 and Bruhn are cited for this approach. 

Chasing down the Bruhn reference (*I should get hazard pay for this*) shows a mix of approaches. Some tables in section D1.7 provide ultimate tensile, shear, and moment loads for various bolt sizes and materials. Table D1.2a provides an ultimate bending stress, which is estimated based on Cozzone's method for plastic bending (discussed in section C3.4).
 
$$ F_b = f_m + f_0*(k-1) $$

k = 1.7 for solid round section  
"Fb may be a yield or ultimate modulus. For yield, Fm = material yield stress. For ult, Fm = material ult stress. Regardless of which is used, the corresponding f0 must be known before Fb can be determined.

(Bruhn D1.14 cites ref 4 for methods)


### NASA STD 5020
Two sets of equations are provided for shear-tension-bending interaction, depending on whether or not plastic bending is accounted for and whether the bolt shank or threads are in the shear plane. 

The biggest difference, however, is related to how the tension load is treated. Appendix A7 discusses two test campaigns conducted by NASA that showed preload (or lack thereof) was inconsequential to the failure load for joints primarily loaded in shear or a combination of shear + tension. The bolt will yield before ultimate failure, relaxing any preload in the system.

Therefore, in the following equations, the applied tension load should be calculated as

$$ P_{tu} = (SF_{ult})(FF)P_{ext} $$

**No plastic bending** - The bolt ultimate tensile stress is used as the allowable bending stress.

*Shank in bearing (Eq 20)*

$$ R_s^2.5 + (\frac{P_{tu}}{Tension Allowable} + \frac{(SF)f_b}{F_{tu}})^1.5 \le 1 $$

*Threads in bearing (Eq 22)*

$$ R_s^1.2 + (\frac{P_{tu}}{Tension Allowable} + \frac{(SF)f_b}{F_{tu}})^2 \le 1 $$

**With plastic bending** - No specific reference is provided for how to obtain Fbu, though mention of dependency on material and cross section in the following text snippet implies the Cozzone method. 

> Fbu is the allowable ultimate flexural stress (bending) that applies for ductile materials as a result of plastic bending. Use of Fbu, which depends on the material and the cross section, accounts for the additional moment-carrying capacity of a section in bending over and above the capacity calculated based on linear-elastic theory.

*Shank in bearing (Eq 21)*

$$ R_s^2.5 + (\frac{P_{tu}}{Tension Allowable})^1.5 + \frac{(SF)f_b}{F_b} \le 1 $$

*Threads in bearing (Eq 23)*

$$ R_s^1.2 + (\frac{P_{tu}}{Tension Allowable})^2 + \frac{(SF)f_b}{F_b} \le 1 $$
