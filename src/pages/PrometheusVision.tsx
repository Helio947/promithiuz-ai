
import { useState } from "react";
import Header from "@/components/Header";
import { Message } from "@/types/prometheus-vision";
import BusinessInsightsForm from "@/components/prometheus-vision/BusinessInsightsForm";
import ChatInterface from "@/components/prometheus-vision/ChatInterface";
import BusinessMetricsGrid from "@/components/prometheus-vision/BusinessMetricsGrid";

const PrometheusVision = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Promithiuz AI Vision
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your business insights hub powered by AI
            </p>
          </div>

          {messages.length === 0 && (
            <BusinessInsightsForm setMessages={setMessages} />
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            <BusinessMetricsGrid />
            <ChatInterface messages={messages} setMessages={setMessages} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrometheusVision;
