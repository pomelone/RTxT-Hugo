<div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="static/logo-dark.svg">
        <source media="(prefers-color-scheme: light)" srcset="static/logo.svg">
        <img alt="RTxT" src="static/logo.svg" width="70" height="70" style="max-width: 100%;">
    </picture>
    <span><b>Rich Text Theme for Hugo</b></span>
</div>

## 特性

- Hugo 0.146+ 新模板系统（layouts 根按页面类型布局）
- 响应式双栏布局：左侧系列/分类导航，右侧目录 + 标签
- 导航栏一级菜单 + 二级折叠菜单（`details/summary`，支持图标）
- 文章列表卡片式预览、分页；排序 weight > lastmod > title
- 状态图标：草稿 / 未发布 / 已过期 / 置顶（weight 为负）
- 代码块：文件名、链接、行高亮、一键复制、折叠
- 引用块 callout：NOTE / TIP / IMPORTANT / WARNING / CAUTION（Hugo 原生 alert 语法）
- 数学公式（KaTeX）：长公式滚动、编号固定右侧
- 归档页：按年 / 月折叠分组
- 分类页：两列卡片；分类详情页左侧分类列表
- 面包屑、返回顶部、i18n（zh-cn / en）
- 文章卡片、标签、归档条目悬停放大动效
- Markdown 标题悬停显示锚点链接
- 404 页面：独立页面，绿色背景 + 自定义字体 + 3D 挤出效果

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

参数说明：

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
- `link`：徽章链接（可选）
- `icon`：`data/icons.toml` 中的图标名（可选）
- `color`：徽章颜色（可选）
- `border`：是否显示边框，默认 `true`（可选）

### 代码块

代码块可以添加文件名、链接、指定高亮行、是否折叠

```md
python {filename="test.py", link="/logo.svg", collapse=false, hl_lines=[2,8,"4-6"]}
或
python {filename="test.py" link="/logo.svg" collapse=false hl_lines=[2,8,"4-6"]}

a = "string a"
b = "string b"
c = "string c"
d = "string d"
e = "string e"
f = "string f"
g = "string g"
h = "string h"
i = "string i"
j = "string j"
k = "string k"
l = "string l"
```

参数说明：

- `filename`: 文件名，默认为代码语言（可选）
- `link`: 代码块链接（可选）
- `collapse`：是否折叠代码，默认 true（可选）
- `hl_lines` 指定高亮行（可选）

### 引用块

引用块首行以 `[!类型]` 开头即可渲染为带图标与标题的提示块，支持 5 种类型：`NOTE`、`TIP`、`IMPORTANT`、`WARNING`、`CAUTION`（大小写不敏感）：

```md
> [!NOTE]
> 这是备注内容。

> [!WARNING] 这是标题
> 这是警告内容。
```

普通引用块为 Note 样式，不显示标题。

### 面包屑

文章页顶部显示面包屑导航（所属目录 / 当前页），默认开启。

可在 **hugo.toml** 或页面 Front Matter 中关闭：

```toml
# hugo.toml
[params.features]
enable_breadcrumb = false
```

```toml
enable_breadcrumb = false
```

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

### 目录与标签（右侧栏）

在页面中是否显示目录和标签。默认为显示。

可以在 **hugo.toml** 或者页面 **Front Matter** 中配置，页面 **Front Matter** 优先级更高。

- 在 **hugo.toml** 中配置

    ```toml
    [params.features]
    enable_toc = true
    enable_tag = true
    enable_series = true
    enable_term = true
    ```

- 在页面 Front Matter 中配置

    ```toml
    enable_toc = true
    enable_tag = true
    enable_series = true
    ```

- 在 **hugo.toml** 中配置目录显示等级以及是否排序

    ```toml
    [markup.tableOfContents]
    startLevel = 1
    endLevel = 3
    ordered = false
    ```

### 菜单与二级菜单

在 **hugo.toml** 的 `[menu]` 中配置。子菜单使用 `parent` 指向父项的 `identifier`：

```toml
[menu]
    [[menu.main]]
        identifier = 'more'
        name = 'More'
        weight = 4

    [[menu.main]]
        identifier = 'archives'
        name = 'Archives'
        pageRef = '/archives'
        parent = 'more'
        weight = 42
```

- 菜单名称优先取 `i18n` 的 `menu.<identifier>` 翻译
- `params.icon` 指定 `data/icons.toml` 中的图标名
- 有子项的菜单渲染为可折叠下拉（点击展开 / 收起）

### 归档

创建 `content/archives/_index.md`，设置 `layout: archives`：

```toml
---
title: '归档'
layout: archives
---
```

归档页按 `[params.archives]` 配置的 section（默认 `blog`）聚合文章，按最后修改时间年 / 月折叠分组：

```toml
[params.archives]
sections = ['blog']
```

### 分类页（taxonomy）

站点声明 taxonomy（如 series / categories / tags）后，分类首页（如 `/series/`）以两列卡片显示全部分类；分页数量可在 **hugo.toml** 配置：

```toml
[params.taxonomy]
pagerSize = 50
```

分类详情页（如 `/series/xxx/`）左侧栏列出同类全部分类（当前项高亮），开关 `enable_term`。

### 系列（series）

在文章 Front Matter 中声明所属系列：

```toml
series: [blog, markdown]
```

属于系列的文章，左侧栏显示本页关联系列导航：系列名可折叠，展开后列出该系列全部文章（按 weight 排序），当前文章高亮。开关 `enable_series`（页面 Front Matter 优先于站点配置）。

### 置顶与状态

- 置顶：`weight` 设为负值（如 `-1`），文章排在最前并显示图钉图标
- 状态图标：
    - `draft: true` → 草稿
    - `date` 在未来 → 未发布
    - `expiryDate` 已过期 → 已过期
- 可在 `_index.md` 中用 `cascade.weight` 为整节设置默认权重：

```toml
cascade:
    weight: 99
```

### 404 页面

主题内置独立 404 页面（`layouts/404.html`），不依赖站点整体布局（无导航栏/页脚），绿色背景 + 自定义字体 + JS 3D 文字挤出效果。

- 字体：将 "Facon" 字体文件放入 `static/fonts/Facon/`（`Facon.woff2` / `Facon.woff` / `Facon.ttf`），404 页面通过 `@font-face` 加载
- 配色与挤出参数在 `404.html` 内联 `<style>` / `<script>` 中直接修改（背景色、字号、挤出深度/角度/颜色）

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
