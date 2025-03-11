# Katana-NextJS API参考

本文档提供了Katana-NextJS框架中所有主要组件和API的使用说明。

## 目录

- [核心组件](#核心组件)
  - [Hero组件](#hero组件)
  - [ImageGenerator组件](#imagegenerator组件)
  - [Pricing组件](#pricing组件)
- [布局组件](#布局组件)
  - [Header组件](#header组件)
  - [Footer组件](#footer组件)
  - [Layout组件](#layout组件)
- [UI组件库](#ui组件库)
- [工具函数](#工具函数)
- [Hooks](#hooks)
- [国际化](#国际化)

## 核心组件

### Hero组件

`Hero`组件用于创建引人注目的页面首屏部分，通常包含标题、副标题和背景图像。

#### 导入

```tsx
import Hero from "@/components/blocks/hero";
```

#### 用法

```tsx
export default function Page() {
  return <Hero />;
}
```

#### 自定义

Hero组件的内容从国际化文件获取，可以在`messages/[locale]/hero.json`中修改。

### ImageGenerator组件

`ImageGenerator`组件提供AI图像生成功能，允许用户输入提示并生成图像。

#### 导入

由于该组件使用客户端功能，建议使用动态导入：

```tsx
import dynamic from 'next/dynamic';

const Generator = dynamic(() => 
  import('@/components/image/ImageGenerator').then(mod => mod.ImageGenerator), {
  ssr: false
});
```

#### 用法

```tsx
export default function Page() {
  return <Generator />;
}
```

#### 功能

- 提示词输入框带字符计数
- 样例提示词展示
- 图像生成按钮
- 生成图像展示区域
- 错误处理

### Pricing组件

`Pricing`组件用于展示不同的定价计划和选项。

#### 导入

```tsx
import Pricing from "@/components/blocks/pricing";
```

#### 用法

```tsx
export default function Page() {
  return <Pricing />;
}
```

## 布局组件

### Header组件

`Header`组件提供网站顶部导航栏，包含徽标、导航链接和用户菜单。

#### 导入

```tsx
import Header from "@/components/blocks/header";
```

#### 用法

```tsx
<Header />
```

### Footer组件

`Footer`组件提供网站底部区域，通常包含链接、版权信息和联系方式。

#### 导入

```tsx
import Footer from "@/components/blocks/footer";
```

#### 用法

```tsx
<Footer />
```

### Layout组件

`Layout`组件为页面提供一致的布局结构。

#### 导入

```tsx
import { AppShell } from "@/components/layout/app-shell";
```

#### 用法

```tsx
export default function RootLayout({ children }) {
  return (
    <AppShell>
      {children}
    </AppShell>
  );
}
```

## UI组件库

Katana-NextJS包含一套全面的UI组件，基于Radix UI和shadcn/ui构建：

### 按钮 (Button)

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">点击我</Button>
<Button variant="destructive">删除</Button>
<Button variant="outline">轮廓</Button>
<Button variant="ghost">幽灵</Button>
<Button variant="link">链接</Button>
```

### 输入框 (Input)

```tsx
import { Input } from "@/components/ui/input";

<Input type="text" placeholder="请输入..." />
<Input type="email" placeholder="email@example.com" />
```

### 对话框 (Dialog)

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger>打开对话框</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>对话框标题</DialogTitle>
      <DialogDescription>
        这是对话框的描述信息。
      </DialogDescription>
    </DialogHeader>
    <div>对话框内容</div>
  </DialogContent>
</Dialog>
```

### 工具提示 (Tooltip)

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>悬停我</TooltipTrigger>
    <TooltipContent>
      <p>工具提示内容</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## 工具函数

### 图像处理

```tsx
import { generateImage } from "@/lib/image";

// 生成图像
const imageUrl = await generateImage(prompt);
```

### 认证

```tsx
import { signIn, signOut } from "@/lib/auth";

// 登录
await signIn(provider);

// 登出
await signOut();
```

## Hooks

### useLocale

获取当前语言环境。

```tsx
import { useLocale } from "@/hooks/use-locale";

const Component = () => {
  const locale = useLocale();
  
  return <div>当前语言: {locale}</div>;
};
```

### useTheme

访问主题函数。

```tsx
import { useTheme } from "@/hooks/use-theme";

const Component = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      切换主题
    </button>
  );
};
```

### useAuth

认证工具。

```tsx
import { useAuth } from "@/hooks/use-auth";

const Component = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  
  if (isLoading) return <div>加载中...</div>;
  
  if (!isAuthenticated) return <div>请登录</div>;
  
  return <div>欢迎, {user.name}</div>;
};
```

## 国际化

Katana-NextJS使用next-intl提供国际化支持：

### 使用翻译

```tsx
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('namespace');
  
  return <h1>{t('key')}</h1>;
}
```

### 添加新语言

1. 在`/messages/[locale]`中创建新的语言文件
2. 在`src/i18n.ts`中添加该语言到可用语言列表

### 切换语言

使用内置的LocaleToggle组件：

```tsx
import LocaleToggle from "@/components/locale/toggle";

<LocaleToggle />
```
