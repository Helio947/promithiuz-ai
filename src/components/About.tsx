import { Eye, TrendingUp, Clock, DollarSign } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
            Empowering Small Businesses with AI
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
            In today's fast-paced business world, staying competitive means being efficient. 
            Promithiuz AI helps small businesses harness the power of artificial intelligence 
            to reduce costs, save time, and grow their business.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl w-full transition-all duration-300 hover:shadow-2xl">
            <div className="mb-8 text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Real Business Impact</h3>
              <p className="text-gray-600">
                See how businesses like yours are transforming with AI:
              </p>
            </div>
            
            <div className="space-y-5 md:space-y-6">
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg transition-all duration-300 hover:bg-primary/10">
                <DollarSign className="w-7 h-7 md:w-8 md:h-8 text-green-500 shrink-0" />
                <div>
                  <p className="font-semibold">40% Cost Reduction</p>
                  <p className="text-sm text-gray-600">In customer service operations</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-secondary/5 rounded-lg transition-all duration-300 hover:bg-secondary/10">
                <Clock className="w-7 h-7 md:w-8 md:h-8 text-primary shrink-0" />
                <div>
                  <p className="font-semibold">15+ Hours Saved Weekly</p>
                  <p className="text-sm text-gray-600">Through task automation</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg transition-all duration-300 hover:bg-green-100">
                <TrendingUp className="w-7 h-7 md:w-8 md:h-8 text-secondary shrink-0" />
                <div>
                  <p className="font-semibold">30% Revenue Growth</p>
                  <p className="text-sm text-gray-600">From improved efficiency</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100">
                <Eye className="w-7 h-7 md:w-8 md:h-8 text-blue-500 shrink-0" />
                <div>
                  <p className="font-semibold">5x Faster Decision Making</p>
                  <p className="text-sm text-gray-600">With AI-powered insights</p>
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
