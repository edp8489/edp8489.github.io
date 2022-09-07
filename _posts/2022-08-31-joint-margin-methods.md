---
title: Joint Strength Analysis - Battle of the Methodologies
layout: post
date: 2022-08-31
tags: [fasteners, joints]
---

*Shigley vs. 1990s NASA vs. 2010s NASA*

When working on a different post, I ended up on a tangent where I dove into the intricacies of several different joint analysis methods and compared them all for a contrived example, with the intention of using the most conservative one (i.e. the one that showed the lowest margin of safety) to prove my point. As it turns out, the comparison is worth its own post.

## References
- [NASA-TM-106943](https://ntrs.nasa.gov/citations/19960012183) "Preloaded joint analysis methodology for space flight systems" (1995)
- [NASA-STD-5020](https://standards.nasa.gov/standard/nasa/nasa-std-5020) "Requirements for Threaded Fastening Systems in Spaceflight Hardware"
- Budynas & Nisbett, "Shigley's Mechanical Engineering Design (9th edition)", 2011, McGraw-Hill. (Chapter 8)
- Bruhn, E.F., "Analysis and Design of Flight Vehicle Structures", 1973, Tri-State Offset Company.

## Assumptions and Limitations
The example calculations at the end of this post are performed at ambient conditions; no consideration was given to thermal effects, preload relaxation, or creep. Load values used in the examples are entirely contrived and any resemblance to real-world situations are purely coincidental.

## Terminology
Since terminology varies across each document, I'm going to standardize the terms for preload, external load, and bolt load as defined below.

$$ P_0 $$ - Bolt preload. Subscripts *min*, *nom*, *max* indicate minimum, nominal, and maximum values, respectively.  
$$ P_{ext} $$ - External (applied) tension load  
$$ P_{bolt} $$ or $$ P_b $$ - Tension load seen by bolt  
$$ P_s $$ - Shear load seen by bolt  
$$ \phi $$ - Joint stiffness ratio. Denoted as *C* in Shigley

## Factors of Safety

### Separation Factor of Safety
*NASA TM-106943*  
Guidance is to use SFsep = 1.2 for structural applications (i.e. where joint separation does not pose a catastrophic hazard), and SFsep = 1.4 for pressure system applications.

*NASA-STD-5020*  
Figure 1 provides a flowchart to determine the appropriate factor to use based on the severity of the hazard posed if the joint separates. Values range from 1.0 for non-critical joints; to the greater of 1.2 or the program yield factor of safety for "critical" hazards; to the program ultimate factor of safety for "catastrophic" hazards.

### Fitting Factor
NASA-STD-5020 introduces an additional "fitting factor" (FF = 1.15) to account for uncertainties in how load is transferred between components. This is applied in addition to the factor of safety for all joint checks. The factor may be reduced to 1.0 if the joint is tested to ultimate load.

*Note: The use of a fitting factor on all strength checks for components not tested to ultimate load is also legally required per [FAA 14 CFR 25.625](https://www.ecfr.gov/current/title-14/chapter-I/subchapter-C/part-25/subpart-D/subject-group-ECFRff93ea3edba9270/section-25.625) for commercial aircraft design.*

## Joint Member Stiffness
### Shigley
Bolt stiffness is calculated as the sum of two springs in series, using basic diameter in the area calculation for the shank portion and the tensile stress area for the threaded portion.

A generalized procedure is provided to calculate the joint member stiffness for two configurations: 1) protruding head bolt + nut and 2) protruding head bolt tapped into the bottom member. No discussion of countersunk bolts is provided. The total joint member stiffness is again presented as the sum of springs in series; you must first draw out the joint diagram, determine the dimensions for the frustum portion intersecting each layer, calculate individual member stiffnesses for each layer of the joint, then add the reciprocals to determine the overall joint stiffness constant. The assumption of a 30 degree cone angle is recommended.

A simplified equation (Eq 8-23) is also provided for symmetric joints where the two clamped members are of the same material. Associated constants are provided for steel, aluminum, and copper joint members.

### NASA TM-106943  
Bolt stiffness is calculated based on basic diameter only.

Joint member stiffness equations are provided for four possible configurations and accommodate an arbitrary number of layers of various thicknesses and materials. The text states that the Shigley method was used to develop each configuration, using a cone angle of 45 degrees.    
**Configuration 1** - Bolt and nut; protruding head bolt  
**Configuration 2** - Bolt and nut; flat head countersunk into first joint member  
**Configuration 3** - Protruding head bolt threaded into bottom member  
**Configuration 4** - Flat head bolt countersunk into first member and threaded into bottom member

## Torque-Preload Relationship
### Shigley
The equations presented calculate the nominal bolt preload, allowing for variation due to lubrication. Nut factor, *K*, values range from 0.09 to 0.30 for various lubricants/surface finishes. 

$$ P_{0} = \frac{T}{Kd} $$

where _d_ is the bolt major diameter and _K_ is a friction coefficient based on the thread condition. The equation does not account for min/max variation in preload due to allowed application tolerances or uncertainty associated with the measurement method.

There is a brief discussion that wrench torque is not a good indicator of preload and that direct measurement of bolt elongation is preferred. However, no data associated with the uncertainty of either method is provided.

Preload recommendations are provided for non-permanent connections, reused fasteners, and permanent connections. The values are specified as percentages of the bolt proof load; if the proof load is unknown, an estimate of 0.85*Fty is recommended.

*Non-permanent connections, reused fasteners* - Recommended preload is 75% of bolt proof load (approx. 0.64*Fty).

*Permanent connections* - Recommended preload is 90% of bolt proof load (approx. 0.77*Fty).

### NASA TM-106943
Equations are provided to calculate the minimum, nominal, and maximum preload values. A general recommendation is made that preload should be 0.65*Fty.

$$ {(P_{0})}_{max} = \frac{T}{Kd}(1 + u) + P_{\Delta T, max} $$

$$ {(P_{0})}_{min} = \frac{T}{Kd}(1 - u) - P_{\Delta T, min} - P_{relax} $$

$$ P_{relax} = 0.05 (P_0)_{min} $$

*K* values ranging from 0.11 - 0.15 are mentioned for lubricated bolts; 0.2 for unlubricated.

Uncertainty, *u*, associated with measurement method is briefly discussed, citing values of +/- 0.05 for instrumented bolts and +/- 0.25 for a manually operated torque wrench on lubricated bolts (reference to NSTS-08307).

### NASA STD 5020
Equations for developing minimum/nominal/maximum preload values are largely the same as in TM-106943, though two new terms are introduced. Two factors, *c (max/min)*, are introduced to account for allowed variation in the applied torque. A second term is added to the minimum preload equation to account for material creep. 

$$ {(P_{0})}_{nom} = \frac{T}{Kd} $$

$$ {(P_{0})}_{max} = c_{max} (1 + \Gamma) (P_{0})_{nom} + P_{\Delta T, max} $$

$$ {(P_{0})}_{min} = c_{min} (1 - \Gamma) (P_{0})_{nom} - P_{\Delta T, min} - P_{relax} - P_{creep} $$

where _c_ is based on the applied torque range, and $$ \Gamma $$ is the uncertainty associated with the chosen torque application method. For example, if the assembly drawing states the torque range as $$ T \pm t $$ in-lbs (Nm), then:

$$ c_{max/min} = \frac{T \pm t}{T} $$

Uncertainty values ranging from 0.10 to 0.35 are provided for various application methods (see Table 3).

## Margin Calculations
### Shigley
*Bolt Strength*  
No direct margin of safety equations are provided. Instead, a "factor of safety against yielding" is calculated using the bolt proof strength.

$$ n_{yld} = \frac{(Proof Strength)A_t}{P_0 + \phi P_{ext}} $$

Define the yield load by substituting Fty for proof strength and multiplying by the tensile stress area:

$$ P_{ty} = F_{ty} A_t $$

Then we can calculate a margin of safety by introducing the fitting factor discussed in NASA-STD-5020 and a yield factor of safety:

$$ MS_{yld} = \frac{n_{yld}}{(FF)(SF_y)} - 1 $$

$$ MS_{yld} = \frac{P_{ty}}{(FF)(SF_y)(P_0 + \phi P_{ext})} - 1 $$

Using the earlier assumption that Proof Strength ~ 0.85*Fty introduces a constraint on the minimum value of SFy.

$$ \frac{1}{SF_y} \le 0.85 $$

$$ SF_y \ge 1.18 $$

The same approach can be used for the ultimate margin, substituting Ftu and SFu as applicable.

*Joint Separation*  
A "factor of safety against joint separation" is calculated based on the assumption separation occurs when the portion of the external load carried by the joint members equals zero.

*Note: I'm changing terminology to be consistent with the rest of this post. In the original text, Fi is used to represent bolt preload (P0 throughout this post) and P0 is used to represent the load at which the joint separates (changed to Psep below).* 

$$ P_0 - (1 - \phi)P_{sep} = 0 $$

$$ P_{sep} = \frac{P_0}{(1 - \phi)} $$

$$ n_{sep} = \frac{P_{sep}}{P_{ext}} = \frac{P_0}{(1 - \phi)P_{ext}} $$

This can then be rearranged into a margin of safety calculation by introducing the fitting factor and separation factor of safety discussed in NASA-STD-5020:

$$ MS_{sep} = \frac{n_{sep}}{(FF)(SF_{sep})} - 1 $$

$$ MS_{sep} = \frac{P_0}{(FF)(SF_{sep})(1 - \phi)P_{ext}} - 1 $$

### NASA TM-106943
Bolt tension margin calculations (yield/ultimate) use the bolt strength as the allowable.

$$ P_{bolt} = (P_0)_{max} + (SF)(n)(\phi)(P_{ext}) $$

A new factor, *n*, is introduced to the portion of the external load carried by the bolt. This is referred to as the "loading plane factor" and is based on the total length of the clamped members and distance between the midplanes of the outermost members. This represents how effective the clamped members are at reacting the external load.

$$ P_{sep} = (1-n\phi)P_{ext} $$

$$ MS_{bolt} = \frac{P_{tu}}{P_{bolt}} - 1 $$

Safety factors are only applied to the portion of the external load carried by the bolt; factors are not applied to the preload since uncertainty is already accounted for when calculating the min/max values. Using the Shigley equations to derive the bolt strength margin ends up applying the safety factors to the entire bolt load, including the preload. This is appropriate since variations due to uncertainty (and relaxation, thermal effects, etc) are not accounted for.

$$ MS_{sep} = \frac{(P_0)_{min}}{SF_{sep} P_{sep}} - 1 $$

The form of the separation margin equation is identical to the one we derived using the Shigley equations (inclusion of the fitting factor aside), with the only major difference being the use of nominal preload (Shigley) vs minimum preload in the numerator.

### NASA STD 5020 (rev A or newer)
A complete rewrite of the methodology presented in this document occurred in Rev A. First, you calculate two theoretical loads, ***P'_***, to determine which will occur first: joint separation or bolt rupture. Margin calculations apply safety factors to the full external load and use the applicable ***P'_*** value as the allowable strength.

The load at which the bolt will rupture (based on max preload and load share due to joint geometry) is given by (Eq 10) as

$$ P'_{tu} = \frac{(P_{tu,allow} - (P_0)_{max})}{n \phi} $$

The load at which the joint will separate (also assuming maximum preload) is given by (Eq 11) as

$$ P'_{sep} = \frac{(P_0)_{max}}{1-n\phi} $$ 

Appendix A4 contains guidance for calculating the load introduction factor, *n*; NSTS-08307, NASA TM-108377, and VDI 2230 are referenced for additional details.

**Separation before rupture**  
If $$ P'_{sep} < P'_{tu} $$ the joint will separate before the bolt ruptures, and the bolt carries the entire external load.

*Bolt margin*  
(Applicable to both yield and ultimate checks, using appropriate factors and allowables) (Eq 6)

$$ {MS}_{bolt} = \frac{(P_{t,allow})}{(FF)(SF)P_{ext}} - 1 $$

**Rupture before separation**  
Conversely, if $$ P'_{sep} > P'_{tu} $$ the bolt will rupture before the joint separates. 

*Bolt margin*  
(Yield or ultimate, using appropriate factors and allowables) (Eq 7)

$$ {MS} = \frac{P'_{tu}}{(FF)(SF)P_{ext}} - 1 $$

**Joint Separation Margin (Eq 19)**  
This equation varies drastically from the previous methods. The numerator is still minimum preload value; however, the denominator now uses the full external load rather than the fraction carried by the joint members.  

*Note: This could be an interpretation error on my part. The margin calculation uses PtL (defined as "limit tensile load" in the front matter) in the denominator for this and the bolt strength margin calculation, with no further explanation. Based on similar presentation of the bolt shear margin, where PsL was clearly the applied shear load, I interpreted PtL to be the full external tension load.*

$$ {MS}_{sep} = \frac{(P_0)_{min}}{(FF)(SF_{sep})P_{ext}} - 1 $$

## Shear-Tension Interactions
### NASA TM 106943
Interaction equations are given for combined shear + tension loading and for shear + tension + bending (e.g. double-shear lug-clevis joints or single-shear joints with large shims). A footnote provides the caveat that the interaction equations are intended for joints with minimal shear loads compared to the axial loads (preload included).

*Shear-Tension (Eqs 56 - 59)*  

$$ R_t^2 + R_s^3 \le 1.0 $$

$$ R_s = \frac{SF*P_s}{Bolt Shear Allowable} $$

$$ R_t = \frac{P_b}{Bolt Tension Allowable} $$  

*Note: The printed equation for Rt used "Bending Allowable" in the denominator; I believe this is a typo since bending is ignored in this case. Bruhn is cited as the reference for this section; the interaction equation matches what is shown in Bruhn section D1.8 (eq D1.1), which confirms that the Rt denominator should be the tension allowable, not bending.*

*Shear-Tension-Bending (Eqs 60 - 62)*

$$ (R_t + R_b)^2 + R_s^3 \le 1.0 $$

The bolt bending allowable is either an allowable moment - if that data exists for the specific fastener - or a stress based on the modulus of rupture of the bolt material. In the text, NSTS-08307 and Bruhn are cited for this approach. 

Chasing down the Bruhn reference *(I should get hazard pay for this)*, section D1.7, Tables D1.1 and D1.2a provide ultimate tensile, shear, and moment loads for various bolt sizes and materials. The allowable moment is calculated using the bolt plastic bending strength (aka "modulus of rupture"), which is estimated using Cozzone's method for plastic bending discussed in section C3.4.
 
$$ F_b = f_m + f_0*(k-1) $$

k = 1.7 for solid round section  
> Fb may be a yield or ultimate modulus. For yield, *fm* = material yield stress. For ult, *fm* = material ult stress. Regardless of which is used, the corresponding *f0* must be known before *Fb* can be determined.

### NASA STD 5020
Two sets of equations are provided for shear-tension-bending interaction, depending on whether or not plastic bending is accounted for and whether the bolt shank or threads are in the shear plane. 

The biggest difference, however, is related to how the tension load is treated. Appendix A7 discusses two test campaigns conducted by NASA that showed preload (or lack thereof) was inconsequential to the failure load for joints primarily loaded in shear or a combination of shear + tension. The bolt will yield before ultimate failure, relaxing any preload in the system.

*Note: Both test series were performed using A286 steel fasteners, which are reasonably ductile. For brittle fastener materials (e.g. titanium 6AL-4V), the NASA TM-106943 method may be more appropriate. Testing should be performed to confirm applicability.*

Therefore, in the following equations, the applied tension load should be calculated as

$$ P_{tu} = (SF_{ult})(FF)P_{ext} $$

**No plastic bending** - The bolt ultimate tensile stress is used as the allowable bending stress.

*Shank in bearing (Eq 20)*

$$ (R_s)^{2.5} + \left(\frac{P_{tu}}{Tension Allowable} + \frac{(SF)f_b}{F_{tu}}\right)^{1.5} \le 1 $$

*Threads in bearing (Eq 22)*

$$ (R_s)^{1.2} + \left(\frac{P_{tu}}{Tension Allowable} + \frac{(SF)f_b}{F_{tu}}\right)^2 \le 1 $$

**With plastic bending** - No specific reference is provided for how to obtain Fbu, though mention of dependency on material and cross section in the following text snippet implies the Cozzone method. 

> Fbu is the allowable ultimate flexural stress (bending) that applies for ductile materials as a result of plastic bending. Use of Fbu, which depends on the material and the cross section, accounts for the additional moment-carrying capacity of a section in bending over and above the capacity calculated based on linear-elastic theory.

*Shank in bearing (Eq 21)*

$$ (R_s)^{2.5} + \left(\frac{P_{tu}}{Tension Allowable}\right)^{1.5} + \frac{(SF)f_b}{F_b} \le 1 $$

*Threads in bearing (Eq 23)*

$$ (R_s)^{1.2} + \left(\frac{P_{tu}}{Tension Allowable}\right)^2 + \frac{(SF)f_b}{F_b} \le 1 $$

## Example - Margin Comparisons
### Static Tension Joint (in work)
- DIA .250-28 fastener, NAS6404, 1500 lbf external load, 85 +/- 5 in-lbf

### Shear-Tension Interaction (in work)
- DIA .250-28 fastener, NAS6404, 1000 lbf tension, 1000 lbf shear, 85 +/- 5 in-lbf
