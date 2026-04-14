# Chat History Persistence Design

## Why
目前 `Interact.tsx` 中的对话记录 `messages` 仅保存在 React 组件的状态（State）中，这意味着当用户切换路由（例如跳转到“管理”或“服务”页面），再切回“互动”页面时，组件会被重新挂载，状态重置，导致之前的聊天记录全部丢失。用户希望能够保存对话记录。

## Approaches Considered
1. **localStorage (Recommended & Selected)**: 简单易用，跨页面和刷新均不丢失。由于容量限制（约 5MB），需要处理大体积内容。
2. **sessionStorage**: 简单易用，但关闭标签页即丢失。
3. **IndexedDB**: 支持大量数据和二进制存储，但实现较复杂。

## What Changes
采用 **localStorage** 进行持久化。

- **数据读取**: 组件初始化时，从 `localStorage` 读取 `chat_history` 键对应的数据。如果有数据，则使用该数据作为初始状态；否则使用预设的 `INITIAL_MESSAGES`。
- **数据写入**: 使用 `useEffect` 监听 `messages` 状态的变化。每当 `messages` 更新且不在输入/请求状态中时，将其序列化并保存到 `localStorage` 中。
- **图片处理**: 由于用户可以上传检查报告图片（通过 `URL.createObjectURL` 生成的本地 Blob URL），这些 URL 在页面刷新或组件重新挂载后会失效。更重要的是，将图片转为 Base64 存入 localStorage 极易导致存储空间溢出。
  - **策略**: 在保存到 localStorage 之前，拦截并清理消息中的 `imageUrl` 属性。
  - **展示**: 恢复数据时，对于曾经有图片的记录（比如 `content === "这是一份检查报告图片"` 或者缺少 `imageUrl` 但具有 `hiddenText` 的情况），可以在 UI 上显示一个占位图标或文本提示（例如：“[图片已过期]”）。

## Impact
- Affected code: `src/pages/Interact.tsx`
- 提升了用户体验，解决了切换页面导致数据丢失的痛点。