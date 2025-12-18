import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Homepage | Eric Peters",
  titleTemplate: 'EPeters.io',
  description: "Personal portfolio of Eric Peters",
  head: [
    ['link', { rel: 'icon', href: '/assets/favicon_v1.svg' }],
    ['meta', {name: 'robots', content: 'noarchive'}],
    ['script', {defer: '', src: 'https://analytics.admin.epeters.io/script.js', 'data-website-id': 'abd679ce-6753-4391-b368-ca5c09f21ec1' }]
  ],
  markdown: {
    math: true
  },
  vite: {

  },
  vue: {

  },
  themeConfig: {
    logo: "/assets/favicon_v1.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About Me', link: '/about'},
      { text: 'Articles', link: '/posts/' },
      { text: 'Projects', link: '/projects' },
    ],
    footer:{
      message: '',
      copyright: 'Copyright &copy; 2022-2025 Eric Peters'
    },
    socialLinks: [
      { icon: 'buymeacoffee', link: 'https://www.buymeacoffee.com/epetersio'},
      { icon: 'github', link: 'https://github.com/edp8489/' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/epetersio/' }
    ]
  }
})
