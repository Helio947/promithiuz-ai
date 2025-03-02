
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import PrometheusVision from "@/pages/PrometheusVision";
import Forge from "@/pages/Forge";
import PromptEngine from "@/pages/PromptEngine";
import ForgedSword from "@/pages/ForgedSword";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/prometheus-vision",
    element: <PrometheusVision />,
  },
  {
    path: "/forge",
    element: <Forge />,
  },
  {
    path: "/prompt-engine",
    element: <PromptEngine />,
  },
  {
    path: "/forged-sword",
    element: <ForgedSword />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
