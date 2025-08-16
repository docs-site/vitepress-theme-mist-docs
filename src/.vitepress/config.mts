import { defineConfig } from 'vitepress'
import { getSidebarData, getNavData } from '@docs-site/vitepress-nav-sidebar'
import { defineMistConfig } from "vitepress-theme-mist/config"; 

const myThemeConfig = defineMistConfig({
  useTheme: true,
  themeName: 'vitepress-theme-mist',
  clickEffect: {
    enabled: true,
  }
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: myThemeConfig,
  title: "Mist",
  description: "mist docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      ...getNavData({ dirName: 'sdoc', maxLevel: 2, debugPrint: false }),
      { text: '功能页',
        items: [
          { text: '导航页',  link: '/@pages/Navigation' }
        ]
      },
    ],
    sidebar: getSidebarData({ 
      dirName: 'sdoc', 
      maxLevel: 6,
      debugPrint: false 
    }),
    logo: '/favicon.svg', // 导航栏标题的logo
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    outline: {
      label: '页面导航',
      level: [2, 6],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/docs-site/vitepress-theme-mist.git' }
    ]
  }
})
