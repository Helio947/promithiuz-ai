
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PrometheusVision from "./pages/PrometheusVision";
import PromptCodex from "./pages/PromptCodex";
import ForgedSword from "./pages/ForgedSword";
import AIAgentAcademy from "./pages/AIAgentAcademy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/prometheus-vision" element={<PrometheusVision />} />
            <Route path="/prompt-codex" element={<PromptCodex />} />
            <Route path="/forged-sword" element={<ForgedSword />} />
            <Route path="/ai-agent-academy" element={<AIAgentAcademy />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
