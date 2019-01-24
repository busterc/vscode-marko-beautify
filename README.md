# Marko Beautify [![Version](https://vsmarketplacebadge.apphb.com/version/buster.marko-beautify.svg)](https://marketplace.visualstudio.com/items?itemName=buster.marko-beautify)

> beautify Marko code, in place, for VS Code

- built on top of [@marko/prettyprint](https://github.com/marko-js/cli/tree/master/packages/prettyprint)

![](https://i.imgur.com/nt9GKaS.gif)

## How to Use

This extension uses the built-in formatter api,
so it's as easy to use as `shift+alt+f`.

Also, guess what it does if you enable `editor.formatOnSave`.

## Extension Settings

- `marko.beautify.eol`: The EOL sequence (defaults to "\n")
- `marko.beautify.indent`: The indent string (defaults to two spaces)
- `marko.beautify.maxLen`: The max line length (defaults to -1 to disable)
- `marko.beautify.syntax`: The syntax to use; either "html" or "concise" (defaults to "html")
