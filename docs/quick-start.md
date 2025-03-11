# Katana-NextJS 快速入门指南

本指南将帮助您迅速掌握Katana-NextJS框架的核心概念与使用方法，让您能够在最短时间内搭建高质量的Next.js应用。

## 目录

- [环境要求](#环境要求)
- [安装](#安装)
- [项目结构](#项目结构)
- [基本用法](#基本用法)
- [国际化](#国际化)
- [身份验证](#身份验证)
- [常见问题](#常见问题)

## 环境要求

开始前，请确保您的开发环境满足以下条件：

- Node.js 18.0.0+ (推荐使用LTS版本)
- npm 8.0.0+ 或 pnpm 7.0.0+ (推荐使用pnpm以获得更快的安装速度)
- 兼容现代浏览器 (Chrome, Firefox, Safari, Edge最新版)

## 安装

### 方法一：克隆仓库

```bash
# 克隆项目仓库
git clone https://github.com/scottcwy/Katana-NextJS.git my-app

# 进入项目目录
cd my-app

# 安装依赖
pnpm install
# 或使用npm
# npm install
```

### 方法二：一键部署

最快捷的方式是使用Vercel一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fscottcwy%2FKatana-NextJS)

## 项目结构

Katana-NextJS采用现代化的src目录结构，符合Next.js最佳实践：

```
katana-nextjs/
├── src/                    # 源代码
│   ├── app/                # Next.js App Router
│   │   ├── [locale]/       # 国际化路由
│   │   │   ├── page.tsx    # 主页面
│   │   │   └── layout.tsx  # 布局组件
│   ├── components/         # React组件
│   │   ├── blocks/         # 页面块组件
│   │   │   └── hero/       # Hero组件
│   │   ├── image/          # 图像相关组件
│   │   │   └── ImageGenerator/ # 图像生成器组件
│   │   └── ui/             # UI基础组件
│   ├── messages/           # 国际化消息
│   │   ├── en/             # 英文翻译
│   │   └── zh/             # 中文翻译
│   └── middleware.ts       # Next.js中间件
├── public/                 # 静态资源
└── docs/                   # 项目文档
```

## 基本用法

### 启动开发服务器

```bash
pnpm dev
# 或使用npm
# npm run dev
```

服务器将在 [http://localhost:3000](http://localhost:3000) 启动

### 构建生产版本

```bash
pnpm build
# 或使用npm
# npm run build
```

### 运行生产版本

```bash
pnpm start
# 或使用npm
# npm start
```

## 核心组件

Katana-NextJS专注于提供简洁高效的组件体系：

### Hero组件

Hero组件为页面提供引人注目的头部区域，直接集成i18n系统：

```tsx
// 页面中使用Hero组件
import Hero from "@/components/blocks/hero";

export default function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

### ImageGenerator组件

图像生成器组件提供AI驱动的图像生成功能，需要使用动态导入确保客户端渲染：

```tsx
import dynamic from "next/dynamic";

// 动态导入以确保客户端渲染
const Generator = dynamic(
  () => import("@/components/image/ImageGenerator").then(mod => mod.ImageGenerator),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Generator />
    </main>
  );
}
```

## 国际化

Katana-NextJS使用next-intl提供强大的国际化支持。详细配置请参阅[国际化指南](./i18n-guide.md)。

基本用法示例：

```tsx
// 服务器组件中
import { useTranslations } from 'next-intl/server';

export default function ServerComponent() {
  const t = useTranslations('common');
  return <h1>{t('title')}</h1>;
}

// 客户端组件中
'use client';
import { useTranslations } from 'next-intl';

export default function ClientComponent() {
  const t = useTranslations('hero');
  return <h1>{t('title')}</h1>;
}
```

## 身份验证

Katana-NextJS集成了NextAuth.js提供身份验证功能，支持多种认证提供商。

基本用法：

```tsx
// 在组件中使用认证状态
'use client';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedComponent() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>请先登录</div>;
  
  return <div>欢迎回来，{user.name}</div>;
}
```

## 环境变量配置

1. 复制项目根目录中的`.env.example`到`.env.local`
2. 根据您的需求设置环境变量

关键环境变量：

```env
# 基础配置
NEXT_PUBLIC_WEB_URL="http://localhost:3000"
NEXT_PUBLIC_PROJECT_NAME="AI Wallpaper"

# Auth配置
AUTH_SECRET="your_secret_key"
```

## 常见问题

**Q: 如何添加新组件?**  
A: 在`src/components`目录下创建新组件，按照功能分类放置。

**Q: 如何添加新页面?**  
A: 在`src/app/[locale]`目录下创建新页面文件夹和page.tsx文件。

**Q: 如何添加新语言?**  
A: 在`src/messages`目录下添加新的语言代码文件夹，并添加对应的翻译文件。

**Q: 遇到"Module not found"错误怎么办?**  
A: 确保导入路径正确使用了`@/`别名，指向src目录。例如：`import Hero from "@/components/blocks/hero";`

更多问题请参考[完整文档](./api-reference.md)或提交[GitHub Issue](https://github.com/scottcwy/Katana-NextJS/issues)。
