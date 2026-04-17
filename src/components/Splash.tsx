import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SplashProps = {
  open: boolean;
  onSkip: () => void;
  durationMs?: number;
};

export default function Splash({ open, onSkip, durationMs = 2500 }: SplashProps) {
  const timerKey = useMemo(() => (open ? `splash-${Date.now()}` : ""), [open]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      onSkip();
    }, durationMs);
    return () => {
      window.clearTimeout(id);
    };
  }, [open, durationMs, onSkip, timerKey]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="splash-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#faf9f5]"
        >
          <div className="w-full max-w-[480px] h-full flex flex-col items-center justify-between px-6 pt-10 pb-10">
            <div className="w-full flex items-center justify-end">
              <button
                type="button"
                onClick={onSkip}
                className="text-[14px] text-[#b0aea5] hover:text-[#141413] transition-colors px-3 py-1.5 rounded-full bg-white/60 border border-[#e8e6dc]/60 backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-[#6a9bcc]"
              >
                跳过
              </button>
            </div>

            <div className="w-full flex-1 flex flex-col items-center justify-center text-center">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                className="text-[28px] font-semibold text-[#141413] tracking-tight font-heading"
              >
                ***医生的智能体空间
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
                className="mt-4 text-[15px] text-[#717069] leading-relaxed font-serif max-w-[22rem]"
              >
                让健康触手可及，做自我健康第一责任人
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
              className="text-center text-[14px] text-[#b0aea5] font-serif space-y-1"
            >
              <div>生了病，不担心</div>
              <div>少生病，更健康</div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

