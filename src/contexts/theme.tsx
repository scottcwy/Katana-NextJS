"use client";

import { ReactNode, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

/**
 * 主题提供者组件
 * 提供应用的主题管理功能，使用next-themes实现
 * 支持明亮和黑暗模式切换
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // 使用useEffect设置默认主题模式
  useEffect(() => {
    // 设置默认主题模式为黑暗模式
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
  }, []);

  return (
    <NextThemesProvider {...props} disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
