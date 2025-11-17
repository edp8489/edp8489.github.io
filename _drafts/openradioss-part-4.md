---
layout: post
title:
date: 2024-11-10
---

Benchmarking OpenRADIOSS solves on RPi 5 vs Linux VM running on a Mac Studio with Rosetta virtualization

Models:
- Altair examples
    - `tensile_LAW2_0000.rad`
    - `tensile_LAW36_0000.rad`
- VarmintAl example
    - `pull3DSPIN-RUN.k`

## System Spec Comparison
- Raspberry Pi 5
    - Processor:
    - Cores: 4
    - RAM: 8 GB (1.67 GB used by OS and containers)
        - Effectively 6 GB
- Mac Studio
    - Processor: M2 Max
    - Cores: 12 (4 efficiency, 8 Performance)
    - RAM: 64 GB
- Lima VM:
    - Cores: 4
    - RAM: 16 GB

Using `time` to benchmark duration of each command

## 1. Altair Example, Law 2
### Raspberry Pi
Starter
```bash
> time ...

                   ** COMPUTE TIME INFORMATION **
  
 EXECUTION STARTED      :      2024/11/10  15:34:32
 EXECUTION COMPLETED    :      2024/11/10  15:34:33
  
 ELAPSED TIME...........=          1.01 s
                               00:00:01

./run.sh starter_linuxa64  out/tensile_law2  1.04s user 0.48s system 99% cpu 1.522 total

```

Engine
```bash
time ...
                   ** CUMULATIVE CPU TIME SUMMARY **
  
 CONTACT SORTING.............: .0000E+00     0.00 % 
 CONTACT FORCES..............: .1301E+00     0.05 % 
 ELEMENT FORCES..............: .2411E+03    87.98 % 
 KINEMATIC COND..............: .6697E+01     2.44 % 
 INTEGRATION.................: .4284E+01     1.56 % 
 ASSEMBLING..................: .3744E+01     1.37 % 
 OTHERS (including I/O)......: .1810E+02     6.60 % 
 TOTAL.......................: .2741E+03   100.00 % 
  
                   ** MEMORY USAGE STATISTICS **
  
 TOTAL MEMORY USED .........................:       59 MB
 MAXIMUM MEMORY PER PROCESSOR...............:       59 MB
 MINIMUM MEMORY PER PROCESSOR...............:       59 MB
 AVERAGE MEMORY PER PROCESSOR...............:       59 MB

ELAPSED TIME     =        308.60 s
                          0:05:08
  
     NORMAL TERMINATION      
     TOTAL NUMBER OF CYCLES  :  235200
./run.sh engine_linuxa64  out/tensile_law2  274.35s user 5.26s system 90% cpu 5:09.50 total
```

Engine OMPI (nt 4)
```bash
                   ** CUMULATIVE CPU TIME SUMMARY **
  
 CONTACT SORTING.............: .0000E+00     0.00 % 
 CONTACT FORCES..............: .2402E+00     0.02 % 
 ELEMENT FORCES..............: .6539E+03    67.75 % 
 KINEMATIC COND..............: .9168E+02     9.50 % 
 INTEGRATION.................: .9777E+01     1.01 % 
 ASSEMBLING..................: .1600E+02     1.66 % 
 OTHERS (including I/O)......: .1935E+03    20.05 % 
 TOTAL.......................: .9652E+03   100.00 % 
  
                   ** MEMORY USAGE STATISTICS **
  
 TOTAL MEMORY USED .........................:       64 MB
 MAXIMUM MEMORY PER PROCESSOR...............:       64 MB
 MINIMUM MEMORY PER PROCESSOR...............:       64 MB
 AVERAGE MEMORY PER PROCESSOR...............:       64 MB

 ELAPSED TIME     =        264.57 s
                          0:04:24
  
     NORMAL TERMINATION      
     TOTAL NUMBER OF CYCLES  :  235200
./run.sh "engine_linuxa64_ompi -nt 4"  out/tensile_law2  966.02s user 38.39s system 378% cpu 4:25.29 total
```

### Mac Virtual Machine

Starter

```bash
 ** COMPUTE TIME INFORMATION **
  
 EXECUTION STARTED      :      2024/11/10  15:07:05
 EXECUTION COMPLETED    :      2024/11/10  15:07:06
  
 ELAPSED TIME...........=          0.53 s
                               00:00:00
```

Engine

```bash
                   ** CUMULATIVE CPU TIME SUMMARY **
  
 CONTACT SORTING.............: .0000E+00     0.00 % 
 CONTACT FORCES..............: .6999E-01     0.09 % 
 ELEMENT FORCES..............: .6344E+02    84.19 % 
 KINEMATIC COND..............: .1870E+01     2.48 % 
 INTEGRATION.................: .1610E+01     2.14 % 
 ASSEMBLING..................: .1220E+01     1.62 % 
 OTHERS (including I/O)......: .7139E+01     9.47 % 
 TOTAL.......................: .7535E+02   100.00 % 
  
                   ** MEMORY USAGE STATISTICS **
  
 TOTAL MEMORY USED .........................:       64 MB
 MAXIMUM MEMORY PER PROCESSOR...............:       64 MB
 MINIMUM MEMORY PER PROCESSOR...............:       64 MB
 AVERAGE MEMORY PER PROCESSOR...............:       64 MB
  
                   ** DISK USAGE STATISTICS **
  
 TOTAL DISK SPACE USED .....................:          5 MB
 ANIMATION/H3D/TH/OUTP SIZE ................:          3 MB
 RESTART FILE SIZE .........................:          1 MB
  
 ELAPSED TIME     =        112.13 s
                          0:01:52
  
     NORMAL TERMINATION      
     TOTAL NUMBER OF CYCLES  :  235200

real	1m52.991s

```

Engine (OMPI, NT 4)

```bash
                   ** CUMULATIVE CPU TIME SUMMARY **
  
 CONTACT SORTING.............: .0000E+00     0.00 % 
 CONTACT FORCES..............: .1500E+00     0.07 % 
 ELEMENT FORCES..............: .7699E+02    36.00 % 
 KINEMATIC COND..............: .3184E+02    14.89 % 
 INTEGRATION.................: .7681E+01     3.59 % 
 ASSEMBLING..................: .4901E+01     2.29 % 
 OTHERS (including I/O)......: .9231E+02    43.16 % 
 TOTAL.......................: .2139E+03   100.00 % 

                   ** MEMORY USAGE STATISTICS **
  
 TOTAL MEMORY USED .........................:       64 MB
 MAXIMUM MEMORY PER PROCESSOR...............:       64 MB
 MINIMUM MEMORY PER PROCESSOR...............:       64 MB
 AVERAGE MEMORY PER PROCESSOR...............:       64 MB
  
                   ** DISK USAGE STATISTICS **
  
 TOTAL DISK SPACE USED .....................:          5 MB
 ANIMATION/H3D/TH/OUTP SIZE ................:          3 MB
 RESTART FILE SIZE .........................:          1 MB
  
 ELAPSED TIME     =         70.77 s
                          0:01:10
  
     NORMAL TERMINATION      
     TOTAL NUMBER OF CYCLES  :  235200

real	1m11.620s

```

Engine (OMPI, np = 4)
```bash

```