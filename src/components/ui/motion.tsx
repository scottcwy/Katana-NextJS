"use client";

import { 
  motion as framerMotion,
  AnimatePresence as FramerAnimatePresence,
  HTMLMotionProps
} from "framer-motion";
import { ReactNode } from "react";

// 重新导出 framer-motion 组件，确保它们在客户端组件中使用
export const motion = framerMotion;
export const AnimatePresence = FramerAnimatePresence;

// 预定义一些常用的动画变体
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

export const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// 为动画组件定义基本props类型
interface AnimationProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

// 创建一些常用的动画组件
export const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  ...props 
}: AnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const SlideUp = ({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  ...props 
}: AnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  ...props 
}: AnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
