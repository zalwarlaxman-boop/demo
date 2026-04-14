# 体检报告 OCR 功能 Spec

## Why
目前在“互动”页面（`Interact.tsx`）中，底部的相机/图片上传按钮仅作为 UI 占位，并未提供实际的功能。用户希望能够通过上传体检报告或其他检查报告的图片，由系统自动识别报告上的文本内容，并交由后端的 AI 模型（DeepSeek）进行医学解读和分析。实现这一功能能够极大地提升用户的交互体验和应用在医疗健康场景下的实用价值。

## What Changes
- 在 `Interact.tsx` 的输入区域增加隐藏的文件上传控件 `<input type="file" accept="image/*" />`。
- 将点击“相机”图标的行为绑定到文件上传控件。
- 引入前端 OCR 库（如 `tesseract.js`，支持中文识别）或调用专门的 OCR 云服务 API，实现图片到文本的转换。
- **UI 反馈**：在图片上传和 OCR 识别期间，在消息列表中显示“正在识别报告内容…”的占位状态或加载动画。
- 识别完成后，将提取出的 OCR 文本包装为用户的对话消息发送给 DeepSeek 模型，并附带针对医疗报告分析的提示词（Prompt）。

## Impact
- Affected specs: 医疗对话助手、文件上传与处理
- Affected code: `src/pages/Interact.tsx`、可能需要新增的依赖项（如 `tesseract.js`）

## ADDED Requirements
### Requirement: 检查报告图片上传与文字识别 (OCR)
系统应提供上传报告图片并识别其中文字的能力。

#### Scenario: 成功识别并解读报告
- **WHEN** 用户点击相机图标并选择一张包含体检报告文本的图片
- **THEN** 系统显示正在处理/识别的加载状态
- **THEN** OCR 模块成功提取图片中的文字
- **THEN** 系统自动将识别的文本（可附加预设语，如“请帮我解读这份体检报告：[内容]”）发送给 AI
- **THEN** AI 返回专业的医学解读建议，并以 Markdown 格式清晰展示给用户

## MODIFIED Requirements
### Requirement: 聊天交互与状态管理
- 需要在消息列表中支持显示文件上传及解析进度的特殊消息状态。
- AI 的系统提示词需要能够很好地兼容并处理那些由于 OCR 识别带来的可能存在少量错漏字的报告文本。