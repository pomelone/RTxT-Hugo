<div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
    <picture>
        <img alt="RTxT" src="static/logo.svg" width="70" height="70" style="max-width: 100%;">
    </picture>
    <span><b>Rich Text Theme for Hugo</b></span>
</div>

## Features

- Built on the Hugo 0.146+ template system
- Responsive two-sidebar layout: series / taxonomy navigation on the left, table of contents and tags on the right
- Navbar with primary items, collapsible submenus (optional icons), and a light/dark theme switch
- Card-style post list with pagination; sorting by `weight` > `lastmod` > `title`
- Status badges: draft / scheduled / expired / pinned (negative `weight`)
- Code blocks: filename, link, highlighted lines, one-click copy, collapse
- Callouts: `NOTE` / `TIP` / `IMPORTANT` / `WARNING` / `CAUTION` via Hugo's native blockquote alerts
- Math (KaTeX)
- Archives page: collapsible year / month groups
- Taxonomy pages: two-column term cards; term pages with a term list in the left sidebar
- Breadcrumbs, back-to-top button, i18n (zh-cn / en)
- Heading anchor links shown on hover
- Standalone 404 page

## Getting Started

Add the theme to your site:

```toml
theme = ['RTxT-Hugo']
```

## Configuration

All site options live in **hugo.toml**.

```toml
[params]
    description = 'Rich Text Theme for Hugo'
    dateFormat = '2006-01-02 15:04'
    summaryLength = 50

    [params.footer]
        enable = true
        copyright = '© 2026 RTxT. All rights reserved.'
        poweredBy = '<a href="/">PowerBy RTxT</a>'

    [params.archives]
        sections = ['blog']

    [params.taxonomy]
        pagerSize = 50

    [params.features]
        enable_toc = true
        enable_tag = true
        enable_series = true
        enable_term = true
        enable_breadcrumb = true
        enable_theme_switch = true

    [params.math]
        enable = true
        engine = 'katex'
        katex.cdn = 'https://cdn.jsdelivr.net/npm/katex'
        katex.version = '0.18.4'
```

### Menu and Submenus

Configure menus in **hugo.toml**. Use `parent` to attach an item to another item's `identifier`:

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

- Menu labels prefer the `menu.<identifier>` translation from the i18n files
- `params.icon` sets an icon name from `data/icons.toml`
- Items with children render as collapsible dropdowns

### Table of Contents

```toml
[markup.tableOfContents]
    startLevel = 1
    endLevel = 3
    ordered = false
```

### Theme Switch

A light/dark toggle sits at the end of the navbar (`enable_theme_switch`).

- The choice is persisted in `localStorage` (`rtxt-theme`), so it survives reloads
- Without a saved choice, the theme follows the system `prefers-color-scheme`

## Front Matter

### Feature toggles

Each toggle can be set globally under `[params.features]` or per page in front matter (page value wins).

```toml
enable_toc = true          # table of contents in the right sidebar
enable_tag = true          # tags in the right sidebar
enable_series = true       # series navigation in the left sidebar
enable_term = true         # term list in the left sidebar (term pages)
enable_breadcrumb = true   # breadcrumb at the top of a page
enable_theme_switch = true # light/dark theme switch in the navbar
```

### Pinning and Status

- Pinning: set a negative `weight` (e.g. `-1`) — the post sorts first and shows a pin icon
- Status badges:
    - `draft` → draft
    - `date` in the future → scheduled
    - `expiryDate` in the past → expired
- Set a default weight for a whole section with `cascade.weight` in its `_index.md`:

```yaml
cascade:
    weight: 99
```

### Series

Declare the series a post belongs to in front matter:

```yaml
series: [blog, markdown]
```

Posts that belong to series show a collapsible series navigation in the left sidebar: each associated series lists all of its posts with the current post highlighted.

## Shortcodes

### icon

Insert an icon defined in `data/icons.toml`:

```md
{{< icon "github" >}}
{{< icon name="tag" size="1.5em" >}}
```

Parameters:

- `name`: icon name (required)
- `size`: icon size (optional)

### badge

Insert a badge:

```md
{{< badge "RTxT" >}}
{{< badge content="GitHub" icon="github" color="#0aa344" border=false link="https://github.com" >}}
```

Parameters:

- `content`: badge text (required)
- `link`: badge link (optional)
- `icon`: icon name from `data/icons.toml` (optional)
- `color`: badge color (optional)
- `border`: show a border, default `true` (optional)

### tabs

Group content into switchable tabs:

```md
{{< tabs >}}
{{< tab name="Markdown" selected=true >}}
**Bold**, *italic*, lists, code blocks and other shortcodes are fully supported.
{{< /tab >}}
{{< tab name="GitHub" icon="github" >}}
Content of the second tab.
{{< /tab >}}
{{< /tabs >}}
```

Parameters:

- `name`: tab label (required)
- `selected`: set `true` to select this tab by default; otherwise the first tab is selected (optional)
- `icon`: icon name from `data/icons.toml` (optional)

Tab content is rendered as Markdown.

## Markdown Extras

### Code Blocks

Code blocks support a filename, link, highlighted lines, and collapsing:

```md
python {filename="test.py", link="/logo.svg", collapse=false, hl_lines=[2,8,"4-6"]}
# or
python {filename="test.py" link="/logo.svg" collapse=false hl_lines=[2,8,"4-6"]}

a = "string a"
```

Parameters:

- `filename`: filename, defaults to the language (optional)
- `link`: link for the filename (optional)
- `collapse`: collapse the code, default `true` (optional)
- `hl_lines`: highlighted lines (optional)

### Callouts

Start a blockquote with `[!TYPE]` to render a callout with an icon and title. Supported types: `NOTE`, `TIP`, `IMPORTANT`, `WARNING`, `CAUTION` (case-insensitive):

```md
> [!NOTE]
> This is a note.

> [!WARNING] A custom title
> This is a warning.
```

Plain blockquotes render in the note style without a title.

### Math (KaTeX)

Delimiters: inline `$...$`, `\(...\)`; block `$$...$$`, `\[...\]`. KaTeX assets load from the jsDelivr CDN by default.

To keep `_`, `\`, `&` etc. from being parsed as Markdown, enable the Goldmark passthrough extension in **hugo.toml**:

```toml
[markup.goldmark.extensions.passthrough]
    enable = true
    [markup.goldmark.extensions.passthrough.delimiters]
        block = [['\[', '\]'], ['$$', '$$']]
        inline = [['\(', '\)'], ['$', '$']]
```

Customize the KaTeX version or CDN in **hugo.toml**:

```toml
[params.math]
    enable = true
    engine = 'katex'
    katex.cdn = 'https://cdn.jsdelivr.net/npm/katex'
    katex.version = '0.18.4'
```

## Pages

### Archives

Create `content/archives/_index.md` with `layout: archives`:

```yaml
---
title: 'Archives'
layout: archives
---
```

The archive page aggregates posts from the sections configured in `[params.archives]` (default `blog`), grouped by last-modified year / month in collapsible groups.

### Taxonomies

Once taxonomies are declared (e.g. `series`, `categories`, `tags`), the taxonomy home page (e.g. `/series/`) renders all terms as a two-column card grid. The page size is configurable:

```toml
[params.taxonomy]
pagerSize = 50
```

Term pages (e.g. `/series/xxx/`) list all terms of the same taxonomy in the left sidebar with the current term highlighted (`enable_term`).

### 404 Page

The theme ships a standalone 404 page (`layouts/404.html`) that does not use the site layout (no navbar/footer)

- Font: place the "Facon" font files in `static/fonts/Facon/` (`Facon.woff2` / `Facon.woff` / `Facon.ttf`); the page loads them via `@font-face`

## Customization

### Custom CSS

Create `/assets/css/custom.css` to override or extend the theme styles.

### Favicon and Logo

- Favicon: place `favicon.[svg|ico|png]` in `/static`
- Logo: place `logo.svg` in `/static`

### Icons

Icons used by shortcodes and the menu come from `data/icons.toml`; SVG sprite symbols live in `assets/ui/` (`animated-ui.svg` inlined, `static-ui.svg` referenced externally).

### Footer

- Configure in **hugo.toml** (HTML is allowed):

    ```toml
    [params.footer]
    enable = true
    copyright = '© 2026 RTxT. All rights reserved.'
    poweredBy = '<a href="/">PowerBy RTxT</a>'
    ```

- Create `layouts/_partials/custom/footer.html` to fully customize the footer

## i18n

To add a language, create a file with the same structure under the site's `i18n/` directory (same key names) — it overrides or extends the theme translations.
