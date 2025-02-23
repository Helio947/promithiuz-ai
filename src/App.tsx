import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import PrometheusVision from "@/pages/PrometheusVision";
import Forge from "@/pages/Forge";
import PromptEngine from "@/pages/PromptEngine";
import TextToText from "@/pages/TextToText";
import TextToImage from "@/pages/TextToImage";
import TextToVideo from "@/pages/TextToVideo";
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
    path: "/text-to-text",
    element: <TextToText />,
  },
  {
    path: "/text-to-image",
    element: <TextToImage />,
  },
  {
    path: "/text-to-video",
    element: <TextToVideo />,
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
