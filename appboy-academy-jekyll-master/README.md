# Appboy Academy

Appboy Academy is built with [Jekyll][1], a static site generator, and is publicly hosted at <https://academy.appboy.com/>.

# Table of Contents
- [Running Appboy Academy Locally][61]
- [Directory Structure and Jekyll Overview](#directory-structure-and-jekyll-overview)
  - [Markdown][31]
  - [Collections][32]
  - [Pages][33]
  - [YAML Front Matter and Liquid Templating][25]
  - [Section Pages][22]
  - [Layouts][15]
  - [Includes][13]
- [Sidebar Navigation][19]
- [Naming Conventions][30]
  - [Naming Markdown Articles][27]
  - [Naming Collections and Pages][28]
- [Style Guide][18]
  - [Headers][29]
  - [Manually Setting Header IDs][44]
  - [Text Styling][66]
  - [Lists][34]
  - [Code Blocks and Syntax Highlighting][35]
    - [Liquid][36]
  - [Tables][37]
- [Editing an Existing Article][38]
- [Creating a New Article][39]
- [Creating a New Section Page][40]
- [Editing Footer Links][69]
- [FAQs][48]
  - [Why are multiple parts of the sidebar navigation expanding when I scroll?][45]
  - [Jekyll is throwing an "Unknown tag" error or Liquid exception.][46]
  - [Jekyll is throwing a "No such file or directory" error.][47]
  - [My changes aren't showing up.][50]
  - [I added a new article, but it isn't appearing in the sidebar.][51]
  - [Why are random pieces of content appearing in the sidebar navigation?][52]
  - [My articles are rendering strangely, or the content looks broken.][53]
  - [Why am I getting weird Jekyll errors?][49]

## Running Appboy Academy Locally
1. Clone the Appboy Academy repository.
2. If necessary, install Ruby 2.2.2 or higher via [RVM][72] or [rbenv][73].
3. Navigate to the root `appboy-academy` directory.
4. Install [bundler][71] via `gem install bundler`.
5. Run `bundle install` in the command line.
6. Run `jekyll serve` in the command line, or `jekyll serve watch` to see your changes automatically regenerated.
7. Open `http://localhost:4000/` in your browser, and voila!

## Directory Structure and Jekyll Overview

```
appboy-academy/
├── _config.yml
├── _collections/
│   ├── Getting_Started
│   │   ├── 00_Creating_a_Segment.md
│   │   ├── 01_Creating_a_Push_Message.md
│   │   └── ...
│   ├── User_Targeting
│   │   ├── 00_Segmentation_Filters.md
│   │   ├── 01_Segment_Funnels.md
│   │   └── ...
│   └── ...
├── _includes/
│   ├── head.html
│   ├── header.html
│   └── nav.html
├── _layouts/
│   ├── default.html
│   └── section.html
├── _pages/
│   ├── Getting_Started
│   │   └── index.md
│   ├── User_Targeting
│   │   └── index.md
│   └── ...
├── _plugins/
│   ├── jekyll-asset-pipeline.rb
│   └── subcollections.rb
└── _assets/
    ├── css
    ├── img
    └── js
```

### Markdown
Appboy Academy is written in [Markdown][4] syntax as `.md` files housed within the `/_collections/` directory. Jekyll uses [kramdown][5] to parse Markdown files from plain text into HTML. [Configuration for Markdown parsers][20] can be set in `_config.yml`.

### Collections

Academy articles are organized into section folders (i.e., `/_collections/Getting_Started/`), and each section folder is defined as a [Jekyll collection][21]. Collections can be thought of as groupings of Jekyll posts that can be given their own unique properties.

Each collection holds relevant Academy articles (i.e., `_collections/Getting_Started/00_Creating_a_Segment.md`).

### Pages

The `/_pages/` directory holds individual, rendered section pages, each of which pull articles as page content from their respective collection. For example, the Getting Started page at <https://academy.appboy.com/Getting_Started/> is housed at `/_pages/Getting_Started/index.md`. Meanwhile, the articles on that page are pulled from the Markdown files in the "Getting_Started" collection, housed within `/_collections/Getting_Started/`.

### YAML Front Matter and Liquid Templating

To be recognized and processed by Jekyll, a file requires [YAML Front Matter][6]. Front matter must be the first thing in the file and must take the form of valid [YAML][7] set between triple-dashed lines. Here is an example of the front matter in `_collections/Getting_Started/00_Creating_a_Segment.md`:

```
---
title: Creating a Segment
---
```

Front matter can be empty as well, if you want Jekyll to recognize the file but don't care to actually set any variables:

```
---
---
```

Within a file's front matter, you can set [predefined variables][8] as well as [custom ones][9]. For each file with front matter, Jekyll makes a variety of data available via the [Liquid templating system][3]. All front matter variables will be available via Liquid tags, both further down in the file and in any layouts or includes that reference the given page. Therefore, in `00_Creating_a_Segment.md`, `{{ page.title }}` would render to "Creating a Segment."

More information on front matter variables as data can be found on the [Jekyll Variables documentation][16].

### Section Pages

Let's take a look at the YAML front matter for `/_pages/Getting_Started/index.md`:

```
---
layout: section
title: Getting Started
permalink: "/Getting_Started/"
collection: Getting_Started
weight: 0
---
```

Breaking it down:

- The `layout: section` declaration means that the "Getting Started" page uses `section.html` for its [layout][15].
- `collection: Getting_Started` means that page content will be pulled from the "Getting_Started" collection housed at `_collections/Getting_Started`.
- The `permalink` variable ensures that the page can be reached at <https://academy.appboy.com/Getting_Started/> as opposed to <https://academy.appboy.com/Getting_Started/index.md>.
- We've also given this page a custom `weight` variable. Thus in the navigation sidebar (housed at [`/_includes/nav.html`][13]), we can sort the pages by weight such that "Getting Started" will be the first page to be displayed on the sidebar.

### Layouts

Pages are rendered using the HTML files stored in the `/_layouts/` directory. Each page has a global `layout` variable in its front matter, which specifies which layout file to use. For example, the front matter for `_pages/Getting_Started/index.md` has the variable declaration `layout: section`, which means that the page uses `/_layouts/section.html`

Jekyll uses [Liquid][3] templating to process templates. Take for example `/_layouts/section.html`:

```
{% for article in site.[page.collection] %}
  <div class="article">
    <article class="article-content">
      {{ article.content }}
    </article>
  </div>
{% endfor %}
```

For every Markdown file (`article`) in the current page's referenced collection (`page.collection`), `section.html` will render that article's content on the page. So, on the Getting Started page at <https://academy.appboy.com/Getting_Started/>, `section.html` will render every Markdown file in `/_collections/Getting_Started/`.

### Includes

The [`_includes`][17] directory holds small page fragments, which can be included in multiple places on the site via the `include` tag (i.e., `{% include header.html %}`). Like Jekyll pages, articles and layouts, these page fragments can be populated via Liquid templating.

## Sidebar Navigation

Appboy Academy uses Bootstrap's [Scrollspy plugin][11] to automatically update the navigation sidebar based on scroll position. [jekyll-table-of-contents][10] is used to dynamically generate a table of contents based on header IDs, while kramdown [automatically generates header IDs][12] for all `h1` - `h6` header elements in every Markdown file.

![Navigation Bar][14]

Based on the script in `/_includes/nav.html`, every `h1` element in a Markdown file will appear as an article title in the sidebar, while `h2` and `h3` elements will appear in the expanded drop-down for a given article when you scroll to it.

## Naming Conventions

### Naming Markdown Articles

The templating in `/_layouts/section.html` renders all articles in a collection by alphanumeric order.

- Articles should be named the same as their title.
- Articles should be named using underscores instead of spaces.
- Article names should be prepended with a double-digit number, followed by an underscore. This number should reflect each article's order, relative to other articles within the same section/collection.
- [By default][26], Jekyll supports the following Markdown file extensions: `.markdown, .mkdown, .mkdn, .mkd, .md`. For consistency, Appboy Academy articles should use the `.md` extension.

#### Good:

- 01_Creating_a_Segment.md

#### Bad:

- No_Numerical_Prefix.md
- 200_Triple_Digit_Prefix.md
- 01-Dashes-Instead-Of-Underscores.md
- File Name With Space.md

### Naming Collections and Pages

- For standardization purposes, collections and pages that refer to one another should be named the same (i.e., `/_collections/Getting_Started/` and `/_pages/Getting_Started/`).
- Collections and pages should be named using underscores instead of spaces.
- Collections and pages should be named with proper title capitalization (i.e., "Getting_Started" instead of "Getting_started").

#### Good:

- `/_collections/User_Targeting/`
- `/_pages/User_Targeting/`

#### Bad:

- `/_collections/Getting_Started/` and `/_pages/Getting_started/`
- `/_collections/Collection Name With Space/`
- `/_collections/Campaign_Ideas_and_Strategies/` and `/_pages/Campaign_Ideas/`

## Style Guide

[HTML Markdown][4] is an extremely easy to read, nearly plain-text version of HTML. This README is written in Markdown, and the raw Markdown is viewable on GitHub.

- [HTML Markdown Syntax Guide][41]
- [HTML Markdown Syntax Cheatsheet][42]

### Headers
Appboy Academy's [sidebar navigation][19] depends on the correct styling of header elements in all Markdown files. [If you have not yet read the Sidebar Navigation section, please do so now][19].

In Markdown syntax, headers use 1-6 hash characters at the start of the line, corresponding to header levels 1-6. For example:

```
# This is an H1

## This is an H2

###### This is an H6
```

To be parsed by kramdown and rendered correctly, headers must be preceded by a new line (i.e., line break).

**In order for the sidebar navigation to work correctly, all `h1` elements are reserved for Academy article titles alone. At the start of every Academy article, there must be a `h1` element with the article title, which ensures that the article title shows up in the sidebar navigation.**

For example, at the top of `/_collections/Getting_Started/00_Creating_a_Segment.md`, we see:

```
---
---
# Creating a Segment
```

which renders to this:

![Header][43]

Any flyaway or accidental `h1` elements within the body of a Markdown article will show up in the sidebar navigation as a misleading article title.

Kramdown [automatically generates IDs][12] for every `h1` - `h6` header element in an article, and a [table of contents][10] is created based on those header IDs. Only `h2` and `h3` elements from the article body will be shown in this table of contents, nested under the article title in the sidebar navigation. Therefore, **only `h2` through `h4` elements should be used** within the article body to preserve meaningful information hierarchy.

### Manually Setting Header IDs
Appboy Academy's sidebar navigation expands and collapses sections based on header IDs. These header IDs are [automatically generated by kramdown][12], based on the header text. For example,

```
## Connected Content
```

in a Markdown file would be converted to the following HTML:

```
<h2 id="connected-content">Connected Content</h2>
```

Because of this, non-unique header IDs across articles within the same section may cause glitches within the sidebar navigation. If there are two header elements with the same name (and thus ID) on the same section page, navigating to that article can cause both sections of the sidebar navigation to expand. Take for example the dual `## Use Cases` headers on the Best Practices page:

![Non-Unique Header IDs][54]

To prevent this from happening, kramdown supports [manually setting header IDs][55] by following header text with at least one space and then `{#your-header-id-here}`. For example, in the Push article, we could write `## Use Cases {#push-use-cases}`, such that it no longer conflicts with the `## Use Cases` header in the News Feed article.

**Note: Manual header IDs cannot begin with a number.** `{#4-the-win}` would not be processed by kramdown and would show up verbatim on Appboy Academy.

### Text Styling

You can make text [**bold** and/or *italic*][68] in Markdown:

```
*This text will be italic*
**This text will be bold**
_This text will be italic_
__This text will be bold__
__*This text is bold and italic*__
**_This text is bold and italic_**
```

If you want to use literal characters that normally have a special meaning in Markdown's formatting syntax, you can do so using [backslash (`\`) escapes][67] before the character:

```markdown
\* literal asterisks \*
```

When [writing code][35], there is no need to use escapes.

### Lists
- [Markdown list syntax][56]
- [Kramdown list syntax][57]
- [Kramdown list quick reference][58]

If you want to follow a [block-level element][59] (like a paragraph or header) with a list, there must be at least one blank line between them:

```
This is a paragraph.
1. This is NOT a list.

1. This is an ordered list!

- This is an unordered list!
```

### Code Blocks and Syntax Highlighting

#### Inline Code

Text phrases can be marked up as code by surrounding them with backticks (`), as such:

```
You can set array values via `"my_array_custom_attribute":[ "Value1", "Value2" ]`.
```

#### Code Blocks

Code blocks can be delimited by surrounding your code with triple backticks (```` ``` ````). For language-specific highlighting, you can followed the backticks by a specified language (i.e., ```` ```objc ````).

![Code block language][64]

Like [lists][34], code blocks must be offset from [block-level element][59] (e.g., paragraphs or headers) with new lines.

![Code block line break][65]


#### Liquid

Jekyll processes Liquid in files. Therefore, if you want to have raw Liquid tags or templating in your Academy articles, you must specifically tell Jekyll not to parse that Liquid. You can do this by wrapping your Liquid in `raw` and `endraw` tags, like so:

```
{% raw %}
Personalize messages even further by using the {% connected_content %} tag.
{% endraw %}
```

### Tables

- [Kramdown tables quick reference][60]

```
The below is an example of a table:

| State | Definition |
| ----- | ---------- |
| Opted-in | User has explicitly confirmed he/she wants to receive messages. |
| Subscribed | User has neither unsubscribed, nor explicilty opted-in to receive messages. This is the default for new users. |
| Unsubscribed | User has explicitly unsubscribed from messages. |
```

Like [lists][34] and [code blocks][35], tables should also be offset from [block-level elements][59] with a new line.

## Editing an Existing Article

### Navigate to the Correct Collection

If your article goes under the "Getting Started" section, it will be found under `/_collections/Getting_Started/`, and so on.

### Editing Content
- Directly edit the `.md` file corresponding to your article.
- Be sure to follow the [Style Guide][18] when editing or creating articles, as incorrectly-styled Markdown files will cause things to break.
- **Pay especial attention to the section on [header styling][29], on which the entire [sidebar navigation][19] depends.** Remember: after the `# Article Title`, only `## h2` through `#### h4` elements should be used in the article body.
- The Style Guide is also a helpful reference if you need to create things like [lists][34], [code blocks][35], or [tables][37].


### Adding Images
- Images are stored in `/_assets/img/`. To reference an image, do something like:

  ```
  ![alt text][1]

  [1]: /_assets/img/image_name.png
  ```
- Use [Skitch][62] to mark up or annotate images as necessary.
- Be sure to run all images through [ImageOptim][63]. This compresses images, allowing them—and Appboy Academy—to load faster.

### Updating Article Order and Weights
- If you need to change the order of your article in the sidebar navigation, simply update the numerical prefix on each `.md` file name to reflect the new order.
- Be sure to change the numerical prefixes on all `.md` files in the collection as necessary.
- Remember to follow the [article naming conventions][27].

### Preview Your Changes
Follow the instructions on [running Appboy Academy locally][61] to preview your changes. **DO NOT SKIP THIS STEP!**

### Publish to Github

## Creating a New Article

### Navigate to the Correct Collection

If your article goes under the "Getting Started" section, it will be found under `/_collections/Getting_Started/`, and so on.

### Create a New `.md` File
- Refer to the [Naming Conventions for Markdown Articles][27] when naming your article.
- Add [YAML front matter][25] to the top of the `.md` document. It should look like this:

  ```
  ---
  title: Article Title
  ---
  ```
- Add a `h1` header underneath the YAML front matter, corresponding to your article title:

  ```
  # Article Title
  ```

### Add Content
- It is imperative that you refer to the [Style Guide][18] when editing or creating articles, as incorrectly-styled Markdown files will cause things to break.
- **Pay especial attention to the section on [header styling][29], on which the entire [sidebar navigation][19] depends.** Remember: after the `# Article Title`, only `## h2` through `#### h4` elements should be used in the article body.
- The Style Guide is also a helpful reference if you need to create things like [lists][34], [code blocks][35], or [tables][37].

### Adding Images
- Images are stored in `/_assets/img/`. To reference an image, do something like:

  ```markdown
  ![alt text][1]

  [1]: /_assets/img/image_name.png
  ```
- Use [Skitch][62] to mark up or annotate images as necessary.
- Be sure to run all images through [ImageOptim][63]. This compresses images, allowing them—and Appboy Academy—to load faster.

### Update Article Order and Weights
- To make sure that your new article is placed correctly in the sidebar navigation relative to other articles within the same section, update the numerical prefix on each `.md` file name in `/_collection/My_Section/` to reflect the new order.
- Be sure to change the numerical prefixes on all `.md` files in the collection folder as necessary.
- Remember to follow the [article naming conventions][27].

### Preview Your Changes
Follow the instructions on [running Appboy Academy locally][61] to preview your changes. **DO NOT SKIP THIS STEP!**

### Publish to Github

## Creating a New Section Page

1. Read the section on [Collections][23] for an overview of the `/_collections/` directory
2. Read the section on [Pages][24] for an overview of the `/_pages/` directory
3. Refer to [Section Pages][22] for an explanation of how the [YAML Front Matter][25] functions in a new section page
4. Refer to the [Naming Conventions for Collections and Pages][28] when naming your new section.

### Create New Collection Folder in `/_collections/`

Create a new folder: `/_collections/My_New_Section`.

### Declare New Collection in `_config.yml`

In `_config.yml`, under `collections:`, declare your new collection:

```yml
# Collections
collections:
  My_New_Section:
    relative_directory: _collections/My_New_Section
```

Make sure that your naming for `My_New_Section` is completely standardized, including capitalization.

### Create New Page in `/_pages/`
- Create a new folder: `/_pages/My_New_Section/`.
- In that folder, create a new `index.md` file: `/_pages/My_New_Section/index.md`.
- Inside `index.md`, add the following [YAML front matter][25] to the file:

  ```
  ---
  layout: section
  title: My New Section
  permalink: "/My_New_Section/"
  collection: My New Section
  weight: x
  ---
  ```

  where `x` is a number corresponding to the order in which you want your section placed, relative to the other sections, on the sidebar navigation. For example, in `/_pages/Getting_Started/index.md`, we see `weight: 0` because the "Getting Started" page is placed first.

### Update Page Weights

- In order to determine what `weight: x` should be, look at the `weight` variables in the other `index.md` files under `/_pages/`.
- All `weight` variables are relative, and so should be updated accordingly.
  - If you want your new section page to be last, find the largest `weight: x` variable across `/_pages/.../index.md` and have your page be `weight: x + 1`.
  - If you want your new section page to be between two existing pages with weights `x` and `x + 1`, give your new page `weight: x + 1` and make sure that you increment the weights of all pages with `weight` ≥ `x + 1`. Do this by going into every page's `index.md` file and updating `weight` accordingly.

### Add Markdown Files to `/_collections/My_New_Section`
To add articles to your new section page, follow the instructions for [creating new articles][39].

### Preview Your Changes
Follow the instructions on [running Appboy Academy locally][61] to preview your changes. **DO NOT SKIP THIS STEP!**

### Publish to Github

## Editing Footer Links

Sidebar navigation footer links can be updated in `/_includes/nav.html`.

![Footer][70]

## FAQs

### Why are multiple parts of the sidebar navigation expanding when I scroll?
You have duplicate header IDs across articles within the same collection. Refer to the section on [manually setting header IDs][44] for a workaround solution.

### Jekyll is throwing an "Unknown tag" error or Liquid exception.
Jekyll processes Liquid in files. If you forgot to wrap your Liquid content in `raw` tags, Jekyll may have processed the Liquid in your article and thrown an error. For more information, refer to the Style Guide section on [Liquid][36].

### Jekyll is throwing a "No such file or directory" error.
You may have forgotten to include [YAML front matter][25] in one of your Markdown files. Try adding the following at the top of your file:

```
---
---
```

### My changes aren't showing up.
- Did you run the server with `jekyll serve watch` instead of `jekyll serve`, such that the site will be automatically regenerated after any edits?
- Did you add [YAML front matter][25] to all new pages or articles?
- Did you save your changes?
- Have you tried waiting a little, to let Jekyll Asset Pipeline regenerate the project assets, and then refreshing the page?

### I added a new article, but it isn't appearing in the sidebar.
- Did you add your article to the correct folder under `/_collections/Name_of_Section/`?
- Did you add [YAML front matter][25] to the top of your article?
- Did you remember to add `# Title of Article` at the top of your new article, after the YAML front matter? Refer to the section on [headers][29] for more information.

### Why are random pieces of content appearing in the sidebar navigation?
You've probably messed up your headers somehow in one of your Markdown files. Refer to the section on [headers][29] for more information, and remember to follow the [Style Guide][18].

Side note: If you set [manual header IDs][44], make sure they do not begin with a number (i.e., `{#4-the-win}`).

### My articles are rendering strangely, or the content looks broken.
Remember to follow the [Style Guide][18] when writing Markdown! Common errors include:

- Not having a line break in front of a [header][29], [list][34], [code block][35], or [table][37].
  ```
  This is a paragraph.
  # This Header Will Not Be Rendered Properly

  # This Header Will Be Fine
  - This list wouldn't render properly

  - This list would be fine!
  ```
- Having a [manual header ID][44] that begins with a number (i.e., `{#4-the-win}`).
- Forgetting to [escape a literal character][66] that has a special meaning in Markdown, such as:

  ``* _ # ` {} [] () + - . ! ``
  using a backslash escape:

  ```markdown
  \* creates a literal asterisk
  * italicizes all following content
  ```

### Why am I getting weird Jekyll errors?
Have you recently edited an article that uses Liquid tags (`{{ }}, {% %}`) in its content (e.g., Personalized Messaging or Connected Content)?

#### Yes
See the answer regarding [unknown tag errors and Liquid exceptions][46].

#### No
`¯\_(ツ)_/¯`

[1]: https://github.com/jekyll/jekyll
[2]: http://jekyllrb.com/docs/installation/
[3]: https://github.com/Shopify/liquid/wiki
[4]: http://daringfireball.net/projects/markdown/
[5]: http://kramdown.gettalong.org/
[6]: http://jekyllrb.com/docs/frontmatter/
[7]: http://yaml.org/
[8]: http://jekyllrb.com/docs/frontmatter/#predefined-global-variables
[9]: http://jekyllrb.com/docs/frontmatter/#custom-variables
[10]: https://github.com/ghiculescu/jekyll-table-of-contents
[11]: http://getbootstrap.com/javascript/#scrollspy
[12]: http://kramdown.gettalong.org/converter/html.html#auto-ids
[13]: #includes
[14]: /assets/img/README_header_ids.png
[15]: #layouts
[16]: http://jekyllrb.com/docs/variables/
[17]: http://jekyllrb.com/docs/templates/#includes
[18]: #style-guide
[19]: #sidebar-navigation
[20]: http://jekyllrb.com/docs/configuration/#markdown-options
[21]: http://jekyllrb.com/docs/collections/
[22]: #section-pages
[23]: #collections
[24]: #pages
[25]: #yaml-front-matter-and-liquid-templating
[26]: http://jekyllrb.com/docs/configuration/#default-configuration
[27]: #naming-markdown-articles
[28]: #naming-collections-and-pages
[29]: #headers
[30]: #naming-conventions
[31]: #markdown
[32]: #collections
[33]: #pages
[34]: #lists
[35]: #code-blocks-and-syntax-highlighting
[36]: #liquid
[37]: #tables
[38]: #editing-an-existing-article
[39]: #creating-a-new-article
[40]: #creating-a-new-section-page
[41]: http://daringfireball.net/projects/markdown/syntax
[42]: https://github.com/adam-p/markdown-here/wiki/Markdown-
[43]: /assets/img/README_header.png
[44]: #manually-setting-header-ids
[45]: #why-are-multiple-parts-of-the-sidebar-navigation-expanding-when-i-scroll
[46]: #jekyll-is-throwing-an-unknown-tag-error-or-liquid-exception
[47]: #jekyll-is-throwing-a-no-such-file-or-directory-error
[48]: #faqs
[49]: #why-am-i-getting-weird-jekyll-errors
[50]: #my-changes-arent-showing-up
[51]: #i-added-a-new-article-but-it-isnt-appearing-in-the-sidebar
[52]: #why-are-random-pieces-of-content-appearing-in-the-sidebar-navigation
[53]: #my-articles-are-rendering-strangely-or-the-content-looks-broken
[54]: /assets/img/README_unique_header_ids.png
[55]: http://kramdown.gettalong.org/syntax.html#specifying-a-header-id
[56]: http://daringfireball.net/projects/markdown/syntax#list
[57]: http://kramdown.gettalong.org/syntax.html#lists
[58]: http://kramdown.gettalong.org/quickref.html#lists
[59]: http://www.htmlhelp.com/reference/html40/block.html
[60]: http://kramdown.gettalong.org/quickref.html#tables
[61]: #running-appboy-academy-locally
[62]: https://evernote.com/skitch/
[63]: https://imageoptim.com/
[64]: /assets/img/README_code_block_language.png
[65]: /assets/img/README_code_block_line_break.png
[66]: #text-styling
[67]: http://daringfireball.net/projects/markdown/syntax#backslash
[68]: https://help.github.com/articles/markdown-basics/#styling-text
[69]: #editing-footer-links
[70]: /assets/img/README_footer.png
[71]: http://bundler.io/
[72]: https://rvm.io/
[73]: https://github.com/sstephenson/rbenv
