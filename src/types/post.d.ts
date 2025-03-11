export interface Post {
  uuid?: string;
  slug?: string;
  title?: string;
  description?: string;
  content?: string;
  created_at?: string;
  updated_at?: string;
  status?: string;
  cover_url?: string;
  author_name?: string;
  author_avatar_url?: string;
  locale?: string;
  reading_time?: number;
  related_posts?: Post[];
}
