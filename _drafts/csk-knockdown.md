---
layout: post
title: Countersunk joint strength knockdowns
date: 2022-05-07
tags: fasteners, joints
---

Time for another edition of "I spent way too long deep diving what I thought was a straightforward topic, so now it's a blog post!"

The following discussion is based on data for CSR 924 titanium (95 ksi [## MPa] ultimate shear strength) reduced shear head rivets in clad aluminum 7075-T6 sheet.

For thin sheets up to a thickness of D/2, the data follows a linear trend that is parallel to the parent material (A-basis) bearing strength. At sheet thicknesses 0.5*D - 0.75*D, the data points diverge from the ideal bearing-shear envelope and an obvious knee appears in the trend line. Joint failure in this region can be considered mixed-mode and is influenced by factors including (...). The final data point for sheet thickness t = D matches

Plot with all csk data (3D?)

Plot with all csk data, normalized by tcsk/t

Plot with all csk data, normalized by t/D

**Caveats**
- Knockdown curve is generated using an A-basis (P99/95) bearing/shear envelope
- If your joint design uses a different material and/or a different statistical basis, you must correct for this by multiplying the data points by #####

## References
- MIL-HDBK-5J / MMPDS-01