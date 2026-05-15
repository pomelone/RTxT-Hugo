<div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="static/logo-dark.svg">
        <source media="(prefers-color-scheme: light)" srcset="static/logo.svg">
        <img alt="RTxT" src="static/logo.svg" width="70" height="70" style="max-width: 100%;">
    </picture>
    <span><b>Rich Text Theme for Hugo</b></span>
</div>

## 配置

### css

创建 `/assets/css/custom.css`，自定义页面样式。

### head

- favicon：将 `favicon.[svg|ico|png]` 文件放入 `/static` 目录
- logo：将 `logo.svg` 文件放入 `/static` 目录

### footer

- 配置 **hugo.toml**，支持 HTML

    ```toml
    [params.footer]
    enable = true
    copyright = '© 2026 RTxT. All rights reserved.'
    poweredBy = '<a href="/">PowerBy RTxT</>'
    ```

- 创建 `layouts/_partials/custom/footer.html`，自定义 footer 内容
