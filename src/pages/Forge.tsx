
import Header from "@/components/Header";
import { ReactFlowProvider } from '@xyflow/react';
import { ForgeWorkflowContainer } from '@/components/forge/ForgeWorkflowContainer';
import '@xyflow/react/dist/style.css';

const Forge = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24">
        <div className="container mx-auto px-4">
          <ReactFlowProvider>
            <ForgeWorkflowContainer />
          </ReactFlowProvider>
        </div>
      </main>
    </div>
  );
};

export default Forge;
