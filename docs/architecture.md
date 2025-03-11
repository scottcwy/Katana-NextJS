# 技术架构文档

本文档详细说明Katana-NextJS项目的技术架构、设计原则和核心实现细节。

## 目录

- [项目概述](#项目概述)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [核心组件](#核心组件)
- [状态管理](#状态管理)
- [样式系统](#样式系统)
- [国际化实现](#国际化实现)
- [API集成](#api集成)
- [性能优化](#性能优化)
- [测试策略](#测试策略)
- [扩展指南](#扩展指南)

## 项目概述

Katana-NextJS是一个高度优化的Next.js框架，专为快速构建单页应用程序而设计。框架采用模块化、组件驱动的开发方式，专注于提供流畅的用户体验和开发者友好的API。

### 设计原则

1. **简单性**：提供简洁明了的API，降低学习曲线
2. **性能优先**：通过组件优化、代码分割和图像优化确保最佳性能
3. **可扩展性**：模块化设计允许轻松添加新功能
4. **开发者体验**：周到的文档和工具，创造愉快的开发体验

## 技术栈

Katana-NextJS基于现代Web技术构建：

- **核心框架**：[Next.js](https://nextjs.org/) (基于React的全栈框架)
- **语言**：TypeScript
- **样式**：[Tailwind CSS](https://tailwindcss.com/)
- **状态管理**：React Context API
- **国际化**：[next-intl](https://next-intl-docs.vercel.app/)
- **UI组件**：自定义组件库
- **部署平台**：[Vercel](https://vercel.com/)

## 项目结构

项目采用现代化的src目录结构，符合Next.js最佳实践：

```
katana-nextjs/
├── .github/                # GitHub配置文件
├── docs/                   # 项目文档
│   ├── architecture.md     # 架构文档
│   ├── component-guide.md  # 组件指南
│   ├── deployment-guide.md # 部署指南
│   ├── i18n-guide.md       # 国际化指南
│   └── quick-start.md      # 快速入门指南
├── public/                 # 静态资源
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
│   │   └── ui/             # UI组件
│   ├── contexts/           # React上下文
│   ├── hooks/              # 自定义钩子
│   ├── lib/                # 工具函数和库
│   │   └── i18n.ts         # 国际化配置
│   ├── messages/           # 国际化消息
│   │   ├── en/             # 英文翻译
│   │   └── zh/             # 中文翻译
│   ├── middleware.ts       # Next.js中间件
│   └── types/              # TypeScript类型定义
├── .eslintrc.json          # ESLint配置
├── .gitignore              # Git忽略文件
├── CONTRIBUTING.md         # 贡献指南
├── LICENSE                 # 许可证
├── next.config.mjs         # Next.js配置
├── package.json            # 项目依赖
├── README.md               # 项目说明
├── tailwind.config.js      # Tailwind配置
└── tsconfig.json           # TypeScript配置
```

## 核心组件

### Hero组件

Hero组件是登陆页面的主要视觉元素，提供引人注目的标题和简介。

**特点**：
- 直接使用i18n系统获取内容
- 响应式设计适配各种屏幕尺寸
- 支持自定义背景图像

**实现**：
```tsx
// src/components/blocks/hero/index.tsx
'use client';

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  
  return (
    <section className="...">
      <h1 className="...">{t('title')}</h1>
      <p className="...">{t('description')}</p>
      <button className="...">{t('cta')}</button>
    </section>
  );
}
```

### ImageGenerator组件

ImageGenerator组件是应用的核心功能，提供AI驱动的图像生成能力。

**特点**：
- 客户端渲染 (使用dynamic import确保SSR兼容)
- 集成AI生成API
- 可自定义风格和选项
- 实时预览生成结果

**实现**：
```tsx
// src/app/[locale]/page.tsx (组件导入)
import dynamic from 'next/dynamic';

const Generator = dynamic(() => 
  import('@/components/image/ImageGenerator').then(mod => mod.ImageGenerator), {
  ssr: false
});

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Generator />
    </main>
  );
}
```

## 状态管理

项目使用React Context API进行状态管理，避免了复杂的外部状态库。

**主要上下文**：

1. **ThemeContext**：管理应用主题和外观
2. **AuthContext**：处理用户认证和授权
3. **GeneratorContext**：管理图像生成设置和历史记录

**示例实现**：
```tsx
// src/contexts/generatorContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

const GeneratorContext = createContext<GeneratorContextType | undefined>(undefined);

export function GeneratorProvider({ children }) {
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState([]);
  
  // 生成图像的处理函数
  const generateImage = async (prompt) => {
    // API调用逻辑
  };
  
  return (
    <GeneratorContext.Provider value={{ prompt, setPrompt, history, generateImage }}>
      {children}
    </GeneratorContext.Provider>
  );
}

export const useGenerator = () => {
  const context = useContext(GeneratorContext);
  if (context === undefined) {
    throw new Error('useGenerator must be used within a GeneratorProvider');
  }
  return context;
};
```

## 样式系统

Katana-NextJS使用Tailwind CSS作为主要样式解决方案，提供以下优势：

1. **工具优先**：使用预定义的实用类快速构建UI
2. **可定制**：通过`tailwind.config.js`自定义设计系统
3. **原子化**：精确控制元素样式而不需要自定义CSS
4. **响应式**：内置的响应式断点系统

**自定义配置**：
```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#0070f3',
        'secondary': '#ff4081',
        // 其他自定义颜色...
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // 其他自定义配置...
    },
  },
  plugins: [],
};
```

## 国际化实现

项目使用next-intl实现全面的国际化支持。详细配置请参见[国际化指南](./i18n-guide.md)。

**核心实现**：

1. **路由结构**：使用`[locale]`参数实现本地化路由
2. **翻译文件**：按组件和功能组织JSON翻译文件
3. **中间件**：通过middleware实现语言检测和重定向

## API集成

Katana-NextJS提供了灵活的API集成选项：

### 外部API集成

对于图像生成等功能，项目集成了第三方AI服务：

```typescript
// src/lib/api.ts
const API_KEY = process.env.AI_SERVICE_API_KEY;
const API_ENDPOINT = process.env.AI_SERVICE_ENDPOINT;

export async function generateImage(prompt: string, style: string) {
  try {
    const response = await fetch(`${API_ENDPOINT}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({ prompt, style })
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}
```

### 内部API路由

项目使用Next.js API路由处理服务器端逻辑：

```typescript
// src/app/api/generate/route.ts
import { NextResponse } from 'next/server';
import { generateImage } from '@/lib/api';

export async function POST(request) {
  try {
    const { prompt, style } = await request.json();
    
    // 输入验证
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }
    
    // 调用外部API
    const result = await generateImage(prompt, style);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in generate API route:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
```

## 性能优化

Katana-NextJS项目实施了多种性能优化策略：

### 组件级优化

1. **代码分割**：使用dynamic imports延迟加载重型组件
   ```tsx
   const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'));
   ```

2. **React.memo**：缓存不频繁更新的组件
   ```tsx
   const MemoizedComponent = React.memo(Component);
   ```

3. **虚拟化**：对长列表使用虚拟滚动

### 资源优化

1. **图像优化**：使用Next.js Image组件自动优化图像
   ```tsx
   import Image from 'next/image';
   
   <Image 
     src="/hero.jpg"
     alt="Hero"
     width={1200}
     height={600}
     quality={85}
     priority
   />
   ```

2. **字体优化**：使用`next/font`确保字体加载不阻塞渲染

3. **资产预加载**：预加载关键资源
   ```tsx
   import { useRouter } from 'next/router';
   
   const router = useRouter();
   const prefetchPage = () => {
     router.prefetch('/generate')
   };
   ```

## 测试策略

Katana-NextJS采用全面的测试策略：

1. **单元测试**：使用Jest测试独立函数和钩子
2. **组件测试**：使用React Testing Library测试组件行为
3. **集成测试**：测试组件之间的交互
4. **端到端测试**：使用Cypress或Playwright进行全应用流程测试

## 扩展指南

### 添加新组件

1. 在适当的目录创建组件文件
2. 实现组件逻辑，确保与现有设计系统兼容
3. 如需国际化，添加相应的翻译文件
4. 在文档中添加组件说明

### 添加新功能

1. 评估功能是否需要新的API端点或状态管理
2. 实现必要的后端逻辑
3. 创建前端组件和交互
4. 添加适当的测试
5. 更新文档

### 添加新的语言支持

1. 在`src/messages`下创建新的语言代码目录
2. 复制英文翻译文件结构并翻译内容
3. 在中间件中注册新语言
4. 测试新语言的UI展示
