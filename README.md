# Development notes

## Setup

I work on macOS, so you may have to tweak these setup instructions as appropriate.

1. Create config directory and files and setup your .gitignore file (see below)
2. Install dev dependencies, if not already installed:
	- sass (<http://sass-lang.com/>)
	- PHP and Smarty (<http://www.smarty.net/docs/en/installing.smarty.basic.tpl>)
	- (optional) fswatch (<https://github.com/emcrisostomo/fswatch>)
	- (optional) ruby with the `terminal-notifier` gem installed

## Config and `.gitignore`

### Config

Create a `config` directory in the root of the repo, with the following structure:

	config/
		bash.sh
		options.inc
		
`bash.sh` should contain a `listHighlighterDir` variable, with the absolute path to where you have the List Highlighter repo checked out, and a boolean `refreshOnWatch` variable (see "Watch" below).

	listHighlighterDir='/Path/to/ListHighlighterForTrello';
	refreshOnWatch=true;

`options.inc` should contain the path to your Smarty installation in a variable named `$smartyClass`.

	<?php
	$smartyClass = '/Path/to/Smarty.class.php';
	
### `.gitignore`
	
Your `.gitignore` file should look like this:

	config/
	*.css
	Extension/options/index.html

## Scss

CSS is written in Scss then compiled. The compiled CSS is not checked into the repo. For that reason it is recommended you add the following rule to your

## Options page HTML

The options page HTML is generated by PHP. To change the HTML, update the `options.tpl` file in the `php` directory, then run `php -f generateOptions.php`.

## BASH

BASH scripts have been included in the `sh` directory to help with Scss compilation. To use them, include `listhighlighter.sh` in your bash profile.

You will need to create a `config.sh` file in the `sh` directory.

It should specify two variables: `$listHighlighterDir` and `$refreshOnWatch`. The first is the absolute path to where you have the List Highlighter repo checked out. The second is used when using the 'watch' feature (see below) and specifies whether to reload extensions in Google Chrome and refresh the page. Please note that to reload extensions automatically in Chrome requires [Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid). If you don't use Chrome or don't want to use this feature, set this variable to false.


	listHighlighterDir='/Path/to/ListHighlighterForTrello';
	refreshOnWatch=true;
	
There are five commands:

### `lhcompile`

- the three CSS compilation commands are triggered
- the options page HTML is generated

### `lhwatch`

Sets up a file monitor on the List Highlighter repo to run `lhcompile` automatically. This requires `fswatch` to be installed on your system. See "Watch" below for more details.

### `lhcss`

Compiles the injected CSS which styles the actual Trello page.

### `lhpcss`

Compiles the CSS used on the popup.

### `lhocss`

Compiles the CSS used on the options page.

All three of these can take a `watch` option, which triggers sass's watch option.
	
## Watch

Whenever a file changes in your repo, `lhcompile` is run automatically. Useful during developement, since you can work on the files and forget about all the compilation stuff. In Google Chrome running on macOS, `lhwatch` also reloads extensions and refreshes any tabs containing a Trello web page (this is optional, see config above).