---
layout: post
---
Are titanium fasteners al they're cracked up to be?

Sorry for that terrible pun. (No I'm not.)

A year or so back, a revision of the internal bolted joint tool we use at work introduced a mysterious strength correction factor for titanium fasteners. Tension strength was limited to 60% of specification rating. As I dug into the rationale behind this, I found a reference to NASA-TIP-133R, which, as far as I could tell, was an unpublished, internal NASA memo. I've spent multiple work afternoons diving into the details on this for various reasons, and decided it would make a great blog post.

(This post assumes familiarity with basic mechanical engineering concepts. See the *References* section for supporting material.)

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
  - Chapter 8, section ?
- MIL-HDBK-5J

## Background 
Though the aforementioned NASA internal memo isn't publicly available, its author served as the mentor for Whittaker, who based his Master's thesis reseacrh on this topic. Key results of the research were summarized in a paper presented at the 43rd Aerospace Mechanisms Symposium; full-text of his thesis is also publicly available through the UCF libraries.
### Tension joint analysis
NASA-STD-5020, Sec 4.4.5 summarizes this well (highlighted emphasis mine):
> When a fastened joint is completely separated prior to rupture, the total axial component of the
load acting on the bolt is equal to the axial component of the applied load only. ==If rupture occurs
before separation, preload also acts on the bolt and should be included when assessing the
performance of the fastened joint.==

**Math!**
NASA-STD-5020, 4.4.1 or Shigley Ch 8

$$ P_{tot} = P_{pre} + n \phi P_{ext} $$

_n_ is a "load introduction factor" based on joint geometry; for the purposes of this article it will be assumed that _n = 1_, simplifying to the Shigley equation.

$$ \phi $$, represented in Shigley as _C_, is the joint stiffness factor and represents the stiffness ratio between the bolt and the joint members.

$$ \phi = \frac{K_b}{k_b + k_m} $$

The preload develoepd in the bolt is dependent on the appleid torque (or torque range), bolt lubrication, and uncertainty associated with the torque application method. 

NASA-STD-5020 Eqs 3 & 4:
$$ P_{pre, max/min} = c_{max/min} (1 \pm \Gamma) P_{pre, nom} $$

_c_ is based on the applied torque range allowed on the drawing, e.g. $$ T \pm t $$.

$$ c_{max/min} = \frac{T \pm t}{T} $$

$$ \Gamma $$ is the uncertainty associated with the chosen torque application method (ref. NASA-STD-5020, Table 3). Example values are as follows:
- Bolt elongation measurement: &plusmn;10%
- Turn of nut or turn angle measurement: &plusmn;25%
- Torque wrench on lubricated bolts: &plusmn;25%
- Torque wrench on unlubricated bolts: &plusmn;35%

_Example: Max/Min preload developed in DIA .250 (M6) bolt at 80 &plusmn; 5 in-lbs [metric value]_
- Lubricated: 
- Unlubricated:

**Bolt stiffness**
**Joint stiffness**
**Example load split (C factor) for joints of various materials and stackups**
- AL, Steel
- 0.100, 0.125, 0.188, 0.250

### Ti stress-strain
Example bolt, NAS6404. Per spec, material is 160 ksi Ftu
[MIL-HDBK-5J](http://everyspec.com/MIL-HDBK/MIL-HDBK-0001-0099/MIL_HDBK_5J_139/) AKA MMPDS-01
Ti 6-4 (sec 5.4.1) per AMS 4965 or 4967, bar,
165 ksi Ftu, 155 ksi Fty
Show plot of stress-strain curve, plastic strain between yield and ultimate
Stress-strain curve from MMPDS and AFWAL paper

Compare to 4130/4340 steel (sec 2.3)
160 ksi Ftu, 142 ksi Fty
Show plot of stress-strain curve, plastic strain between yield and ultimate
Stress-strain curve from AFWAL paper

## Tension joint analysis
- Bolt stiffness
- Joint stiffness
- Example load split (C factor) for joints of various materials and stackups
  - AL, Steel
  - 0.100, 0.125, 0.188, 0.250
- Preload uncertainty based on lubrication, torque application method
- Show total tension load of preloaded bolt under external tension

## Additional References
- [MSFC-STD-557](https://standards.nasa.gov/standard/msfc/msfc-std-557) "Threaded Fasteners, Titanium Alloys, Usage Criteria for Launch Vehicles and Spacecraft Applications" (2012)
- [NASA-TM-106943](https://ntrs.nasa.gov/citations/19960012183) "Preloaded joint analysis methodology for space flight systems" (1995)
- [NASA-RP-1228](https://ntrs.nasa.gov/citations/19900009424) "Fastener Design Manual" (1990)
- [NASA-CR-151541](https://ntrs.nasa.gov/citations/19780002530) "Investigation of threaded fastener structural integrity" (1977)
- [NASA-CR-357](https://ntrs.nasa.gov/citations/19660005495) "Evaluation of fasteners and fastener materials for space vehicles" (1966)
- NASA-TIP-133R "Concerns with the Use of Titanium Fasteners" (2003)
  - Internal memo from F. Gross, NASA Materials Engineering Branch
