
import { Layout } from "@/components/Layout";
import { HuggingFaceDemo } from "@/components/HuggingFaceDemo";

const HuggingFaceAI = () => {
  return (
    <Layout>
      <div className="container mx-auto py-20 pt-24">
        <HuggingFaceDemo />
      </div>
    </Layout>
  );
};

export default HuggingFaceAI;
