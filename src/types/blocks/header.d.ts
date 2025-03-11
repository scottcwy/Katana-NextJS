import { Button, Brand, Nav } from "@/types/blocks/base";

export interface Header {
  disabled?: boolean;
  name?: string;
  brand?: Brand;
  nav?: Nav;
  buttons?: Button[];
  className?: string;
  show_sign?: boolean;
  show_locale?: boolean;
  show_theme?: boolean;
}
