import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PopSci from "./pages/PopSci";
import Interact from "./pages/Interact";
import Manage from "./pages/Manage";
import Service from "./pages/Service";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PopSci />} />
          <Route path="interact" element={<Interact />} />
          <Route path="manage" element={<Manage />} />
          <Route path="service" element={<Service />} />
        </Route>
      </Routes>
    </Router>
  );
}
