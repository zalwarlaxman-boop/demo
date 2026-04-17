# Nutritionist Management Plan Ad Page Design

## 1. Overview
This project replaces the existing external links in the "工在医外" (Service) section with an internal "Ad Page" that promotes a "Nutritionist Management Plan" (营养师管理计划). The goal is to provide a smooth, integrated user experience instead of jumping to an external website or the homepage.

## 2. Architecture & Components

### 2.1 New Route & Page
- **Path**: `/ad/dietitian`
- **Component**: `src/pages/AdDietitian.tsx`
- **Purpose**: A dedicated landing page acting as an advertisement for the Nutritionist Management Plan.

### 2.2 UI/UX Elements
The `AdDietitian` page will consist of:
1. **Header**: Fixed at the top, featuring a back button (`navigate(-1)`) and a title ("专属营养师计划" - Exclusive Nutritionist Plan).
2. **Hero Banner**: A visually appealing top section highlighting the main value proposition (e.g., "Personalized Nutrition, Healthier You").
3. **Features/Highlights**: A list or grid of benefits:
   - 1-on-1 Customized Meal Plans (1对1定制食谱)
   - Daily Diet Tracking & Q&A (日常饮食打卡与答疑)
   - Health Data Analysis (健康数据分析)
4. **Call to Action (CTA)**: A sticky bottom bar with a "Join Plan Now" (立即加入计划) button. Clicking it will display a toast notification (e.g., "Feature coming soon") or return to the previous page.

### 2.3 Routing Updates
- **`src/App.tsx`**: Add the new route `<Route path="ad/dietitian" element={<AdDietitian />} />` inside the `<Route path="/" element={<Layout />}>` block. This keeps the layout consistent with other detail pages.

### 2.4 Component Updates
- **`src/pages/Service.tsx`**:
  - Replace the "立即入群" (Join Group Now) `<a>` tag with a `<Link to="/ad/dietitian">` or `<button onClick={() => navigate("/ad/dietitian")}>`.
  - Update the "快速入口" (Quick Links) mapping to use `<Link>` instead of `<a>` with `href` and `target="_blank"`.
- **`src/data/serviceCatalog.ts`**:
  - Update all `ctaUrl` properties to `"/ad/dietitian"`.
- **`src/pages/ServiceDetail.tsx`**:
  - Change the CTA `<a>` tag at the bottom to a `<button onClick={() => navigate(item.ctaUrl)}>` or `<Link to={item.ctaUrl}>`, removing `target="_blank"`.

## 3. Data Flow
1. User clicks an ad/service link on the `Service` page or `ServiceDetail` page.
2. App routes to `/ad/dietitian`.
3. The `AdDietitian` page mounts and displays the ad content.
4. User clicks "Back" to return to the previous page (`navigate(-1)`).

## 4. Testing & Verification
- Verify that clicking "立即入群" navigates to `/ad/dietitian`.
- Verify that clicking any "快速入口" navigates to `/ad/dietitian`.
- Verify that clicking the CTA inside any Service Detail page navigates to `/ad/dietitian`.
- Verify the Ad page renders correctly on mobile-sized screens.
- Verify the back button on the Ad page works as expected.
