---
layout: default
style: astro
images:
  - title: Van Horn
    url: 
    embed_tag: 
    description: Highway 45, Van Horn, TX. Google Pixel 7 astrophotography mode
  - title: Moon
    url: 
    embed_tag: 
    description: Moon (eyepiece projection through a Celestron C8 telescope)
  - title: Grand Canyon
    url: https://flic.kr/p/2oLdVRg
    embed_tag: src="https://live.staticflickr.com/65535/53008989757_87e7fe31b1.jpg" width="500" height="266" alt="Grand Canyon"
    description: Grand Canyon visitor center. Canon Rebel T3i
  - title: Grand Canyon
    url: https://flic.kr/p/2oLdVR6
    embed_tag: src="https://live.staticflickr.com/65535/53008989747_f20427f67f.jpg" width="500" height="286" alt="Grand Canyon"
    description: Grand Canyon visitor center. Canon Rebel T3i
---

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