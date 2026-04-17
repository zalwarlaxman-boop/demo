import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Activity, ShieldCheck, Zap } from "lucide-react";

export default function Campaign() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=futuristic%20medical%20AI%20abstract%20holographic%20network%20blue%20tones&image_size=landscape_16_9"
            alt="Medical AI Background"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
              MedTalent <br />
              <span className="text-blue-300">智能体空间</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              您的专属 AI 医疗助手。让健康触手可及，做自我健康的第一责任人。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-xl shadow-blue-900/20">
                免费体验 <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-blue-800/50 backdrop-blur-sm text-white border border-blue-400/30 rounded-full font-bold text-lg hover:bg-blue-800/70 transition-colors">
                了解更多
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">为什么选择 MedTalent？</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              结合顶尖医疗知识库与先进的 AI 模型，为您提供全天候、个性化的健康管理方案。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Activity className="w-8 h-8 text-blue-600" />,
                title: "实时健康追踪",
                desc: "通过智能穿戴设备与问诊记录，实时掌握您的身体状态变化。",
                img: "modern%20health%20tracking%20dashboard%20interface%20clean%20ui"
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
                title: "专业医疗护航",
                desc: "所有医疗建议均基于权威医学文献与真实三甲医院医生经验。",
                img: "doctor%20and%20AI%20hologram%20collaborating%20clean%20medical%20setting"
              },
              {
                icon: <Zap className="w-8 h-8 text-amber-500" />,
                title: "秒级响应问诊",
                desc: "7x24 小时在线，随时随地解答您的健康疑虑，告别排队等待。",
                img: "fast%20speed%20glowing%20ai%20chip%20abstract"
              }
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="group relative bg-slate-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${feat.img}&image_size=landscape_4_3`}
                    alt={feat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 -mt-16 relative z-10">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Testimonial Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <img
            src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=abstract%20DNA%20helix%20glowing%20particles&image_size=landscape_16_9"
            alt="DNA Abstract"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-6">生了病，不担心<br/><span className="text-blue-400">少生病，更健康</span></h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                我们不仅在您生病时提供专业的辅导建议，更在日常生活中通过智能分析为您预防潜在风险。MedTalent 是您家庭的私人健康管家。
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=happy%20asian%20person%20portrait%20avatar%20${i}&image_size=square`}
                      alt="User"
                      className="w-12 h-12 rounded-full border-2 border-slate-900 object-cover"
                    />
                  ))}
                </div>
                <div className="text-sm text-slate-400">
                  超过 <strong className="text-white">100,000+</strong> 用户的信赖之选
                </div>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10">
                <div className="flex text-yellow-400 mb-4">
                  {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                </div>
                <p className="text-lg font-medium italic mb-6">
                  "自从使用了 MedTalent，我再也不用为一些小毛病在网上盲目搜索而焦虑了。它就像一个随时在线的专业医生朋友。"
                </p>
                <div className="font-bold">— 张先生, 互联网从业者</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-blue-50 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">准备好开启智能健康生活了吗？</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            立即加入 MedTalent 智能体空间，体验前所未有的健康管理方式。
          </p>
          <button className="px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
            立即开启您的健康空间
          </button>
        </div>
      </section>
    </div>
  );
}
