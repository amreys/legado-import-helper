## 兼容提示

部分 App 点击出来的链接带有重定向，落地页不是源数据，脚本无法识别。可搭配 [redirect 外链跳转](https://greasyfork.org/zh-CN/scripts/416338)。

类似脚本：[酷安链接解码器](https://greasyfork.org/zh-CN/scripts/586569)。

Via 浏览器渲染 JSON 页面时字号与排版过大，按钮容易被挤到角落。可搭配 [JSON Viewer](https://greasyfork.org/zh-CN/scripts/508417-json-viewer) 使用，页面与按钮显示明显改善；该脚本在长文件上偶有卡顿。

## 适用范围

适用于手机浏览器中打开的阅读（Legado）**源链接**。链接形式不固定，可能是 `.json` 文件，也可能是接口地址，只要页面内容为源数据即可。页面右下角出现**悬浮按钮**，文字为源名称或分组名称，点击执行**导入**。

可识别的源类型：**书源**、**订阅源**、**替换规则**、**字典规则**、**朗读引擎**、**主题**、**排版**、**目录规则**。**混合包**（一个文件内含多种类型）自动识别。

浏览器需支持用户脚本（内置脚本功能，或油猴类管理器如 Tampermonkey、Violentmonkey）：X 浏览器、Via、雨见、狐猴、Firefox 等；iOS 可用 Safari 配合 Userscripts。

## 使用方法

1. 打开源链接，右下角出现按钮；非源链接不出现。
2. 点击按钮一键**导入**，按钮文字为源名称或分组名称。
3. 单次导入超过 10 个源时，先列出清单供确认。
4. 未唤起 App 时，面板给出**复制源链接**与**复制导入链接**：前者 iOS、桌面端、网络导入通用，后者供 Android 直接粘贴。

按钮可拖动调整位置。闲置后收起为图标，点击展开，再次点击才执行导入，避免误触。

## 支持的平台

| 平台 | 系统 | 导入协议 | 使用方式 |
|:--|:--|:--|:--|
| <img src="https://github.com/gedoor.png?size=40" width="18" alt="原版"> [原版](https://github.com/gedoor/legado) | Android | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/HapeLee.png?size=40" width="18" alt="MD3"> [MD3](https://github.com/HapeLee/legado-with-MD3) · [官网](https://hapelee.github.io/legado-with-MD3/) | Android | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/Luoyacheng.png?size=40" width="18" alt="Sigma"> [Sigma](https://github.com/Luoyacheng/legado) | Android | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/youfengknight.png?size=40" width="18" alt="Max"> [Max](https://github.com/youfengknight/Legado_Max) | Android | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/refgd.png?size=40" width="18" alt="R"> [R](https://github.com/refgd/legado) | Android | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/Rimchars.png?size=40" width="18" alt="Archive"> [Archive](https://github.com/Rimchars/legado) | Android | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/LegadoTeam.png?size=40" width="18" alt="LegadoTeam"> [LegadoTeam](https://github.com/LegadoTeam/legado) | Android | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/mgz0227.png?size=40" width="18" alt="鸿蒙"> [鸿蒙](https://github.com/mgz0227/legado-Harmony) | HarmonyOS | `yuedu://` `legado://` | 一键导入 |
| <img src="https://github.com/autobcb.png?size=40" width="18" alt="轻悦时光"> [轻悦时光](https://github.com/autobcb/qysg) | 全平台 | 未公开 | 软件内导入 |
| <img src="https://github.com/miloquinn.png?size=40" width="18" alt="开元阅读"> [开元阅读](https://github.com/miloquinn/origo-x) | 全平台 | 未公开 | 软件内导入 |
| <img src="https://github.com/DandanLLab.png?size=40" width="18" alt="阅读 MR"> [阅读 MR](https://github.com/DandanLLab/mr) | 多平台 | 无深链 | 软件内导入 |
| <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/94/12/96/9412963e-9247-bac9-e52f-110aaca53fd3/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/100x100bb.jpg" width="18" alt="用心读书"> [用心读书](https://apps.apple.com/cn/app/id1569793141) | iOS | 未公开 | 软件内导入 |
| <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ff/18/2a/ff182a39-33e1-a3ba-20c9-9fa48cfd3a96/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/100x100bb.jpg" width="18" alt="云书阁"> [云书阁](https://apps.apple.com/cn/app/id6776104544) | iOS | 未公开 | 软件内导入 |
| <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/35/f6/a0/35f6a02c-f2fa-2657-d12c-f8cc28af0364/AppIcon-0-0-1x_U007epad-0-1-85-220.png/100x100bb.jpg" width="18" alt="閱讀"> [閱讀](https://apps.apple.com/hk/app/id6772972358) | iOS | 未公开 | 软件内导入 |

协议规则：**书源**走 `yuedu://booksource/importonline?src=`，其余类型走 `legado://import/{类型}?src=`。表中前八项为 Legado 分支，共用同一套协议。

前八项支持一键导入（Android / HarmonyOS），点按钮直接唤起 App。其余平台未提供公开协议：iOS 与桌面端复制地址栏的源链接，到软件内「网络导入」粘贴；只支持本地文件的，把页面另存为 `.json` 后导入。iOS 端同类应用（源阅等）同样如此。

## 备注

- 此脚本由 AI 生成。
- 文中提及的第三方项目、名称、图标与链接，版权归各自作者所有，仅用于说明兼容性。本脚本与这些项目无隶属关系，也未使用其源代码。
- 如认为引用方式不当，可通过脚本页的反馈入口联系，核实后立即更正或删除。

MIT License
