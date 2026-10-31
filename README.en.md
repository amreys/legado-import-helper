<div align="center">

# Legado / Yuedu Source Importer (Mobile)

Open a Legado source link in a mobile browser; the floating button in the bottom-right corner opens the client's **Network Import** in one tap.

[![License](https://img.shields.io/badge/license-MIT-4f46e5)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.4.2-4f46e5)](legado-import-helper.user.js)
[![Platform](https://img.shields.io/badge/platform-Android%20%7C%20HarmonyOS%20%7C%20iOS-4f46e5)](#supported-clients)

[简体中文](README.md) · English

<img src="screenshots/hero.png" width="880" alt="A floating button appears on the source page; one tap opens Network Import, with a confirmation list when more than 10 sources are found">

</div>

## Overview

Legado supports importing from a URL, but source links on web pages have no direct entry point: the URL must be copied, the client opened, Book Sources → Network Import selected, then pasted and confirmed.

This script injects a floating button into source pages. On tap, it passes the current page URL to the client through the `legado://` / `yuedu://` scheme and opens Network Import directly, removing the copy-paste step and the risk of malformed hand-built URLs.

## Features

| Feature | Description |
|:--|:--|
| One-tap network import | Opens the client's Network Import with the URL pre-filled |
| Eight source types | Book sources, RSS sources, replace rules, dict rules, TTS engines, themes, reading layouts, TOC rules |
| Mixed-package detection | When a single file contains several types, the type is inferred from content rather than the file name |
| Confirm before bulk import | More than 10 sources at once shows a list (first 5 + total) for confirmation before anything is imported |
| Button shows the name | The button label is the source name, or the group name when one exists |
| Copy fallback | When the client does not open, the panel offers "Copy source link" and "Copy import link" for iOS, desktop and manual import |

The button can also be dragged, collapses when idle, and follows the page's light/dark background.

## Supported source types

| Type | Scheme |
|:--|:--|
| Book source | `yuedu://booksource/importonline?src=` |
| RSS source | `legado://import/rssSource?src=` |
| Replace rule | `legado://import/replaceRule?src=` |
| Dict rule | `legado://import/dictRule?src=` |
| TTS engine | `legado://import/httpTTS?src=` |
| Theme | `legado://import/theme?src=` |
| Reading layout | `legado://import/readConfig?src=` |
| TOC rule | `legado://import/textTocRule?src=` |
| Auto-detect | `legado://import/auto?src=` (used for mixed packages) |

Book sources keep the legacy `yuedu://` path, which both Legado 2 and Legado 3 accept; every other type uses `legado://`.

## Supported clients

| Client | OS | Scheme | How |
|:--|:--|:--|:--|
| <img src="https://github.com/gedoor.png?size=40" width="18" alt=""> [Legado](https://github.com/gedoor/legado) | Android | `yuedu://` `legado://` | Direct import |
| <img src="https://github.com/HapeLee.png?size=40" width="18" alt=""> [MD3](https://github.com/HapeLee/legado-with-MD3) · [site](https://hapelee.github.io/legado-with-MD3/) | Android | `yuedu://` `legado://` | Direct import |
| <img src="https://github.com/Luoyacheng.png?size=40" width="18" alt=""> [Sigma](https://github.com/Luoyacheng/legado) | Android | `yuedu://` `legado://` | Direct import |
| <img src="https://github.com/youfengknight.png?size=40" width="18" alt=""> [Max](https://github.com/youfengknight/Legado_Max) | Android | `yuedu://` `legado://` | Direct import |
| <img src="https://github.com/refgd.png?size=40" width="18" alt=""> [R](https://github.com/refgd/legado) | Android | `yuedu://` `legado://` | Direct import |
| <img src="https://github.com/Rimchars.png?size=40" width="18" alt=""> [Archive](https://github.com/Rimchars/legado) | Android | `yuedu://` `legado://` | Direct import |
| <img src="https://github.com/LegadoTeam.png?size=40" width="18" alt=""> [LegadoTeam](https://github.com/LegadoTeam/legado) | Android | `yuedu://` `legado://` | Direct import |
| <img src="https://github.com/mgz0227.png?size=40" width="18" alt=""> [Harmony](https://github.com/mgz0227/legado-Harmony) | HarmonyOS | `yuedu://` `legado://` | Direct import |
| <img src="https://github.com/autobcb.png?size=40" width="18" alt=""> [轻悦时光](https://github.com/autobcb/qysg) | Cross-platform | Not public | In-app import |
| <img src="https://github.com/miloquinn.png?size=40" width="18" alt=""> [开元阅读](https://github.com/miloquinn/origo-x) | Cross-platform | Not public | In-app import |
| <img src="https://github.com/DandanLLab.png?size=40" width="18" alt=""> [阅读 MR](https://github.com/DandanLLab/mr) | Multi-platform | No deep link | In-app import |
| <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/94/12/96/9412963e-9247-bac9-e52f-110aaca53fd3/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/100x100bb.jpg" width="18" alt=""> [用心读书](https://apps.apple.com/cn/app/id1569793141) | iOS | Not public | In-app import |
| <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ff/18/2a/ff182a39-33e1-a3ba-20c9-9fa48cfd3a96/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/100x100bb.jpg" width="18" alt=""> [云书阁](https://apps.apple.com/cn/app/id6776104544) | iOS | Not public | In-app import |
| <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/35/f6/a0/35f6a02c-f2fa-2657-d12c-f8cc28af0364/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg" width="18" alt=""> [閱讀](https://apps.apple.com/hk/app/id6772972358) | iOS | Not public | In-app import |

The first eight are Legado forks sharing the same intent filter, so the button can wake them directly.

The remaining clients expose no public import scheme, so the script cannot wake them: on iOS and desktop, copy the source link from the address bar and paste it into the client's Network Import; if the client only accepts local files, save the page as `.json` and import that. Similar iOS readers such as 源阅 behave the same way.

## Install

**1. Get a userscript host**

- Mobile browsers with built-in script support: X Browser, Via, 雨见, 狐猴
- Other browsers: install Tampermonkey or Violentmonkey
- iOS: Safari with [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)

**2. Install the script**

- [Greasyfork page](https://greasyfork.org/zh-CN/scripts/603178)
- Or open [`legado-import-helper.user.js`](legado-import-helper.user.js) from this repository — the manager will offer to install it

## Usage

1. Open a source link. A floating button appears in the bottom-right corner when the page contains source data; other pages are ignored.
2. Tap it. The client opens on Network Import and completes the import.
3. When more than 10 sources are found, a list is shown first for confirmation.
4. If the client does not open, the panel offers "Copy source link" and "Copy import link" — the first works on iOS, desktop and Network Import; the second is for pasting directly on Android.

## Compatibility and known limitations

- **Redirected links**: some clients produce links that redirect, so the landing page is not the source data and cannot be detected. Pair with [redirect](https://greasyfork.org/zh-CN/scripts/416338).
- **Via rendering JSON**: Via renders JSON pages with oversized type and layout, crowding the button. Pair with [JSON Viewer](https://greasyfork.org/zh-CN/scripts/508417-json-viewer) for clearly better rendering; that script may stutter on very long files.
- **Desktop and iOS**: no public scheme, so the link must be copied and imported manually.
- **Similar script**: [Coolapk link decoder](https://greasyfork.org/zh-CN/scripts/586569).

## Repository layout

```
legado-import-helper.user.js   The script (single file, no dependencies)
docs/additional-info.md        Greasyfork listing text (Chinese)
screenshots/                   Promo and demo images
```

## Disclaimer

- This script was generated by AI and is released under the MIT license.
- Third-party projects, names, icons and links mentioned here belong to their respective authors and are used only to describe compatibility. This script is not affiliated with those projects and does not use their source code.
- If you believe a reference is inappropriate, contact us through the feedback link on the script page; verified issues will be corrected or removed promptly.

## License

[MIT](LICENSE)
