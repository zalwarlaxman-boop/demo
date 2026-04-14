import { Users, HeartPulse, ShoppingBag, ActivitySquare, ArrowUpRight, Stethoscope } from "lucide-react";

export default function Service() {
  const services = [
    {
      title: "绿通招募",
      desc: "全国三甲医院就医绿色通道",
      icon: ActivitySquare,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      title: "健康套餐",
      desc: "定制化全生命周期体检",
      icon: HeartPulse,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      title: "产品分享",
      desc: "互联网医院与平台严选",
      icon: ShoppingBag,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      title: "名医在线",
      desc: "线上复诊与图文问诊",
      icon: Stethoscope,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <header className="pt-8 pb-4 px-5 bg-white shrink-0 shadow-sm z-10">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">工在医外</h1>
        <p className="text-sm text-gray-500 mt-1">专属营养师与健康服务网络</p>
      </header>

      <div className="p-5 space-y-6">
        
        {/* Dietitian Section (营养师版块) */}
        <section>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Users size={20} className="text-blue-200" />
                <h2 className="text-lg font-bold">营养师专属服务</h2>
              </div>
              <p className="text-blue-100 text-sm mb-5 leading-relaxed">
                加入专业营养师群，获取个性化饮食指导、日常食谱打卡与答疑。
              </p>
              <button className="bg-white text-blue-600 px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-sm active:scale-95">
                立即入群 <ArrowUpRight size={16} />
              </button>
            </div>
            
            {/* Decoration */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
              <Users size={48} className="text-white/20" />
            </div>
          </div>
        </section>

        {/* Jump Space (跳转空间) */}
        <section>
          <h2 className="text-[17px] font-bold text-gray-900 mb-4 px-1">精选服务</h2>
          <div className="grid grid-cols-2 gap-3">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm active:scale-95 transition-transform cursor-pointer group border border-gray-100/50">
                  <div className={`${item.bg} w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon size={20} className={item.color} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-[15px]">{item.title}</h3>
                  <p className="text-[11px] text-gray-500 mt-1 leading-snug">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
