---
layout: astro
title: Astrophotography
style: astro
images:
  - title: Van Horn
    url: https://flic.kr/p/2oLi1or
    embed_tag: src="https://live.staticflickr.com/65535/53009785469_797ae72eb8_w.jpg" width="301" height="400" alt="Van Horn"
    description: Highway 45, Van Horn, TX. Google Pixel 7 astrophotography mode
  - title: Moon
    url: https://flic.kr/p/2oLj8M3
    embed_tag: src="https://live.staticflickr.com/65535/53010005440_10c9bbd7b4_w.jpg" width="400" height="300" alt="Moon"
    description: Moon (eyepiece projection through a Celestron C8 telescope)
  - title: Grand Canyon
    url: https://flic.kr/p/2oLdVRg
    embed_tag: src="https://live.staticflickr.com/65535/53008989757_87e7fe31b1.jpg" width="500" height="266" alt="Grand Canyon"
    description: Grand Canyon visitor center. Canon Rebel T3i
  - title: Grand Canyon
    url: https://flic.kr/p/2oLdVR6
    embed_tag: src="https://live.staticflickr.com/65535/53008989747_f20427f67f.jpg" width="500" height="286" alt="Grand Canyon"
    description: Grand Canyon visitor center. Canon Rebel T3i
  - title: Marfa Lights
    url: https://flic.kr/p/2oLhNM5
    embed_tag: src="https://live.staticflickr.com/65535/53009746414_bcc838912a.jpg" width="500" height="333" alt="Marfa Lights"
    description: Sky over TX 45, Marfa Lights viewing area. Fujifilm X100V
  - title: West Texas
    url: https://flic.kr/p/2oLdVVK
    embed_tag: src="https://live.staticflickr.com/65535/53008990017_a91584fcc7.jpg" width="500" height="328" alt="West Texas Desert"
    description: West Texas desert. Fujifilm X100V
---
Join me as I escape into nature and practice astrophotography!

<div class="image-gallery">
  {% for image in page.images %}
    <div class="image-box">
    <a href="{{ image.url }}" target="_blank">
      <img {{ image.embed_tag }} class="img-item" />
     </a>
     <p class="text-overlay">{{ image.description }}</p>
    </div>
    
  {% endfor %}
</div>