// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'

import Mist from "vitepress-theme-mist";

import MistLayoutProvider from "./components/MistLayoutProvider.vue";

import './style.css'

import "vitepress-theme-mist/theme-chalk/index.css"

export default {
  extends: Mist,
  Layout: MistLayoutProvider,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
