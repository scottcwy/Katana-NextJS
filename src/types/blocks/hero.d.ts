import { Button, Image } from "@/types/blocks/base";

export interface Announcement {
  title?: string;
  description?: string;
  label?: string;
  url?: string;
  target?: string;
}

export interface Button {
  title?: string;
  url?: string;
  target?: string;
  icon?: string;
  type?: 'primary' | 'secondary';
}

export interface Hero {
  name?: string;
  disabled?: boolean;
  announcement?: Announcement;
  title?: string;
  highlight_text?: string;
  description?: string;
  buttons?: Button[];
  image?: Image;
  tip?: string;
  show_happy_users?: boolean;
  show_badge?: boolean;
}
