import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/components/Layout";
import { faqCatalog, faqCategories } from "@/data/faqCatalog";

export default function Faq() {
  const [faqCategory, setFaqCategory] = useState("全部");
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    if (faqCategory === "全部") return faqCatalog;
    return faqCatalog.filter((faq) => faq.category === faqCategory);
  }, [faqCategory]);

  return (
    <div className="flex flex-col h-full bg-[#faf9f5]">
      {/* Header */}
      <header className="pt-10 pb-4 px-5 bg-[#faf9f5] shrink-0 sticky top-0 z-10">
        <h1 className="text-[28px] font-semibold text-[#141413] tracking-tight font-heading">百问</h1>
        <p className="text-[15px] text-[#b0aea5] mt-1 font-serif">常见健康问题解答</p>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-24">
        {/* Category Filters */}
        <div className="flex overflow-x-auto gap-2 pb-4 -mx-5 px-5 scrollbar-hide">
          {faqCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setFaqCategory(category);
                setExpandedFaqId(null);
              }}
              className={cn(
                "px-4 py-1.5 rounded-full text-[14px] font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6a9bcc]",
                faqCategory === category
                  ? "bg-[#6a9bcc] text-white"
                  : "bg-white text-[#717069] border border-[#e8e6dc]/60 hover:bg-[#faf9f5]"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white rounded-2xl border border-[#e8e6dc]/50 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                  className="w-full text-left p-4 flex items-start justify-between gap-4 outline-none focus-visible:bg-[#faf9f5]"
                >
                  <h3 className="font-medium text-[#141413] text-[15px] leading-relaxed font-heading">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "text-[#b0aea5] shrink-0 transition-transform duration-300 mt-1",
                      isExpanded ? "rotate-180" : "rotate-0"
                    )}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-4 pt-1">
                        <div className="w-full h-[1px] bg-[#e8e6dc]/30 mb-3" />
                        <p className="text-[14px] text-[#717069] leading-relaxed font-serif">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
