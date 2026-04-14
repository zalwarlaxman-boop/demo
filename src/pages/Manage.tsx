import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, BellRing, Target, ArrowRight, UserCheck } from "lucide-react";

export default function Manage() {
  const [checkedIn, setCheckedIn] = useState(false);
  
  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      {/* Header Profile Area */}
      <div className="relative shrink-0 mb-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-5 pt-12 pb-12 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="text-white">
              <h1 className="text-2xl font-bold tracking-tight">王先生</h1>
              <p className="text-blue-100 mt-1 flex items-center gap-1.5 text-sm">
                <UserCheck size={14} aria-hidden="true" /> 签约管理中
              </p>
            </div>
            
            {/* Circular Progress */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-blue-400/30"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <motion.path
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: "85, 100" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-white"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-[10px] font-medium opacity-80">画像</span>
                <span className="text-xs font-bold -mt-1">85%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Card */}
        <div className="absolute -bottom-6 left-5 right-5 bg-white rounded-xl shadow-sm p-4 flex justify-between items-center z-20">
          <div>
            <p className="text-xs text-gray-500 font-medium">健康积分</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">{new Intl.NumberFormat('zh-CN').format(1240)} <span className="text-xs text-blue-600 font-medium">分</span></p>
          </div>
          <div className="w-[1px] h-10 bg-gray-100"></div>
          <button 
            type="button"
            onClick={() => setCheckedIn(true)}
            disabled={checkedIn}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
              checkedIn 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-50 text-blue-600 active:scale-95'
            }`}
          >
            {checkedIn ? <CheckCircle2 size={16} aria-hidden="true" /> : <Target size={16} aria-hidden="true" />}
            {checkedIn ? '已打卡' : '每日打卡'}
          </button>
        </div>
      </div>

      <div className="px-5 pt-4 pb-6 space-y-6 flex-1">
        
        {/* Reminders */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[17px] font-bold text-gray-900">健康提醒</h2>
            <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">2条待办</span>
          </div>
          <div className="space-y-3">
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex gap-3">
              <div className="mt-0.5 text-orange-500 bg-white rounded-full p-1.5 shadow-sm h-fit">
                <BellRing size={16} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-orange-900">非医提醒：今晚降温</h3>
                <p className="text-xs text-orange-700/80 mt-1 leading-relaxed">
                  夜间气温将降至 5°C，请注意保暖。高血压患者需特别防范血管收缩引起的血压波动。
                </p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-3 shadow-sm">
              <div className="mt-0.5 text-blue-500 bg-blue-50 rounded-full p-1.5 h-fit">
                <CheckCircle2 size={16} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">用药提醒：降压药</h3>
                <p className="text-xs text-gray-500 mt-1">预计服药时间 18:30</p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[17px] font-bold text-gray-900">最新资讯</h2>
            <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center">
              查看全部 <ArrowRight size={12} className="ml-0.5" />
            </button>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
            {[
              { title: "2024年心血管健康管理指南发布", time: "2小时前" },
              { title: "冬季适宜的5种室内有氧运动", time: "昨天" },
              { title: "了解你的体检指标：甘油三酯篇", time: "2天前" }
            ].map((news, idx) => (
              <button type="button" key={idx} className="w-full flex justify-between items-center group cursor-pointer text-left">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span className="text-[14px] text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {news.title}
                  </span>
                </div>
                <span className="text-[11px] text-gray-400 shrink-0 ml-2">{news.time}</span>
              </button>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
