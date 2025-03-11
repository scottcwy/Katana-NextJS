# 国际化配置指南

Katana-NextJS框架利用next-intl实现强大的多语言支持，让您的应用轻松实现全球化。本指南将展示如何高效配置和使用国际化功能。

## 目录

- [支持的语言](#支持的语言)
- [目录结构](#目录结构)
- [基本配置](#基本配置)
- [在组件中使用](#在组件中使用)
- [动态内容](#动态内容)
- [日期和数字格式化](#日期和数字格式化)
- [语言切换](#语言切换)
- [SEO优化](#seo优化)
- [最佳实践](#最佳实践)
- [一句话对话修改Landing Page](#一句话对话修改landing-page)

## 支持的语言

Katana-NextJS默认支持以下语言：

- 英语 (en) - 默认语言
- 中文简体 (zh)

您可以按照本指南轻松扩展更多语言支持。

## 目录结构

国际化文件遵循清晰的目录结构，位于`src/messages`目录：

```
src/
├── app/
│   ├── [locale]/          # 国际化路由
│   │   ├── layout.tsx     # 包含语言上下文提供者
│   │   └── page.tsx       # 主页面
├── messages/              # 翻译消息目录
│   ├── en/                # 英文翻译
│   │   ├── common.json    # 通用翻译
│   │   ├── hero.json      # Hero组件翻译
│   │   └── errors.json    # 错误消息翻译
│   └── zh/                # 中文翻译
│       ├── common.json    # 通用翻译
│       ├── hero.json      # Hero组件翻译
│       └── errors.json    # 错误消息翻译
├── middleware.ts          # 处理国际化路由的中间件
```

## 基本配置

### 1. 中间件配置

国际化路由通过`src/middleware.ts`实现：

```typescript
import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // 支持的语言列表
  locales: ['en', 'zh'],
  
  // 默认语言
  defaultLocale: 'en',
  
  // 本地化检测策略
  localeDetection: true
});
 
export const config = {
  // 匹配除静态资源外的所有路由
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
```

### 2. 配置next-intl

在`next.config.mjs`中集成next-intl：

```javascript
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {};
 
export default withNextIntl(nextConfig);
```

### 3. 创建消息文件

每种语言的翻译存储在JSON文件中，按功能模块组织：

**英文 (src/messages/en/hero.json)**:
```json
{
  "title": "AI Wallpaper Generator",
  "subtitle": "Create stunning wallpapers with AI",
  "generateButton": "Generate Now"
}
```

**中文 (src/messages/zh/hero.json)**:
```json
{
  "title": "AI壁纸生成器",
  "subtitle": "使用人工智能创建令人惊艳的壁纸",
  "generateButton": "立即生成"
}
```

## 在组件中使用

### 服务器组件中使用

服务器组件可以直接导入服务器端专用的hooks：

```tsx
// src/app/[locale]/page.tsx
import { useTranslations } from 'next-intl/server';

export default function HomePage() {
  const t = useTranslations('hero');
  
  return (
    <section className="hero">
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      {/* ...其他内容 */}
    </section>
  );
}
```

### 客户端组件中使用

客户端组件需要使用client包中的hooks并标记为'use client'：

```tsx
// src/components/image/ImageGenerator.tsx
'use client';

import { useTranslations } from 'next-intl';

export function ImageGenerator() {
  const t = useTranslations('generator');
  
  return (
    <div className="generator">
      <h2>{t('title')}</h2>
      <button>{t('generateButton')}</button>
      {/* ...其他内容 */}
    </div>
  );
}
```

## 动态内容

处理包含变量的翻译文本：

```tsx
// 定义翻译（src/messages/en/common.json）
{
  "welcome": "Welcome, {name}!",
  "imagesCreated": "You have created {count, plural, =0{no images} one{# image} other{# images}}."
}

// 在组件中使用
const t = useTranslations('common');
return (
  <>
    <p>{t('welcome', { name: user.name })}</p>
    <p>{t('imagesCreated', { count: user.imageCount })}</p>
  </>
);
```

## 日期和数字格式化

使用`useFormatter`格式化日期和数字：

```tsx
'use client';
import { useFormatter } from 'next-intl';

export default function FormattedDate({ date }) {
  const format = useFormatter();
  
  return (
    <>
      <p>日期: {format.dateTime(date, { dateStyle: 'full' })}</p>
      <p>价格: {format.number(1000, { style: 'currency', currency: 'CNY' })}</p>
    </>
  );
}
```

## 语言切换

实现优雅的语言切换组件：

```tsx
'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next-intl/client';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  const toggleLocale = () => {
    router.replace(pathname, { locale: locale === 'en' ? 'zh' : 'en' });
  };
  
  return (
    <button onClick={toggleLocale} className="btn btn-sm">
      {locale === 'en' ? '中文' : 'English'}
    </button>
  );
}
```

## SEO优化

为每种语言配置适当的元数据：

```tsx
// src/app/[locale]/layout.tsx
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('title'),
    description: t('description'),
    alternateLanguages: {
      'en': '/en',
      'zh': '/zh',
    },
  };
}
```

确保页面的`<html>`标签包含正确的lang属性：

```tsx
export default function LocaleLayout({ children, params: { locale } }) {
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
```

## 最佳实践

1. **模块化翻译文件** - 将翻译按功能区分，避免单个大文件

2. **使用命名空间** - 使用有意义的命名空间如`common`, `hero`, `errors`等

3. **保持翻译键一致** - 所有语言文件应包含相同的键，以避免缺失翻译

4. **利用TypeScript** - 可以为翻译键创建类型定义，获得更好的类型安全性：

```typescript
// src/types/messages.ts
import type { Messages } from 'next-intl';

// 定义翻译类型
export type MessageKeys = {
  hero: {
    title: string;
    subtitle: string;
    generateButton: string;
  };
  // 其他命名空间...
}

// 类型检查翻译使用
const t = useTranslations<keyof MessageKeys['hero']>('hero');
```

5. **提取公共文本** - 将重复使用的文本放入`common`命名空间

6. **测试所有语言** - 定期检查各语言版本以确保完整性和一致性

7. **使用默认语言作为回退** - 当翻译缺失时，系统会使用默认语言

8. **优先使用服务器组件** - 服务器组件中的翻译不会增加客户端bundle大小

## 一句话对话修改Landing Page

Katana-NextJS框架支持通过简单修改i18n文件来快速改变整个Landing Page的主题和内容，无需更改组件代码。这一强大功能让您能够轻松地为不同场景创建定制化的落地页。

### 使用步骤

1. **确定新主题**：决定您想要的新Landing Page主题（如AI导航站、电商平台、博客系统等）

2. **修改i18n文件**：更新`src/i18n/messages/[语言].json`文件中的相关内容，特别关注以下部分：
   - `metadata`: 更新SEO相关的标题、描述和关键词
   - `hero`: 修改主标题、副标题和按钮文本
   - `generator`: 更新功能区块的文本内容和提示

3. **保存并查看效果**：无需重启服务器，刷新页面即可看到更新后的Landing Page

### 示例：将默认AI图像生成器主题改为AI导航站

```json
// 原始内容（AI图像生成器）
{
  "metadata": {
    "title": "Create Beautiful AI Images | Flux AI Image Generator",
    "description": "Transform your ideas into stunning visuals..."
  },
  "hero": {
    "title": "Flux AI Image Generator",
    "description": "Transform your ideas into stunning visuals...",
    "create": "Create",
    "highlight_text": "Beautiful AI Images"
  }
}

// 修改后（AI导航站）
{
  "metadata": {
    "title": "AI Navigation Hub | Find the Best AI Tools",
    "description": "Discover and navigate through the best AI tools..."
  },
  "hero": {
    "title": "AI Navigation Hub",
    "description": "Your ultimate guide to discovering the best AI tools...",
    "create": "Discover",
    "highlight_text": "The Best AI Tools"
  }
}
```

### 注意事项

- 保持i18n文件的键结构不变，只修改值
- 确保所有语言版本都进行相应更新
- 如果需要添加新的字段，确保在相应组件中已经实现了对应的渲染逻辑

### 实用场景

- 快速创建不同主题的营销落地页
- A/B测试不同的页面内容和措辞
- 为不同的目标用户群体定制体验
- 根据季节或活动快速更新网站主题

通过这种方式，您可以在没有开发人员支持的情况下，快速调整和优化您的落地页内容，实现最高效的内容迭代。

## 添加新语言

要添加新语言，请按照以下步骤操作：

1. 在`src/middleware.ts`中更新`locales`数组：

```typescript
locales: ['en', 'zh', 'ja'], // 添加日语
```

2. 创建新语言的消息目录和文件：

```
src/messages/ja/common.json
src/messages/ja/hero.json
// 其他必要的翻译文件...
```

3. 更新语言切换器，包含新语言选项

现在您的应用已准备好支持新增的语言！

## 故障排除

**问题**: 切换语言后组件不更新  
**解决方案**: 确保使用了正确的导入（服务器组件使用`next-intl/server`，客户端组件使用`next-intl`）

**问题**: 消息未正确加载  
**解决方案**: 检查文件路径和JSON格式是否正确，确保没有语法错误

**问题**: 嵌套路由的国际化不工作  
**解决方案**: 确保所有页面模块都在`[locale]`文件夹下，并正确使用next-intl的路由函数

更多信息和高级配置，请参考[next-intl官方文档](https://next-intl-docs.vercel.app/)。
