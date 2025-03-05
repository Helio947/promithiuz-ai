
import { Heart, Lightbulb, Users } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhoWeAre = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <Header />
      
      <div className="pt-24 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Mission & Vision
            </h1>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                <div className="rounded-full bg-primary/10 p-5">
                  <Heart className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Why We Exist</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Promithiuz AI was born from a deep understanding that small businesses deserve the same AI advantages that large corporations enjoy. We witnessed firsthand how emerging AI technologies were creating a widening gap between well-resourced enterprises and smaller businesses struggling to keep pace with digital transformation.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                We believe that AI shouldn't be a luxury—it should be accessible to all. That realization sparked a mission: to democratize AI by creating intuitive tools that business owners could use without needing a data science degree or enterprise-level resources.
              </p>
              
              <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                <div className="rounded-full bg-secondary/10 p-5">
                  <Lightbulb className="w-12 h-12 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Our Purpose</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Beyond building technological solutions, we exist to empower. Every feature we design, every tool we forge, has one purpose: to put advanced AI capabilities into the hands of those who need it most—the backbone of our economy, small and medium businesses.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-10">
                The significance of our work extends beyond profit margins. When a local retailer can analyze customer data as effectively as a national chain, when a family-owned manufacturing company can optimize operations like industry giants, we help level the playing field. This creates stronger local economies, more resilient communities, and preserves the unique character that small businesses bring to our world.
              </p>
              
              <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                <div className="rounded-full bg-green-100 p-5">
                  <Users className="w-12 h-12 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Who We Serve</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We proudly serve visionary small business owners who understand that embracing technology isn't optional—it's essential. Our community includes entrepreneurs who may not have technical backgrounds but recognize the need to evolve; marketing teams seeking to amplify their impact without expanding their headcount; and operations managers looking to eliminate inefficiencies through intelligent automation.
                  </p>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-8 text-center">Vision for the Future</h2>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">Join Us on This Journey</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                We're more than a software company—we're partners in your business growth. Every feature we develop is born from listening to the real challenges you face, and every solution is designed with your success in mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Link to="/forge">
                    Start Your AI Journey
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/auth">
                    Join Our Community
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
