---
layout: post
title: Inter-rivet buckling (an addendum to Niu's method)
date: 2023-01-20
---

The equation for inter-rivet buckling presented in Niu, "Airframe Stress Analysis and Sizing" irks me. Compared to the other stability equations, which include plasticity correction factors to account for the nonlinear behavior of the compressive modulus at high stress states, the equation appears to use the standard elastic modulus. Additionally, discussion around the various fixity constants is sparse and the 0.9 constant at the beginning of the equation isn't explained.

$$
F_{ir} = 0.9 c E \left( \frac{t}{s} \right)^2
$$

> where t = Skin thickness  
>       s = Rivet spacing (equivalent to column length)  
>       c = End-fixity coefficient  

The end-ficity coefficient <em>c</em> can be 4.0 for universal head rivets, 3.0 for brazier head rivets, and 1.0 for countersunk rivets; E is the modulus of elasticity, s is the spacing between fastener hole centers, and t is the sheet thickness.

Flabel is more verbose in his derivation of a similar equation in "Practical Stress Analysis for Design Engineers" (eq 6-2)

$$
F_{ir} = \frac{c \pi^2 E_t}{12(1 - \mu^2)} \left( \frac{t}{s} \right)^2
$$

> where E<sub>t</sub> = Compression tangent modulus  
>       $ \mu $ = Poisson's ratio  
>       t = skin thickness  
>       s = fastener spacing  
>       c = end-fixity coefficient  
>         = 4.0 for flat head rivets  
>         = 3.5 for spot welds  
>         = 3.0 for protruding (universal) head rivets  
>         = 1.5 for countersunk (flush) or dimpled tension head rivets  
>         = 1.0 for countersunk (flush) or dimpled shear head rivets

Comparing the two, Niu's 0.9 constant is approximately equal to (pi^2)/(12*(1-mu^2)) as seen in Flabel's equation for mu = 0.3. However, this can range from 0.877 for mu = 0.25 to 0.925 for mu = 0.333.

Additionally, the nonlinear behavior of the compressive tangent modulus should be accounted for.

Example: AL 7050-T7451 plate. min(Fcy) = 64 ksi

Using a 1.4 ULT safety factor, 64/1.4 = 45.7 ksi, resulting in operating stresses that are above the 40 ksi cutoff for elastic behavior. Et ~ 10.3 Msi compared to the elastic Ec = 10.6 Msi.

Using a 1.25 YLD safety factor, 64/1.25 = 51.2 ksi. Et ~ 9.25 Msi compared to the elastic Ec = 10.6 Msi

(image placeholder)

## References
- Niu, Airframe Stress Analysis and Sizing
- Flabel, Practical Stress Analysis for Design Engineers