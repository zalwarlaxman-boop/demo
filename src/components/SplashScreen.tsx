import { easeOut, motion, useReducedMotion } from "framer-motion";

type SplashScreenProps = {
  onRequestClose: () => void;
};

export default function SplashScreen({ onRequestClose }: SplashScreenProps) {
  const reduceMotion = useReducedMotion();

  const containerTransition = reduceMotion
    ? { duration: 0.2 }
    : { duration: 0.35, ease: easeOut };

  const itemTransition = reduceMotion
    ? { duration: 0.2 }
    : { duration: 0.45, ease: easeOut };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={containerTransition}
      role="presentation"
    >
      <div 
        className="relative flex items-center justify-center w-full max-w-[480px] h-full bg-gradient-to-br from-[#faf9f5] via-[#f6f8fb] to-[#d9e8f7] pointer-events-auto"
        onClick={onRequestClose}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.75),rgba(255,255,255,0)_55%)] pointer-events-none" />
        <div className="relative w-full px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8, scale: reduceMotion ? 1 : 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={itemTransition}
          className="text-center"
        >
          <div className="font-heading font-semibold tracking-tight text-[30px] leading-[1.12] text-[#141413]">
            医生的智能体空间
          </div>
          <div className="mt-3 text-[14px] leading-[1.55] text-[#3a3936]">
            让健康触手可及，做自我健康第一责任人
          </div>
          <div className="mt-8 space-y-2 text-[13px] leading-[1.6] text-[#5a5954]">
            <div>生了病，不担心</div>
            <div>少生病，更健康</div>
          </div>
        </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
