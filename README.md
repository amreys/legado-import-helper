<div align="center">

# 阅读书源 / 订阅源识别导入（移动版）

在手机浏览器中打开 Legado 源链接，右下角悬浮按钮一键调起客户端的「网络导入」。

[![License](https://img.shields.io/badge/license-MIT-4f46e5)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.4.1-4f46e5)](legado-import-helper.user.js)
[![Platform](https://img.shields.io/badge/platform-Android%20%7C%20HarmonyOS%20%7C%20iOS-4f46e5)](#支持的客户端)

简体中文 · [English](README.en.md)

<img src="screenshots/hero.png" width="880" alt="打开源链接后右下角浮出按钮，点一下调起网络导入；超过 10 个源时先列出清单确认">

</div>

## 概述

Legado 支持「网络导入」，但网页端缺少直接入口：需复制链接，切换至客户端，进入书源管理 → 网络导入，粘贴并确认。

本脚本在源页面注入悬浮按钮，点击时以 `legado://` / `yuedu://` 协议将当前页面 URL 传递给客户端，直接进入网络导入。省去复制与粘贴步骤，并避免手动拼接地址产生的错误。

## 功能

| 功能 | 说明 |
|:--|:--|
| 一键网络导入 | 点击按钮唤起客户端的网络导入，URL 自动带入 |
| 8 类源识别 | 书源、订阅源、替换规则、字典规则、朗读引擎、主题、排版、目录规则 |
| 混合包自动判断 | 单文件包含多种类型时按内容判断，不依赖文件名 |
| 大包先确认 | 单次超过 10 个源时先展示清单（前 5 项及总数）供确认，避免批量误导入 |
| 按钮即源名 | 按钮文字显示源名称，存在分组时显示分组名 |
| 链接复制 | 未唤起客户端时，面板提供「复制源链接」与「复制导入链接」，供 iOS、桌面端及手动导入使用 |

按钮支持拖动与闲置收起，配色跟随页面深浅。

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
| <img src="https://github.com/autobcb.png?size=40" width="18" alt=""> [轻悦时光](https://github.com/autobcb/qysg) | 全平台 | 未公开 | 客户端内导入 |
| <img src="https://github.com/miloquinn.png?size=40" width="18" alt=""> [开元阅读](https://github.com/miloquinn/origo-x) | 全平台 | 未公开 | 客户端内导入 |
| <img src="https://github.com/DandanLLab.png?size=40" width="18" alt=""> [阅读 MR](https://github.com/DandanLLab/mr) | 多平台 | 无深链 | 客户端内导入 |
| <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/94/12/96/9412963e-9247-bac9-e52f-110aaca53fd3/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/100x100bb.jpg" width="18" alt=""> [用心读书](https://apps.apple.com/cn/app/id1569793141) | iOS | 未公开 | 客户端内导入 |
| <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ff/18/2a/ff182a39-33e1-a3ba-20c9-9fa48cfd3a96/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/100x100bb.jpg" width="18" alt=""> [云书阁](https://apps.apple.com/cn/app/id6776104544) | iOS | 未公开 | 客户端内导入 |
| <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/35/f6/a0/35f6a02c-f2fa-2657-d12c-f8cc28af0364/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg" width="18" alt=""> [閱讀](https://apps.apple.com/hk/app/id6772972358) | iOS | 未公开 | 客户端内导入 |

前八项为 Legado 分支，共用同一套 intent filter，支持按钮直接唤起。

其余客户端未提供公开的导入协议，脚本无法代为唤起：iOS 与桌面端需复制地址栏中的源链接，在客户端内「网络导入」中粘贴；仅支持本地文件的客户端，将页面另存为 `.json` 后导入。iOS 端同类应用（如源阅）情况相同。

## 安装

**1. 准备用户脚本环境**

- 手机浏览器：X 浏览器、Via、雨见、狐猴等内置脚本支持，无需额外配置
- 其他浏览器：安装 Tampermonkey 或 Violentmonkey
- iOS：Safari 配合 [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)

**2. 安装脚本**

- [Greasyfork 脚本页](https://greasyfork.org/zh-CN/scripts/603178)
- 或直接打开本仓库的 [`legado-import-helper.user.js`](legado-import-helper.user.js)，脚本管理器将自动识别并提供安装

## 使用

1. 打开源链接。页面内容为源数据时，右下角出现悬浮按钮；非源链接不显示。
2. 点击按钮，客户端被唤起并进入网络导入，完成导入。
3. 单次超过 10 个源时，先弹出清单供确认。
4. 客户端未被唤起时，面板提供「复制源链接」与「复制导入链接」两个出口：前者适用于 iOS、桌面端及网络导入，后者供 Android 直接粘贴。

## 兼容与已知限制

- **重定向链接**：部分客户端生成的链接包含跳转，落地页并非源数据，无法识别。可搭配 [redirect 外链跳转](https://greasyfork.org/zh-CN/scripts/416338) 使用。
- **Via 渲染 JSON**：Via 打开 JSON 页面时字号与排版偏大，按钮位置受挤压。可搭配 [JSON Viewer](https://greasyfork.org/zh-CN/scripts/508417-json-viewer) 使用，页面与按钮显示明显改善；该脚本在超长文件上存在卡顿。
- **桌面端与 iOS**：无公开协议，需复制链接后手动导入。
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
