import { useState } from "react";
import { Layout } from "@/components/Layout";
import AIAgentGameHeader from "@/components/ai-agent-academy/AIAgentGameHeader";
import GameStage from "@/components/ai-agent-academy/GameStage";
import GameControls from "@/components/ai-agent-academy/GameControls";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import analytics from "@/utils/analytics";

const AIAgentAcademy = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [gameProgress, setGameProgress] = useState({
    stagesCompleted: 0,
    points: 0,
    badges: [] as string[]
  });
  const { user } = useAuth();
  
  const handleNextStage = () => {
    if (currentStage < gameStages.length - 1) {
      setCurrentStage(currentStage + 1);
      setGameProgress(prev => ({
        ...prev,
        stagesCompleted: Math.max(prev.stagesCompleted, currentStage + 1),
        points: prev.points + 10
      }));
      
      analytics.trackEvent("academy_stage_completed", { 
        stage: currentStage,
        userId: user?.id 
      });
      
      if ((currentStage + 1) % 2 === 0) {
        const newBadge = `Level ${Math.floor((currentStage + 1) / 2)} Complete`;
        if (!gameProgress.badges.includes(newBadge)) {
          setGameProgress(prev => ({
            ...prev,
            badges: [...prev.badges, newBadge]
          }));
          toast.success(`🎖️ New badge earned: ${newBadge}`);
        }
      }
    }
  };
  
  const handlePreviousStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };
  
  const handleRestart = () => {
    setCurrentStage(0);
    toast.info("Game restarted! Let's learn about AI agents");
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <AIAgentGameHeader 
          progress={gameProgress} 
          currentStage={currentStage} 
          totalStages={gameStages.length}
        />
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden my-8">
          <GameStage 
            stage={gameStages[currentStage]} 
            onComplete={handleNextStage}
          />
          
          <GameControls 
            onNext={handleNextStage}
            onPrevious={handlePreviousStage}
            onRestart={handleRestart}
            isFirstStage={currentStage === 0}
            isLastStage={currentStage === gameStages.length - 1}
            stageCompleted={gameProgress.stagesCompleted >= currentStage}
          />
        </div>
      </div>
    </Layout>
  );
};

const gameStages = [
  {
    id: "intro",
    title: "Welcome to AI Agent Academy",
    description: "Learn how AI agents can simplify your daily tasks",
    content: "intro",
    interactionType: "simple",
    completionCriteria: "click"
  },
  {
    id: "basics",
    title: "Let's Get to Know You",
    description: "Help us understand your experience with AI agents so we can personalize your learning journey",
    content: "basics",
    interactionType: "quiz",
    completionCriteria: "correct-answer",
    questions: [
      {
        question: "What's your current experience with AI agents?",
        options: [
          "I've never used AI tools before",
          "I've used ChatGPT or similar tools occasionally",
          "I regularly use AI in my work/life",
          "I'm an AI professional or developer"
        ],
        correctIndex: 1
      },
      {
        question: "What's your main goal for learning about AI agents?",
        options: [
          "Automating personal tasks",
          "Improving work productivity",
          "Building AI-powered applications",
          "Just curious about the technology"
        ],
        correctIndex: 1
      },
      {
        question: "Which AI capability interests you the most?",
        options: [
          "Processing and analyzing text",
          "Working with images and visual content",
          "Handling data and numbers",
          "Conversational abilities"
        ],
        correctIndex: 3
      },
      {
        question: "How do you prefer to interact with AI tools?",
        options: [
          "Through natural conversation",
          "Using specific commands/prompts",
          "Via a graphical interface",
          "Through code/programming"
        ],
        correctIndex: 0
      },
      {
        question: "What's your biggest concern about using AI agents?",
        options: [
          "Privacy and security",
          "Accuracy and reliability",
          "Ease of use",
          "Cost and accessibility"
        ],
        correctIndex: 1
      }
    ]
  },
  {
    id: "use-cases",
    title: "Everyday AI Uses",
    description: "See how AI agents fit into your daily routine",
    content: "use-cases",
    interactionType: "drag-drop",
    completionCriteria: "all-matched",
    items: [
      { task: "Schedule meetings", agent: "Calendar AI" },
      { task: "Summarize long articles", agent: "Content Assistant" },
      { task: "Automate email responses", agent: "Email AI" },
      { task: "Find information quickly", agent: "Research Agent" }
    ]
  },
  {
    id: "instruction",
    title: "How to Instruct AI Agents",
    description: "Learn the art of giving clear instructions",
    content: "instruction",
    interactionType: "practice",
    completionCriteria: "completion",
    exercise: {
      task: "Write an instruction for an AI to summarize an article",
      goodExample: "Please summarize this article about climate change, focusing on key statistics and main arguments in 3-4 bullet points.",
      badExample: "Summarize this."
    }
  },
  {
    id: "workflow",
    title: "Building AI Workflows",
    description: "Connect multiple AI agents to automate complex tasks",
    content: "workflow",
    interactionType: "flowchart",
    completionCriteria: "valid-flow",
    flowElements: [
      { id: "trigger", type: "start", label: "New Email Arrives" },
      { id: "categorize", type: "process", label: "Categorize Email" },
      { id: "urgent", type: "decision", label: "Is it urgent?" },
      { id: "notify", type: "process", label: "Send Notification" },
      { id: "draft", type: "process", label: "Draft Response" },
      { id: "send", type: "end", label: "Send or Save Draft" }
    ]
  },
  {
    id: "security",
    title: "AI Security & Privacy",
    description: "Protect your data while using AI agents",
    content: "security",
    interactionType: "choose-path",
    completionCriteria: "all-correct",
    scenarios: [
      {
        situation: "An AI agent asks for access to all your files",
        options: [
          { text: "Grant full access", isCorrect: false },
          { text: "Only grant access to specific folders needed", isCorrect: true },
          { text: "Deny access completely", isCorrect: false }
        ]
      }
    ]
  },
  {
    id: "future",
    title: "The Future of AI Agents",
    description: "What's next in the world of AI assistants",
    content: "future",
    interactionType: "simple",
    completionCriteria: "click"
  },
  {
    id: "graduation",
    title: "Congratulations!",
    description: "You're now ready to use AI agents effectively",
    content: "graduation",
    interactionType: "certificate",
    completionCriteria: "download"
  }
];

export default AIAgentAcademy;
