import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Users, HeartPulse, ShoppingBag, ActivitySquare, ArrowUpRight, Stethoscope } from "lucide-react";
import { serviceCatalog } from "@/data/serviceCatalog";

export default function Service() {
  const navigate = useNavigate();
  const services = [
    {
      title: "绿通招募",
      desc: "全国三甲医院就医绿色通道",
      icon: ActivitySquare,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      slug: "green-channel",
    },
    {
      title: "健康套餐",
      desc: "定制化全生命周期体检",
      icon: HeartPulse,
      color: "text-rose-500",
      bg: "bg-rose-50",
      slug: "health-package",
    },
    {
      title: "产品分享",
      desc: "互联网医院与平台严选",
      icon: ShoppingBag,
      color: "text-amber-500",
      bg: "bg-amber-50",
      slug: "product-share",
    },
    {
      title: "名医在线",
      desc: "线上复诊与图文问诊",
      icon: Stethoscope,
      color: "text-blue-500",
      bg: "bg-blue-50",
      slug: "doctor-online",
    },
  ];
  const quickLinks = useMemo(() => serviceCatalog.slice(0, 3), []);

  return (
    <div className="flex flex-col h-full bg-[#faf9f5] overflow-y-auto">
      {/* Header */}
      <header className="pt-10 pb-4 px-5 bg-[#faf9f5] shrink-0 border-b border-[#e8e6dc]/60 z-10">
        <h1 className="text-[28px] font-semibold text-[#141413] tracking-tight font-heading">工在医外</h1>
        <p className="text-[15px] text-[#b0aea5] mt-1 font-serif">专属营养师与健康服务网络</p>
      </header>

      <div className="p-5 space-y-8">
        
        {/* Dietitian Section (营养师版块) */}
        <section>
          <div className="bg-[#6a9bcc] rounded-[24px] p-6 text-white shadow-sm border border-[#6a9bcc]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-3">
                <Users size={22} className="text-white/90" aria-hidden="true" />
                <h2 className="text-[18px] font-semibold font-heading">营养师专属服务</h2>
              </div>
              <p className="text-white/80 text-[14px] mb-6 leading-relaxed font-serif max-w-[85%]">
                加入专业营养师群，获取个性化饮食指导、日常食谱打卡与答疑。
              </p>
              <button
                type="button"
                onClick={() => navigate("/campaign")}
                className="bg-white text-[#6a9bcc] px-6 py-2.5 rounded-full text-[14px] font-semibold inline-flex items-center gap-2 hover:bg-[#faf9f5] transition-colors shadow-sm active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#6a9bcc]"
              >
                立即入群 <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
            
            {/* Decoration */}
            <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
              <Users size={48} className="text-white/20" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* Jump Space (跳转空间) */}
        <section>
          <h2 className="text-[18px] font-semibold text-[#141413] mb-4 px-1 font-heading">精选服务</h2>
          <div className="grid grid-cols-2 gap-3.5">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => navigate("/campaign")}
                  className="w-full text-left bg-white rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-all cursor-pointer group border border-[#e8e6dc]/60 outline-none focus-visible:ring-2 focus-visible:ring-[#6a9bcc] hover:shadow-md hover:border-[#e8e6dc]"
                >
                  <div className={`${item.bg} w-11 h-11 rounded-[14px] flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform`}>
                    <Icon size={22} className={item.color} aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-[#141413] text-[15px] font-heading">{item.title}</h3>
                  <p className="text-[12px] text-[#b0aea5] mt-1.5 leading-snug font-serif">{item.desc}</p>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-[#141413] mb-4 px-1 font-heading">快速入口</h2>
          <div className="space-y-3">
            {quickLinks.map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => navigate("/campaign")}
                className="w-full bg-white border border-[#e8e6dc] shadow-sm rounded-[16px] p-3 flex items-center justify-between hover:border-[#6a9bcc]/40 hover:bg-[#6a9bcc]/5 transition-colors group outline-none focus-visible:ring-2 focus-visible:ring-[#6a9bcc]"
              >
                <div>
                  <p className="text-[14px] text-[#141413] font-semibold font-heading">{s.title}</p>
                  <p className="text-[12px] text-[#b0aea5] mt-0.5 font-serif line-clamp-1">{s.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#6a9bcc]/10 flex items-center justify-center group-hover:bg-[#6a9bcc]/20 transition-colors">
                  <ArrowUpRight size={16} className="text-[#6a9bcc]" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
