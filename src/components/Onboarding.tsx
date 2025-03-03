
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const steps = [
  {
    title: "Welcome to Promithiuz AI",
    description: "Your business growth partner powered by artificial intelligence.",
    content: "We're excited to have you on board. Let's take a quick tour to help you get the most out of our platform."
  },
  {
    title: "Discover AI Insights",
    description: "Use Promithiuz Vision to analyze your business data.",
    content: "Ask questions about your sales, customer feedback, or market trends. Our AI will provide actionable insights to help drive your business forward."
  },
  {
    title: "Build AI Workflows",
    description: "Create custom AI workflows with The Forge.",
    content: "Drag and drop AI components to automate repetitive tasks, generate content, or analyze data—no coding required."
  },
  {
    title: "Optimize Your Prompts",
    description: "Create and share effective AI prompts with Prompt Engine.",
    content: "Browse our library of prompts or create your own to achieve consistent results with AI tools."
  },
  {
    title: "Unlock Premium Features",
    description: "Maximize your ROI with Forged Sword.",
    content: "Access advanced AI strategies, content templates, and training modules designed specifically for small businesses."
  }
];

const Onboarding = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOpen(false);
      setCurrentStep(0);
    }
  };

  const handleSkip = () => {
    setOpen(false);
    setCurrentStep(0);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {steps[currentStep].title}
          </DialogTitle>
          <DialogDescription className="text-lg font-medium text-primary">
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <p className="text-gray-700 mb-6">
            {steps[currentStep].content}
          </p>

          <div className="flex justify-center space-x-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentStep ? "bg-primary w-8" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleSkip}>
            Skip Tour
          </Button>
          <Button onClick={handleNext} className="gap-2">
            {currentStep < steps.length - 1 ? "Next" : "Get Started"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Onboarding;
