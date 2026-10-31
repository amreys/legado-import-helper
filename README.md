<div align="center">

# 阅读书源 / 订阅源识别导入（移动版）

在手机浏览器里打开 Legado 的源链接，右下角浮出按钮，点一下直接调起软件的「网络导入」。

[![License](https://img.shields.io/badge/license-MIT-4f46e5)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.4.1-4f46e5)](legado-import-helper.user.js)
[![Platform](https://img.shields.io/badge/platform-Android%20%7C%20HarmonyOS%20%7C%20iOS-4f46e5)](#支持的客户端)

简体中文 · [English](README.en.md)

<img src="screenshots/hero.png" width="880" alt="打开源链接后右下角浮出按钮，点一下调起网络导入；超过 10 个源时先列出清单确认">

</div>

## 用途

Legado 本身支持「网络导入」，问题在于网页上的源链接没法直接点开——得手动复制 URL、切到 App、进书源管理、选网络导入、粘贴、确认。

这个脚本在源页面上加一个悬浮按钮，点击时把当前页面的 URL 通过 `legado://` / `yuedu://` 协议交给 App，直接落到网络导入。省掉复制和粘贴两步，也避免手动拼地址拼错。

## 功能

| 功能 | 说明 |
|:--|:--|
| 一键网络导入 | 点击按钮唤起 App 的网络导入，URL 自动带入 |
| 8 类源识别 | 书源、订阅源、替换规则、字典规则、朗读引擎、主题、排版、目录规则 |
| 混合包自动判断 | 一个文件里混着多种类型时，按内容判断类型，不依赖文件名 |
| 大包先确认 | 单次超过 10 个源，先列清单（前 5 个 + 总数）再确认，不会一包全导进去 |
| 按钮即源名 | 按钮文字显示源名称；有分组时显示分组名 |
| 未唤起时的双出口 | 面板提供「复制源链接」与「复制导入链接」，供 iOS、桌面端或手动导入使用 |
| 按钮可拖动 | 可移到不遮挡正文的位置 |
| 防误触 | 闲置后收成小图标，点一下展开，再点才执行导入 |
| 深色页面适配 | 按页面实际底色切换面板配色，深色页面上不出现突兀的亮块 |

## 支持的源类型

| 类型 | 协议 |
|:--|:--|
| 书源 | `yuedu://booksource/importonline?src=` |
| 订阅源 | `legado://import/rssSource?src=` |
| 替换规则 | `legado://import/replaceRule?src=` |
| 字典规则 | `legado://import/dictRule?src=` |
| 朗读引擎 | `legado://import/httpTTS?src=` |
| 主题 | `legado://import/theme?src=` |
| 排版 | `legado://import/readConfig?src=` |
| 目录规则 | `legado://import/textTocRule?src=` |
| 自动识别 | `legado://import/auto?src=`（混合包走这里） |

书源沿用 `yuedu://` 旧路径，阅读 2 与阅读 3 都认；其余类型走 `legado://`。

## 支持的客户端

| 客户端 | 系统 | 导入协议 | 使用方式 |
|:--|:--|:--|:--|
| <img src="https://github.com/gedoor.png?size=40" width="18" alt=""> [原版](https://github.com/gedoor/legado) | Android | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/HapeLee.png?size=40" width="18" alt=""> [MD3](https://github.com/HapeLee/legado-with-MD3) · [官网](https://hapelee.github.io/legado-with-MD3/) | Android | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/Luoyacheng.png?size=40" width="18" alt=""> [Sigma](https://github.com/Luoyacheng/legado) | Android | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/youfengknight.png?size=40" width="18" alt=""> [Max](https://github.com/youfengknight/Legado_Max) | Android | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/refgd.png?size=40" width="18" alt=""> [R](https://github.com/refgd/legado) | Android | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/Rimchars.png?size=40" width="18" alt=""> [Archive](https://github.com/Rimchars/legado) | Android | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/LegadoTeam.png?size=40" width="18" alt=""> [LegadoTeam](https://github.com/LegadoTeam/legado) | Android | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/mgz0227.png?size=40" width="18" alt=""> [鸿蒙](https://github.com/mgz0227/legado-Harmony) | HarmonyOS | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/autobcb.png?size=40" width="18" alt=""> [轻悦时光](https://github.com/autobcb/qysg) | 全平台 | 未公开 | 软件内导入 |
| <img src="https://github.com/miloquinn.png?size=40" width="18" alt=""> [开元阅读](https://github.com/miloquinn/origo-x) | 全平台 | 未公开 | 软件内导入 |
| <img src="https://github.com/DandanLLab.png?size=40" width="18" alt=""> [阅读 MR](https://github.com/DandanLLab/mr) | 多平台 | 无深链 | 软件内导入 |
| <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/94/12/96/9412963e-9247-bac9-e52f-110aaca53fd3/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/100x100bb.jpg" width="18" alt=""> [用心读书](https://apps.apple.com/cn/app/id1569793141) | iOS | 未公开 | 软件内导入 |
| <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ff/18/2a/ff182a39-33e1-a3ba-20c9-9fa48cfd3a96/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/100x100bb.jpg" width="18" alt=""> [云书阁](https://apps.apple.com/cn/app/id6776104544) | iOS | 未公开 | 软件内导入 |
| <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/35/f6/a0/35f6a02c-f2fa-2657-d12c-f8cc28af0364/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg" width="18" alt=""> [閱讀](https://apps.apple.com/hk/app/id6772972358) | iOS | 未公开 | 软件内导入 |

前八项为 Legado 分支，共用同一套 intent filter，点按钮可直接唤起。

其余客户端未提供公开的导入协议，因此脚本无法替它们唤起：iOS 与桌面端复制地址栏的源链接，到软件内的「网络导入」粘贴即可；只支持导入本地文件的，把页面另存为 `.json` 后导入。iOS 端同类应用（如源阅）同样如此。

## 安装

**1. 准备用户脚本环境**

- 手机浏览器：X 浏览器、Via、雨见、狐猴等自带脚本功能，直接可用
- 其他浏览器：安装 Tampermonkey 或 Violentmonkey
- iOS：Safari 配合 [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)

**2. 安装脚本**

- Greasyfork 脚本页：<https://greasyfork.org/zh-CN/scripts/603178>
- 或直接打开本仓库的 [`legado-import-helper.user.js`](legado-import-helper.user.js)，脚本管理器会自动识别并弹出安装

## 使用

1. 打开源链接。页面内容为源数据时，右下角出现悬浮按钮；非源链接不会出现。
2. 点击按钮，App 被唤起并进入网络导入，完成导入。
3. 单次超过 10 个源时，先弹出清单确认。
4. 未唤起 App 时，面板给出「复制源链接」与「复制导入链接」两个出口：前者在 iOS、桌面端与网络导入通用，后者供 Android 直接粘贴。

## 兼容与已知限制

- **重定向链接**：部分 App 点出来的链接带跳转，落地页不是源数据，脚本识别不到。可搭配 [redirect 外链跳转](https://greasyfork.org/zh-CN/scripts/416338) 使用。
- **Via 渲染 JSON**：Via 打开 JSON 页面时字号与排版偏大，按钮容易被挤到角落。可搭配 [JSON Viewer](https://greasyfork.org/zh-CN/scripts/508417-json-viewer) 使用，页面与按钮显示明显改善；该脚本在长文件上偶有卡顿。
- **桌面端与 iOS**：无公开协议，只能复制链接后手动导入。
- **同类脚本**：[酷安链接解码器](https://greasyfork.org/zh-CN/scripts/586569)。

## 目录结构

```
legado-import-helper.user.js   脚本本体（单文件，无依赖）
docs/additional-info.md        Greasyfork 附加信息原文
screenshots/                   宣传图与示意图
```

## 声明

- 本脚本由 AI 生成，代码以 MIT 协议开源。
- 文中提及的第三方项目、名称、图标与链接，版权归各自作者所有，仅用于说明兼容性。本脚本与这些项目无隶属关系，也未使用其源代码。
- 如认为引用方式不当，可通过脚本页的反馈入口联系，核实后立即更正或删除。

## License

[MIT](LICENSE)
