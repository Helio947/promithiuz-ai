
import { Brain, TrendingUp, Clock, DollarSign } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
            Empowering Small Businesses with AI
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            In today's fast-paced business world, staying competitive means being efficient. 
            Promithiuz AI helps small businesses harness the power of artificial intelligence 
            to reduce costs, save time, and grow their business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Smart Automation</h3>
                <p className="text-gray-600">
                  Our AI solutions automate repetitive tasks, from customer service to data entry, 
                  letting you focus on what matters most - growing your business.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                <p className="text-gray-600">
                  Our clients see an average of 40% cost reduction and 15+ hours saved weekly 
                  through AI automation and optimization.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Quick Implementation</h3>
                <p className="text-gray-600">
                  Get started in minutes, not months. Our solutions integrate seamlessly 
                  with your existing workflows and start delivering value immediately.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Real Business Impact</h3>
              <p className="text-gray-600">
                See how businesses like yours are transforming with AI:
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                <DollarSign className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-semibold">40% Cost Reduction</p>
                  <p className="text-sm text-gray-600">In customer service operations</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-secondary/5 rounded-lg">
                <Clock className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-semibold">15+ Hours Saved Weekly</p>
                  <p className="text-sm text-gray-600">Through task automation</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-secondary" />
                <div>
                  <p className="font-semibold">30% Revenue Growth</p>
                  <p className="text-sm text-gray-600">From improved efficiency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
