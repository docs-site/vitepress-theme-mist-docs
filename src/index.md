---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
# 首页打字机（会与主题配置做浅合并，覆盖对应字段）
homeTypewriter:
  texts:
    - 莫道桑榆晚，为霞尚满天
    - 学而不思则罔，思而不学则殆
    - 温故而知新
  inputTime: 120 # 打字间隔时间(毫秒)
  outputTime: 60 # 删字间隔时间(毫秒)
  nextTime: 1500 # 打完/删完一条文案后的停留时间(毫秒)
  shuffle: false # 是否随机切换下一条文案

hero:
  name: ""
  text: "Mist Docs"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: 目录
      link: /sdoc/126b07e425cf34050557ccbe
    - theme: alt
      text: 导航
      link: /Navigation
    - theme: alt
      text: 归档
      link: /archives
  image:
    src: /images/blog.svg
    alt: VitePress

features:
  - icon: 📖
    title: site-vitepress
    details: 苏木
    link: https://docs-site.github.io/site-vitepress/
  - icon: 📚
    title: sumumm.github.io
    details: 苏木的学习笔记
    link: https://sumumm.github.io/
  - icon: 🎐
    title: vscode docs
    details: vscode开发文档
    link: https://docs-site.github.io/site-docsify/#/
  - icon: 📋
    title: VitePress
    details: 由 Vite 和 Vue 驱动的静态站点生成器
    link: https://vitejs.cn/vitepress/
---

