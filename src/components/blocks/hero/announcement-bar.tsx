'use client';

import { motion } from "@/components/ui/motion";
import { Star } from "lucide-react";

interface AnnouncementProps {
  label?: string;
  title?: string;
}

export function AnnouncementBar({ label, title }: AnnouncementProps) {
  if (!label && !title) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center rounded-full border border-primary/30 bg-background/30 backdrop-blur-lg py-2 px-4 gap-2 shadow-lg shadow-primary/20"
    >
      <div className="flex items-center">
        {label && (
          <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            {label}
          </div>
        )}
        
        <div className="flex items-center gap-0.5 mx-2">
          <Star className="h-3 w-3 text-yellow-300 fill-yellow-300" />
          <Star className="h-3 w-3 text-yellow-300 fill-yellow-300" />
          <Star className="h-3 w-3 text-yellow-300 fill-yellow-300" />
        </div>
        
        <span className="text-white font-medium text-sm whitespace-nowrap">
          {title}
        </span>
      </div>
    </motion.div>
  );
}
