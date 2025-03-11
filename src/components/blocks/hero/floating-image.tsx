'use client';

import { motion } from '@/components/ui/motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface FloatingImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  delay?: number;
  amplitude?: number; // 振幅大小
  duration?: number; // 动画周期
}

export default function FloatingImage({
  src,
  alt,
  width,
  height,
  className = '',
  delay = 0,
  amplitude = 10,
  duration = 6
}: FloatingImageProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        x: [0, amplitude, 0, -amplitude, 0]
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        y: { duration: 0.8, delay },
        x: { 
          duration: duration, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay 
        }
      }}
      className={`relative ${className}`}
      style={{ 
        maxWidth: width, 
        maxHeight: height 
      }}
    >
      <div className="rounded-lg overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.3)] border border-purple-500/30">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover"
        />
      </div>
      
      {/* Reflection effect */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-30 bg-gradient-to-tr from-transparent via-purple-400/20 to-transparent rounded-lg"
        style={{
          transform: 'translateY(5%) rotate(-5deg) scale(0.95)',
          filter: 'blur(5px)'
        }}
      />
    </motion.div>
  );
}
