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

### Table of contents

在页面中是否显示目录和标签。默认为显示。

可以在 **hugo.toml** 或者页面 **Front Matter** 中配置，页面 **Front Matter** 优先级更高。

- 在 **hugo.toml** 中配置

    ```toml
    [params.toc]
    display_toc = true
    display_tag = true
    ```

- 在页面 Front Matter 中配置

    ```yaml
    [params.toc]
    display_toc = true
    display_tag = true
    ```

- 在 **hugo.toml** 中配置目录显示等级以及是否排序

    ```toml
    [markup.tableOfContents]
    startLevel = 1
    endLevel = 3
    ordered = false
    ```

### footer

- 在 **hugo.toml** 中配置，支持 HTML

    ```toml
    [params.footer]
    enable = true
    copyright = '© 2026 RTxT. All rights reserved.'
    poweredBy = '<a href="/">PowerBy RTxT</>'
    ```

- 创建 `layouts/_partials/custom/footer.html`，自定义 footer 内容
