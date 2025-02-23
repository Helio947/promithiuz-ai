
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface OverviewProps {
  title: string;
  description: string;
  onUnlock: () => void;
  onMasteryClick: () => void;
}

const Overview = ({ title, description, onUnlock, onMasteryClick }: OverviewProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Forge Your AI Mastery
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
      <Button 
        onClick={onUnlock}
        size="lg" 
        className="mt-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
      >
        <Lock className="w-4 h-4 mr-2" />
        Unlock Premium Access
      </Button>
    </div>
  );
};

export default Overview;

