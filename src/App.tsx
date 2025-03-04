
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

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
const createRouteWithAuth = (Component, requireAuth = false) => {
  return {
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AuthProvider>
          {requireAuth ? (
            <ProtectedRoute>
              <Component />
            </ProtectedRoute>
          ) : (
            <Component />
          )}
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
    ...createRouteWithAuth(PrometheusVision, true),
  },
  {
    path: "/forge",
    ...createRouteWithAuth(Forge, true),
  },
  {
    path: "/prompt-codex",
    ...createRouteWithAuth(PromptCodex, true),
  },
  {
    path: "/prompt-engine",
    ...createRouteWithAuth(PromptCodex, true),
  },
  {
    path: "/prompt-genie",
    ...createRouteWithAuth(PromptCodex, true),
  },
  {
    path: "/forged-sword",
    ...createRouteWithAuth(ForgedSword, true),
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
    ...createRouteWithAuth(Dashboard, true),
  },
  {
    path: "/profile",
    ...createRouteWithAuth(Profile, true),
  },
  {
    path: "/huggingface-demo",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AuthProvider>
          <ProtectedRoute>
            <HuggingFaceDemo />
          </ProtectedRoute>
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
