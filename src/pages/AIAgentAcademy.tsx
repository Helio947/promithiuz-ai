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
    title: "Understanding AI Agents - Knowledge Check",
    description: "Let's discover what you know about AI agents and tailor your learning journey accordingly",
    content: "basics",
    interactionType: "quiz",
    completionCriteria: "correct-answer",
    questions: [
      {
        question: "An AI agent is a computer program that can automatically perform tasks and make decisions. Which of these best describes what makes an AI agent different from regular software?",
        options: [
          "It only follows pre-written commands exactly as programmed",
          "It can understand context, learn from interactions, and adapt its responses",
          "It requires constant human supervision to function properly",  
          "It can only work with text-based information"
        ],
        correctIndex: 1
      },
      {
        question: "AI agents can be designed to handle various types of tasks autonomously. Which scenario best demonstrates an AI agent's capability?",
        options: [
          "A calculator that adds numbers when you press buttons",
          "A smart assistant that reads your emails, prioritizes them, and drafts responses based on their content and urgency",
          "A website that displays the same information to every visitor",
          "A video player that plays files when you click on them"
        ],
        correctIndex: 1
      },
      {
        question: "Modern AI agents can process and understand different types of information. What types of data can advanced AI agents typically work with?",
        options: [
          "Only text and numbers",
          "Only images and videos", 
          "Text, images, audio, code, and structured data like spreadsheets",
          "Only information that has been specifically programmed into them"
        ],
        correctIndex: 2
      },
      {
        question: "AI agents can be connected together to create powerful workflows. What happens when you chain multiple AI agents together?",
        options: [
          "They compete with each other and slow down the process",
          "Each agent can specialize in one task, then pass results to the next agent, creating complex automated workflows",
          "They all do the same task simultaneously for backup",
          "They can only work if a human supervises each step"
        ],
        correctIndex: 1
      },
      {
        question: "To get the best results from an AI agent, how should you communicate with it?",
        options: [
          "Use only single-word commands",
          "Speak to it exactly like you would to a computer program with technical terms",
          "Give clear, specific instructions with context about what you want to achieve, similar to briefing a skilled assistant",
          "Ask it to guess what you want without providing details"
        ],
        correctIndex: 2
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
