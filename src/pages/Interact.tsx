import { useState, useRef, useEffect } from "react";
import { Send, Camera, Sparkles, ChevronRight, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/components/Layout";

const QUICK_QUESTIONS = [
  "高血压能吃柚子吗？",
  "体检报告说结节怎么办？",
  "推荐一款护肝套餐",
  "感冒流鼻涕吃什么药？"
];

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  isAction?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "ai",
    content: "你好！我是你的专属健康助手。你可以向我提问，或者发送检查报告（OCR）让我帮你解读。",
  }
];

export default function Interact() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const newUserMsg: Message = { id: Date.now().toString(), sender: "user", content: text };
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiContent = "这是一条来自通用模型/专属智能体的回复。";
      let isAction = false;
      
      if (text.includes("套餐") || text.includes("推荐")) {
        aiContent = "为您匹配到适合的【深度护肝体检套餐】，点击这里了解详情或进行购买。";
        isAction = true;
      } else if (text.includes("报告") || text.includes("结节")) {
        aiContent = "通过OCR和个人画像识别，建议您预约专科医生进行复查，点此进入【绿通招募】。";
        isAction = true;
      }

      setMessages(prev => [
        ...prev, 
        { id: (Date.now() + 1).toString(), sender: "ai", content: aiContent, isAction }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="pt-8 pb-4 px-5 bg-white shrink-0 shadow-sm z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">医心医意</h1>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <Sparkles size={14} className="text-blue-500" />
              MEDTALENT AI 提供支持
            </p>
          </div>
          <div className="bg-blue-50 text-blue-600 text-xs px-3 py-1.5 rounded-full font-medium border border-blue-100">
            个人模型
          </div>
        </div>

        {/* Quick Questions (通用百问) */}
        <div className="flex overflow-x-auto gap-2 mt-5 pb-1 hide-scrollbar">
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="whitespace-nowrap bg-gray-100 text-gray-600 text-[13px] px-4 py-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </header>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 pb-24 scroll-smooth">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex gap-3 max-w-[85%]",
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                msg.sender === "user" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
              )}>
                {msg.sender === "user" ? <User size={16} /> : <Bot size={18} />}
              </div>
              
              <div className="space-y-2">
                <div className={cn(
                  "p-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm",
                  msg.sender === "user" 
                    ? "bg-blue-600 text-white rounded-tr-sm" 
                    : "bg-white text-gray-800 rounded-tl-sm"
                )}>
                  {msg.content}
                </div>
                
                {msg.isAction && (
                  <button className="bg-white border border-blue-100 shadow-sm rounded-xl p-3 flex items-center justify-between w-full hover:bg-blue-50/50 transition-colors group">
                    <span className="text-sm text-blue-600 font-medium">查看服务详情</span>
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <ChevronRight size={14} className="text-blue-600" />
                    </div>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 max-w-[85%] mr-auto"
          >
            <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-sm shrink-0">
              <Bot size={18} />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center h-[46px]">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-3 pb-safe">
        <div className="flex items-center gap-2 max-w-[480px] mx-auto">
          <button className="p-2.5 text-gray-400 hover:text-blue-600 transition-colors shrink-0 bg-gray-100 hover:bg-blue-50 rounded-full">
            <Camera size={22} />
          </button>
          <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-1.5 border border-transparent focus-within:bg-white focus-within:border-blue-200 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="输入健康问题或上传报告..."
              className="flex-1 bg-transparent border-none outline-none py-2 text-[15px] placeholder:text-gray-400"
            />
            <button 
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              className={cn(
                "p-1.5 rounded-full transition-all shrink-0 ml-1",
                input.trim() ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"
              )}
            >
              <Send size={16} className={cn(input.trim() && "ml-0.5")} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Hide scrollbar styles */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
