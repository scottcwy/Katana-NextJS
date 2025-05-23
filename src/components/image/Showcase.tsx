'use client'

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef } from 'react';

// 定义全局变量类型，与interface.tsx中的保持一致
declare global {
  interface Window {
    __fluxGalleryTarget?: string | null;
  }
}

// 定义三张预设图片的数据
const PRESET_IMAGES = [
  {
    id: 1,
    url: '/images/07b1a04b-cc56-481f-a8cd-8e1618989898_0.png',
    prompt: '',  // 
  },
  {
    id: 2,
    url: '/images/5a8ccbe9-3bee-4eff-aff1-ff0e7555881b_0.png',
    prompt: '',  // 
  },
  {
    id: 3,
    url: '/images/5b45db9a-e2d7-49bd-a0aa-d1d96658f0ad_0.png',
    prompt: '',  // 
  }
];

interface ShowcaseProps {
  onViewGallery?: () => void;
}

export const Showcase = ({ onViewGallery }: ShowcaseProps) => {
  // 创建对组件的引用
  const showcaseRef = useRef<HTMLDivElement>(null);
  
  // 尝试获取翻译，如果失败则使用默认值
  let t;
  try {
    t = useTranslations('generator');
  } catch (error) {
    console.error('Failed to load translations:', error);
    t = (key: string) => {
      const defaultTranslations: Record<string, string> = {
        'showcase.title': 'Featured Creations',
        'showcase.description': 'Explore these stunning AI-generated wallpapers',
        'showcase.examples.cityscape': 'Cityscape',
        'showcase.examples.mountain': 'Mountain',
        'showcase.examples.abstract': 'Abstract',
      };
      return defaultTranslations[key] || key;
    };
  }

  return (
    <div id="showcase-section" ref={showcaseRef} className="mt-16 mb-20 px-4 showcase-section gallery-section" data-target="gallery-target">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t('showcase.title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t('showcase.description')}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRESET_IMAGES.map((image, index) => {
          // 基于索引获取适当的翻译键
          const promptKeys = ['showcase.examples.cityscape', 'showcase.examples.mountain', 'showcase.examples.abstract'];
          const promptKey = promptKeys[index];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative overflow-hidden rounded-lg border border-primary/20 shadow-lg hover:shadow-primary/10 bg-gradient-to-b from-background to-background/80 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-accent/10 mix-blend-overlay pointer-events-none z-10"></div>
              <Image
                src={image.url}
                alt={t(promptKey)}
                width={400}
                height={400}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 backdrop-blur-sm bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="text-white">
                  <h3 className="text-lg font-semibold">{t(promptKey)}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{t(promptKey)}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Showcase;
