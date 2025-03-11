'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  highlighted?: boolean; 
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    setIsRendered(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      if (!canvas) return; 
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    window.addEventListener('resize', setCanvasSize);

    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 60); 
    
    const colors = [
      'rgba(168, 85, 247, 0.4)', 
      'rgba(217, 70, 239, 0.4)', 
      'rgba(139, 92, 246, 0.4)', 
      'rgba(124, 58, 237, 0.4)', 
    ];

    for (let i = 0; i < particleCount; i++) {
      const highlighted = Math.random() > 0.95;
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: highlighted ? Math.random() * 3 + 1 : Math.random() * 2 + 0.5, 
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: highlighted ? Math.random() * 0.7 + 0.3 : Math.random() * 0.5 + 0.1, 
        highlighted
      });
    }

    function animate() {
      if (!canvas || !ctx || !isRendered) return; 
      
      animationRef.current = requestAnimationFrame(animate);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const connectionCheckLimit = Math.min(particles.length, 30);
      
      particles.forEach((particle) => {
        if (!canvas) return; 
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        if (particle.highlighted) {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0, 
            particle.x, particle.y, particle.size * 2
          );
          gradient.addColorStop(0, particle.color.replace('0.4', '0.8'));
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = particle.color.replace('0.4', particle.alpha.toString());
        }
        
        ctx.fill();
      });

      for (let i = 0; i < connectionCheckLimit; i++) {
        for (let j = i + 1; j < connectionCheckLimit; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            
            if (particles[i].highlighted || particles[j].highlighted) {
              ctx.strokeStyle = `rgba(236, 72, 153, ${0.25 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.8;
            } else {
              ctx.strokeStyle = `rgba(236, 72, 153, ${0.15 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.4;
            }
            
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    animate();

    return () => {
      setIsRendered(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 -z-10 opacity-40 pointer-events-none"
    />
  );
}
