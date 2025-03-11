'use client'

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { motion } from "@/components/ui/motion";
import { useEffect, useState } from "react";
import { AnnouncementBar } from "./announcement-bar";

const Hero = () => {
  const t = useTranslations('hero');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScrollToInput = () => {
    const element = document.getElementById('generator-section');
    if (element) {
      // 计算滚动位置，使页面在Generator和Showcase之间
      const windowHeight = window.innerHeight;
      const elementRect = element.getBoundingClientRect();
      const elementHeight = elementRect.height;
      
      // 减小下拉幅度，使页面滚动到更上方的位置
      const offset = element.offsetTop;
      
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
      console.log("Scrolling to generator at position:", offset, "Window height:", windowHeight);
    }
  };

  const handleScrollToGallery = () => {
    console.log("Hero: handleScrollToGallery called");
    
    // 增加延迟时间，确保DOM已完全渲染
    setTimeout(() => {
      const galleryElement = document.getElementById('generated-images');
      console.log("Hero: Looking for gallery element", galleryElement);
      
      if (galleryElement) {
        const headerOffset = 80;
        const elementPosition = galleryElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        console.log("Hero: Gallery element found at position:", elementPosition, "Scrolling to:", offsetPosition);
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        console.error("Gallery element not found in hero component");
        // 尝试查找showcase元素作为备选
        const showcaseElement = document.querySelector('.showcase-section');
        if (showcaseElement) {
          console.log("Hero: Using showcase section as fallback");
          const headerOffset = 80;
          const elementPosition = showcaseElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 300); // 增加延迟时间以确保DOM加载完毕
  };

  const handleButtonClick = (url?: string) => {
    if (!url) return;
    
    if (url === "#try-it-now" || url === "#generator-section") {
      handleScrollToInput();
    } else if (url === "#generated-images" || url === "#gallery") {
      handleScrollToGallery();
    } else if (url.startsWith('#')) {
      // 处理其它内部锚点链接
      const elementId = url.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        const offset = element.offsetTop - 80;
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }
    } else if (url.startsWith('http') || url.startsWith('https')) {
      // 外部链接
      window.open(url, '_blank');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-24 md:py-32">
      {/* 公告内容 */}
      <div className="mb-12">
        <AnnouncementBar 
          label={t('announcement.label')}
          title={t('announcement.title')}
        />
      </div>

      {/* 主标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-center max-w-6xl"
      >
        <h1 className="text-center font-bold tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="text-white block">{t('create')} </span>
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text animate-gradient-x">
              {t('highlight_text')}
            </span>
          </span>
        </h1>
      </motion.div>

      {/* 描述文本 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-10 max-w-3xl text-center"
      >
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
          {t('description')}
        </p>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
          {t('description2')}
        </p>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
          {t('description3')}
        </p>
      </motion.div>

      {/* 按钮区域 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-12 flex flex-col sm:flex-row gap-5"
      >
        <Button 
          onClick={() => handleButtonClick("#try-it-now")}
          size="lg"
          className="h-14 px-10 text-lg bg-primary hover:bg-primary/90 text-white hover:text-white hover:scale-105 transition-all duration-300 rounded-full shadow-lg shadow-primary/30"
        >
          <span className="relative flex items-center gap-1.5">
            {t('buttons.create')}
            <span className="text-xl">✨</span>
          </span>
        </Button>
        <Button 
          onClick={() => handleButtonClick("#gallery")}
          variant="outline" 
          size="lg"
          className="h-14 px-10 text-lg border-white/20 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 rounded-full shadow-lg shadow-primary/5 hover:shadow-primary/20"
        >
          <span className="flex items-center gap-1.5">
            {t('buttons.gallery')}
            <span className="text-xl">🖼️</span>
          </span>
        </Button>
      </motion.div>

      {/* 底部信息 */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-20 text-xs text-muted-foreground absolute bottom-6 left-0 right-0 text-center"
      >
        <div className="flex items-center justify-center">
          <div className="flex h-6 items-center gap-1.5">
            <span className="text-sm">🚀</span>
            <p className="text-sm text-muted-foreground">{t('powered_by')}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
