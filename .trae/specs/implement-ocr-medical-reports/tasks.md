# Tasks
- [x] Task 1: 安装并配置前端 OCR 依赖
  - [x] SubTask 1.1: 运行 `npm install tesseract.js` 添加基于浏览器的 OCR 支持。
  - [x] SubTask 1.2: 考虑语言包加载时间，可以对中英文语言包预加载（`chi_sim`）。
- [x] Task 2: 更新 `Interact.tsx` UI 组件以支持文件选择
  - [x] SubTask 2.1: 在页面底部输入区域添加隐藏的 `<input type="file" accept="image/*" />`。
  - [x] SubTask 2.2: 将底部相机图标的 `onClick` 事件绑定到触发文件输入框的点击操作。
- [x] Task 3: 实现图片读取与 OCR 识别逻辑
  - [x] SubTask 3.1: 在组件中增加状态 `isOcrProcessing`，当处于识别状态时，禁用输入和发送按钮，展示处理中的 Loading 状态。
  - [x] SubTask 3.2: 编写 `handleImageUpload` 方法，读取用户选择的图片，使用 `tesseract.js` 识别图片中的文字。
  - [x] SubTask 3.3: 对 OCR 提取出来的长文本进行简单的数据清理（例如去除大量空行）。
- [x] Task 4: 与现有 DeepSeek 聊天逻辑集成
  - [x] SubTask 4.1: OCR 识别成功后，将识别出的文字作为用户的新消息（带上前缀“请帮我解读这份检查报告：\n”）发送至已有的 `handleSend` 流程中。
  - [x] SubTask 4.2: 优化针对报告解读场景的 AI 系统提示词（System Prompt），使得 AI 能够对体检报告或医学检查报告的文字给出重点解读和结构化的回复。

# Task Dependencies
- Task 2 和 Task 3 依赖于 Task 1 的 OCR 环境搭建。
- Task 4 依赖于前置任务能够成功解析出文本内容。