"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FadeIn, ScaleIn, SlideUp } from "@/components/ui/motion";
import { Badge } from "@/components/ui/badge";
import Crumb from "./crumb";
import Markdown from "@/components/markdown";
import { Post } from "@/types/post";
import moment from "moment";
import { CalendarDays, Clock, BookOpen, Share2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogDetail({ post }: { post: Post }) {
  return (
    <section className="relative py-10 md:py-20 overflow-hidden">
      {/* 移除独立背景，使用共享背景组件 */}
      
      <div className="container max-w-screen-xl mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <Crumb post={post} />
            <Link href={`/${post.locale || 'en'}/posts`}>
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                <span>返回博客</span>
              </Button>
            </Link>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <SlideUp>
              <h1 className="mb-6 mt-0 max-w-4xl text-3xl font-bold tracking-tight md:mb-8 md:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] dark:from-purple-400 dark:via-pink-400 dark:to-purple-400 animate-gradient-x">
                {post.title}
              </h1>
            </SlideUp>
            
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 mb-8 border-y border-border/30 py-4">
                <div className="flex items-center gap-3">
                  {post.author_avatar_url ? (
                    <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-sm">
                      <AvatarImage
                        src={post.author_avatar_url}
                        alt={post.author_name || ''}
                      />
                    </Avatar>
                  ) : post.author_name ? (
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-medium text-primary">
                      {post.author_name.charAt(0)}
                    </div>
                  ) : null}
                  
                  <div>
                    {post.author_name && (
                      <p className="font-medium text-foreground">
                        {post.author_name}
                      </p>
                    )}
                    {post.created_at && (
                      <p className="text-xs text-muted-foreground">
                        {moment(post.created_at).format("YYYY年MM月DD日")}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="ml-auto flex flex-wrap items-center gap-3">
                  {post.reading_time && (
                    <Badge variant="secondary" className="flex items-center gap-1.5 rounded-full px-3">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.reading_time} 分钟阅读</span>
                    </Badge>
                  )}
                  
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">分享文章</span>
                  </Button>
                </div>
              </div>
            </FadeIn>
            
            {post.cover_url && (
              <ScaleIn duration={0.7} className="mb-10">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <img 
                    src={post.cover_url} 
                    alt={post.title || ''} 
                    className="w-full h-auto object-cover max-h-[500px]"
                  />
                </div>
              </ScaleIn>
            )}
            
            <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight max-w-none prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-md prose-img:rounded-lg prose-a:text-primary">
              <SlideUp delay={0.3}>
                {post.content && <Markdown content={post.content} />}
              </SlideUp>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8 space-y-8">
              <FadeIn delay={0.5}>
                <div className="rounded-xl border border-border/50 p-6 bg-card/50 shadow-sm backdrop-blur-sm">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    相关文章
                  </h3>
                  
                  {post.related_posts && post.related_posts.length > 0 ? (
                    <div className="space-y-4">
                      {post.related_posts.map((relatedPost, idx) => (
                        <ScaleIn key={idx} delay={0.5 + (idx * 0.1)}>
                          <a 
                            href={`/${post.locale}/posts/${relatedPost.slug}`}
                            className="block group"
                          >
                            <div className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                              {relatedPost.cover_url && (
                                <img 
                                  src={relatedPost.cover_url} 
                                  alt={relatedPost.title || ''} 
                                  className="w-20 h-20 object-cover rounded-md shadow-sm"
                                />
                              )}
                              <div>
                                <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                                  {relatedPost.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {relatedPost.created_at && moment(relatedPost.created_at).format("YYYY-MM-DD")}
                                </p>
                                {relatedPost.description && (
                                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {relatedPost.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </a>
                        </ScaleIn>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">没有找到相关文章</p>
                  )}
                </div>
              </FadeIn>
              
              <FadeIn delay={0.7}>
                <div className="rounded-xl border border-border/50 p-6 bg-card/50 shadow-sm backdrop-blur-sm">
                  <h3 className="text-lg font-semibold mb-4">订阅更新</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    订阅我们的博客更新，获取最新的产品和技术信息。
                  </p>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="您的邮箱地址"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                    <Button className="h-10">订阅</Button>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
