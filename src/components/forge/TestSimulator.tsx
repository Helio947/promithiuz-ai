
import { useState } from 'react';
import { Node, Edge } from '@xyflow/react';
import { Button } from "@/components/ui/button";
import { PlayCircle, StopCircle, Timer, DollarSign, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { SimulationResult, SimulationSummary } from '@/types/forge';

interface TestSimulatorProps {
  nodes: Node[];
  edges: Edge[];
  onTestComplete: () => void;
}

export const TestSimulator = ({ nodes, edges, onTestComplete }: TestSimulatorProps) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [summary, setSummary] = useState<SimulationSummary | null>(null);
  const { toast } = useToast();

  const simulateNode = async (node: Node): Promise<SimulationResult> => {
    // Simulate processing time between 0.5 and 2 seconds
    const duration = Math.random() * 1500 + 500;
    await new Promise(resolve => setTimeout(resolve, duration));

    // Simulate cost between $0.001 and $0.01
    const cost = Math.random() * 0.009 + 0.001;

    // 90% success rate in simulation
    const success = Math.random() > 0.1;

    return {
      nodeId: node.id,
      status: success ? 'success' : 'error',
      duration,
      cost,
      output: success ? `Processed ${node.data.label} successfully` : '',
      error: success ? undefined : `Error processing ${node.data.label}`,
    };
  };

  const startSimulation = async () => {
    setIsSimulating(true);
    setResults([]);
    setSummary(null);

    toast({
      title: "Starting Simulation",
      description: "Testing your workflow with sample data...",
    });

    const simulationResults: SimulationResult[] = [];

    // Process nodes in sequence based on edges
    for (const node of nodes) {
      const result = await simulateNode(node);
      simulationResults.push(result);
      setResults([...simulationResults]);

      if (result.status === 'error') {
        toast({
          title: "Node Error",
          description: `Error in ${node.data.label}: ${result.error}`,
          variant: "destructive",
        });
      }
    }

    // Calculate summary
    const summary: SimulationSummary = {
      totalCost: simulationResults.reduce((acc, curr) => acc + curr.cost, 0),
      totalDuration: simulationResults.reduce((acc, curr) => acc + curr.duration, 0),
      successfulNodes: simulationResults.filter(r => r.status === 'success').length,
      failedNodes: simulationResults.filter(r => r.status === 'error').length,
    };

    setSummary(summary);
    setIsSimulating(false);
    onTestComplete();

    toast({
      title: "Simulation Complete",
      description: `Processed ${nodes.length} nodes in ${(summary.totalDuration / 1000).toFixed(1)}s`,
    });
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    toast({
      title: "Simulation Stopped",
      description: "The workflow simulation has been interrupted.",
    });
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Test Simulator</h3>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={isSimulating ? stopSimulation : startSimulation}
            variant={isSimulating ? "destructive" : "default"}
            className="w-full"
          >
            {isSimulating ? (
              <>
                <StopCircle className="h-4 w-4 mr-2" />
                Stop Simulation
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4 mr-2" />
                Start Simulation
              </>
            )}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            {results.map((result) => (
              <div 
                key={result.nodeId}
                className={`p-3 rounded-lg border ${
                  result.status === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">
                    {nodes.find(n => n.id === result.nodeId)?.data.label}
                  </span>
                  {result.status === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span className="flex items-center">
                    <Timer className="h-3 w-3 mr-1" />
                    {(result.duration / 1000).toFixed(1)}s
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />
                    ${result.cost.toFixed(3)}
                  </span>
                </div>
                {result.error && (
                  <p className="text-xs text-red-600 mt-1">{result.error}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {summary && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-medium mb-2">Simulation Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <Timer className="h-4 w-4 mr-1 text-gray-500" />
                {(summary.totalDuration / 1000).toFixed(1)}s total
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                ${summary.totalCost.toFixed(3)} cost
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                {summary.successfulNodes} successful
              </div>
              <div className="flex items-center">
                <XCircle className="h-4 w-4 mr-1 text-red-500" />
                {summary.failedNodes} failed
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
