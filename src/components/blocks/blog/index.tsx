import { ArrowRight } from "lucide-react";
import { Blog as BlogType } from "@/types/blocks/blog";
import { motion, SlideUp, FadeIn } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

export default function Blog({ blog }: { blog: BlogType }) {
  if (blog.disabled) {
    return null;
  }

  return (
    <section className="w-full py-20 relative overflow-hidden">
      {/* 移除独立背景，使用共享背景组件 */}
      
      <div className="container px-4 md:px-6">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="space-y-6 py-16 md:py-24">
            <FadeIn>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-center">
                <span className="bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] dark:from-purple-400 dark:via-pink-400 dark:to-purple-400 text-transparent bg-clip-text animate-gradient-x">
                  {blog.title}
                </span>
              </h1>
              {/* 移除描述文本 */}
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {blog.items && blog.items.map((item, index) => (
            <div key={index} className="flex">
              <FadeIn delay={index * 0.1}>
                <a
                  href={item.url || `/${item.locale}/posts/${item.slug}`}
                  target={item.target || "_self"}
                  className="group h-full relative flex flex-col overflow-hidden rounded-xl bg-gray-900/40 hover:bg-gray-900/50 hover:shadow-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/30 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/20 group-hover:to-gray-900/10 z-10 transition-colors duration-300"></div>
                  
                  {item.cover_url && (
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                        <img
                          src={item.cover_url}
                          alt={item.title || ""}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-1 flex-col justify-between p-6 z-20">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {item.created_at && (
                          <p className="text-xs text-purple-300/70 font-medium tracking-wider">
                            {new Date(item.created_at).toLocaleDateString('en-US', {
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric'
                            })}
                          </p>
                        )}
                        <h3 className="text-xl font-bold leading-tight tracking-tight text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-300/80 line-clamp-3">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    {blog.read_more_text && (
                      <div className="pt-4">
                        <div className="inline-flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300 group-hover:underline gap-1">
                          {blog.read_more_text}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {item.author_name && (
                    <div className="flex items-center gap-2 px-6 py-4 border-t border-border/30">
                      {item.author_avatar_url ? (
                        <img
                          src={item.author_avatar_url}
                          alt={item.author_name}
                          className="rounded-full h-8 w-8 object-cover border border-border/50"
                        />
                      ) : (
                        <div className="rounded-full h-8 w-8 bg-muted flex items-center justify-center text-muted-foreground">
                          {item.author_name.charAt(0)}
                        </div>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {item.author_name}
                      </span>
                    </div>
                  )}
                </a>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
