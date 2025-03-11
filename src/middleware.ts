import createMiddleware from "next-intl/middleware";

// 简化路由配置，减少可能的错误
export default createMiddleware({
  locales: ["en", "zh"],
  defaultLocale: "en",
  localePrefix: "as-needed"
});

export const config = {
  matcher: [
    "/",
    "/(en|zh)/:path*",
    "/((?!privacy-policy|terms-of-service|api|_next|_vercel|.*\\..*).*)",
  ],
};
