<h1 align="center">vitepress-theme-mist</h1>

<div align="center">

[Github](https://github.com/docs-site/vitepress-theme-mist) ｜ [Preview](https://docs-site.github.io/site-vitepress/)

✨ 在自己什么都不会的情况下开始搞的一个 VitePress 主题的测试站点。

</div>

<p align="center">
  <a title="Github release" target="_blank" href="https://github.com/docs-site/vitepress-theme-mist/releases">
    <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/docs-site/vitepress-theme-mist?logo=github">
  </a>
  <a title="Npm Version" target="_blank" href="https://www.npmjs.com/package/@docs-site/vitepress-theme-mist">
    <img src="https://img.shields.io/npm/v/@docs-site/vitepress-theme-mist?logo=npm&color=%09%23bf00ff" alt="https://img.shields.io/npm/v/@docs-site/vitepress-theme-mist?color=%09%23bf00ff">
  </a>
  <a title="vitepress" target="_blank" href="https://github.com/vuejs/vitepress/releases/tag/v1.6.4">
    <img src="https://badgen.net/static/vitepress/1.6.4/cyan" alt="vitepress">
  </a>
  <img src="https://img.shields.io/badge/v22.16.x-x?logo=node.js&label=node" alt="node version">
  <img src="https://img.shields.io/badge/v10.14.0-x?logo=node.js&label=PNPM" alt="pnpm version">
  <a title="MIT License" target="_blank" href="https://github.com/docs-site/vitepress-theme-mist/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="MIT License">
  </a>
</p>


## 一、 流水线说明

本仓库同时使用 CNB 与 GitHub Actions 两套流水线，按“仓库角色”分工，避免两条流水线重复写入同一个 `gh-pages` 分支。

### 1. 配置文件与职责

根目录的 `.cnb.yml` 是 CNB 的入口，只保留云原生开发环境配置，并通过 `include` 合并两份子配置（CNB 不会自动加载 `.cnb/workflows/` 目录，必须显式引用）：

- `.cnb/workflows/sync-repo.yml`：把仓库代码同步到 GitHub、Gitee 镜像仓库，仅模板仓库本身执行

- `.cnb/workflows/deploy-gh-pages.yml`：在 CNB 构建站点，把 `src/.vitepress/dist` 推送到 GitHub 的 `gh-pages` 分支，仅派生仓库执行

- `.github/workflows/deploy-docs.yml`：在 GitHub Actions 构建站点并推送 `gh-pages`，实际只对模板仓库生效

### 2. 仓库分工规则

CNB 侧用内置变量 `CNB_REPO_SLUG_LOWERCASE`（格式为“群组 / 仓库”）判断当前仓库角色：

- 值为 `sumu.m/vitepress-theme-mist-docs`（模板仓库本身）：`deploy-gh-pages.yml` 的全部 stage 跳过，构建部署交给 GitHub Actions

- 其他值（`tdoc mist init` 生成的派生仓库）：源码只存在于 CNB，由 `deploy-gh-pages.yml` 构建并推送产物

GitHub 侧的 `deploy-docs.yml` 没有加仓库守卫，但派生仓库的源码不会同步到 GitHub，该工作流在 GitHub 上并不存在，因此不会与 CNB 重复推送同一个 `gh-pages`。

### 3. 触发条件

| 流水线 | 平台 | 触发条件 | 执行范围 |
| ------ | ---- | -------- | -------- |
| `sync-repo.yml` | CNB | `main` 分支 push | 仅模板仓库 |
| `deploy-gh-pages.yml` | CNB | `main` 分支 push，且提交信息含 `[deploy]` | 仅派生仓库 |
| `deploy-docs.yml` | GitHub Actions | `main` 分支 push 且提交信息含 `[deploy]` 或 `[update]`；收到 `repository_dispatch`；页面手动触发 | 仅模板仓库 |

### 4. 部署链路

#### 4.1 模板仓库

（1）本地提交带上 `[deploy]`，推送到 CNB 的 `main` 分支。

（2）`sync-repo.yml` 通过 git-sync 插件把代码同步到 GitHub（未指定 `branch`，默认同步所有分支，提交信息原样保留）。

（3）GitHub Actions 的“部署文档”工作流被 `main` 分支 push 触发，执行 `npm ci` 与 `npm run docs:build`。

（4）产物 `src/.vitepress/dist` 由 `JamesIves/github-pages-deploy-action` 推送到 `gh-pages` 分支，GitHub Pages 随即重新渲染。

#### 4.2 派生仓库

（1）本地提交带上 `[deploy]`，推送到 CNB 私有源码仓库。

（2）`deploy-gh-pages.yml` 在 `node:22` 容器中安装依赖（npmmirror 源）并执行 `npm run docs:build`。

（3）在产物目录执行 `git init`，随后强推 `master:gh-pages`，GitHub Pages 随即重新渲染。

### 5. 注意事项

- 提交信息必须包含 `[deploy]`（模板仓库也接受 `[update]`）才会真正部署，普通提交只会让流水线快速跳过

- `deploy-gh-pages.yml` 中的目标仓库地址当前写死为 `docs-site/vitepress-theme-mist-docs`，派生仓库若要推送到自己的 GitHub 仓库，需要改写该行

- 只有 GitHub Actions 那条链路会写入 `src/.vitepress/dist/.nojekyll`

- GitHub Pages 的发布源是 `gh-pages` 分支，推送分支即完成发布，无需把发布源改为 GitHub Actions


## 二、 小徽章

>- [badgen.net](https://badgen.net/)
>- [Shields.io | Shields.io](https://shields.io/)
>- [For the Badge](https://forthebadge.com/)


## 三、 License

[MIT](https://mit-license.org/) License © 2025 [docs-site](https://github.com/docs-site/)

---
*本文档由 markdowncli 技能辅助生成*
