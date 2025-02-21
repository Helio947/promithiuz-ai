
import React, { useState, useEffect } from "react";
import { Brain, Users, Target, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { BusinessNode } from "@/types/prometheus-vision";

const nodes: BusinessNode[] = [
  {
    title: "Sales & Revenue",
    icon: BarChart,
    color: "from-blue-500 to-blue-600",
    description: "Track revenue trends and sales performance"
  },
  {
    title: "Marketing & Outreach",
    icon: Target,
    color: "from-purple-500 to-purple-600",
    description: "Analyze campaign performance and reach"
  },
  {
    title: "Customer Engagement",
    icon: Users,
    color: "from-green-500 to-green-600",
    description: "Monitor customer satisfaction and interactions"
  },
  {
    title: "Operational Efficiency",
    icon: Brain,
    color: "from-orange-500 to-orange-600",
    description: "Optimize workflows and resource utilization"
  }
];

const BusinessMetricsGrid = () => {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [healthScore, setHealthScore] = useState(85);

  useEffect(() => {
    const interval = setInterval(() => {
      setHealthScore(prev => {
        const change = Math.random() * 10 - 5;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lg:col-span-2 space-y-8">
      <div className="relative w-48 h-48 mx-auto mb-16">
        <div 
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r from-primary to-secondary",
            "animate-pulse shadow-lg",
            healthScore > 70 ? "opacity-90" : healthScore > 40 ? "opacity-70" : "opacity-50"
          )}
        />
        <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{Math.round(healthScore)}%</div>
            <div className="text-sm text-gray-600">Health Score</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {nodes.map((node, index) => (
          <button
            key={index}
            onClick={() => setSelectedNode(selectedNode === index ? null : index)}
            className={cn(
              "relative p-6 rounded-2xl transition-all duration-300",
              "bg-white hover:shadow-lg",
              "border-2",
              selectedNode === index ? "border-primary scale-105" : "border-gray-100 hover:border-primary/50",
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-lg mb-4",
              "bg-gradient-to-br",
              node.color,
              "flex items-center justify-center"
            )}>
              <node.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{node.title}</h3>
            <p className="text-sm text-gray-600">{node.description}</p>
            
            <div className={cn(
              "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
              "bg-gradient-to-r from-primary to-secondary",
              selectedNode === index && "opacity-10"
            )} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BusinessMetricsGrid;
