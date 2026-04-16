export type PopSciType = "article" | "video";

export interface PopSciItemBase {
  id: string;
  type: PopSciType;
  title: string;
  summary: string;
  coverUrl: string;
  tags: string[];
  author?: string;
  publishedAt?: string;
  views?: number;
  likes?: number;
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

export const popsciCatalog: PopSciItem[] = [
  {
    id: "a-htn-winter-meds",
    type: "article",
    title: "高血压患者入冬后如何调整用药？心血管医生给出5条建议",
    summary: "气温下降会让血压更“敏感”。从家庭监测、用药时机到复诊指标，帮你把风险降到最低。",
    coverUrl:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20blood%20pressure%20monitor%20on%20table%20with%20warm%20winter%20light%2C%20doctor%20notebook%2C%20clinical%20clean%20style%2C%20high%20detail%2C%20photography&image_size=landscape_4_3",
    tags: ["高血压", "冬季", "用药", "心血管", "监测"],
    author: "心内科医生",
    publishedAt: "2026-04-01",
    views: 12000,
    likes: 342,
    bodyMarkdown:
      "冬季血压波动更常见，核心原因是**血管收缩、活动减少、饮食偏咸**等因素叠加。\n\n## 1. 先把血压“测准”\n- 优先选择**上臂式**电子血压计\n- 固定时间测量：早起后、睡前各一次（遵医嘱）\n- 每次测量 2 次，间隔 1 分钟，取平均值\n\n## 2. 别自行加减药\n> 血压连续异常（比如一周内多次≥140/90mmHg）建议联系医生调整方案，而不是自己加量。\n\n## 3. 关注这3类危险信号\n- 头痛、胸闷、气短明显加重\n- 视物模糊、肢体麻木\n- 血压突然升高且持续不降\n\n## 4. 复诊时带什么数据\n- 最近 1–2 周血压记录（晨/晚）\n- 近期体重、用药清单\n- 如有：血脂/肾功能/电解质检查结果\n\n## 5. 日常管理要点\n- 控盐：尽量 ≤5g/天\n- 保暖：尤其是头颈、四肢\n- 规律运动：快走/室内有氧每周 ≥150 分钟\n\n**提示**：以上为科普建议，具体用药调整请以面诊医生为准。",
  },
  {
    id: "a-sleep-gut",
    type: "article",
    title: "总是失眠多梦？可能和你的肠道健康有关",
    summary: "肠道菌群与睡眠质量的关系越来越明确。通过饮食与作息的小改变，改善入睡困难与夜醒。",
    coverUrl:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20peaceful%20sleeping%20person%20in%20cozy%20bedroom%20night%20light%2C%20soft%20shadows%2C%20high%20detail%2C%20photography&image_size=landscape_4_3",
    tags: ["睡眠", "肠道", "作息", "饮食"],
    author: "营养师",
    publishedAt: "2026-03-18",
    views: 5500,
    likes: 189,
    bodyMarkdown:
      "如果你经常出现**入睡困难、夜间醒来、睡醒仍疲惫**，除了压力、咖啡因、作息紊乱，也可以关注一下肠道状态。\n\n## 肠道如何影响睡眠？\n- 肠道菌群参与**血清素**等神经递质代谢\n- 肠道炎症可能影响睡眠节律\n\n## 你可以从这3步开始\n1. **固定起床时间**（比固定入睡时间更重要）\n2. 晚餐减少油腻与辛辣，睡前 3 小时尽量不再进食\n3. 每天补充膳食纤维：蔬菜、全谷物、豆类\n\n> 如果伴随明显焦虑、抑郁情绪或持续超过 3 个月，建议就医评估。",
  },
  {
    id: "v-report-reading",
    type: "video",
    title: "3分钟教你看懂体检报告：哪些异常必须复查？",
    summary: "快速理解体检常见异常：血脂、肝功能、血糖、尿酸，哪些需要复查、哪些先观察。",
    coverUrl:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20doctor%20explaining%20medical%20checkup%20report%20with%20charts%20on%20clipboard%2C%20clean%20clinic%20background%2C%20high%20detail%2C%20photography&image_size=landscape_16_9",
    tags: ["体检报告", "复查", "指标", "科普视频"],
    publishedAt: "2026-04-10",
    duration: "03:15",
    views: 9800,
    likes: 260,
    sourceUrl: "https://demo.hzmwmt.com/",
  },
  {
    id: "v-neck-office",
    type: "video",
    title: "办公室久坐族必备：肩颈放松跟练操",
    summary: "适合工位完成的 8 分钟肩颈拉伸，缓解僵硬与紧张性头痛风险。",
    coverUrl:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20person%20stretching%20neck%20at%20office%20desk%2C%20soft%20daylight%2C%20minimal%20clean%20style%2C%20high%20detail%2C%20photography&image_size=landscape_16_9",
    tags: ["肩颈", "久坐", "运动", "拉伸"],
    publishedAt: "2026-02-20",
    duration: "08:40",
    views: 7200,
    likes: 180,
    sourceUrl: "https://demo.hzmwmt.com/",
  },
];

export function getPopSciItem(type: PopSciType, id: string) {
  return popsciCatalog.find((item) => item.type === type && item.id === id);
}

export function listPopSci(type: PopSciType) {
  return popsciCatalog.filter((item) => item.type === type);
}

