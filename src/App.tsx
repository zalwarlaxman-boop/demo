import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import SplashScreen from "./components/SplashScreen";
import PopSci from "./pages/PopSci";
import Interact from "./pages/Interact";
import Manage from "./pages/Manage";
import Service from "./pages/Service";
import ContentDetail from "./pages/ContentDetail";

export default function App() {
  const reduceMotion = useReducedMotion();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const durationMs = reduceMotion ? 650 : 1500;
    const t = window.setTimeout(() => setShowSplash(false), durationMs);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  return (
    <Router>
      <AnimatePresence>
        {showSplash ? (
          <SplashScreen key="splash" onRequestClose={() => setShowSplash(false)} />
        ) : null}
      </AnimatePresence>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PopSci />} />
          <Route path="interact" element={<Interact />} />
          <Route path="manage" element={<Manage />} />
          <Route path="service" element={<Service />} />
          <Route path="content/:id" element={<ContentDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}
