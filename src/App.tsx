
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";

// Lazy load pages for better performance
const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const PrometheusVision = lazy(() => import("@/pages/PrometheusVision"));
const Forge = lazy(() => import("@/pages/Forge"));
const PromptCodex = lazy(() => import("@/pages/PromptGenie"));
const ForgedSword = lazy(() => import("@/pages/ForgedSword"));
const Auth = lazy(() => import("@/pages/Auth"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const WhoWeAre = lazy(() => import("@/pages/WhoWeAre"));
const Profile = lazy(() => import("@/pages/Profile"));

// Add an import for our new HuggingFaceDemo
import { HuggingFaceDemo } from './components/HuggingFaceDemo';
import Logo from "./components/ui/Logo";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
    <div className="text-center">
      <div className="inline-block h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
      <p className="text-gray-600">Loading Promithiuz AI...</p>
    </div>
  </div>
);

// Create routes with AuthProvider wrapped around the elements
const createRouteWithAuth = (Component) => {
  return {
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AuthProvider>
          <Component />
        </AuthProvider>
      </Suspense>
    ),
  };
};

const router = createBrowserRouter([
  {
    path: "/",
    ...createRouteWithAuth(Index),
  },
  {
    path: "/who-we-are",
    ...createRouteWithAuth(WhoWeAre),
  },
  {
    path: "/prometheus-vision",
    ...createRouteWithAuth(PrometheusVision),
  },
  {
    path: "/forge",
    ...createRouteWithAuth(Forge),
  },
  {
    path: "/prompt-codex",
    ...createRouteWithAuth(PromptCodex),
  },
  {
    path: "/prompt-engine",
    ...createRouteWithAuth(PromptCodex),
  },
  {
    path: "/prompt-genie",
    ...createRouteWithAuth(PromptCodex),
  },
  {
    path: "/forged-sword",
    ...createRouteWithAuth(ForgedSword),
  },
  {
    path: "/auth",
    ...createRouteWithAuth(Auth),
  },
  {
    path: "/reset-password",
    ...createRouteWithAuth(ResetPassword),
  },
  {
    path: "/dashboard",
    ...createRouteWithAuth(Dashboard),
  },
  {
    path: "/profile",
    ...createRouteWithAuth(Profile),
  },
  {
    path: "/huggingface-demo",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AuthProvider>
          <HuggingFaceDemo />
        </AuthProvider>
      </Suspense>
    ),
  },
  {
    path: "*",
    ...createRouteWithAuth(NotFound),
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </ErrorBoundary>
  );
}

// Export the App component directly
export default App;

// For backwards compatibility
export const AppWithProviders = App;
