"use client"

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from 'next-intl';
import { RiMagicFill, RiGalleryFill, RiArrowDownLine, RiLightbulbFlashLine, RiStarFill, RiDownload2Line, RiSparklingFill, RiArrowRightLine } from 'react-icons/ri';
import { ImSpinner8 } from 'react-icons/im';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Showcase } from '@/components/image/Showcase'; // 展示组件
import { Gallery, GalleryRef } from '@/components/image/Gallery'; // 图库组件

export function ImageGenerator() {
  const t = useTranslations('generator');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const galleryDivRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<GalleryRef>(null);

  // 获取当前语言环境
  const currentLocale = typeof document !== 'undefined' 
    ? document.documentElement.getAttribute('data-locale') || 'en'
    : 'en';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScrollToInput = () => {
    if (inputRef.current) {
      // 计算窗口高度和元素位置
      const windowHeight = window.innerHeight;
      const elementRect = inputRef.current.getBoundingClientRect();
      const elementHeight = elementRect.height;
      
      // 计算滚动位置
      const offsetPosition = elementRect.top + window.scrollY;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      console.log("Scrolling to input at position:", offsetPosition, "Window height:", windowHeight);
    }
  };

  const handleScrollToGallery = () => {
    console.log("Interface: handleScrollToGallery called");
    
    // 添加小延迟确保DOM已更新
    setTimeout(() => {
      const galleryElement = document.getElementById('generated-images');
      console.log("Interface: Looking for gallery element", galleryElement);
      
      if (galleryElement) {
        const headerOffset = 80;
        const elementPosition = galleryElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        console.log("Interface: Gallery element found at position:", elementPosition, "Scrolling to:", offsetPosition);
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        console.error("Gallery element not found in interface component");
        // 尝试找到展示区域作为备用
        const showcaseElement = document.querySelector('.showcase-section');
        if (showcaseElement) {
          console.log("Interface: Using showcase section as fallback");
          const headerOffset = 80;
          const elementPosition = showcaseElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 300); // 添加小延迟确保DOM已更新
  };

  // 示例提示词
  const samplePrompts = [
    t('prompts.sample1') || "A futuristic cityscape with flying cars and neon lights",
    t('prompts.sample2') || "Mountain landscape at sunset with reflective lake",
    t('prompts.sample3') || "Abstract digital art with geometric shapes in vibrant colors"
  ];

  const handleUseSamplePrompt = (sample: string) => {
    setPrompt(sample);
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError('');
      setImageUrl('');

      const response = await fetch('/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': currentLocale
        },
        body: JSON.stringify({
          prompt,
          user_uuid: 'test-user',
          locale: currentLocale,
          size: {
            width: 1024,
            height: 1024
          }
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.images && data.images.length > 0) {
        const imageUrl = data.images[0];
        setImageUrl(imageUrl);

        // 确保URL格式正确
        const formattedUrl = imageUrl.startsWith('http') || imageUrl.startsWith('/') 
          ? imageUrl 
          : `/${imageUrl.replace(/^\/?/, '')}`;

        const newImage = {
          url: formattedUrl,
          prompt: prompt,
          createdAt: new Date().toLocaleString(navigator.language || 'en-US')
        };

        // 添加到Gallery
        if (galleryRef.current) {
          console.log('添加图片到画廊', newImage);
          galleryRef.current.addImage(newImage);
        }
      } else {
        throw new Error(t('error.generation_failed'));
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      className="py-16 md:py-24 relative z-10 overflow-hidden"
      id="generator-section"
      ref={inputRef}
    >
      
      <div className="container mx-auto px-4 sm:px-6 relative z-20">
        {/* 标题区域 */}
        
        <motion.div
          className="flex flex-col space-y-6 items-center justify-center text-center w-full max-w-4xl mx-auto mb-16 overflow-hidden relative z-30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid gap-6 md:gap-8">
            {/* 主标题和描述 */}
            <div className="space-y-4 text-center relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-shadow-lg">
                <span className="text-white">
                  {t('title')}
                </span>
              </h1>
              <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed text-shadow">
                {t('description')}
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-8 bg-gradient-to-b from-background/20 to-background/10 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-primary/30 shadow-lg relative overflow-hidden z-30"
        >
          {/* 顶部装饰 */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-primary/80 opacity-70"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full filter blur-[50px]"></div>
          
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="prompt-input" className="text-lg font-medium text-primary flex items-center gap-2">
                  <RiLightbulbFlashLine className="text-xl text-primary" />
                  {t('input.label') || "Describe your dream image"}
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-primary hover:text-primary/80 hover:bg-primary/20"
                        onClick={() => setPrompt('')}
                      >
                        {t('input.clear') || "Clear"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('input.clear_tooltip') || "Clear prompt input"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="relative">
                <Input
                  id="prompt-input"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={t('input.placeholder') || "A cyberpunk cityscape at night with neon lights reflecting in rain puddles..."}
                  disabled={loading}
                  className="min-h-24 px-6 py-5 text-lg bg-background/50 border-primary/30 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all placeholder:text-muted-foreground/80 resize-none"
                />
                <div className="absolute right-3 bottom-3">
                  <span className={`text-sm ${prompt.length > 0 ? 'text-primary/80' : 'text-muted-foreground'}`}>
                    {prompt.length} {t('input.characters') || "characters"}
                  </span>
                </div>
              </div>
            </div>
            
            {/* 样例提示词 */}
            <div className="space-y-3">
              <p className="text-sm text-primary flex items-center gap-1.5 font-medium">
                <RiStarFill className="text-primary" />
                {t('prompts.suggestions') || "Try these inspiring examples:"}
              </p>
              <div className="flex flex-wrap gap-3">
                {samplePrompts.map((sample, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleUseSamplePrompt(sample)}
                    className="bg-primary/10 border-primary/20 hover:border-primary/40 hover:bg-primary/20 text-primary py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow"
                  >
                    {sample}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <Button
            onClick={handleGenerate}
            disabled={!prompt || loading}
            className="relative group overflow-hidden w-full h-16 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.01] transition-all duration-300"
          >
            {loading ? (
              <div className="flex items-center space-x-3">
                <ImSpinner8 className="animate-spin text-xl" />
                <span>{t('button.loading')}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span className="flex-grow text-center">{t('button.generate')}</span>
                <span className="text-lg">✨</span>
              </div>
            )}
          </Button>
          
          {/* 错误信息显示 */}
          
        </motion.div>

        <AnimatePresence>
          {imageUrl && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="max-w-3xl mx-auto mt-12 relative z-30"
            >
              <div className="relative overflow-hidden rounded-2xl border border-primary/30 shadow-2xl shadow-primary/10 bg-transparent">
                {/* 移除额外的渐变层 */}
                <img 
                  src={imageUrl} 
                  alt={prompt} 
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-6 backdrop-blur-sm bg-gradient-to-t from-background/90 via-background/60 to-transparent">
                  <div className="text-primary space-y-3">
                    <h3 className="text-xl font-bold">{t('result.title')}</h3>
                    <p className="text-primary/90 line-clamp-2">{prompt}</p>
                    <div className="flex gap-3 pt-2">
                      <Button
                        onClick={() => {
                          // 下载图片
                          const link = document.createElement('a');
                          link.href = imageUrl;
                          link.download = `${t('result.download_filename')}-${Date.now()}.png`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 flex-1"
                      >
                        <RiDownload2Line className="mr-2" />
                        {t('button.download')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* 展示区域和生成的图片库 */}
        <div ref={galleryDivRef} id="generated-images" className="relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* 高质量展示 */}
            <Showcase />
            <Gallery ref={galleryRef} />
          </motion.div>
        </div>
        
        {/* 全局样式 */}
        {mounted && (
          <style jsx global>{`
            @keyframes gradient-x {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            
            .animate-gradient-x {
              animation: gradient-x 15s ease infinite;
              background-size: 200% 200%;
            }
            
            .text-gradient-purple-blue {
              background: linear-gradient(45deg, #8E2DE2, #4A00E0);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              color: transparent;
            }
          `}</style>
        )}
      </div>
    </section>
  );
};
