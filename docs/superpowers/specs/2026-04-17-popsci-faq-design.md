# "百问" (100 Questions FAQ) Section Design

## 1. Overview
The goal is to add a new section named "百问" (100 Questions) to the main `PopSci.tsx` tab list. This section will display hundreds of common questions with standard answers provided by doctors, helping users find answers efficiently without having to manually ask and wait for a response.

## 2. Architecture & Components

### 2.1 Data Layer
- **File**: `src/data/faqCatalog.ts`
- **Structure**: Create a mock dataset containing:
  - `id`: string/number
  - `category`: string (e.g., "饮食", "用药", "康复", "日常")
  - `question`: string
  - `answer`: string (can be formatted text or markdown, but we'll stick to string for simplicity)
- **Exports**: A list of `faqCatalog` and a helper to extract unique categories.

### 2.2 UI/UX Elements
- **Tabs Update**: Add "百问" to the `TABS` array in `PopSci.tsx`.
- **Category Filter**: A horizontally scrollable row of pill-shaped buttons below the tab bar when "百问" is active. The default selected category will be "全部" (All).
- **Accordion List**:
  - Each question is presented as a card or list item with a question title and a Chevron icon indicating expandability.
  - Clicking the item toggles an expanded state.
  - The expanded state reveals the detailed answer with a smooth slide-down animation using Framer Motion (`AnimatePresence` + `motion.div`).

### 2.3 Component State (`PopSci.tsx`)
- Add a new state for the selected FAQ category: `const [faqCategory, setFaqCategory] = useState("全部")`.
- Add a new state to track the currently expanded question: `const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null)`.

## 3. Interaction Flow
1. User navigates to the "百问" tab.
2. User sees category filters ("全部", "饮食", "用药", etc.) and a list of questions below them.
3. User clicks on a category pill to filter the list.
4. User clicks on a specific question card.
5. The card expands smoothly, revealing the doctor's standard answer. If another question was expanded, it collapses (accordion behavior).

## 4. Testing & Verification
- Verify the "百问" tab appears and is selectable.
- Verify category filters correctly update the displayed list of questions.
- Verify the accordion expand/collapse animation works without layout jumping.
- Ensure the layout matches the existing visual style of the application (colors, fonts, borders).