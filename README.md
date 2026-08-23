<div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="static/logo-dark.svg">
        <source media="(prefers-color-scheme: light)" srcset="static/logo.svg">
        <img alt="RTxT" src="static/logo.svg" width="70" height="70" style="max-width: 100%;">
    </picture>
    <span><b>Rich Text Theme for Hugo</b></span>
</div>

## 配置

### 自定义 css

创建 `/assets/css/custom.css`，自定义页面样式。

### 自定义图标

- favicon：将 `favicon.[svg|ico|png]` 文件放入 `/static` 目录
- logo：将 `logo.svg` 文件放入 `/static` 目录

### 短代码

#### icon

在正文中插入 `data/icons.toml` 中定义的图标：

```md
{{< icon "github" >}}
{{< icon name="tag" size="1.5em" >}}
```

- `name`: 图标名（必填）
- `size`: 图标尺寸（可选）

#### badge

在正文中插入徽章：

```md
{{< badge "RTxT" >}}
{{< badge content="GitHub" icon="github" color="#0aa344" border=false link="https://github.com" >}}
```

参数说明：

- `content`：徽章文字（必填）
- `link`：徽章链接
- `icon`：`data/icons.toml` 中的图标名（可选）
- `color`：徽章颜色（可选）
- `border`：是否显示边框，默认 `true`（可选）

### 引用块

引用块首行以 `[!类型]` 开头即可渲染为带图标与标题的提示块，支持 5 种类型：`NOTE`、`TIP`、`IMPORTANT`、`WARNING`、`CAUTION`（大小写不敏感）：

```md
> [!NOTE]
> 这是备注内容。

> [!WARNING] 这是标题
> 这是警告内容。
```

普通引用块为 Note 样式，不显示标题。

### 数学公式（KaTeX）

支持的分隔符：行内 `$...$`、`\(...\)`；块级 `$$...$$`、`\[...\]`。KaTeX 资源默认从 jsDelivr CDN 加载。

为避免公式中的 `_`、`\`、`&` 等字符被 Markdown 解析，需要在站点 **hugo.toml** 中启用 Goldmark passthrough 扩展：

```toml
[markup.goldmark.extensions.passthrough]
    enable = true
    [markup.goldmark.extensions.passthrough.delimiters]
        block = [['\[', '\]'], ['$$', '$$']]
        inline = [['\(', '\)'], ['$', '$']]
```

可在 **hugo.toml** 中自定义 KaTeX 版本或 CDN 地址：

```toml
[params.math]
    enable = true
    engine = 'katex'
    katex.cdn = 'https://cdn.jsdelivr.net/npm/katex'
    katex.version = '0.18.4'
```

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

    ```toml
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

### i18n

主题内置 `i18n/en.toml`、`i18n/zh-cn.toml` 语言文件，自动跟随站点的 `defaultContentLanguage` 显示对应语言（目录标题、分页、回顶、状态图标提示等）。

如需其他语言，在站点根目录 `i18n/` 下添加同结构的语言文件即可（键名相同），会覆盖或补充主题翻译。
