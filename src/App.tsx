
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load pages for better performance
const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const PrometheusVision = lazy(() => import("@/pages/PrometheusVision"));
const Forge = lazy(() => import("@/pages/Forge"));
const PromptEngine = lazy(() => import("@/pages/PromptEngine"));
const ForgedSword = lazy(() => import("@/pages/ForgedSword"));
const Auth = lazy(() => import("@/pages/Auth"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
    <div className="text-center">
      <div className="inline-block h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
      <p className="text-gray-600">Loading Promithiuz AI...</p>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Index />
      </Suspense>
    ),
  },
  {
    path: "/prometheus-vision",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PrometheusVision />
      </Suspense>
    ),
  },
  {
    path: "/forge",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Forge />
      </Suspense>
    ),
  },
  {
    path: "/prompt-engine",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PromptEngine />
      </Suspense>
    ),
  },
  {
    path: "/forged-sword",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ForgedSword />
      </Suspense>
    ),
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Auth />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
