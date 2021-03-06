---
title: Ductility of Titanium Fasteners in Tension Applications
layout: post
---
Are titanium fasteners all they're cracked up to be? Sorry for that terrible pun.

_(No I'm not.)_

A year or so back, a revision of the internal bolted joint tool we use at work introduced a mysterious strength correction factor for titanium fasteners. Tension strength was limited to 60% of the specification rating. Digging into the rationale behind this, I found a reference to NASA-TIP-133R, which, as far as I could tell, was an unpublished, internal NASA memo. I've spent multiple work afternoons diving into the details on this for various reasons, and decided it would make a great blog post.

(This post assumes familiarity with basic mechanical engineering concepts. See the *References* section for supporting material.)

**Navigation**
* TOC
{:toc}

## Key References
- Whittaker, J. "Ductility and use of titanium alloy and stainless steel aerospace fasteners"
  - Master's thesis, University of Central Florida (2015)
    - [Library record](https://digitalcommons.usf.edu/etd/5796/)
  - Summarized in a paper at the 43rd Aerospace Mechanisms Symposium (2016) 
    - NASA/CP-2016-219090, "Tests on the ductility of stainless steel and titanium alloy fasteners" 
    - [Document link](https://www.esmats.eu/amspapers/pastpapers/pdfs/2016/whittaker.pdf)
- [NASA-STD-5020](https://standards.nasa.gov/standard/nasa/nasa-std-5020) "Requirements for Threaded Fastening Systems in Spaceflight Hardware"
- Budynas & Nisbett, "Shigley's Mechanical Engineering Design (8th edition)", 2006, McGraw-Hill, ISBN 978-0073312606 
  - Chapter 8
- MIL-HDBK-5J

## Background 
Though the aforementioned NASA internal memo isn't publicly available, its author served as the mentor for Whittaker, who based his Master's thesis research on this topic. Key results of the research were summarized in a paper presented at the 43rd Aerospace Mechanisms Symposium; full-text of his thesis is also publicly available through the UCF libraries.

TL;DR Titanium fasteners are more brittle than steel and therefore more susceptible to variations in preload and external load (which aren't always accounted for in nominal joint analysis).

The rest of this post dives into the a more detailed approach to tension joint analysis than is offered in Shigley, which you'd typically learn in an undergraduate mechanical engineering program.

### Tension joint analysis
The total tension load in a bolted joint depends on the several factors: the applied/external load (obviously), the preload, joint member stiffnesses, and preload variations due to various uncertainties. In the simplest case, you assemble the joint hand-tight (aka with zero preload) and the bolt load is equal to the applied load. Margin calculation is straightforward. 

However, if the joint is preloaded, the total load acting on the bolt can easily exceed the expected nominal value, if various sources of uncertainties aren't accounted for in analysis.

NASA-STD-5020, Sec 4.4.5 summarizes this well (highlighted emphasis mine):  
> When a fastened joint is completely separated prior to rupture, the total axial component of the
load acting on the bolt is equal to the axial component of the applied load only. **If rupture occurs
before separation, preload also acts on the bolt and should be included when assessing the
performance of the fastened joint.**

**Math!**  
The nominal preload developed in the bolt is dependent on the applied torque, bolt diameter, and thread lubrication. A simplified relationship between applied torque and developed preload is provided in Shigley (Sec 8.8, Eq 8-27. For a full derivation, see eqs 8-26 (a)-(c)) as:

$$ P_{pre} = \frac{T}{Kd} $$

where _d_ is the bolt major diameter and _K_ is a friction coefficient based on the thread condition. Common values of _K_ are 0.3 (black-oxide coated alloy steel); 0.15-0.2 (cadmium-plated, zinc-plated, "as-received" condition); and 0.12 (lubricated).

The maximum and minimum preload values are influenced by the torque range allowed on the assembly drawing and accuracy limits associated with the torque application method. (ref NASA-STD-5020, Eqs 3 & 4)

$$ {(P_{pre})}_{max/min} = c_{max/min} (1 \pm \Gamma) (P_{pre})_{nom} $$

where _c_ is based on the applied torque range, and $$ \Gamma $$ is the uncertainty associated with the chosen torque application method.

If the assembly drawing states the torque range as $$ T \pm t $$ in-lbs (Nm), then:

$$ c_{max/min} = \frac{T \pm t}{T} $$

Example values for $$ \Gamma $$ are &plusmn; 25% and &plusmn; 35% for a torque wrench on lubricated and unlubricated bolts, respectively. Additional values for other methods can be found in NASA-STD-5020, Table 3.

Finally, the total load seen by a bolt is a combination of the preload and the external load (ref NASA-STD-5020 Sec 4.4.1 & Shigley Sec 8-7, Eq 8-24):

$$ P_{tot} = P_{pre} + n \phi P_{ext} $$

where _n_ is a "load introduction factor" based on joint geometry and $$ \phi $$, denoted as _C_ in Shigley, is the joint stiffness factor and represents the stiffness ratio between the bolt and the joint members. For the purposes of this article it will be assumed that _n = 1_, simplifying to the Shigley equation.

$$ \phi = C = \frac{k_b}{k_b + k_m} $$

## Example load split for joints of various materials and stackups
I tabulated _C_ for 16 different joint configurations of varying materials and thicknesses. 
- Bolt materials: Steel and Ti
- Member materials: AL/AL, Steel/Steel
- Member thickness pairs: 0.100, 0.125, 0.188, 0.250 [in]

*Bolt (tensile) stiffness* - Simplified for this example to:

$$ k_b = \frac{EA_{maj}}{t_{tot}} $$

*Joint member stiffness* - For identical Side A/Side B materials, where _A_ and _B_ are material-specific constants (Ref Shigley, Sec 8.5, Eq 8-23 and Table 8-8):

$$ k_m = EdA \cdot exp({Bd/t_{tot}}) $$

Refer to Shigley Sec 8.5, Eqs 8-20 through 8-22 for the full procedure to calculate this for joints with dissimilar side A/B thicknesses and materials.

As can be seen from the table below, the bolt could easily carry up to **50-60%** of the external load for thin-flanged aluminum joints (typical of aerospace structures). 

![phi_table](assets/ti-ductility/phi_table.png)

### Material Strength References
NAS620X: Alloy Steel ~4340 (ref MIL-HDBK-5J, Table 2.3.1.0(g2))
Ftu: 160 ksi; Fty: 142 ksi

NAS630X: A-286 cold worked (ref [Extreme Bolt, A286 Fasteners technical data](https://www.extreme-bolt.com/a-286-fasteners-flanges.html#ASTMA453Fasteners))  
Ftu: 160 ksi; Fty: 120 ksi

NAS640X: Ti 6Al-4V round bar per MIL-T-9047 (ref MIL-HDBK-5J, Table 5.4.1.0(d))  
Ftu: 160 ksi; Fty: 150 ksi (DIA 0.501-1.000 in)

Assuming a preload of 0.65*Fty:  
For A286:  
Fpre = 0.65(120000)0.0364 = 2839 lbf
T = FKd = 3549(*K*)0.25 = 142 in-lbs (K = 0.2); 106 in-lbs (K = 0.15)

For Ti:  
Fpre = 0.65(150000)0.0364 = 3549 lbf  
T = FKd = 3549(*K*)0.25 = 177 in-lbs (K = 0.2); 133 in-lbs (K = 0.15)



## Example: Nom/Max preload developed in joint (with and without uncertainty)
_DIA .250 (M6) bolt, 0.125 in AL member thicknesses, and 1000 lbf external load_  
Unlubricated: 82.5 &plusmn; 7.5 in-lbs (MSFC-STD-486, Table III: 160 ksi passivated A286 fasteners w/ cadmium-plated nuts)
- Ideal calculation
  - K = 0.2
  - $$ P_{pre} $$ (nom) = 1640 lbf
  - % of Ftu = 27%
  - C = 0.45
  - $$ P_{tot} $$ (nom) = 2090 lbf
- With uncertainty
  - $$ c_{max} $$ = 1.09
  - $$ \Gamma $$ = 0.35
  - $$ P_{pre} $$ (max) = 2413 lbf
  - $$ P_{tot} $$ (max) = 2863 lbf

Lubricated: 70 &plusmn; 5 in-lbs (MSFC-STD-486, Table V: 160 ksi passivated A286 fasteners w/ dry film lubricated nuts)
- Ideal calculation
  - K = 0.12
  - $$ P_{pre} $$ (nom) = 2333 lbf
  - % of Ftu = 38%
  - C = 0.45
  - $$ P_{tot} $$ (nom) = 2783 lbf
- With uncertainty
  - $$ c_{max} $$ = 1.07
  - $$ \Gamma $$ = 0.25
  - $$ P_{pre} $$ (max) = 3123 lbf
  - $$ P_{tot} $$ (max) = 3573 lbf

## Additional References
- [MSFC-STD-486](https://standards.nasa.gov/standard/msfc/msfc-std-486) "Standard, Threaded Fasteners, Torque Limits For"
- [MSFC-STD-557](https://standards.nasa.gov/standard/msfc/msfc-std-557) "Threaded Fasteners, Titanium Alloys, Usage Criteria for Launch Vehicles and Spacecraft Applications" (2012)
- [NASA-TM-106943](https://ntrs.nasa.gov/citations/19960012183) "Preloaded joint analysis methodology for space flight systems" (1995)
- [NASA-RP-1228](https://ntrs.nasa.gov/citations/19900009424) "Fastener Design Manual" (1990)
- [NASA-CR-151541](https://ntrs.nasa.gov/citations/19780002530) "Investigation of threaded fastener structural integrity" (1977)
- [NASA-CR-357](https://ntrs.nasa.gov/citations/19660005495) "Evaluation of fasteners and fastener materials for space vehicles" (1966)
- NASA-TIP-133R "Concerns with the Use of Titanium Fasteners" (2003)
  - Internal memo from F. Gross, NASA Materials Engineering Branch
- [NAS4003](https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/NAS4003.xhtml) "Fasteners, A286 CRES, Externally Threaded, 160ksi Ftu, 95ksi Fsu, 1000F"
- [NAS4004](https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/NAS4004.xhtml) "Fasteners, 6AL-4V Titanium Alloy, Externally Threaded, 160ksi Ftu, 95ksi Fsu, 450F"