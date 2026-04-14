import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, ChevronRight, Eye, ThumbsUp } from "lucide-react";
import { cn } from "@/components/Layout";

const TABS = ["科普文章", "科普视频", "康复故事"];

const ARTICLES = [
  {
    id: 1,
    title: "高血压患者入冬后如何调整用药？心血管专家为您解答",
    summary: "随着气温下降，血管收缩可能导致血压波动，本文教你如何安全度过寒冬。",
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=blood+pressure+monitor+with+winter+background&image_size=landscape_4_3",
    views: "1.2w",
    likes: 342,
  },
  {
    id: 2,
    title: "这5种被吹捧的「健康食品」，其实是在交智商税",
    summary: "认清营养误区，别再花冤枉钱。营养师带你避开常见饮食陷阱。",
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=healthy+food+vegetables+fruits+concept&image_size=landscape_4_3",
    views: "8k",
    likes: 215,
  },
  {
    id: 3,
    title: "总是失眠多梦？可能和你的肠道健康有关",
    summary: "最新研究表明，肠道菌群与睡眠质量息息相关，改善睡眠从养肠胃开始。",
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=peaceful+sleeping+person+moon+stars&image_size=landscape_4_3",
    views: "5.5k",
    likes: 189,
  }
];

const VIDEOS = [
  {
    id: 1,
    title: "3分钟教你看懂体检报告中的异常指标",
    duration: "03:15",
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=doctor+explaining+medical+chart&image_size=landscape_16_9",
  },
  {
    id: 2,
    title: "办公室久坐族必备：肩颈放松跟练操",
    duration: "08:40",
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=person+stretching+neck+office+desk&image_size=landscape_16_9",
  }
];

const STORIES = [
  {
    id: 1,
    title: "从轮椅到马拉松：我的骨科术后重建之路",
    author: "张先生",
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=running+marathon+shoes+road&image_size=landscape_4_3",
  },
  {
    id: 2,
    title: "抗癌5年，我是如何与生活和解的",
    author: "林女士",
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=smiling+woman+sunflower+field&image_size=landscape_4_3",
  }
];

export default function PopSci() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="flex flex-col h-full bg-[#faf9f5]">
      {/* Header */}
      <header className="pt-10 pb-4 px-5 bg-[#faf9f5] shrink-0 sticky top-0 z-10">
        <h1 className="text-[28px] font-semibold text-[#141413] tracking-tight font-heading">有医说医</h1>
        <p className="text-[15px] text-[#b0aea5] mt-1 font-serif">你的专业健康科普空间</p>
        
        {/* Tabs */}
        <div className="flex space-x-8 mt-8 border-b border-[#e8e6dc]">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-[16px] transition-colors relative outline-none focus-visible:ring-2 focus-visible:ring-[#6a9bcc] rounded-t-sm",
                activeTab === tab ? "text-[#6a9bcc] font-medium" : "text-[#b0aea5] hover:text-[#141413]"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6a9bcc]"
                />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 pb-24">
        <AnimatePresence mode="popLayout">
          {activeTab === "科普文章" && (
            <motion.div
              key="articles"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-5"
            >
              {ARTICLES.map((item) => (
                <button type="button" key={item.id} className="w-full text-left bg-white rounded-2xl p-4 shadow-sm border border-[#e8e6dc]/50 active:scale-[0.98] transition-transform outline-none focus-visible:ring-2 focus-visible:ring-[#6a9bcc] hover:shadow-md">
                  <div className="flex gap-5">
                    <div className="flex-1 space-y-2.5 flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium text-[#141413] text-[17px] leading-snug line-clamp-2 font-heading [text-wrap:balance]">{item.title}</h3>
                        <p className="text-[14px] text-[#b0aea5] line-clamp-2 leading-relaxed mt-1.5">{item.summary}</p>
                      </div>
                      <div className="flex items-center gap-4 text-[12px] text-[#b0aea5] tabular-nums">
                        <span className="flex items-center gap-1.5"><Eye size={14} aria-hidden="true" /> {new Intl.NumberFormat('zh-CN', { notation: 'compact' }).format(parseInt(item.views.replace('w', '000').replace('k', '00')))}</span>
                        <span className="flex items-center gap-1.5"><ThumbsUp size={14} aria-hidden="true" /> {new Intl.NumberFormat('zh-CN').format(item.likes)}</span>
                      </div>
                    </div>
                    <img src={item.image} alt="" width={104} height={104} className="w-[104px] h-[104px] object-cover rounded-xl shrink-0 border border-[#e8e6dc]/30" />
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {activeTab === "科普视频" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-5"
            >
              {VIDEOS.map((item) => (
                <button type="button" key={item.id} className="w-full text-left bg-white rounded-[20px] overflow-hidden shadow-sm border border-[#e8e6dc]/50 active:scale-[0.98] transition-transform outline-none focus-visible:ring-2 focus-visible:ring-[#6a9bcc] hover:shadow-md">
                  <div className="relative">
                    <img src={item.image} alt="" width={640} height={192} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-[#141413]/30 flex items-center justify-center group-hover:bg-[#141413]/20 transition-colors">
                      <div className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
                        <PlayCircle className="text-[#6a9bcc] ml-1" size={32} aria-hidden="true" />
                      </div>
                    </div>
                    <span className="absolute bottom-3 right-3 bg-[#141413]/70 text-white text-[12px] px-2 py-1 rounded-md backdrop-blur-sm font-medium tabular-nums">
                      {item.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-[#141413] text-[16px] line-clamp-1 font-heading">{item.title}</h3>
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {activeTab === "康复故事" && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-4"
            >
              {STORIES.map((item) => (
                <button type="button" key={item.id} className="w-full text-left bg-white rounded-[20px] p-5 shadow-sm border border-[#e8e6dc]/50 flex items-center justify-between active:scale-[0.98] transition-transform outline-none focus-visible:ring-2 focus-visible:ring-[#6a9bcc] hover:shadow-md group">
                  <div className="flex items-center gap-5">
                    <img src={item.image} alt="" width={64} height={64} className="w-16 h-16 object-cover rounded-full border-2 border-[#faf9f5]" />
                    <div>
                      <h3 className="font-medium text-[#141413] text-[16px] font-heading">{item.title}</h3>
                      <p className="text-[14px] text-[#b0aea5] mt-1">讲述人：{item.author}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#faf9f5] flex items-center justify-center group-hover:bg-[#6a9bcc]/10 transition-colors">
                    <ChevronRight className="text-[#b0aea5] group-hover:text-[#6a9bcc] transition-colors" size={20} aria-hidden="true" />
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
