---
layout: post
title: Countersunk joint strength and a helpful visualization tool
date: 2022-06-25
tags: fasteners, joints
---

Time for another installment of "I spent way too long deep diving what I thought was a straightforward topic, so now it's a blog post (with bonus web tool!)"

*(Seriously, though, my original plan for this site was to 1-2 blog posts a month, not one post every 3 months like it's currently turning into. Such is life.)*

**TL;DR** I made a tool to help visualize the joint strength data available in chapter 8 of MIL-HDBK-5J / MMPDS-01. The data set is fairly sparse right now -- my initial focus was titanium fasteners in 7000 series aluminum joints -- but I plan to expand the database over time.

Try it out! [Countersunk Joint Tool](https://edp8489.github.io/csk_knockdown_tool/)

See below for example plots and a brief discussion of data trends using CSR 924 titanium reduced shear head rivets in clad aluminum 7075-T6 sheet.

![data_env_plot](assets/csk_post/plt1_data_w_envelope.png "Data series with strength envelope")

For thin sheets (up to a thickness of approximately 50% of *D*), the data follows a linear trend that is parallel to the parent material bearing strength (A-basis).

As sheet thickness increases (in the range of approx. 50-75% of *D*), the data points diverge from the ideal bearing-shear envelope and an obvious knee appears in the trend line. Joint failure in this region can be considered mixed-mode and is related to, among other factors, shear-tension interaction between the applied load and prying forces resulting from the unstabilized single-shear configuration.

As sheet thickness increases, bending stiffness increases, out of plane deflections (and prying load) decrease, and the failure load converges on the fastener ultimate shear strength for sheet thicknesses &ge; D.

![nondim_knockdown_plot](assets/csk_post/plt2_kcsk.png "Nondimensional strength knockdown plot")

A nondimensionalized plot of ultimate strength correction factor (for the *joint* - i.e. normalized by the bearing-shear envelope rather than the sheet bearing strength alone) vs countersink depth ratio is also generated.

**Caveats**
- Knockdown curve is generated using an A-basis (P99/95) bearing/shear ultimate strength envelope
- If your joint design has a different ultimate bearing strength (due to different material, a different statistical basis, etc.), you must decide how to scale the knockdown factor for your configuration.

## References
- MIL-HDBK-5J / MMPDS-01