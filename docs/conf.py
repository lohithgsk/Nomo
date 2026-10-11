import os
import sys

project = "Nomo"
copyright = "2026, Nomo Team"
author = "Nomo Team"
release = "1.0.0"
version = "1.0"

extensions = [
    "myst_parser",
    "sphinx_rtd_theme",
    "sphinx_copybutton",
    "sphinx_design",
    "sphinx.ext.autosectionlabel",
    "sphinx.ext.githubpages",
]

autosectionlabel_prefix_document = True

source_suffix = {
    ".rst": "restructuredtext",
    ".md": "markdown",
}

root_doc = "index"

exclude_patterns = [
    "_build",
    "Thumbs.db",
    ".DS_Store",
    "node_modules",
    "adr/template.md",
]

pygments_style = "monokai"

html_theme = "sphinx_rtd_theme"
html_title = "Nomo Documentation"
html_static_path = ["_static"]
html_css_files = ["css/custom.css"]

html_theme_options = {
    "logo_only": False,
    "prev_next_buttons_location": "bottom",
    "style_external_links": True,
    "vcs_pageview_mode": "",
    "collapse_navigation": False,
    "sticky_navigation": True,
    "navigation_depth": 4,
    "includehidden": True,
    "titles_only": False,
}

copybutton_prompt_text = r">>> |\.\.\. |\$ |PS> "
copybutton_prompt_is_regexp = True

myst_enable_extensions = [
    "colon_fence",
    "deflist",
    "fieldlist",
    "tasklist",
]
