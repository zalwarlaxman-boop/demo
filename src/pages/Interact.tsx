import { useState, useRef, useEffect } from "react";
import { Send, Camera, Sparkles, ChevronRight, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const newUserMsg: Message = { id: Date.now().toString(), sender: "user", content: text };
    const aiMessageId = (Date.now() + 1).toString();
    
    setMessages(prev => [...prev, newUserMsg, { id: aiMessageId, sender: "ai", content: "", isAction: false }]);
    setInput("");
    setIsTyping(true);

    try {
      // 构造历史对话记录，符合 OpenAI 兼容的 DeepSeek API 格式
      const history = messages.map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.content
      }));

      const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk-346750704ff54b678ce18b0091f2787f"
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { 
              role: "system", 
              content: "你是一个专业的医疗健康助手。请用专业、温暖的口吻回答用户的健康问题。可以使用Markdown格式来结构化你的回答（如加粗、列表、表格等）。回答尽量简明扼要，如果是复杂症状，务必建议就医。" 
            },
            ...history,
            { role: "user", content: text }
          ],
          temperature: 0.7,
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      setIsTyping(false); // 收到响应后停止 typing 动画
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder("utf-8");
      let done = false;
      let aiContent = "";
      let buffer = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || ""; // 保留不完整的一行
          
          for (const line of lines) {
            if (line.trim() === '') continue;
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim();
              if (dataStr === '[DONE]') continue;
              
              try {
                const data = JSON.parse(dataStr);
                const delta = data.choices[0]?.delta?.content || "";
                aiContent += delta;
                
                // 实时更新当前 AI 的消息内容
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId ? { ...msg, content: aiContent } : msg
                ));
              } catch (e) {
                console.error("JSON parse error for streamed chunk:", e, line);
              }
            }
          }
        }
      }

      // 流式接收完成后，判断是否需要附加动作
      let isAction = false;
      if (text.includes("套餐") || text.includes("推荐")) {
        isAction = true;
      } else if (text.includes("报告") || text.includes("结节")) {
        isAction = true;
      }

      if (isAction) {
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId ? { ...msg, isAction: true } : msg
        ));
      }

    } catch (error) {
      console.error("DeepSeek API Error:", error);
      setIsTyping(false);
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? { ...msg, content: "抱歉，由于网络或服务原因，我暂时无法回答您的问题，请稍后再试。" } : msg
      ));
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#faf9f5]">
      {/* Header */}
      <header className="pt-10 pb-4 px-5 bg-[#faf9f5] shrink-0 border-b border-[#e8e6dc]/60 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px] font-semibold text-[#141413] tracking-tight font-heading">医心医意</h1>
            <p className="text-[13px] text-[#b0aea5] mt-1 flex items-center gap-1.5 font-serif">
              <Sparkles size={14} className="text-[#6a9bcc]" aria-hidden="true" />
              MEDTALENT AI 提供支持
            </p>
          </div>
          <div className="bg-[#6a9bcc]/10 text-[#6a9bcc] text-[12px] px-3 py-1.5 rounded-full font-medium">
            个人模型
          </div>
        </div>

        {/* Quick Questions (通用百问) */}
        <div className="flex overflow-x-auto gap-2 mt-6 pb-1 hide-scrollbar">
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="whitespace-nowrap bg-white border border-[#e8e6dc] text-[#141413] text-[14px] px-4 py-2 rounded-full hover:bg-[#6a9bcc]/5 hover:border-[#6a9bcc]/30 hover:text-[#6a9bcc] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6a9bcc] shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>
      </header>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-6 pb-24 scroll-smooth">
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
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border",
                msg.sender === "user" ? "bg-[#6a9bcc] text-white border-transparent" : "bg-white text-[#6a9bcc] border-[#e8e6dc]/60"
              )}>
                {msg.sender === "user" ? <User size={16} aria-hidden="true" /> : <Bot size={18} aria-hidden="true" />}
              </div>
              
              <div className="space-y-2">
                <div className={cn(
                  "p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm",
                  msg.sender === "user" 
                    ? "bg-[#6a9bcc] text-white rounded-tr-sm" 
                    : "bg-white text-[#141413] rounded-tl-sm border border-[#e8e6dc]/60 font-serif"
                )}>
                  {msg.sender === "user" ? (
                    msg.content
                  ) : (
                    <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-strong:text-[#141413] prose-a:text-[#6a9bcc]">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content || "..."}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
                
                {msg.isAction && (
                  <button type="button" className="bg-white border border-[#e8e6dc] shadow-sm rounded-[16px] p-3 flex items-center justify-between w-full hover:border-[#6a9bcc]/40 hover:bg-[#6a9bcc]/5 transition-colors group outline-none focus-visible:ring-2 focus-visible:ring-[#6a9bcc]">
                    <span className="text-[14px] text-[#6a9bcc] font-medium ml-1">查看服务详情</span>
                    <div className="w-7 h-7 rounded-full bg-[#6a9bcc]/10 flex items-center justify-center group-hover:bg-[#6a9bcc]/20 transition-colors">
                      <ChevronRight size={16} className="text-[#6a9bcc]" aria-hidden="true" />
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
            <div className="w-8 h-8 rounded-full bg-white border border-[#e8e6dc]/60 text-[#6a9bcc] flex items-center justify-center shadow-sm shrink-0">
              <Bot size={18} aria-hidden="true" />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-[#e8e6dc]/60 flex gap-1.5 items-center h-[46px]">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-[#6a9bcc]/50 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#6a9bcc]/50 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#6a9bcc]/50 rounded-full" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#faf9f5]/80 backdrop-blur-xl border-t border-[#e8e6dc]/60 p-3 pb-safe z-20">
        <div className="flex items-center gap-3 max-w-[480px] mx-auto px-2">
          <button type="button" aria-label="拍照或上传图片" className="p-2.5 text-[#b0aea5] hover:text-[#6a9bcc] transition-colors shrink-0 bg-white border border-[#e8e6dc] shadow-sm hover:border-[#6a9bcc]/30 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#6a9bcc]">
            <Camera size={22} aria-hidden="true" />
          </button>
          <div className="flex-1 bg-white rounded-full flex items-center px-4 py-1.5 border border-[#e8e6dc] shadow-sm focus-within:border-[#6a9bcc] focus-within:ring-2 focus-within:ring-[#6a9bcc]/20 transition-all">
            <input
              type="text"
              value={input}
              aria-label="输入健康问题或上传报告"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="输入健康问题或上传报告…"
              className="flex-1 bg-transparent border-none outline-none py-2 text-[15px] placeholder:text-[#b0aea5] text-[#141413] font-serif"
            />
            <button 
              type="button"
              aria-label="发送消息"
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              className={cn(
                "p-2 rounded-full transition-all shrink-0 ml-1 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6a9bcc]",
                input.trim() ? "bg-[#6a9bcc] text-white shadow-md hover:bg-[#5b8cbf]" : "bg-[#e8e6dc] text-[#b0aea5]"
              )}
            >
              <Send size={16} className={cn(input.trim() && "ml-0.5")} aria-hidden="true" />
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
