"use client";

import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

/**
 * 主题提供者组件
 * 提供应用的主题管理功能，使用next-themes实现
 * 支持明亮和黑暗模式切换
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  );
}
