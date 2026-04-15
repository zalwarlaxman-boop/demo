# 科普内容完善：详情页 + 收藏/点赞（本地数据闭环）设计文档

## 目标
在“科普”模块实现一个可用闭环：
- 列表（文章/视频/故事）可点击进入详情页
- 文章详情渲染完整正文（Markdown）
- 视频详情提供封面、简介与来源链接（先不做站内播放器）
- 收藏/点赞在列表页与详情页均可操作，并通过 localStorage 持久化

## 范围
### 本期包含
- 新增科普内容数据源 `popsciCatalog`（本地固定数据）
- 新增文章详情页路由与页面
- 新增视频详情页路由与页面
- 列表页与详情页的收藏/点赞交互与持久化
- 详情页基础导航（返回）

### 本期不包含
- 后端接口/CMS 内容管理
- 登录态与用户多端同步
- 站内视频播放器（仅外链打开）
- 搜索、分类筛选、分页加载

## 路由设计（采用推荐方式）
- 文章详情：`/popsci/article/:id`
- 视频详情：`/popsci/video/:id`

## 数据模型
### 类型
```ts
export type PopSciType = "article" | "video";

export interface PopSciItemBase {
  id: string;
  type: PopSciType;
  title: string;
  summary: string;
  coverUrl: string;
  tags: string[];
  author?: string;
  publishedAt?: string; // ISO 或 yyyy-mm-dd
}

export interface PopSciArticle extends PopSciItemBase {
  type: "article";
  bodyMarkdown: string;
}

export interface PopSciVideo extends PopSciItemBase {
  type: "video";
  duration?: string;
  sourceUrl: string;
}

export type PopSciItem = PopSciArticle | PopSciVideo;
```

### 数据文件
- 新增 `src/data/popsciCatalog.ts`：
  - `export const popsciCatalog: PopSciItem[]`
  - `export function getPopSciItem(type: PopSciType, id: string)`

## 收藏/点赞状态设计
### 存储结构（localStorage）
- key：`popsci_state_v1`
- value：
```json
{
  "liked": ["article:1", "video:2"],
  "saved": ["article:3"]
}
```

### 行为规则
- 列表页：每条卡片右上角提供收藏/点赞按钮（点击不进入详情）
- 详情页：标题区提供收藏/点赞按钮
- 点赞/收藏为 toggle 行为
- 刷新、切换页面后状态保留

## UI/交互
### 列表页（PopSci）
- 点击卡片主体跳转详情页
- 收藏/点赞按钮点击只改变状态，不触发跳转（需阻止事件冒泡）
- 文章卡片展示：标题、摘要、封面、阅读量（可选静态）、点赞数（基于本地状态或内容初始值）
- 视频卡片展示：封面、时长、标题、来源按钮（可选）

### 详情页（通用框架）
- 顶部：返回按钮 + 标题（可换行） + 标签/作者/时间（可选）
- 文章：使用 `react-markdown` + `remark-gfm` 渲染 `bodyMarkdown`
- 视频：展示封面、简介、按钮“打开视频来源”（`target=_blank`）
- 底部：相关推荐（可选，后续接入）

## 代码改动点
- 路由：在 `src/App.tsx` 增加两个路由
  - `popsci/article/:id`
  - `popsci/video/:id`
- 页面：
  - 新增 `src/pages/PopSciDetail.tsx`（通用详情页，基于参数决定 article/video）
- 列表：
  - 改造 `src/pages/PopSci.tsx`：数据来源由内联数组迁移到 `popsciCatalog`；卡片点击跳转；收藏/点赞按钮与状态联动
- 状态：
  - 新增 `src/hooks/usePopSciState.ts`（封装 localStorage 读写与 toggle API）

## 验收标准
- 在“科普文章”Tab 中点击任意文章卡片可进入 `/popsci/article/:id`，显示 Markdown 正文
- 在“科普视频”Tab 中点击任意视频卡片可进入 `/popsci/video/:id`，显示封面、简介与“打开来源链接”
- 列表页与详情页的收藏/点赞按钮可正常切换状态，并在刷新后保持

