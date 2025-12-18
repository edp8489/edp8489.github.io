// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import AboutHeader from './components/AboutHeader.vue'
import BlogPosts from './components/BlogPosts.vue'
import RecentPosts from './components/RecentPosts.vue'
import LayoutOverrides from './layouts/LayoutOverrides.vue'
import PlotlyTimoshenkoBCB from '../../widgets/PlotlyTimoshenkoBCB.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: LayoutOverrides,
  enhanceApp({ app, router, siteData }) {
    app.component('AboutHeader', AboutHeader),
    app.component('BlogPosts', BlogPosts),
    app.component('RecentPosts',RecentPosts),
    app.component('PlotlyTimoshenkoBCB',PlotlyTimoshenkoBCB)
  }
} satisfies Theme
