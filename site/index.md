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
feature_heading: "Featured Projects"
features:
  - title: Stressed
    details: "Calculate principal stresses, Tresca and von Mises failure theories, and plot Mohr's Circle for a 3D stress state."
    link: https://www.epeters.io/stressed
    linkText: visit
  - title: Galvanic Compatibility
    details: "Visualize the potential for galvanic corrosion between pairs of dissimilar metals and recommended surface treatments for each. References MIL-STD-889-C."
    link: https://www.epeters.io/galvanic_compatibility/
    linkText: visit
  - title: Countersunk Joint Data Visualizer
    details: "Visualize strength data and associated nondim. knockdown factors for countersunk fasteners of varying materials and head styles. References MIL-HDBK-5J / MMPDS-01 data."
    link: https://www.epeters.io/csk_knockdown_tool
    linkText: visit
---

<RecentPosts :count="4" />
