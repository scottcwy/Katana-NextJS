import { ReactNode } from "react";

export type ButtonType = "button" | "link";

export type ButtonVariant =
  | "secondary"
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "ghost"
  | null
  | undefined;

export type ButtonSize = "sm" | "md" | "lg";

export interface Button {
  title?: string;
  icon?: string;
  url?: string;
  target?: string;
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export interface Image {
  src?: string;
  alt?: string;
  className?: string;
}

export interface Brand {
  title?: string;
  description?: string;
  logo?: Image;
  url?: string;
  target?: string;
}

export interface NavItem {
  name?: string;
  title?: string;
  description?: string;
  icon?: string;
  image?: Image;
  url?: string;
  target?: string;
  is_active?: boolean;
  is_expand?: boolean;
  className?: string;
  children?: NavItem[];
}

export interface Nav {
  name?: string;
  title?: string;
  icon?: string;
  image?: Image;
  className?: string;
  items?: NavItem[];
}

export interface Crumb {
  items?: NavItem[];
}

export interface Toolbar {
  items?: Button[];
}

export interface Tip {
  title?: string;
  description?: string;
  icon?: string;
  type?: "info" | "warning" | "error";
}

export interface SocialItem {
  title: string;
  icon?: string;
  url?: string;
  target?: string;
}

export interface Social {
  items?: SocialItem[];
}

export interface AgreementItem {
  title?: string;
  url?: string;
  target?: string;
}

export interface Agreement {
  items?: AgreementItem[];
}
