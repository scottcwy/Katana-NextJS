import { Image } from "@/types/blocks/base";

export interface BlogItem {
  slug?: string;
  title?: string;
  description?: string;
  author_name?: string;
  author_avatar_url?: string;
  created_at?: string;
  locale?: string;
  cover_url?: string;
  content?: string;
  url?: string;
  target?: string;
}

export interface Blog {
  disabled?: boolean;
  name?: string;
  title?: string;
  description?: string;
  label?: string;
  icon?: string;
  image?: Image;
  buttons?: Button[];
  items?: BlogItem[];
  read_more_text?: string;
}
