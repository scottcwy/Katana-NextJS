"use client";

import { Post } from "@/types/post";
import { motion } from "@/components/ui/motion";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export default function Crumb({ post }: { post: Post }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <motion.ol 
        className="flex items-center flex-wrap gap-1.5 text-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <li className="flex items-center">
          <Link 
            href={`/${post.locale || "en"}`}
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
        </li>
        <li className="flex items-center">
          <Link 
            href={`/${post.locale || "en"}/posts`}
            className="text-muted-foreground hover:text-foreground hover:underline underline-offset-2 transition-colors"
          >
            博客
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
        </li>
        <li className="flex-1 truncate">
          <span className="text-foreground font-medium truncate">
            {post.title}
          </span>
        </li>
      </motion.ol>
    </nav>
  );
}
