/**
 * 浏览器相关工具函数
 */

// 检查当前环境是否为浏览器
export const isBrowser = typeof window !== 'undefined';

// 获取浏览器语言
export const getBrowserLanguage = (): string => {
  if (!isBrowser) return 'en';
  
  const navigatorLanguage = navigator.language || (navigator as any).userLanguage;
  const language = navigatorLanguage.split('-')[0].toLowerCase();
  
  // 支持的语言列表
  const supportedLanguages = ['en', 'zh'];
  
  return supportedLanguages.includes(language) ? language : 'en';
};

// 检测设备类型
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (!isBrowser) return 'desktop';
  
  const ua = navigator.userAgent;
  
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  
  return 'desktop';
};

// 检测浏览器类型
export const getBrowserType = (): string => {
  if (!isBrowser) return 'unknown';
  
  const ua = navigator.userAgent;
  
  if (ua.indexOf('Chrome') > -1) return 'chrome';
  if (ua.indexOf('Safari') > -1) return 'safari';
  if (ua.indexOf('Firefox') > -1) return 'firefox';
  if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) return 'ie';
  if (ua.indexOf('Edge') > -1) return 'edge';
  
  return 'unknown';
};

// 设置cookie
export const setCookie = (name: string, value: string, days: number = 30): void => {
  if (!isBrowser) return;
  
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

// 获取cookie
export const getCookie = (name: string): string | null => {
  if (!isBrowser) return null;
  
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  
  return null;
};

// 删除cookie
export const deleteCookie = (name: string): void => {
  if (!isBrowser) return;
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// 检测是否支持WebP格式
export const supportsWebP = (): Promise<boolean> => {
  if (!isBrowser) return Promise.resolve(false);
  
  return new Promise(resolve => {
    const webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
  });
};

// 平滑滚动到元素
export const scrollToElement = (elementId: string, offset: number = 0, behavior: ScrollBehavior = 'smooth'): void => {
  if (!isBrowser) return;
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior,
  });
};

// 检测是否为移动设备
export const isMobile = (): boolean => {
  return getDeviceType() === 'mobile';
};

// 检测是否为平板设备
export const isTablet = (): boolean => {
  return getDeviceType() === 'tablet';
};

// 检测是否为桌面设备
export const isDesktop = (): boolean => {
  return getDeviceType() === 'desktop';
};