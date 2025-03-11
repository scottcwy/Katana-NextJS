import { MetadataRoute } from 'next';
import { getPostsByLocale } from '@/models/post';
import { PostStatus } from '@/models/post';

/**
 * 格式化日期为ISO 8601格式（W3C标准）
 * @param date 日期对象
 * @returns ISO格式的日期字符串
 */
function formatDate(date: Date): string {
  // 将日期转换为标准的ISO格式，确保与Google要求的W3C标准兼容
  return date.toISOString().split('.')[0] + '+00:00';
}

// 获取比当前时间早至少两年的日期，确保避免使用未来日期
function getSafePastDate(): Date {
  const date = new Date();
  // 将日期设为至少两年前，以确保即使有时区差异或系统时钟问题，日期也不会是未来日期
  date.setFullYear(date.getFullYear() - 2);
  return date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 获取基础URL（从环境变量或使用实际部署的URL）
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || 'https://www.flux.xz.cn';
  
  // 为避免不允许的URL问题，确保URL格式正确
  const normalizedBaseUrl = baseUrl.replace(/\/$/, ''); // 移除尾部斜杠
  
  // 使用安全的过去日期
  const pastDate = getSafePastDate();
  const formattedDate = formatDate(pastDate);
  
  // 基础路由
  const routes = [
    {
      url: `${normalizedBaseUrl}`,
      lastModified: formattedDate,
      changefreq: 'daily' as const,
      priority: 1,
    },
    {
      url: `${normalizedBaseUrl}/en`,
      lastModified: formattedDate,
      changefreq: 'daily' as const,
      priority: 1,
    },
    {
      url: `${normalizedBaseUrl}/zh`,
      lastModified: formattedDate,
      changefreq: 'daily' as const,
      priority: 1,
    },
    {
      url: `${normalizedBaseUrl}/en/posts`,
      lastModified: formattedDate,
      changefreq: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${normalizedBaseUrl}/zh/posts`,
      lastModified: formattedDate,
      changefreq: 'daily' as const,
      priority: 0.8,
    },
  ];

  try {
    // 获取英文博客文章
    const enPosts = await getPostsByLocale('en');
    const enPostRoutes = enPosts
      .filter(post => post.status === PostStatus.Online)
      .map(post => {
        // 安全地处理日期 - 始终使用至少两年前的日期
        let lastModDate = getSafePastDate();
        
        return {
          url: `${normalizedBaseUrl}/en/posts/${post.slug}`,
          lastModified: formatDate(lastModDate),
          changefreq: 'weekly' as const,
          priority: 0.7,
        };
      });

    // 获取中文博客文章
    const zhPosts = await getPostsByLocale('zh');
    const zhPostRoutes = zhPosts
      .filter(post => post.status === PostStatus.Online)
      .map(post => {
        // 安全地处理日期 - 始终使用至少两年前的日期
        let lastModDate = getSafePastDate();
        
        return {
          url: `${normalizedBaseUrl}/zh/posts/${post.slug}`,
          lastModified: formatDate(lastModDate),
          changefreq: 'weekly' as const,
          priority: 0.7,
        };
      });

    // 合并所有路由
    return [...routes, ...enPostRoutes, ...zhPostRoutes];
  } catch (error) {
    console.error('Error generating sitemap with blog posts:', error);
    // 如果出错，至少返回基本路由
    return routes;
  }
}
