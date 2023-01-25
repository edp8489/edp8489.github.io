---
layout: post
title: Inter-rivet buckling (an addendum to Niu's method)
date: 2023-01-20
---

<em>Here's a softball blog post to start the year (and to force myself into the habit of updating more than once every few months).</em>

The equation for inter-rivet buckling presented in Niu, "Airframe Stress Analysis and Sizing" irks me. Compared to the other buckling equations presented in earlier sections, the inter-river equation appears too simplistic:

$$
F_{ir} = 0.9\ c\ E \left( \frac{t}{s} \right)^2
$$

```
where t = Skin thickness  
      s = Rivet spacing (equivalent to column length)  
      c = End-fixity coefficient  
        = 4.0 for universal head rivets  
        = 3.0 for brazier head rivets  
        = 1.0 for countersunk rivets
```

While the other stability equations include plasticity correction factors to account for the nonlinear behavior of the compressive modulus at high stress states, this equation appears to use the standard (elastic) compressive modulus. Additionally, no derivation or description is provided for the 0.9 constant.

Flabel is more verbose in his derivation of a similar equation in "Practical Stress Analysis for Design Engineers" (eq 6-2):

$$
F_{ir} = \frac{c\ \pi^2\ E_t}{12(1 - \mu^2)} \left( \frac{t}{s} \right)^2
$$

```
where Et = Compression tangent modulus  
      mu = Poisson's ratio  
      t = skin thickness  
      s = fastener spacing  
      c = end-fixity coefficient  
        = 4.0 for flat head rivets  
        = 3.5 for spot welds  
        = 3.0 for protruding (universal) head rivets  
        = 1.5 for countersunk (flush) or dimpled tension head rivets  
        = 1.0 for countersunk (flush) or dimpled shear head rivets
```

Comparing the two, Niu's 0.9 constant is approximately equal to $$ (\pi^2)/(12(1-\mu^2)) $$ as seen in Flabel's equation for $$ \mu = 0.3 $$. However, this can range from 0.877 for $$ \mu = 0.25 $$ to 0.925 for $$ \mu = 0.333 $$.

Additionally, the nonlinear behavior of the compressive tangent modulus should be considered.

<b>Example: AL 7050-T7451 plate</b>

The minimum compressive yield strength (L grain direction) is Fcy = 64 ksi. The reported elastic (compression) modulus is $$ E_c $$ = 10.6 Msi. 

Using a 2.0 safety factor, 64/2 = 32 ksi. $$ E_c $$ is constant for all operating stresses.

Using a 1.5 safety factor, 64/1.5 = 42.7 ksi. The corresponding compressive modulus is at the cusp of nonlinear behavior for the L and ST grain directions, but still constant for the LT grain direction.

Using a 1.4 safety factor, 64/1.4 = 45.7 ksi. $$ E_t $$ = 10.3 Msi for the L and ST grain directions and at the cusp of nonlinear behavior for the LT direction. 

Using a 1.25 safety factor, 64/1.25 = 51.2 ksi. $$ E_t $$ = 9.25 Msi for L, 10 Msi for ST, and 10.4 Msi for LT grain directions.

![AL 7050-T7451 compressive tangent modulus curve (MIL-HDBK-5J)](/assets/ir_buckling/AL7050-T7451_Et.png)

## References
- Niu, Michael C.Y., <em>Airframe Stress Analysis and Sizing</em>,  ISBN 978-9627128120
- Flabel, Jean-Claude, <em>Practical Stress Analysis for Design Engineers</em>, ISBN 978-0964701403
- MIL-HDBK-5J / MMPDS-01
