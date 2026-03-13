---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  #name: "EPeters.io"
  name: "Eric Peters"
  #text: " "
  #text: "Structural Engineering Portfolio"
  text: "Aerospace Structures Engineer"
  #tagline: "Interactive applications and technical writing for aerospace structural analysis"
  tagline: "Technical insights and user-friendly apps for higher-fidelity analysis in less time"
  #tagline: "Portfolio of interactive tools and technical writing"
  image:
    src: "/assets/favicon_v1.svg"
    alt: "site logo"
  actions:
    - text: "About Me"
      link: "/about"
      theme: brand
    - text: Blog
      link: "/posts/"
      theme: alt
feature_heading: "Featured Projects"
features:
  - title: Enginuity
    details: "Unified platform for all of my structural analysis tools."
    link: https://enginuity.epeters.io
    linkText: visit
  - title: Stressed
    details: "Calculate principal stresses, Tresca and von Mises failure theories, and plot Mohr's Circle for a 3D stress state."
    link: https://enginuity.epeters.io/stressed
    linkText: visit
  - title: Galvanic Compatibility
    details: "Visualize the potential for galvanic corrosion between pairs of dissimilar metals and recommended surface treatments for each. References MIL-STD-889-C."
    link: https://enginuity.epeters.io/galvanic-couples
    linkText: visit
---

<RecentPosts :count="3" />
