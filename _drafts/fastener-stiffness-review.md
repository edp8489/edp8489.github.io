---
layout: post
title: "Modeling Fastener Flexibility, pt 1: Theory"
---

A lot of my work revolves around analyzing bolted joints. Every time I dig into a problem, I'm floored by the amount of research that has gone into characterizing every aspect of their behavior over the last 70+ years. After spending the better part of a day chasing down the original reference and *correct* equation for something (and finding two different incorrect versions in the process), I realized documenting everything in one place would be a great post topic for my fledgling blog! 

This post aims to summarize the various empirically-derived equations used to represent the shear stiffness of bolted joints, link to the original source material when possible, and summarize derived works and any errors noticed.

## Stiffness Formulations
- Tate & Rosenfield (1946), [NACA TN 1051](https://ntrs.nasa.gov/citations/19930081668)
    - Formula reproduced in Massera, Eremin, Chandregowda
- Nelson, Bunin & Hart-Smith (1983), [NASA CR 3710](https://ntrs.nasa.gov/citations/19870001540)
    - Formula reproduced in Massera, citing original source
- Huth (1984)
    - "Influence of Fastener Flexibility on Load Transfer and Fatigue Life Predictions for Multirow Bolted and Riveted Joints". (German) LBF Report No. FB-172, Dissertation, Technische Universitat Munchen, 1984.
    [Library record](https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/N8516219.xhtml)
    - Reproduced in Massera (cites original German paper), Eremin (ref 8, 9), Gunbring, Chandregowda, Martin
    - Errata
        - English translation in [ASTM STP 927 (paywall)](https://www.astm.org/stp927-eb.html) supposedly has a typo in final two terms of the equation (see [forum discussion](https://www.eng-tips.com/viewthread.cfm?qid=192705))
        - Gunbring reproduction incorrectly uses E1 and E2 instead of fastener modulus (E3 or E_f) in final two terms of the equation.  
- Boeing
    - Presented in Huth, citing "unpublished report"
    - Reproduced in Massera ref 14
    - Presented in Gunbring, citing (Jarfall 1983)
        - First equation varies wildly from what's presented in Huth ("1968")
        - Second equation matches what's presented in Huth ("1969")
    - Eremin 
        
- Swift (1971), [ASTM STP 486 (paywall)](https://www.astm.org/stp26678s.html)
    - Reproduced in Massera refs 14 (Huth) and 37 (Postpuka)
    - Presented in Huth, citing original source.
    - Gunbring (ref Jarfal 1983) - Varies widely from what's in Huth
    - Eremin ref 9
        - Huth H 1986 Influence of Fastener Flexibility on the Prediction of Load Transfer and Fatigue Life for Multiple-Row Joints; Fatigue in Mechanically Fastened Composite and Metallic Joints (West Conshohocken, PA: ASTM International) p 30
    - Chandregowda
    - Martins (matches de Rijck)
- Grumman
    - Presented in Huth, citing unpublished report
    - Presented in Gunbring, citing (Jarfal 1983). Equation varies from what is shown in Huth
    - Chandregowda
    - Martins (matches de Rijck)
    - Eremin ref 12, 13
        - Jarfall L 1983 Shear loaded fastener installations, Report SAAB KH R-3360. Aircraft Division Saab-Scania AB (Linkoping: Linkoping University) p 68
        - Soderberg J 2012 A finite Element Method for Calculating Load Distributions in Bolted Joint Assemblies (Linkoping: Linkoping University) p 76
- Morris
    - Original source not available
    - Reproduced in de Rijck, Martins
## References (& Modern Research)
- Jarfall (1983) "Shear loaded fastener installations"
    - Saab Aircraft Division, Report SAAB KH R-3360
    - Published in International Journal of Vehicle Design, 1986 Vol 7 Issue 3-4 [paywall](https://www.inderscienceonline.com/doi/abs/10.1504/IJVD.1986.061155)
- de Rijck (2005), "Stress analysis of fatigue cracks in mechanically fastened joints: An analytical and experimental investigation"
    - PhD Thesis, TU Delft
    - [Library record](http://resolver.tudelft.nl/uuid:c6253348-532d-4159-bb4c-00cb8a1f5c2b)
- Gunbring (2008) "Prediction and Modelling of Prediction and Modelling of Fastener Flexibility Using FE"
    - Master's thesis, Linköping University with support form Saab Aerostructures
    - [Library record](http://urn.kb.se/resolve?urn=urn:nbn:se:liu:diva-11428)
- Massera (2019) "Analytical and Numerical Investigation of Multi-Fastener Joints in Composite Structures" 
    - Master's thesis, partnership with German Aerospace Center (DLR)
    - [Library record](https://elib.dlr.de/128454/)
- Martins (2017) "Influence of types of discrete modelling of fasteners in FEM models"
    - Proc. Int. Conf. on NAFEMS World Congress
    - [Library record](https://www.researchgate.net/publication/321058719_Influence_of_Types_of_Discrete_Modelling_of_Fasteners_in_FEM_Models)
- Chandregowda (2018) "Evaluation of fastener stiffness modelling methods for aircraft structural joints"
    - American Institute of Physics, Proceedings of the First International Conference on Design, Materials and Manufacture (ICDEM 2018)
    - [Library record](https://doi.org/10.1063/1.5029577)
- Eremin (2021) "Methods for flexibility determination of bolted joints: empirical formula review"
    - Journal of Physics Conference Series, 19th International Conference "Aviation and Cosmonautics" (AviaSpace-2020)
    - [Library record](https://iopscience.iop.org/article/10.1088/1742-6596/1925/1/012058)
- Morris (2004) "Defining a standard formula and test-method for fastener flexibility in lap-joints"
    - PhD Thesis, TU Delft
    - No library record
- Rutman (2009) "Fastener Modeling for Joining Composite Parts"
    - Americas Virtual Product Development Conference
    - Provides formula for rotational stiffness
    - [Library record](https://api.semanticscholar.org/CorpusID:138009598)
- S Postupka A Kiihweg and F J Arendts. Determination of the bolt flexibility of CFRP joints. In [ECCM-8 (out of print)](https://www.google.com/books/edition/ECCM_8/9Eu4fTQPP8sC?hl=en&gbpv=1&dq=Determination+of+the+bolt+flexibility+of+CFRP+joints&pg=PA61&printsec=frontcover): European Conference on Composite Materials; Science, Technologies and Applications; 3-6 June, 1998, Naples-Italy, volume 1, pages 61–68, 1998.