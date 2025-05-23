'use client'

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// 动态导入粒子背景组件以避免SSR问题
const ParticlesBackground = dynamic(() =>
  import('@/components/blocks/hero/particles-background'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background"></div>
});

export const SharedBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {/* 主要背景颜色和渐变 */}
      <div 
        className="absolute inset-0 bg-background opacity-90 animate-gradient-x"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 40%, rgba(112, 50, 176, 0.15) 0%, rgba(var(--muted), 0) 70%), 
                         radial-gradient(circle at 70% 60%, rgba(220, 31, 255, 0.1) 0%, rgba(var(--muted), 0) 60%)`
        }}
      />
      
      {/* 粒子背景 */}
      {mounted && <ParticlesBackground />}
      
      {/* 网格背景 */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] opacity-20" />

      {/* 装饰性光效 */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      
      {/* 添加全局样式 */}
      {mounted && (
        <style jsx global>{`
          /* 网格背景样式 */
          .bg-grid-white {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
          }
          
          /* 添加渐变动画样式 */
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .animate-gradient-x {
            animation: gradient-x 10s ease infinite;
            background-size: 200% 200%;
          }

          /* 确保背景色应用到整个页面 */
          body {
            background-color: var(--background);
          }
        `}</style>
      )}
    </div>
  );
};

export default SharedBackground;
