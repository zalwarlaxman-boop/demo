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
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="pt-8 pb-4 px-5 bg-white shrink-0 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">有医说医</h1>
        <p className="text-sm text-gray-500 mt-1">你的专业健康科普空间</p>
        
        {/* Tabs */}
        <div className="flex space-x-6 mt-6 border-b border-gray-100">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-[15px] font-medium transition-colors relative",
                activeTab === tab ? "text-blue-600" : "text-gray-500 hover:text-gray-800"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        <AnimatePresence mode="popLayout">
          {activeTab === "科普文章" && (
            <motion.div
              key="articles"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {ARTICLES.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform">
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2">{item.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{item.summary}</p>
                      <div className="flex items-center gap-3 text-[11px] text-gray-400 pt-1">
                        <span className="flex items-center gap-1"><Eye size={12} /> {item.views}</span>
                        <span className="flex items-center gap-1"><ThumbsUp size={12} /> {item.likes}</span>
                      </div>
                    </div>
                    <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-xl shrink-0" />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "科普视频" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {VIDEOS.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm active:scale-[0.98] transition-transform">
                  <div className="relative">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
                        <PlayCircle className="text-white" size={28} />
                      </div>
                    </div>
                    <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                      {item.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "康复故事" && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {STORIES.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between active:scale-[0.98] transition-transform">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-full" />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">讲述人：{item.author}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-300" size={20} />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
