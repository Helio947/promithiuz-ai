
import MainContent from "@/components/forged-sword/MainContent";
import Overview from "@/components/forged-sword/Overview";
import SystemApproach from "@/components/forged-sword/SystemApproach";
import AIToolCategory from "@/components/forged-sword/AIToolCategory";
import BestPracticeCategory from "@/components/forged-sword/BestPracticeCategory";
import StrategyCategory from "@/components/forged-sword/StrategyCategory";
import Header from "@/components/Header";

const ForgedSword = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Overview />
        <SystemApproach />
        <MainContent />
        <div className="space-y-16 mt-16">
          <AIToolCategory />
          <BestPracticeCategory />
          <StrategyCategory />
        </div>
      </main>
    </div>
  );
};

export default ForgedSword;
