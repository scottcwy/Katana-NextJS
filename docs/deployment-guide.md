# 部署指南

本指南为Katana-NextJS项目提供部署方案，专注于Vercel平台的配置流程。

## 目录

- [Vercel部署](#vercel部署)
- [环境变量配置](#环境变量配置)
- [性能优化](#性能优化)

## Vercel部署

[Vercel](https://vercel.com)作为Next.js官方推荐的部署平台，提供零配置体验和卓越性能。

### 一键部署

使用以下按钮实现一键式部署体验：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fscottcwy%2FKatana-NextJS)

### 手动部署步骤

1. **Vercel账户准备**

   访问[vercel.com](https://vercel.com)创建或登录您的账户。

2. **安装Vercel CLI工具**

   ```bash
   npm install -g vercel
   # 或使用pnpm
   pnpm add -g vercel
   ```

3. **登录Vercel**

   ```bash
   vercel login
   ```

4. **从本地部署**

   在项目根目录执行：

   ```bash
   vercel
   ```

5. **生产环境部署**

   当准备好部署到生产环境时：

   ```bash
   vercel --prod
   ```

### 通过GitHub集成部署

1. **连接GitHub仓库**

   在Vercel控制台中，点击"New Project"，选择您的GitHub仓库。

2. **配置项目**

   - 选择框架预设为"Next.js"
   - 配置环境变量
   - 选择部署分支和构建命令

3. **部署**

   点击"Deploy"按钮启动部署流程。

## 环境变量配置

Katana-NextJS项目需要配置以下环境变量才能正常运行：

### 必要环境变量

```bash
# 应用URL，用于生成绝对URL
NEXT_PUBLIC_WEB_URL="https://yourdomain.com"

# 认证密钥
AUTH_SECRET="your-auth-secret"  # 用于加密会话，应生成强随机字符串

# Supabase配置
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### 可选环境变量

```bash
# 配置缓存行为
CACHE_TTL="3600"  # 缓存保留时间（秒）

# 调试模式
DEBUG="true"  # 开发环境启用，生产环境应禁用
```

### 在Vercel中配置环境变量

1. 访问您项目的Vercel控制台
2. 选择"Settings" > "Environment Variables"
3. 添加每个必要的环境变量
4. 选择适当的环境应用范围（生产、预览或开发）
5. 保存并重新部署项目

> **安全提示**：永远不要将包含敏感信息的`.env`文件提交到版本控制系统。确保`.env`文件已添加到`.gitignore`中。

## 性能优化

为确保您的Katana-NextJS应用获得最佳性能，建议应用以下优化：

### 1. 启用ISR（增量静态再生成）

在适当的页面上实现ISR以提高性能和降低数据库负载：

```typescript
export const revalidate = 3600; // 每小时重新验证一次
```

### 2. 使用图像CDN

配置`next.config.mjs`以优化图像：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['yourimagecdn.com'],
    // 或使用Vercel的图像优化
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
```

### 3. 路由预取

确保关键页面预取已启用，提升浏览体验：

```tsx
import Link from 'next/link';

export default function Navigation() {
  return (
    <Link href="/important-page" prefetch>
      重要页面
    </Link>
  );
}
```

### 4. 启用Edge运行时

对于需要快速响应的API路由，考虑使用Edge运行时：

```typescript
export const runtime = 'edge';

export async function GET(request) {
  // 您的处理逻辑
}
```

Vercel平台已针对Next.js应用进行了高度优化，通过上述配置可充分利用其基础设施优势，实现最佳用户体验。

如需更多帮助和高级配置，请参考[Vercel官方文档](https://vercel.com/docs)。
