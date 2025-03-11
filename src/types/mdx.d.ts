declare module "*.mdx" {
  import type { ReactElement } from "react";
  const content: (props: any) => ReactElement;
  export default content;
}
