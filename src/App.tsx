import { useCallback, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Splash from "./components/Splash";
import PopSci from "./pages/PopSci";
import Interact from "./pages/Interact";
import Manage from "./pages/Manage";
import Service from "./pages/Service";
import Me from "./pages/Me";
import Faq from "./pages/Faq";
import ContentDetail from "./pages/ContentDetail";
import PopSciDetail from "./pages/PopSciDetail";
import ServiceDetail from "./pages/ServiceDetail";
import NoticeDetail from "./pages/NoticeDetail";
import MeSaved from "./pages/MeSaved";
import MePlaceholder from "./pages/MePlaceholder";
import AdDietitian from "./pages/AdDietitian";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const handleCloseSplash = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <Router>
      <Splash open={showSplash} onClose={handleCloseSplash} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PopSci />} />
          <Route path="popsci/article/:id" element={<PopSciDetail type="article" />} />
          <Route path="popsci/video/:id" element={<PopSciDetail type="video" />} />
          <Route path="interact" element={<Interact />} />
          <Route path="manage" element={<Manage />} />
          <Route path="service" element={<Service />} />
          <Route path="service/:slug" element={<ServiceDetail />} />
          <Route path="me" element={<Me />} />
          <Route path="faq" element={<Faq />} />
          <Route path="me/saved" element={<MeSaved />} />
          <Route path="me/history" element={<MePlaceholder title="浏览历史" description="用于展示你近期浏览过的内容，后续可接入本地记录或服务端同步。" />} />
          <Route path="me/settings" element={<MePlaceholder title="个人设置" description="用于编辑个人资料、隐私与通知设置，后续可接入真实账号体系。" />} />
          <Route path="me/help" element={<MePlaceholder title="帮助与反馈" description="用于查看常见问题与提交反馈建议，后续可接入工单或客服。" />} />
          <Route path="me/about" element={<MePlaceholder title="关于我们" description="用于展示产品介绍、免责声明与版本信息。" />} />
          <Route path="notice/:id" element={<NoticeDetail />} />
          <Route path="content/:id" element={<ContentDetail />} />
          <Route path="ad/dietitian" element={<AdDietitian />} />
        </Route>
      </Routes>
    </Router>
  );
}
