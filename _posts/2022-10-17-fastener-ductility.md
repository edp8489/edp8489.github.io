---
title: Ductility of Titanium Fasteners in Tension Applications
layout: post
tags: [fasteners, joints]
date: 2022-10-17
---
Are titanium fasteners all they're cracked up to be? Sorry for that terrible pun.

_(No I'm not.)_

A recent revision of the bolted joint tool we use at work introduced a mysterious strength correction factor for titanium fasteners. Tension strength was limited to 60% of the specification rating for "highly preloaded" joints. It cited NASA-TIP-133R as the reference, which, as far as I could tell, was an unpublished, internal NASA memo.

I don't like blindly using anything without understanding the rationale/theory behind it, so after spending multiple work afternoons digging into the rationale behind this (and countless more hours of my personal time) I decided it would make a great blog post.

I've been working on this post on and off for the past 6 months. It spawned several research tangents and two new blog posts -- one [comparing preloaded joint analysis methods]({% link _posts/2022-08-31-joint-margin-methods.md %}), the other a [reference sheet for stress-strain curves]({% link _posts/2022-09-05-engineering-true-stress.md %}). Finally I feel like I have enough pieces to fill in a few knowledge gaps and better illustrate the differences between these two common fastener materials.

## Key References
- NASA-TIP-133R "Concerns with the Use of Titanium Fasteners" (2003)
  - Internal memo from F. Gross, NASA Materials Engineering Branch
- Whittaker, J. "Ductility and use of titanium alloy and stainless steel aerospace fasteners"
  - Master's thesis, University of Central Florida (2015)
  - [Library record](https://digitalcommons.usf.edu/etd/5796/)
  - Results summarized in a paper at the 43rd Aerospace Mechanisms Symposium (2016) 
- NASA/CP-2016-219090, "Tests on the ductility of stainless steel and titanium alloy fasteners" 
    - [Document link](https://www.esmats.eu/amspapers/pastpapers/pdfs/2016/whittaker.pdf)

## Summary 
Though the aforementioned NASA internal memo isn't publicly available, its author served as the mentor for Whittaker, who based his Master's thesis research on this topic; full-text of his thesis is publicly available through the UCF libraries. Key results of the research were summarized in a paper presented at the 43rd Aerospace Mechanisms Symposium, which is also publicly available.

TL;DR Titanium fasteners are more brittle than steel and therefore more susceptible to variations in preload and external load (which aren't always accounted for in joint analysis - see my related post comparing different [joint margin methods]({% link _posts/2022-08-31-joint-margin-methods.md %})).

My initial reaction to this was "duh, just look at the stress-strain curves." But it turns out there's limited (public) data available for either material -- if anything, it's for the annealed condition, not the specific tempers used for fasteners. 

(As always, for this post I'm limiting my sources to publicly available references such as MIL-HDBK-5J / MMPDS-01, though even a quick scan of the ASM Atlas of Stress-Strain Curves wasn't as useful as I'd hoped.) 

Comparisons are made using NAS6300 (A-286) and NAS6400 (Titanium 6AL-4V) series fasteners, both of which specify 160 ksi (1100 MPa) minimum tensile strength. 

## Material Specification References

**NAS630X**: A-286 per AMS 5731, AMS 5737, or AMS 5853  
AMS 5731: This treatment includes heating to 1800 °F (980 °C) for one hour, followed by oil or water quenching. (per [TechSteel](https://www.techsteel.net/alloy/stainless-steel/a286/ams-5731))

AMS 5731: This specification comes in a solution treated and aged condition. The alloy is first subjected to a temperature of 1650 °F (900 °C) for one hour, then water or oil quenched. For additional precipitation heat treatment, hold heat to 1300-1400 °F for 16 hours. (per [TechSteel](https://www.techsteel.net/alloy/stainless-steel/a286/ams-5737))

AMS 5853: This specification comes in an electrode-melted, solution treated and work-strengthened form. The strength of the material is raised using cold-reducing techniques, typically ranging from 15% to 17%. The resulting tensile strength is 160 ksi at up to 1000 °F (540 °C). (per [TechSteel](https://www.techsteel.net/alloy/stainless-steel/a286/ams-5853) and [Extreme Bolt, A286 Fasteners technical data](https://www.extreme-bolt.com/a-286-fasteners-flanges.html#ASTMA453Fasteners))

The Aerospace Structural Metals Handbook (volume II, 1972 edition; link at end of post) contains properties for sheet and bar at various conditions, including 130 ksi and 140 ksi bar (S-basis) per AMS 5731. 

<img src="/assets/ti-ductility/a286-ams-props.png" alt="a286-ams-props" width=420>

It also contains a table of producer typical properties for bar at various conditions.

<img src="/assets/ti-ductility/ASMH-II-A286-props.png" alt="a286-bar-props" width=420>

The handbook also provides (typical?) stress-strain curves through yield and ultimate for 150 ksi solution treated and aged sheet. The plastic strain at ultimate is above 25%.

<img src="/assets/ti-ductility/ASMH-II-A286-aged-sht-yld.png" alt="a286-aged-sht-through-yld" width=420>

<img src="/assets/ti-ductility/ASMH-II-A286-aged-sht-ult-epu.png" alt="a286-aged-sht-through-ult" width=420>

**NAS640X**: Titanium 6Al-4V per AMS 4928 or AMS 4967 (150 ksi Fty; 160 ksi Ftu per MIL-HDBK-5J, Table 5.4.1.0(d), DIA 0.501-1.000 in)

Volume III of the Aerospace Structural Metals Handbook contains (typical) stress-strain curves for annealed bar (135 ksi Ftu) and aged sheet (160 ksi Ftu). The plastic strain at ultimate for both is roughly 0.4%.

<img src="/assets/ti-ductility/ASMH-III-Ti64-annbar-epu.png" alt="ti-64-annealed-bar" width=420>

<img src="/assets/ti-ductility/ASMH-III-Ti64-agsht-epu.png" alt="ti-64-aged-sheet" width=420>


## Stress-Strain Curves from Whittaker Test Data

We can also attempt to re-create stress-strain curves for both materials using the load-displacement graphs published by Whittaker. 

### Assumptions and Procedure
- A single sample of each fastener type was chosen at random for this exercise
- Load-displacement data pairs were estimated using a [plot digitizer](https://automeris.io/WebPlotDigitizer/)
- Stress calculations are based on the tensile stress area for class 3A threads per NAS4003/NAS4004, Table III (0.0404 in^2 / 26 mm^2).
- Strain calculations are based on the overall bolt length minus the insert length (2.0 - 0.375 = 1.625 in / 41 mm) 
- The elastic strain at 100 lbf load is added to the calculated engineering strains to account for zeroing of the displacement measurement during test
- Data points beyond ultimate load are ignored; test data is used to estimate e'u (plastic strain at ultimate stress) rather than elongation (total strain at fracture)
- Hollomon strain-hardening exponent estimated based on true strain value at ultimate load (described further in [this post]({% link _posts/2022-09-05-engineering-true-stress.md %}))

<em>Note: The curves below are presented for informational and educational purposes only. They are NOT intended to be used as design values.</em>

### A-286 fastener 
**Ramberg-Osgood Parameters**  
Engineering plastic strain at maximum load e'u = 0.07 in/in  
The exponent can be calculated using e'u, Fty = 120 ksi, and Ftu = 160 ksi  
*n* = 12.4

**Strain-hardening exponent**  
Using the reciprocal of the RO exponent m = (1/n) = 0.08  
Using true total strain at maximum load, m ~ 0.08 in/in  
Proportionality constant for Hollomon equation ~ 300 ksi

<img src="/assets/ti-ductility/whit-a286-true-s-e.png" alt="whittaker-a286-load-true-strain" width=640>

### Ti 6Al-4V fastener
**Ramberg-Osgood Parameters**  
Engineering plastic strain at maximum load e'u = 0.01 in/in  
The exponent can be calculated using e'u, Fty = 150 ksi, Ftu = 160 ksi   
*n* = 24.9

**Strain-hardening exponent**  
Using the reciprocal of the RO exponent, m = (1/n) = 0.04  
Using true total strain at maximum load m ~ 0.024 in/in  
Proportionality constant for Hollomon equation ~ 550 ksi

<img src="/assets/ti-ductility/whit-ti64-true-s-e.png" alt="whittaker-ti64-load-true-strain" width=640>

## Additional References
- [NAS6303](https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/NAS63036320.xhtml) - "Bolt, Hex Head, Close Tolerance, A-286 CRES"
- [NAS4003](https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/NAS4003.xhtml) - "Fasteners, A286 CRES, Externally Threaded, 160ksi Ftu, 95ksi Fsu, 1000F"
- [NAS6403](https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/NAS64036420.xhtml) - "Bolt, Hex Head, Close Tolerance, 6AL-4V Titanium Alloy"
- [NAS4004](https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/NAS4004.xhtml) - "Fasteners, 6AL-4V Titanium Alloy, Externally Threaded, 160ksi Ftu, 95ksi Fsu, 450F"
- Aerospace Structural Metals Handbook, 1972 ed.
  - Vol I - Ferrous Alloys - [AD737970](https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/AD737970.xhtml)
  - Vol II - Aluminum Alloys and Nickel-Chromium Steels - [AD737971](https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/AD737971.xhtml)
  - Vol III - Magnesium and Titanium Alloys - [AD737972](https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/AD737972.xhtml)
  - Vol IV - Exotic Alloys - [AD737973](https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/AD737973.xhtml)
- [MSFC-STD-557](https://standards.nasa.gov/standard/msfc/msfc-std-557) "Threaded Fasteners, Titanium Alloys, Usage Criteria for Launch Vehicles and Spacecraft Applications" (2012)
- [NASA-CR-151541](https://ntrs.nasa.gov/citations/19780002530) "Investigation of threaded fastener structural integrity" (1977)
- [NASA-CR-357](https://ntrs.nasa.gov/citations/19660005495) "Evaluation of fasteners and fastener materials for space vehicles" (1966)
