import { User, Settings, Bookmark, Clock, HelpCircle, Info, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Me() {
  const navigate = useNavigate();
  const menuItems = [
    { icon: Bookmark, label: "我的收藏", color: "text-[#6a9bcc]", path: "/me/saved" },
    { icon: Clock, label: "浏览历史", color: "text-[#d97757]", path: "/me/history" },
    { icon: Settings, label: "个人设置", color: "text-[#788c5d]", path: "/me/settings" },
    { icon: HelpCircle, label: "帮助与反馈", color: "text-[#b0aea5]", path: "/me/help" },
    { icon: Info, label: "关于我们", color: "text-[#b0aea5]", path: "/me/about" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#faf9f5] overflow-y-auto">
      {/* Header Profile Area */}
      <div className="relative shrink-0 mb-6 z-10">
        <div className="bg-[#6a9bcc] px-5 pt-12 pb-16 rounded-b-[40px] shadow-sm relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/30 shrink-0 shadow-inner">
              <User size={40} className="text-white" aria-hidden="true" />
            </div>
            <div className="text-white">
              <h1 className="text-[28px] font-semibold tracking-tight font-heading">微信用户</h1>
              <p className="text-white/80 mt-1.5 flex items-center gap-1.5 text-[14px]">
                <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-[12px] backdrop-blur-sm border border-white/20">
                  普通用户
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu List Area */}
      <div className="px-5 pb-8 space-y-4 flex-1">
        <div className="bg-white rounded-[24px] shadow-sm border border-[#e8e6dc]/50 overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                type="button"
                onClick={() => navigate("/campaign")}
                className="w-full flex items-center justify-between p-4 outline-none focus-visible:bg-[#faf9f5] hover:bg-[#faf9f5]/50 transition-colors group border-b border-[#e8e6dc]/30 last:border-b-0 active:bg-[#faf9f5]"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl bg-[#faf9f5] group-hover:bg-white transition-colors ${item.color}`}>
                    <Icon size={20} strokeWidth={2.5} aria-hidden="true" />
                  </div>
                  <span className="text-[16px] font-medium text-[#141413]">{item.label}</span>
                </div>
                <ChevronRight size={20} className="text-[#b0aea5] group-hover:text-[#6a9bcc] transition-colors" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
