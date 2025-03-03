
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import { Message } from "@/types/prometheus-vision";
import ChatInterface from "@/components/prometheus-vision/ChatInterface";
import { cn } from "@/lib/utils";

const PrometheusVision = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Particle system setup
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Make canvas responsive
    const resize = () => {
      const size = Math.min(window.innerWidth * 0.8, 600);
      canvas.width = size;
      canvas.height = size;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Create particles
    const particles: {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      angle: number;
      distance: number;
    }[] = [];

    const particleCount = 800;
    const radius = canvas.width / 2 - 20;
    const center = { x: canvas.width / 2, y: canvas.height / 2 };

    for (let i = 0; i < particleCount; i++) {
      // Place particles on a sphere surface
      const angle1 = Math.random() * Math.PI * 2; // around the circle
      const angle2 = Math.random() * Math.PI * 2; // for 3D effect

      // Use spherical coordinates to place points on sphere
      const distance = radius * 0.8 + (Math.random() * radius * 0.2);
      
      // Project 3D point to 2D
      const x = center.x + Math.cos(angle1) * Math.sin(angle2) * distance;
      const y = center.y + Math.sin(angle1) * Math.sin(angle2) * distance;
      
      particles.push({
        x,
        y,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.0005 + 0.0002,
        angle: Math.random() * Math.PI * 2,
        distance: Math.sqrt(Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2)) / radius
      });
    }

    // Animation function
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach(particle => {
        // Update particle position for slight movement
        particle.angle += particle.speed;
        
        const distanceFromCenter = Math.sqrt(
          Math.pow(particle.x - center.x, 2) + 
          Math.pow(particle.y - center.y, 2)
        );
        
        // Only draw if the particle is within the sphere bounds
        if (distanceFromCenter <= radius) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(80, 80, 80, ${particle.opacity})`;
          
          // Particles closer to typing state have higher opacity
          if (isTyping) {
            const boost = Math.random() * 0.3;
            ctx.fillStyle = `rgba(80, 80, 80, ${particle.opacity + boost})`;
          }
          
          ctx.fill();
        }
      });
      
      // Draw a subtle glow effect when typing
      if (isTyping) {
        const gradient = ctx.createRadialGradient(
          center.x, center.y, radius * 0.5,
          center.x, center.y, radius
        );
        gradient.addColorStop(0, 'rgba(126, 105, 171, 0.05)');
        gradient.addColorStop(1, 'rgba(249, 115, 22, 0)');
        
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resize);
    };
  }, [isTyping]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 relative">
            {/* Canvas for particle system */}
            <div className="flex justify-center items-center mx-auto mb-4">
              <canvas 
                ref={canvasRef} 
                className="max-w-full touch-none"
                style={{ maxWidth: '80vw', maxHeight: '80vw' }}
              />
            </div>
            
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Your business insights hub powered by AI
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ChatInterface 
              messages={messages}
              setMessages={setMessages}
              isTyping={isTyping}
              setIsTyping={setIsTyping}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrometheusVision;
