
import { Award, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GraduationStageProps {
  onComplete: () => void;
}

const GraduationStage = ({ onComplete }: GraduationStageProps) => {
  const handleDownload = () => {
    // In a real implementation, this would generate and download a certificate
    toast.success("Certificate downloaded successfully!");
    onComplete();
  };
  
  return (
    <div className="space-y-8 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
          <Award className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
        <p className="text-gray-600 max-w-2xl">
          You've completed the AI Agent Academy and are now equipped with the knowledge to leverage AI agents effectively in your daily life and business.
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border border-primary/20 max-w-md mx-auto">
        <h4 className="font-semibold text-lg">What You've Learned:</h4>
        <ul className="text-left space-y-2 mt-3">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>The fundamentals of AI agents and how they work</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>How to write effective instructions for AI agents</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>Building workflows to connect multiple AI agents</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>Securing your data when working with AI</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>Preparing for the future of AI agent technology</span>
          </li>
        </ul>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <Button onClick={handleDownload} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Certificate
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share Your Achievement
        </Button>
      </div>
      
      <div className="text-gray-600 italic">
        "The future is already here with AI agents – you're now ready to make the most of it!"
      </div>
    </div>
  );
};

export default GraduationStage;
