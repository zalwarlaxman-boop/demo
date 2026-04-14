# 对话后推荐内容（方案A：本地固定列表 + 站内详情页）设计文档

## 背景与目标
在互动对话中，用户完成一次提问（含文本或图片报告）并收到 AI 回复后，系统在该条 AI 回复气泡下方自动展示 2 条相关推荐内容，用于引导用户继续阅读科普内容、观看视频或了解服务包/商品。

目标：
- 每次对话后自动推荐 2 条内容，并显示在现有“查看服务详情”按钮的位置。
- 推荐内容来源为本地固定内容库，通过简单规则匹配，稳定可控。
- 点击推荐项进入站内详情页（`/content/:id`）。

非目标：
- 不在本阶段接入后端推荐接口。
- 不在本阶段依赖模型输出结构化推荐结果。

## 现状
- 对话页在 [Interact.tsx](file:///workspace/src/pages/Interact.tsx) 中渲染消息列表。
- 当前在 `msg.isAction` 条件下展示单个按钮（“查看服务详情”），该区域将被替换为 2 条推荐列表。
- 图片上传已支持 OCR，但用户消息展示图片/文件而不是 OCR 文本；OCR 文本可通过 `hiddenText` 仅用于发给模型。

## 设计概览
### 关键改动点
- 增强消息数据结构：AI 消息新增 `recommendations?: RecommendationItem[]`（或通过 `type` 区分消息渲染）。
- 新增本地内容库：`contentCatalog`（文章/视频/服务/商品统一结构）。
- 新增推荐计算函数：`getRecommendations(queryText, contentCatalog) -> top2`。
- 新增详情页与路由：
  - 新页面：`src/pages/ContentDetail.tsx`
  - 新路由：在 [App.tsx](file:///workspace/src/App.tsx) 增加 `content/:id`

### 数据结构
```ts
type ContentType = "article" | "video" | "service" | "product";

interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  summary: string;
  keywords: string[];
  coverUrl?: string;
  sourceUrl?: string;
}

interface RecommendationItem {
  id: string;
  type: ContentType;
  title: string;
  summary?: string;
}
```

说明：
- `keywords` 用于规则匹配。
- `sourceUrl` 可用于详情页的“外链查看”按钮（可选）。

## 推荐策略（最小可用）
### 输入文本
- 普通文本提问：使用用户本次输入的 `text`。
- 图片/报告：优先使用用户消息的 `hiddenText`（包含 OCR 提取文本与引导语）；若无则回退到 `content`。

### 匹配规则
- 将输入文本与每条内容的 `keywords` 做包含匹配（`includes`），命中一个关键词记 1 分。
- 按分数倒序排序，取前 2 条。
- 若不足 2 条，使用固定“热门/默认池”补齐。
- 去重：同一 `id` 不重复。

扩展点（非必须）：
- 类型多样化：尽量包含“科普（article/video）+ 服务/商品（service/product）”的组合。

## UI/交互
### 列表位置
- 在每条 AI 消息气泡下方（当前 `msg.isAction` 的按钮位置）渲染推荐列表。

### 推荐项样式
- 复用现有按钮视觉风格（白底、圆角、描边、hover、focus-visible）。
- 每条推荐显示：
  - 类型标签（文章/视频/服务/商品）
  - 标题（单行省略）
  - 右侧 Chevron 图标

### 点击行为
- 点击推荐项：`navigate("/content/" + id)`，进入站内详情页。

## 站内详情页（/content/:id）
### 页面内容
- 标题、类型标签、摘要、关键词（可选）。
- 主 CTA：
  - 若有 `sourceUrl`：提供“打开原始链接”按钮（新标签打开）。
  - 对服务/商品：提供“了解/购买”按钮（可先展示占位或跳转到 `/service`）。

### 找不到内容
- 若 `id` 不存在：展示友好提示与返回按钮。

## 错误处理与边界情况
- 推荐计算无命中：展示默认推荐 2 条。
- OCR 文本过长：仅用于推荐匹配与发给模型，不直接渲染；前端展示保持图片/文件卡片。
- 路由错误：详情页兜底“未找到内容”。

## 验收标准
- AI 回复后自动出现 2 条推荐项，替代原“查看服务详情”按钮区域。
- 推荐项与对话主题相关（基于关键词命中），无命中时使用默认池补齐。
- 点击推荐项进入站内详情页并展示对应内容。

