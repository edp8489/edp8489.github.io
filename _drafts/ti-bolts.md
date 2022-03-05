---
layout: post
---

A year or so back, a revision of the internal bolted joint tool we use at work introducted a mysterious strength correction factor for titanium fasteners. Tension strength was limited to 60% of specification rating. As I dug into the rationale behind this, I found a reference to NASA-TIP-133R, which, as far as I could tell, was an unpublished, internal NASA memo. I've spent multiple work afternoons diving into the details on this for various reasons, and decided it would make a great blog post.

## Ti stress-strain
Example bolt, NAS6404. Per spec, material is 160 ksi Ftu
[MIL-HDBK-5J](http://everyspec.com/MIL-HDBK/MIL-HDBK-0001-0099/MIL_HDBK_5J_139/) AKA MMPDS-01
Ti 6-4 (sec 5.4.1) per AMS 4965 or 4967, bar,
165 ksi Ftu, 155 ksi Fty
Show plot of stress-strain curve, plastic strain between yield and ultimate

Compare to 4130/4340 steel (sec 2.3)
160 ksi Ftu, 142 ksi Fty
Show plot of stress-strain curve, plastic strain between yield and ultimate

## Tension joint analysis
- Bolt stiffness
- Joint stiffness
- Example load split (C factor) for joints of various materials and stackups
  - AL, Steel
  - 0.100, 0.125, 0.188, 0.250
- Preload uncertainty based on lubrication, torque application method
- Show total tension load of preloaded bolt under external tension

## References
- Shigley, Ch 8
- [NASA-STD-5020](https://standards.nasa.gov/standard/nasa/nasa-std-5020) "Requirements for Threaded Fastening Systems in Spaceflight Hardware"
- [NASA-RP-1228](https://ntrs.nasa.gov/citations/19900009424) "Fastener Design Manual" (1990)
- [NASA-CR-151541](https://ntrs.nasa.gov/citations/19780002530) "Investigation of threaded fastener structural integrity" (1977)
- NASA-TIP-133R "Concerns with the Use of Titanium Fasteners"
- [NASA-TM-106943](https://ntrs.nasa.gov/citations/19960012183) "Preloaded joint analysis methodology for space flight systems" (1995)
- Jarrod Whittaker, "Ductility and use of titanium alloy and stainless steel aerospace fasteners"
  - [Library record](https://digitalcommons.usf.edu/etd/5796/)
  - 43rd Aero Mech Symp, NASA/CP-2016-219090, "Tests on the ductility of stainless steel and titanium alloy fasteners" [Link](https://www.esmats.eu/amspapers/pastpapers/pdfs/2016/whittaker.pdf)
- [NASA-CR-357](https://ntrs.nasa.gov/citations/19660005495) "Evaluation of fasteners and fastener materials for space vehicles" (1966)
- [MSFC-STD-557](https://standards.nasa.gov/standard/msfc/msfc-std-557) "Threaded Fasteners, Titanium Alloys, Usage Criteria for Launch Vehicles and Spacecraft Applications"