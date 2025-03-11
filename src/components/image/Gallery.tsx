"use client"

import { useState, useEffect, forwardRef, useImperativeHandle, ForwardedRef } from 'react';
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { RiDownload2Line, RiDeleteBinLine, RiCalendarLine, RiImageLine, RiLightbulbFlashLine } from 'react-icons/ri';
import Image from 'next/image';

interface GalleryImage {
  url: string;
  prompt: string;
  createdAt: string;
}

export interface GalleryRef {
  addImage: (image: GalleryImage) => void;
  removeImage: (index: number) => void;
}

const STORAGE_KEY = 'flux-gallery';
const MAX_IMAGES = 9;

export const Gallery = forwardRef<GalleryRef>((_, ref) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // 使用next-intl提供的useTranslations钩子
  const t = useTranslations('generator.gallery');
  
  // 组件挂载后加载已保存的图片
  useEffect(() => {
    setMounted(true);
    
    // 从localStorage读取图片
    if (typeof window !== 'undefined') {
      let userImages: GalleryImage[] = [];
      
      const savedImages = localStorage.getItem(STORAGE_KEY);
      
      if (savedImages) {
        try {
          const parsedImages = JSON.parse(savedImages);
          
          // 验证格式是否正确
          if (Array.isArray(parsedImages)) {
            userImages = parsedImages;
          } else {
            console.error('Saved images are not in array format');
            userImages = [];
          }
          
          // 确保没有重复的图片
          const uniqueImages: GalleryImage[] = [];
          const seenUrls = new Set();
          
          for (const image of userImages) {
            if (!seenUrls.has(image.url)) {
              seenUrls.add(image.url);
              uniqueImages.push(image);
            }
          }
          
          userImages = uniqueImages;
        } catch (e) {
          console.error('Failed to parse saved images:', e);
          userImages = [];
        }
      }
      
      setImages(userImages);
      // 重新保存清理后的图片列表
      if (userImages.length > 0) {
        saveToLocalStorage(userImages);
      }
    }
  }, []);

  // 保存图片到localStorage
  const saveToLocalStorage = (userImages: GalleryImage[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userImages));
    }
  };

  // 清除所有图片
  const clearAllImages = () => {
    if (window.confirm('Are you sure you want to clear all images?')) {
      setImages([]);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  };

  // 添加新图片到Gallery
  const addImage = (image: GalleryImage) => {
    const newImages = [image, ...images];
    
    // 保持最大数量限制
    if (newImages.length > MAX_IMAGES) {
      newImages.pop();
    }
    
    setImages(newImages);
    saveToLocalStorage(newImages);
    
    // 显示通知（如果需要）
    try {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Image Added', {
          body: 'New AI image has been added to your gallery.',
          icon: image.url
        });
      }
    } catch (e) {
      console.error('Notification error:', e);
    }
  };

  // 从Gallery中移除图片
  const removeImage = (index: number) => {
    // 确认删除
    if (window.confirm('Are you sure you want to remove this image?')) {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
      saveToLocalStorage(newImages);
    }
  };

  // 下载图片
  const downloadImage = (url: string, prompt: string) => {
    const link = document.createElement('a');
    link.href = url;
    
    // 使用提示词作为文件名，但进行清理
    let filename = '';
    if (prompt && prompt.trim()) {
      // 只取提示词的前30个字符
      const shortPrompt = prompt.trim().substring(0, 30);
      // 移除特殊字符
      const cleanPrompt = shortPrompt.replace(/[^a-zA-Z0-9]/g, '-');
      filename = `${t('download_prefix')}${cleanPrompt}`;
    } else {
      filename = t('download_default');
    }
    
    link.download = `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useImperativeHandle(ref, () => ({
    addImage,
    removeImage
  }), [images]);  

  // 定义空状态变体
  const emptyStateVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // 图片卡片变体
  const imageCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <div className="gallery-container">
      <AnimatePresence>
        {mounted && images.length === 0 && (
          <motion.div
            variants={emptyStateVariants}
            initial="hidden"
            animate="show"
            className="empty-state text-center py-16 px-4 rounded-lg border border-border bg-background"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <RiImageLine className="text-2xl text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('empty.title')}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t('empty.description')}
            </p>
          </motion.div>
        )}
        
        {images.length > 0 && (
          <motion.div
            variants={emptyStateVariants}
            initial="hidden"
            animate="show"
            className="w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">{t('title')}</h3>
              
              {images.length > 1 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-sm bg-transparent border-border text-muted-foreground hover:bg-destructive/20 hover:text-destructive-foreground hover:border-destructive"
                  onClick={clearAllImages}
                >
                  {t('clear_all')}
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {images.map((image, index) => (
                  <motion.div
                    key={`${image.url}-${index}`}
                    variants={imageCardVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                    className="relative group overflow-hidden bg-background border border-border rounded-lg transition-all duration-300 hover:shadow-md hover:border-primary/30"
                  >
                    <div className="relative pb-[100%] overflow-hidden">
                      <img 
                        src={image.url} 
                        alt={image.prompt || 'Generated image'}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="default"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full p-2 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 mr-2"
                          onClick={() => downloadImage(image.url, image.prompt)}
                        >
                          <RiDownload2Line />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full p-2 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                          onClick={() => removeImage(index)}
                        >
                          <RiDeleteBinLine />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 border-t border-border bg-muted/10 text-sm">
                      <div className="flex items-start gap-1.5 mb-2">
                        <RiLightbulbFlashLine className="min-w-[16px] h-4 text-muted-foreground mt-0.5" />
                        <p className="text-foreground/90 truncate">
                          <span className="font-medium text-muted-foreground">{t('prompt.label')}: </span> 
                          {image.prompt || '(No prompt)'}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <RiCalendarLine className="w-4 h-4 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          <span className="font-medium">{t('created.at')}: </span>
                          {image.createdAt}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

Gallery.displayName = 'Gallery';
