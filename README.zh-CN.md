# Wheel Toggle Tab (鼠标滚轮切换标签页)

[English](README.md) | 简体中文

一个适用于 Firefox 和 Chrome 的浏览器扩展，通过按住 Alt 键并滚动鼠标滚轮来切换标签页。

## 功能特性

- **Alt + 鼠标滚轮向上**：切换到上一个标签页
- **Alt + 鼠标滚轮向下**：切换到下一个标签页
- 在所有网站上无缝运行
- 支持循环切换（从最后一个标签页切换到第一个，反之亦然）

## 安装方法

### Chrome/Edge/Brave

1. 在浏览器中打开 `chrome://extensions/`
2. 开启右上角的"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择 `wheeltoggletab/chrome` 文件夹

### Firefox

1. 在 Firefox 中打开 `about:debugging#/runtime/this-firefox`
2. 点击"加载临时附加组件"
3. 导航到 `wheeltoggletab/firefox` 文件夹并选择 `manifest.json`

**注意**：Firefox 中的临时附加组件在关闭浏览器后会被移除。如需永久安装，需要通过 Mozilla 附加组件分发平台进行签名。

## 使用方法

只需按住 **Alt** 键并滚动鼠标滚轮：
- 向**上**滚动 → 切换到上一个标签页
- 向**下**滚动 → 切换到下一个标签页

扩展包含防抖动功能，可防止意外的快速标签页切换。

## 文件夹结构

```
wheeltoggletab/
├── chrome/           # Chrome 版本 (Manifest V3)
│   ├── manifest.json
│   ├── content.js
│   └── background.js
├── firefox/          # Firefox 版本 (Manifest V2)
│   ├── manifest.json
│   ├── content.js
│   └── background.js
└── README.md
```

扩展分为两个文件夹的原因：
- Chrome 需要 Manifest V3 和 service worker
- Firefox 目前最适合使用 Manifest V2 和 `browser` API

## 权限说明

- `tabs` - 在浏览器标签页之间切换所需
- `<all_urls>` 内容脚本 - 在所有网站上检测滚轮事件所需

## Firefox 默认行为

默认情况下，Firefox 使用 **Alt + 鼠标滚轮** 执行以下操作：
- **Alt + 滚轮向上**：在浏览历史中后退
- **Alt + 滚轮向下**：在浏览历史中前进

此扩展会**覆盖**该默认行为，改为切换标签页。当检测到 Alt + 滚轮时，扩展会正确阻止 Firefox 的后退/前进导航。

如果您希望保留 Firefox 的默认行为，只需禁用或卸载此扩展即可。

## 故障排除

如果扩展无法正常工作：
1. 确保您加载了正确的文件夹（chrome/ 或 firefox/）
2. 检查浏览器控制台是否有错误信息
3. 修改后重新加载扩展
4. 尝试重新加载您正在测试的网页
5. **仅限 Firefox**：如果扩展仍然执行历史导航而不是切换标签页，请转到 `about:config` 并将 `mousewheel.with_alt.action` 设置为 `0`
