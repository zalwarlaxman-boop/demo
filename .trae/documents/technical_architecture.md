## 1. 架构设计
```mermaid
graph TD
    A[React 客户端 (SPA)] --> B[UI 组件库 (Tailwind/Radix UI/Lucide)]
    A --> C[状态管理 (Zustand/Context)]
    C --> D[服务层 (API/Mock)]
    D --> E[外部服务跳转]
    D --> F[AI 模型集成 (Medtalent/DeepSeek/OpenEvidence)]
```

## 2. 技术说明
- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS (v3) + clsx + tailwind-merge (用于灵活的原子类组合与动画)
- **UI 基础**: 优先使用 Lucide React 提供现代图标，采用无头组件或自实现高定制化卡片和对话气泡。
- **状态管理**: Zustand 或 React Context 负责用户状态（普通/签约）和跨页面数据共享（如跳转触发词、积分）。
- **动画**: Framer Motion (针对弹窗、TabBar 切换、聊天气泡出现等微动效)。

## 3. 路由定义
作为移动端单页面应用，可以使用 `react-router-dom` 的 HashRouter 或 BrowserRouter 管理主 Tab，或者为了轻量级直接使用状态切换视图：
| 路由 | 目的 |
|-------|---------|
| `/` 或 `/?tab=science` | 科普空间（有医说医）：文章、视频、故事 |
| `/?tab=interact` | 互动空间（医心医意）：百问、AI 对话、OCR 上传 |
| `/?tab=manage` | 管理空间（百分医生）：画像、打卡、非医提醒 |
| `/?tab=service` | 服务空间（工在医外）：营养师、跳转绿通/套餐等 |

## 4. API 定义 (Mock/前端预设)
当前阶段作为前端演示与功能载体，关键数据结构定义如下：
```typescript
// 互动消息
interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  content: string;
  type: 'text' | 'image' | 'link';
  actionUrl?: string; // 用于触发跳转界外或站内链接
}

// 动态画像与打卡状态
interface UserProfile {
  isSigned: boolean; // 是否签约跟踪管理
  score: number; // 积分
  profileCompleteness: number; // 画像完整度 (0-100)
  dailyChecked: boolean; // 今日是否打卡
}
```

## 5. 服务端架构 (占位)
由于当前需求主要聚焦于“前端页面开发”，实际部署时将由后端提供 API。前端通过 Axios 封装请求层。本阶段采用 Mock 数据或纯静态交互展示。

## 6. 关键实现策略
### 6.1 前置索引触发与跳转
- 在应用启动或全局状态中，加载“前置索引词库”（如：“感冒”、“高血压套餐”、“签约”等）。
- 当聊天对话或科普文章中匹配到这些词汇时，前端渲染时将其包装为带有点击跳转属性的 `<a>` 或 `<button>`，实现引流。
### 6.2 个人模型/通用模型切换
- `UserProfile.isSigned` 控制 AI 聊天助手的表现形式：
  - `false`: 通用模型（Medtalent等），仅回答基础内容并推销签约。
  - `true`: 专属智能体，提供更深入的个性化追踪。
### 6.3 OCR 识别模拟
- 提供图片上传组件。实际对接 OCR 接口，本阶段可模拟上传后返回预设的“健康画像”解析结果和资讯推送。
