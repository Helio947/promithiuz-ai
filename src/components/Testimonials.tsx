
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content: "Promithiuz AI helped us automate our customer service processes, saving us 15+ hours weekly. The ROI has been incredible!",
    avatarInitials: "SJ",
    avatarSrc: "/placeholder.svg" 
  },
  {
    name: "Michael Chen",
    role: "Marketing Director",
    content: "The content creation capabilities are phenomenal. We've cut our content production time by 40% while improving quality.",
    avatarInitials: "MC",
    avatarSrc: "/placeholder.svg"
  },
  {
    name: "Alex Rivera",
    role: "Freelance Consultant",
    content: "Forged Sword has been a game-changer for my consulting business. My clients are amazed by how quickly I can deliver insights now.",
    avatarInitials: "AR",
    avatarSrc: "/placeholder.svg"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it. Here's what businesses like yours have experienced with Promithiuz AI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <Avatar className="h-16 w-16 border-2 border-primary/20">
                    <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.avatarInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
