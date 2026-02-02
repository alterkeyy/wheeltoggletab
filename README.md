# Wheel Toggle Tab

English | [简体中文](README.zh-CN.md)

A browser extension for Firefox and Chrome that allows you to switch tabs by holding the Alt key and scrolling the mouse wheel.

## Features

- **Alt + Wheel Up**: Switch to previous tab
- **Alt + Wheel Down**: Switch to next tab
- Works seamlessly across all websites
- Wraps around from last to first tab and vice versa

## Installation

### Chrome/Edge/Brave

1. Open `chrome://extensions/` in your browser
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select the `wheeltoggletab/chrome` folder

### Firefox

1. Open `about:debugging#/runtime/this-firefox` in Firefox
2. Click "Load Temporary Add-on"
3. Navigate to the `wheeltoggletab/firefox` folder and select `manifest.json`

**Note**: For Firefox, temporary add-ons are removed when you close the browser. For permanent installation, you would need to sign the extension through Mozilla's add-on distribution.

Go to https://addons.mozilla.org/developers/addon/submit/distribution   - Choose \"On your own\" (self-distribution)  - Upload `wheeltoggletab-firefox-v1.0.zip` Fill Out Information. - Extension name: Wheel Toggle Tab. Mozilla will automatically scan your extension, If it passes, you'll get a signed `.xpi` file.

tips:can not find where .xpi file? see [Can't find how to download my personal add-on - Add-ons / addons.mozilla.org - Mozilla Discourse](https://discourse.mozilla.org/t/cant-find-how-to-download-my-personal-add-on/77359/3)

## Usage

Simply hold down the **Alt** key and scroll your mouse wheel:
- Scroll **up** to go to the previous tab
- Scroll **down** to go to the next tab

The extension includes debouncing to prevent accidental rapid tab switching.

## Folder Structure

```
wheeltoggletab/
├── chrome/           # Chrome version (Manifest V3)
│   ├── manifest.json
│   ├── content.js
│   └── background.js
├── firefox/          # Firefox version (Manifest V2)
│   ├── manifest.json
│   ├── content.js
│   └── background.js
└── README.md
```

The extension is split into two folders because:
- Chrome requires Manifest V3 with service workers
- Firefox currently works best with Manifest V2 and the `browser` API

## Permissions

- `tabs` - Required to switch between browser tabs
- `<all_urls>` content script - Required to detect wheel events on all websites

## Firefox Default Behavior

By default, Firefox uses **Alt + Mouse Wheel** for:
- **Alt + Wheel Up**: Navigate back in browsing history
- **Alt + Wheel Down**: Navigate forward in browsing history

This extension **overrides** that default behavior to switch tabs instead. The extension properly prevents Firefox's back/forward navigation when Alt + wheel is detected.

If you prefer to keep Firefox's default behavior, simply disable or uninstall this extension.

## Limitations

### Browser Internal Pages

For security reasons, browser extensions **cannot run on internal browser pages**. The extension will not work on:

**Chrome/Edge/Brave:**
- `chrome://` pages (e.g., `chrome://extensions`, `chrome://settings`)
- `chrome-extension://` pages
- Chrome Web Store (`chrome.google.com/webstore`)
- PDF viewer (in some cases)

**Firefox:**
- `about:` pages (e.g., `about:config`, `about:debugging`)
- `moz-extension://` pages
- Firefox Add-ons site (`addons.mozilla.org`)

**Why?** This is a **built-in security feature** by browsers to prevent extensions from:
- Modifying browser settings
- Accessing sensitive browser data
- Interfering with other extensions
- Tampering with the browser's internal pages

### What Works

The extension works perfectly on:
- All regular websites (`http://` and `https://`)
- Local files (`file://`) if you enable "Allow access to file URLs" in the extension settings

### Alternative for Internal Pages

When on internal browser pages, you can use the browser's built-in keyboard shortcuts:
- **Ctrl + Tab** (or **Cmd + Tab** on Mac) - Next tab
- **Ctrl + Shift + Tab** (or **Cmd + Shift + Tab** on Mac) - Previous tab

## Troubleshooting

If the extension doesn't work:
1. Make sure you loaded the correct folder (chrome/ or firefox/)
2. Check the browser console for any errors
3. Reload the extension after making any changes
4. Try reloading the web page where you're testing
5. **Firefox only**: If the extension still navigates history instead of switching tabs, go to `about:config` and set `mousewheel.with_alt.action` to `0`
