---
layout: post
title: "Astrophotography from a Light Polluted City Center"
date: 2024-03-31
---

Astrophotography is hard. Especially when you live in the middle of a city and are too lazy to drive somewhere dark. And are working with a 12 year old hand-me-down camera with mediocre low-light performance and high sensor noise. Regardless, I've been challenging myself to learn as much about the process and eke out the best performance from what I have before throwing money at the problem.

After about ten sessions of essentially worthless pictures and hours of YouTube videos, it's time to put some math into the process and compare the results.

## Sensor Characteristics
[Photons to Photos](https://www.photonstophotos.net) contains an amazing database of sensor properties for camera models from every manufacturer. 

The camera I'm currently using is a 2013 Canon 100D (EOS Rebel SL1) with the standard 18-55mm f/3.5-5.6 kit lens. Most of my landscape shots are at 24mm f/4. 

Comparing dynamic range across the different ISO settings, it's clear that performance starts dropping off after ISO 200. However, sensor read noise is also at the higher end. 

### Trading Sensor Noise vs Gain vs Dynamic Range


### Maximum Exposure Time
The "500 rule" can be used to estimate the maximum exposure time for a specific focal length before the Earth's rotation results in star trails in the image.

$$ t_{max} = \frac{500}{(focal length)\dot(crop factor)} $$

For my typical 24mm focal length and the 1.6x APS-C crop factor, the maximum exposure time is 13 seconds.

### Minimum Sub-Exposure Time vs Intensity of Light Pollution
$$ t_{min} = C \dot \frac{R^2}{P} $$

C represents the amount of extra noise introduced into a stacked photo compares to a "perfect" single exposure. According to [this video](), 10 is a reasonable starting point, which represents 5% additional noise.

P represents the ... light pollution ... and is a function of sensor efficiency, pixel size, and aperture. Time for math!

[Sky background electron rate calculator](https://tools.sharpcap.co.uk)

Downtown Seattle sky brightness: SQM = 17.6 mag/arcsec^2  
Pixel size (pitch): 4.3 um  
Quantum Efficiency: 43%

f/4 --> P = 15.13 e-/px/s  
f/4.5 --> P = 11.96 e-/px/s  
f/5 --> P = 9.68 e-/px/s  
f/5.6 --> P = 7.72 e-/px/s

Running the same comparison with a more modern camera (24 megapixel APS-C)
Pixel pitch = 3.7 um
Quantum efficiency: 55%

f/4 --> P = 14.33 e-/px/s  
f/4.5 --> P = 11.32 e-/px/s  
f/5 --> P = 9.17 e-/px/s  
f/5.6 --> P = 7.31 e-/px/s

## Comparison Tables
ISO: 200, 400, 800
Focal length: 24mm
Aperture: f/4, f/5.6

